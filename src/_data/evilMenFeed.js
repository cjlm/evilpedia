let Parser = require('rss-parser');
let parser = new Parser();

const EleventyFetch = require('@11ty/eleventy-fetch');

const csv = require('csvtojson');

const { mean, extent } = require('d3-array');
const { scaleSequential, scaleLinear, scaleQuantile } = require('d3-scale');

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
    let guest = '';

    let [no, title] = ep.title.split(':');

    no = no.replace('E', '');

    title = title.replace('ft.', '');
    title = title.replace('LIVE! ', '');
    title = title.replace(/Pt\.\d/gm, '');

    if (title.includes('with')) {
      [subject, guest] = title.split('with');
      title = subject;
    }

    return {
      ...ep,
      no,
      guest,
      title,
    };
  });
  return Object.fromEntries(episodes.map((ep) => [ep.no, ep]));
};

const getRatings = async () => {
  const HOSTS = ['chris', 'james', 'michael'];
  const file = './src/_data/evilometer-data.csv';
  const episodes = await csv({ header: true, checkType: true }).fromFile(file);

  const values = {};
  const colorFns = {};
  const stats = {};

  HOSTS.forEach((host) => {
    values[host] = episodes.map((ep) => Number(ep[host]));
    stats[host] = {
      ratings: values[host],
      mean: mean(values[host]),
      extent: extent(values[host].filter((val) => Number(val) < 20)),
    };
    colorFns[host] = scaleSequential()
      // scaleLinear()
      // scaleQuantile()
      .range(['white', 'hsl(0, 89%, 32%)'])
      .domain(stats[host].extent);
  });

  const computedEps = episodes.map(
    ({ ep, chris, michael, james, ...rest }) => ({
      ep,
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

  colorFns.average = scaleSequential()
    .range(['white', 'hsl(0, 89%, 32%)'])
    .domain([0, 10]);

  const ratings = computedEps
    .map((data) => ({
      ...data,
      averageColor: colorFns.average(data.avg),
    }))
    .reverse();

  return {
    ratings,
    stats,
  };
};

module.exports = async function () {
  const { ratings, stats } = await getRatings();
  const feed = await getFeed();

  const episodes = ratings
    .map((rating) => ({
      rating,
      ...feed[rating.ep],
    }))
    .reverse();

  const charts = await evilCharts(episodes);

  return {
    dateUpdated: new Date(),
    episodes,
    stats,
    charts,
  };
};
