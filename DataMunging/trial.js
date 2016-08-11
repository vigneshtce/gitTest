var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var count=0;
var count1=0;

var instream = fs.createReadStream('crime.csv');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

rl.on('line', function(line)
{
 // process line here
 var res = line.split(",");
 if(res[6]=="$500 AND UNDER")
 {
 console.log(res);
 count++;
 console.log(count);
 }
 else if (res[6]=="OVER $500")
{
  count1++;
  console.log(count1);
}
});

rl.on('close', function() {
 // do something on finish here
});
