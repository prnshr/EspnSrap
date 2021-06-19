// Simply match ki last ball prr commentator nee kya bola tha

const request = require("request");
const cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";

request(url,function(error, response, body){
    
    if(error == null && response.statusCode != 404){
        // Carry out the work
        printLastBallCommentry(body);
    }
    else{
        console.log("The Error is "+error);
        console.log("The Status Code is "+response.statusCode);
    }
});


// Printing the last line

function printLastBallCommentry(body){
    const $ = cheerio.load(body);

    let ElemArr = $(".match-comment-long-text");
    let elem = ElemArr[1];

    let commentry = $(elem).text();
    console.log(commentry);
}


