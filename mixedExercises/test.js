// asyncronous, dvs läser först hela denna fil innan err eller data läses och printas ut!

const fs = require('fs');

fs.readFile('./hello.txt', (err, data) => {
  if (err) {
    // throw err;
    console.log('errrroooorr!!');
  }
  console.log(data.toString('utf8'));
})

// ger samma resultat men direkt, dvs syncronous, dvs det väntar på resultatet och skriver ut innan det printas ut!

const file = fs.readFileSync('./hello.txt');
console.log(file.toString());