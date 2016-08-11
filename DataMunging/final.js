var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var crime=new Object();
var line_num=0;
var desc_index,year_index;
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
        for(i=0;i<res.length;i++)
        {
          if(res[i]=="Year")
          { 
            year_index = i;
          //  console.log(res[i]+":"+year_index);
          }
          else if (res[i]=="Description")
          {
            desc_index = i;
          //  console.log(res[i]+":"+desc_index);
          }
        }
    }
    else
    {
        if(res[desc_index]=="$500 AND UNDER" ||res[desc_index]=="OVER $500" )
        {
          //console.log(res[year_index] +":"+ res[desc_index]);
          if(crime[res[year_index]] == undefined)
          {
            crime[res[year_index]]={};
            crime[res[year_index]][res[desc_index]] = 1;
          }
          else
          {
            if(crime[res[year_index]][res[desc_index]] == undefined)
            {
              crime[res[year_index]][res[desc_index]] = 1;
            }
            else
            {
            crime[res[year_index]][res[desc_index]]++;
            }
          }
        }
}
});

rl.on('close', function() {
console.log(crime);
json_convert=JSON.stringify(crime);
fs.writeFile('file1.json',json_convert);
});
