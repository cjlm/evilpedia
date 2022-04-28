const { parse } = require('rss-to-json');
//// async await
//(async () => {
//
//    var rss = await parse('https://blog.ethereum.org/feed.xml');
//
//    console.log(JSON.stringify(rss, null, 3));
//
//})();

module.exports = async function () {

    var url = "https://bookworm.fm/feed/podcast/";
    var rss = await parse(url);
    console.log(JSON.stringify(rss, null, 3));
 return JSON.stringify(rss, null, 3);
}