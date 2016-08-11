var fs = require('fs');
var dataset = require('./file1.json');
var yearWiseCrime = [];
for(property in dataset) {
  for(prop in dataset[property]) {
    var crime = {};
    crime.description = prop;
    crime.value = dataset[property][prop];
    crime.year = property;
    yearWiseCrime.push(crime);
  }
}

console.log(yearWiseCrime);
var json_convert=JSON.stringify(yearWiseCrime);
fs.writeFile('dataForFile1.json',json_convert);
