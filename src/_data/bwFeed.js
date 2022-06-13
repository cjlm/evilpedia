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
        if (ratingM != false) { ratingM = ratingM[1]; };
        if (ratingJ != false) { ratingJ = ratingJ[1]; };

        obj.ratingMike = ratingM;
        obj.ratingJoe = ratingJ;

        // Deal with episode without rating
        if (obj.ratingMike != false) {
            // Turn numbers into star icons
            obj.starsMike = starify(obj.ratingMike);
            obj.starsJoe = starify(obj.ratingJoe);
            // Append Zeroes if necessary
            obj.ratingMike = appendZeroes(obj.ratingMike);
            obj.ratingJoe = appendZeroes(obj.ratingJoe);
            obj.rating = true;
        } else {
            obj.rating = false;
            obj.ratingMike = "";
            obj.ratingJoe = "";
        }
        // Calculate combined rating
        if (obj.rating) { obj.ratingAve = (parseFloat(obj.ratingJoe) + parseFloat(obj.ratingMike)) / 2 };
        // Append '.0' to full ratings
        obj.ratingAve = appendZeroes(obj.ratingAve);
        // Push episode object to array
        if (obj.no != undefined) {
            epArr.push(obj);
        }
    }

    // Font Awesome star function
    function appendZeroes(rating) {
        if (/^\d$/.test(rating)) {
            var nulled = rating += ".0";
            return nulled;
        };
        return rating;
    }
    function starify(rating) {
        if (rating == undefined) { return; }
        var starryString;
        starryString = '<i class="fa-solid fa-star"></i>'.repeat(Math.floor(rating));
        if (rating.slice(-2) == ".5") {
            starryString += '<i class="fa-solid fa-star-half"></i>';
        }
        return starryString;
    }
    // Populate episodes from array
    returnObj.episodes = epArr;

    // Fun facts
    // Double five star episodes
    // var i = returnObj.episodes.length;
    // var fiveStarEps = [];
    // while (i--) {
    //     if (epArr[i].ratingJoe == 5 && epArr[i].ratingMike == 5) {
    //         fiveStarEps.push(epArr[i])
    //     }
    // }
    returnObj.fiveStars = fiveStarStr(returnObj.episodes);
    returnObj.mikeAvg = raterAvg(returnObj.episodes)[0];
    returnObj.joeAvg = raterAvg(returnObj.episodes)[1];
    return returnObj;

    // Fact functions
    function fiveStarStr(episodes) {
        // Getting the amount of double 5 star ratings
        var i = episodes.length;
        var starEps = 0;
        var ratingEps = 0;
        var fiveStarBooks = [];
        var hs = "<span class='card-hl'>"
        var he = "</span>"
        while (i--) {
            var current = episodes[i];
            if (current.ratingAve == "5.0") {
                starEps++;
                fiveStarBooks.push(current);
            }
            if (current.rating) { ratingEps++; }
        }
        return `Out of ${ratingEps} ratings, ${hs}${starEps} books${he} have been given a ${hs}double five star rating${he}. That's ${Math.floor(starEps / ratingEps * 100)}%!<br><br>The most ${hs}recent book${he} to be awarded full stars by both Mike and Joe was ${hs}<a href="${fiveStarBooks[fiveStarBooks.length - 1].link}">${fiveStarBooks[fiveStarBooks.length - 1].no + ": " + fiveStarBooks[fiveStarBooks.length - 1].title}</a>${he}.`;
    }
    function raterAvg(episodes) {
        i = episodes.length;
        var ratingArr = [];
        var mikeFives = 0;
        var joeFives = 0;
        while (i--) {
            var c = episodes[i];
            if (c.rating) {
                ratingArr.push(c);
                if (c.ratingMike == "5.0") {
                    mikeFives++;
                }
                if (c.ratingJoe == "5.0") {
                    joeFives++;
                }
            }
        }
        var mikeRatingSum = 0;
        var joeRatingSum = 0;
        ratingArr.forEach(element => {
            mikeRatingSum += parseFloat(element.ratingMike);
            joeRatingSum += parseFloat(element.ratingJoe);
        });
        var mikeAvg = mikeRatingSum / ratingArr.length;
        var joeAvg = joeRatingSum / ratingArr.length;
        mikeAvg = Math.round(mikeAvg*100) / 100;
        joeAvg = Math.round(joeAvg*100) / 100;
    var hs = "<span class='card-hl'>"
    var he = "</span>"
    var mikeStr = `${hs}Mike's average rating${he} is ${hs + mikeAvg + he}/5.`;
    mikeStr += "<br><br>";
    mikeStr += `He gave ${hs}${mikeFives}${he} books ${hs}five stars${he}.`;
    var joeStr = `${hs}Joe's average rating${he} is ${hs + joeAvg + he}/5.`;
    joeStr += "<br><br>";
    joeStr += `He gave ${hs}${joeFives + he} books ${hs}five stars${he}.`;
    return [mikeStr, joeStr];
    }
}