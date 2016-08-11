const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('Crime.csv')
});

rl.on('line', function(line) {
  console.log('Line from file:', line);
});
