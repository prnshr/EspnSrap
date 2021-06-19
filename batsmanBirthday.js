// Simply match ki last ball prr commentator nee kya bola tha

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");


let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
let baseUrl = "https://www.espncricinfo.com/";

request(url,function(error, response, body){
    
    if(error == null && response.statusCode != 404){
        // Carry out the work
        getBatsmanBirthday(body);
    }
    else{
        console.log("The Error is "+error);
        console.log("The Status Code is "+response.statusCode);
    }
});

/**
 * Step 1 :- Basically Batsman Table prr jao 
 * Step 2 :- vahan see batsman k link ko access kro
 * Step 3 :- Dusre link prr call lga do and vahan see birthday info access krk, print kra do
 * 
 * Extensions := Json objects can be created and used accordingly
 */

function getBatsmanBirthday(body){
    // It's like JQuery accesses document
    let $ = cheerio.load(body);

    let BatsmanTable = $(".table.batsman tbody tr .batsman-cell a");
    console.log(BatsmanTable.length);

    for(let i =0;i<BatsmanTable.length; i++){
        let link = $(BatsmanTable[i]).attr("href");
        link = baseUrl + link;
        request(link, function(error, response, html){

            processForEveryBatsman(html);
        })

        // console.log(link);
    }
}

function processForEveryBatsman(html){

    let api = cheerio.load(html);
    let arr = api(".player-card-description");
    // console.log(arr.length);

    let name = api(api(arr[0])).text();
    let dob = api(api(arr[1])).text();

    let Arr = dob.split(",");
    let dobArr = Arr.slice(0,2);
    dob = dobArr.join(" ");

    let fileName = (name.split(" ")).join('') +".txt";
    let content = "name  = "+name +"\n"+"dob = "+dob;
    fs.writeFileSync(fileName,content);

    console.log(name+"    -    "+dob);
    console.log("-------------------------------------");

}