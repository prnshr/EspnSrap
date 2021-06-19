const path = require("path");
const fs = require("fs");

let dir = process.cwd();
console.log(dir);
console.log(dir.length);

let contents = fs.readdirSync(dir);

for(let i =0;i<contents.length ;i++){
    
    if(path.extname(contents[i]) == ".txt"){
        console.log(contents[i]);
        fs.unlinkSync(contents[i]);
    }
}
