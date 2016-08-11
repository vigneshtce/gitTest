var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var count_up=0;
var count_down=0;

var instream = fs.createReadStream('crime.csv');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

rl.on('line', function(line) {
// process line here
var res = line.split(",");
if(res[6]=="$500 AND UNDER"|| res[6]=="OVER $500")
{
            var rv = {};
             for (var i = 0; i < res.length; i++)
             {
               if (res[i] !== undefined && i==17)
               {
                 rv["year"] = res[i];
               }
             }

}
console.log(rv);
});

rl.on('close', function() {

// do something on finish here
});
