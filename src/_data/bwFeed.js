const { parse } = require('rss-to-json');

module.exports = async function () {
    const titleReg = /^(\d+).*?(\w+.+)/g;
    const mikeReg = /Mike(?:'|&#8217;)s Rating: ([\d.]*?)(?=[^\d.])/;
    const joeReg = /Joe(?:'|&#8217;)s Rating: ([\d.]*?)(?=[^\d.])/;
    // hit content: rss.items[i].content

    var url = "https://bookworm.fm/feed/podcast/";
    var rss = await parse(url);
    //let feedObj = JSON.stringify(rss, null, 3);

    let epArr = [];

    for (let i = 0; i < rss.items.length; i++) {
        let titleStr = rss.items[i].title;
        let contentStr = rss.items[i].content;
        let obj = {};
        const matches = titleStr.matchAll(titleReg);
        for (const match of matches) {
            const epNo = match[1]
            const title = match[2]
            obj.no = epNo;
            obj.title = title;
        }

        obj.link = "https://bookworm.fm/" + obj.no + "/";
        obj.ratingMike = contentStr.match(mikeReg)?.[1] ?? "-";
        obj.ratingJoe = contentStr.match(joeReg)?.[1] ?? "-";
        if (obj.ratingMike == "-") {
            obj.rating = false;
        } else {
            obj.rating = true;
        }

        if (obj.no != undefined) {
           epArr.push(obj); 
        } 
    }
    return epArr;
}