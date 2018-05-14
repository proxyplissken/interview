const ss = require('../questions/secretSanta');
const test = require('tape');
const list = require('../questions/list1.json');

test('test', (t)=> {
  const result = ss(list);

  const possibleGifts = {};

  Object.keys(list).forEach((key) => {
    const gift = list[key].gift;
    if(!possibleGifts[gift]){
      possibleGifts[gift] = [key]
    } else {
      possibleGifts[gift].push(key);
    }
  });

  for (let i = 0; i < 1; i++) {
    t.ok(Object.keys(result).length == Object.keys(list).length);
    Object.keys(result).forEach((key)=> {
      console.log(key);
      console.log(list[key]);
      console.log(result[key]);
      t.ok(possibleGifts[result[key]], "this is a valid gift");
      t.ok(possibleGifts[result[key]].pop(), "this gift is available to be given");
      t.notEqual(result[key], list[key].gift, "the receiver did not offer this gift");
    });
  }
  t.end();
});
