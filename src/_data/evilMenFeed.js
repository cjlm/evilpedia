let Parser = require('rss-parser');
let parser = new Parser();

const EleventyFetch = require('@11ty/eleventy-fetch');

const csv = require('csvtojson');

const { mean, extent } = require('d3-array');
const { scaleSequential, scaleLinear, scaleQuantile } = require('d3-scale');

const { tidy, leftJoin } = require('@tidyjs/tidy');

const evilCharts = require('../js/charts');

const getFeed = async () => {
  const url = 'https://thesonarnetwork.com/evil-men/feed/podcast';

  let rssXml = await EleventyFetch(url, { duration: '1d', type: 'text' });
  const rss = await parser.parseString(rssXml);

  const filter = ({ title }) =>
    title.startsWith('E') &&
    !title.includes('Teaser') &&
    !title.includes('Preview') &&
    !title.includes('A Taste of Evil Men');

  let episodes = rss.items.filter(filter).map((ep) => {
    let guestName = '';

    let [no, title] = ep.title.split(':');

    no = Number(no.replace('E', ''));

    title = title.replace('ft.', '');
    title = title.replace('LIVE! ', '');
    title = title.replace(/Pt\.\d/gm, '');

    const withWords = ['with', 'w/'].map((w) => ` ${w} `);
    const hasWith = withWords.filter((w) => title.includes(w));

    if (hasWith.length > 0) {
      [subject, guestName] = title.split(hasWith[0]);
      title = subject;
    }

    return {
      ...ep,
      no,
      guestName,
      title,
    };
  });
  // return Object.fromEntries(episodes.map((ep) => [ep.no, ep]));
  return episodes;
};

const getRatings = async () => {
  const HOSTS = ['chris', 'james', 'michael'];
  const file = './src/_data/evilometer-data.csv';
  const episodes = await csv({ header: true, checkType: true }).fromFile(file);

  const values = {};
  const colorFns = {};
  const stats = {};

  const scale = () => scaleSequential().range(['white', 'hsl(0, 89%, 32%)']);

  HOSTS.forEach((host) => {
    values[host] = episodes.map((ep) => Number(ep[host]));
    const range = extent(values[host]);

    stats[host] = {
      ratings: values[host],
      mean: mean(values[host]),
      max: range[1],
      extent: range.map((e) => Math.min(e, 10)),
    };
    colorFns[host] = scale().domain(stats[host].extent);
  });

  const computedEps = episodes.map(
    ({ no, chris, michael, james, ...rest }) => ({
      no,
      chris,
      james,
      michael,
      chrisColor: colorFns.chris(chris),
      jamesColor: colorFns.james(james),
      michaelColor: colorFns.michael(michael),
      avg: Number(mean([chris, michael, james])),
      ...rest,
    })
  );

  colorFns.average = scale().domain([0, 10]);

  const ratings = computedEps
    .map((data) => ({
      ...data,
      averageColor: colorFns.average(data.avg),
    }))
    .reverse();

  return { ratings, stats };
};

module.exports = async function () {
  const { ratings, stats } = await getRatings();
  const feed = await getFeed();

  const episodes = tidy(feed, leftJoin(ratings, { by: 'no' }))
    .filter((ep) => ep.no != 48)
    .reverse();

  return {
    dateUpdated: new Date(),
    episodes,
    stats,
    charts: await evilCharts(episodes),
  };
};
