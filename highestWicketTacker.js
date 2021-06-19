// Highest Wichet taker, ("name and number of wickets") in the winning team
// link of score_card is Provided 

const request = require("request");
const cheerio = require("cheerio");
const { FILE } = require("dns");

let url ="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url,function(error, response, body){
    
    if(error == null && response.statusCode != 404){
        // Carry out the work
        printHWTaker(body);
    }
    else{
        console.log("The Error is "+error);
        console.log("The Status Code is "+response.statusCode);
    }
});


/**
 * Step 1 :- Identify the team that won the game
 * Step 2 :- Bowling sections access krk, winning team ka bowling section access krlo
 * Step 3 :- firr Loop lgakr bowler ka name and wickets nikal lo
 */
function printHWTaker(body){
    const $ = cheerio.load(body);
    let winningTeam = getWinningTeamName($);

    console.log("The winning Team is " + winningTeam);
    let obj = findBowlerDetails($,winningTeam);
    console.log(obj);
    
}


function getWinningTeamName($){
    let Teams = $(".match-header .teams .team");
    if($(Teams[0]).hasClass("team-gray")){
        let teamName = $($(Teams[1]).find("p")).text().trim().toLowerCase();
        return teamName;
    }
    else{
        let teamName = $(Teams[0]).text().trim().toLowerCase();
        return teamName;
    }
}


// Winning team ka Collapsible access krk usme bowler ko search kro
// firr loop lgakr answer nikalo


function findBowlerDetails( $, winningTeam){
    let Tables = $(".Collapsible ");

    let TeamAName = $($(Tables[0]).find("h5")).text().trim();
    let TeamBName = $($(Tables[1]).find("h5")).text().trim();

    let TeamAarr = TeamAName.split("INNINGS");
    TeamAarr.pop();
    TeamA = TeamAarr.join("").toLowerCase();

    let TeamBarr = TeamBName.split("INNINGS");
    TeamBarr.pop();
    TeamB = TeamBarr.join("").toLowerCase();

    console.log(TeamA);
    console.log(TeamB);

    console.log("---------------------------------------------");

    if(TeamA == winningTeam){
        // Use Tables[1] => because yahan prr winning team k bowlers ki list hogi

        let BowlingTable = $(Tables[1]).find(".bowler tbody tr");
        console.log(BowlingTable.length);
        
        // console.log($(BowlingTable).t)

        let obj =findMaxWicketsBowler($,BowlingTable);
        return obj;

    }
    else{
        // Use Tables[0] => As it will contain the list of the bowlers of the winning team

        let BowlingTable = $(Tables[0]).find(".bowler tbody tr");

        console.log(BowlingTable.length);
        let obj =findMaxWicketsBowler($,BowlingTable);
        return obj;

    }

}


function findMaxWicketsBowler($, BowlingTable){

    let name = "";
    let wickets =0;

    for(let i =0 ; i<BowlingTable.length ;i++){
        let row = $(BowlingTable[i]).find("td");

        let c_name = $(row[0]).text();
        let c_wickets =$(row[4]).text();

        
        if(c_wickets >= wickets){
            name = c_name;
            wickets = c_wickets;
        }
    }

    let obj = {
        "name" :name,
        "wickets" : wickets
    };

    return obj;
}