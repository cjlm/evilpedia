// Require rss to json parse
const { parse } = require('rss-to-json');

module.exports = async function () {
    // Regex to find title and Mike's and Joe's ratings
    const titleReg = /^(\d+).*?(\w+.+)/g;
    const mikeReg = /Mike(?:'|&#8217;)s Rating: ([\d.]*?)(?=[^\d.])/;
    const joeReg = /Joe(?:'|&#8217;)s Rating: ([\d.]*?)(?=[^\d.])/;

    // Pull in rss feed
    var url = "https://bookworm.fm/feed/podcast/";
    var rss = await parse(url);

    // Initialise variables for return
    let returnObj = {};
    let epArr = [];

    // Parse each episode
    for (let i = 0; i < rss.items.length; i++) {
        // Variables
        let titleStr = rss.items[i].title;
        let contentStr = rss.items[i].content;
        let obj = {};
        // Title string and episode number
        const matches = titleStr.matchAll(titleReg);
        for (const match of matches) {
            const epNo = match[1]
            const title = match[2]
            obj.no = epNo;
            obj.title = title;
        }

        obj.link = "https://bookworm.fm/" + obj.no + "/";
        // Undefined handling. This should be easier with .? but somehow eleventy doesn't like it
        var ratingM = contentStr.match(mikeReg) || false;
        var ratingJ = contentStr.match(joeReg) || false;
        if (ratingM != false) { ratingM = ratingM[1];};
        if (ratingJ != false) { ratingJ = ratingJ[1];};

        obj.ratingMike = ratingM;
        console.log(ratingM);
        obj.ratingJoe = ratingJ;
        
        // Deal with episode without rating
        if (obj.ratingMike != false) {
            // Turn numbers into star icons
            obj.starsMike = starify(obj.ratingMike);
            obj.starsJoe = starify(obj.ratingJoe);
            obj.rating = true;
        } else {
            obj.rating = false;
            obj.ratingMike = "";
            obj.ratingJoe = "";
        }
        // Calculate combined rating
        if (obj.rating) { obj.ratingAve = (parseFloat(obj.ratingJoe) + parseFloat(obj.ratingMike))/2};
        // Append '.0' to full ratings
        if (Number.isInteger(obj.ratingAve)) { obj.ratingAve += ".0"}
        // Push episode object to array
        if (obj.no != undefined) {
           epArr.push(obj); 
        } 
    }

    // Font Awesome star function
    function starify(rating) {
        if (rating == undefined) { return; }
        var starryString;
        starryString = '<i class="fa-solid fa-star"></i>'.repeat(Math.floor(rating)); 
        var lastTwo = rating.slice(-2);
        if (lastTwo = ".5") {
            starryString += '<i class="fa-solid fa-star-half"></i>';
        }
        return starryString;
    }
    // Populate episodes from array
    returnObj.episodes = epArr;

    // Fun facts
    // Double five star episodes
    var i = returnObj.episodes.length;
    var fiveStarEps = [];
    while (i--) {
        if (epArr[i].ratingJoe == 5 && epArr[i].ratingMike == 5) {
            fiveStarEps.push(epArr[i])
        }
    }
    returnObj.fiveStars = fiveStarEps.reverse();
    return returnObj;
}