console.time('coolsanta');
const fs = require('fs');

const floorCount = () => {
  let floor = 0;
  let basement = false;
  let position = 0;
  const santa = fs.readFileSync('./santa.txt').toString();
  
  for (let i=0; i<santa.length; i++) {
    if (santa[i] === '(') {
      floor++;
    } else {
      floor--;
    }
    if (floor < 0 && !basement) {
      position = i+1;
      basement = true;
    }
  }
  
  return console.log('Floor: ', floor, 'Position: ', position);
}

floorCount();
console.timeEnd('coolsanta');