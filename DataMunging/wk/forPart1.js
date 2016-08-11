
var fs = require('fs');
var readline = require('readline');
var csv2array=require('csv2array');

var rl = readline.createInterface({
 input: fs.createReadStream('crime.csv')
});
//--------------------------------------------------till here the file is opened for reading

var lineno=0;
var data;
var PrimaryType,Description,Year;
var count=0;
var header4="count";
console.log("\n");

//------------------------------------reading of file line by line begins here
var obj={};
var crime = {};

rl.on('close', function() {
 console.log(crime);
 json_convert=JSON.stringify(crime);
 fs.appendFile('file1.json',json_convert);
 console.log("file writing done");
});

rl.on('line', function(line){
 lineno=lineno+1;
 if(lineno===1) {
     // this if construct is for the header section of the file
   //code for the execution of the header part goes here.
   data=csv2array(line);
   var header=data[0];
   for(var i=0;i<header.length;i++) {
     if(header[i] == 'PrimaryType') {
       indexOfPrimaryType=i;
     }
     if(header[i] == 'Description') {
       indexOfDesc=i;
     }
     if(header[i] == 'Year') {
       indexOfYear=i;
     }
   }
 }
 else {
   data = csv2array(line);
   var line = data[0];
   if(line[indexOfDesc]=="$500 AND UNDER" || line[indexOfDesc]=="OVER $500") {
     if(crime[line[indexOfYear]] != undefined) {
       if(crime[line[indexOfYear]][line[indexOfDesc]] == undefined) {
         crime[line[indexOfYear]][line[indexOfDesc]] = 0;
       }
       crime[line[indexOfYear]][line[indexOfDesc]]++;
     }
     else {
       crime[line[indexOfYear]] = {};
     }
   }

 }
});
//------------------------------reading of file line by line ends here after eof is reached.
