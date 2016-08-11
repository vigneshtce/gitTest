var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var crime=new Object();
var line_num=0;
var Arrest_index,year_index,PrimaryType_index;
//Function

//code to split and create object
var instream = fs.createReadStream('Crime.csv');
var outstream = new stream;
var rl = readline.createInterface(instream,outstream);

rl.on('line', function(line) {
  //  var res=line.split(",");
    var res=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    line_num++;
    //console.log(line_num);
    if(line_num === 1)
    {
      for(var i=0;i<res.length;i++) {
        if(res[i] == 'Primary Type') {
          PrimaryType_index=i;

        }
        if(res[i] == 'Arrest') {
          Arrest_index=i;
        }
        if(res[i] == 'Year') {
          year_index=i;
        }
      }
    }
    else
    {

      if(res[PrimaryType_index]==="ASSAULT") {
          if(crime[res[year_index]] == undefined)
          {
            crime[res[year_index]]={};
            crime[res[year_index]][res[Arrest_index]] = 1;
          }
          //console.log(res[year_index] +":"+ res[desc_index]);
           else
           {
            if(crime[res[year_index]][res[Arrest_index]] == undefined)
            {
              crime[res[year_index]][res[Arrest_index]] = 1;
            }
            else
            {
            crime[res[year_index]][res[Arrest_index]]++;
            }
          }
        }



}
});

rl.on('close', function() {
 for(i in crime)
 {
   crime[i].arrested=crime[i][true];
   delete crime[i][true];
   crime[i].notarrested=crime[i][false];
   delete crime[i][false];
 }
console.log(crime);
json_convert=JSON.stringify(crime);
fs.writeFile('file2.json',json_convert);
});
