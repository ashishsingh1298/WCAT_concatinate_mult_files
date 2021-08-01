const { count } = require("console");
const { TIMEOUT } = require("dns");
let fs = require("fs");
const { exit } = require("process");
let inputArr = process.argv.slice(2);
let content = "";

let optionArr = [];
let fileArr = [];
for (let i = 0; i < inputArr.length; i++){
    let firstChar = inputArr[i].charAt(0);
    if (firstChar == "-"){
        optionArr.push(inputArr[i]);
    }
    else{
        fileArr.push(inputArr[i]);
    }
}
// for no such file
for (let i = 0; i < fileArr.length; i++){
    let ans = fs.existsSync(fileArr[i]);
    if (ans == false){
        console.log('File does not exists');
        return;
    }
}
// concatinate file data
for (let i = 0; i < fileArr.length; i++){
    content = content + fs.readFileSync(fileArr[i]) + "\r\n";
}


    if (optionArr.includes('-n') == true && optionArr.includes('-b') == true ){
        let newArr = [];
        for (let i = 0; i < optionArr.length; i++){
            if (optionArr[i] == '-n' || optionArr[i] == '-b'){
                optionArr[i + 1] = null;
                break;
            }
        } 
    }

    // Check for -n
    let isNPresent = optionArr.includes('-n');  
    if ( isNPresent == true){
        // console.log("recived file cont :- ",content);
        content = content.split("\r\n")
        // console.log(content);

       for ( let i = 0; i < content.length; i++){
            // content[i] = i + 1 + " " + content[i];
            content[i] = `${i + 1} ${content[i]}`;
        } 
       content = content.join("\r\n");
    //    console.log(content);
    }
    
    // check for -b
    let isBPresent= optionArr.includes('-b');
    if ( isBPresent == true){
        content = content.split("\r\n")
        let counter = 1;
        for ( let i = 0; i < content.length; i++){
            
            if ( content[i] != ""){
                content[i] = counter + " " + content[i];
                counter++;
                }
        } 
       content = content.join("\n");
    }    

// Check for -s
if (optionArr.includes('-s') == true){
    content = content.split("\r\n");
    // console.log(content);
    for ( i = 1; i < content.length; i++){
        if ( content[i] == "" && content[i - 1] == ""){
            content[i] = null;
        }
        else if (content[i] == "" && content[i - 1] == null){
            content[i] = null;
        } 
    }
    let tempArr = [];
    for ( i = 0; i < content.length; i++){
        if (content[i] != null){
            tempArr.push(content[i]);
        }
    }
    content = tempArr.join("\n\r");
    // console.log("yyfgiuhbhb huinjknjk nion",content);
}


console.log(content);
// console.log(optionArr);