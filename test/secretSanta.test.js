const ss = require('../questions/secretSanta');
const test = require('tape');
const list1 = require('../questions/list1.json');
const list2 = require('../questions/list2.json');
const list3 = require('../questions/list3.json');
const list4 = require('../questions/list4.json');

// 120/44
// 24/9
//
//
//

function factor(num) {
  if (num == 0)
    return 1;
  if (num == 1 )
    return 0;
  return (num - 1) * (factor(num-1) + factor(num-2));
}

runtest(list1);

function runtest(list) {
  test('test', (t)=> {

    const attempts = 100;
    const possibleGifts = {};

    const resultMap = {};

    for (let i = 0; i < attempts; i++) {
      Object.keys(list).forEach((key) => {
        const gift = list[key].gift;
        if (!possibleGifts[gift]) {
          possibleGifts[gift] = [key]
        } else {
          possibleGifts[gift].push(key);
        }
      });

      const result = ss(list);

      console.log(JSON.stringify(result));

      t.ok(Object.keys(result).length == Object.keys(list).length);
      Object.keys(result).forEach((key)=> {
        console.log(key);
        console.log(list[key]);
        console.log(result[key]);
        t.ok(possibleGifts[result[key]], "this is a valid gift");
        t.ok(possibleGifts[result[key]].pop(), "this gift is available to be given");
        t.notEqual(result[key], list[key].gift, "the receiver did not offer this gift");
      });

      const sortedNames = Object.keys(result).sort();
      const normalized = {};
      sortedNames.forEach((name)=> {
        normalized[name] = result[name];
      });

      const string = JSON.stringify(normalized);
      if (resultMap[string]) {
        resultMap[string] += 1;
      } else {
        resultMap[string] = 1;
      }
    }

    t.ok(resultMap);

    Object.keys(resultMap).forEach((key)=> {
      console.log(`${key} : ${resultMap[key]}`);
    });
    //
    const expectedResults = factor(Object.keys(list).length);
    t.equal(Object.keys(resultMap).length, expectedResults, `should be ${expectedResults} permutations of results`);

    t.end();
  });
}
