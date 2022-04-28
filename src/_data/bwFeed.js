const { parse } = require('rss-to-json');
// async await
(async () => {

    var rss = await parse('https://blog.ethereum.org/feed.xml');

    console.log(JSON.stringify(rss, null, 3));

})();

async function name(params) {
    
}