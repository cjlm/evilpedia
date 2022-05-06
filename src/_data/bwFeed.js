const { parse } = require('rss-to-json');

module.exports = async function () {
    var titleReg = /^(\d+).*?(\w+.+)/g;

    var url = "https://bookworm.fm/feed/podcast/";
    var rss = await parse(url);
    //let feedObj = JSON.stringify(rss, null, 3);

    let epArr = [];

    for (let i = 0; i < rss.items.length; i++) {
        let str = rss.items[i].title;
        const matches = str.matchAll(titleReg);
        for (const match of matches) {
            const epNo = match[1]
            const title = match[2]
            var obj = {
                "no": epNo,
                "title": title
            }
            epArr.push(obj);
        }
    }
    return epArr;
}