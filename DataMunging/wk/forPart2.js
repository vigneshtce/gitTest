var fs = require('fs');
var readline = require('readline');
var csv2array=require('csv2array');

var rl = readline.createInterface({
 input: fs.createReadStream('crime.csv')
});
//--------------------------------------------------till here the file is opened for reading

//---------------------------------------------------------------------------------------

var lineno=0;
var data,json_convert;
//var arr=[];
//var PrimaryType,Arrest,Year;
// var count=0;
// var header4="count";
//console.log("\n");

//------------------------------------reading of file line by line begins here
//var obj={};
var crime = {};

rl.on('close', function() {
  //arr.push(crime);
 console.log(crime);
 json_convert=JSON.stringify(crime);
 fs.appendFile('file2.json',json_convert);
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
     if(header[i] == 'Arrest') {
       indexOfArrest=i;
     }
     if(header[i] == 'Year') {
       indexOfYear=i;
     }
   }
 }
 else {
   //code for the traversal and manipulation of the rest of the file goes here.
   data = csv2array(line);
   var line = data[0];
   if(line[indexOfPrimaryType]=="ASSAULT"){
     //console.log("hi");
   if(line[indexOfArrest]=="true" || line[indexOfArrest]=="false") {
    //  console.log("hi22222");
     if(crime[line[indexOfYear]] != undefined) {
       if(crime[line[indexOfYear]][line[indexOfArrest]] == undefined) {
         crime[line[indexOfYear]][line[indexOfArrest]] = 0;
       }
       crime[line[indexOfYear]][line[indexOfArrest]]++;
      // crime

     }
     else {
       crime[line[indexOfYear]] = {};
     }
   }
 }

 }
});
//------------------------------reading of file line by line ends here after eof is reached.
