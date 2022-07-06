let Parser = require('rss-parser');
let parser = new Parser();

const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
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

  return {
    dateUpdated: new Date(),
    episodes: Object.fromEntries(episodes.map((ep) => [ep.no, ep])),
  };
};
