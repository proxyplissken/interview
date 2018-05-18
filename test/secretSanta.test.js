const ss = require('../questions/secretSanta');
const test = require('tape');
const assert = require('assert');
const list1 = require('../questions/list1.json');
const list2 = require('../questions/list2.json');
const list3 = require('../questions/list3.json');
const list4 = require('../questions/list4.json');

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
    try {
      const availablePermutations = factor(Object.keys(list).length);
      const attempts = availablePermutations * 15;
      const possibleGifts = {};
      const possibleNames = {};
      const resultMap = {};

      for (let i = 0; i < attempts; i++) {
        const result = ss(list);
        
        Object.keys(list).forEach((key) => {
          possibleNames[key] = "here";

          const gift = list[key].gift;
          if (!possibleGifts[gift]) {
            possibleGifts[gift] = [key]
          } else {
            possibleGifts[gift].push(key);
          }
        });

        assert.equal(Object.keys(result).length, Object.keys(list).length, `the list should have ${Object.keys(list).length} assignments`);
        Object.keys(result).forEach((key)=> {
          assert(possibleNames[key], `${key} should be available for a gift : ${JSON.stringify(result)}`);
          delete possibleNames[key];
          assert(possibleGifts[result[key]], `${result[key]} should be a valid gift : ${JSON.stringify(result)}`);
          assert(possibleGifts[result[key]].pop(), `${result[key]} should be available to be given : ${JSON.stringify(result)}`);
          assert.notEqual(result[key], list[key].gift, `${key} should not receive his/her own gift : ${JSON.stringify(result)}`);
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

      assert.equal(Object.keys(resultMap).length, availablePermutations, `should be ${availablePermutations} permutations of results`);
      t.pass("meets all criteria, verifying distribution");

      Object.keys(resultMap).forEach((key)=> {
        console.log(`${key} : ${resultMap[key]}`);
      });

      const threshold = (attempts * 2)/availablePermutations;

      Object.keys(resultMap).forEach((key)=> {
        assert(resultMap[key] < threshold, `${key} had an abnormally high distribution, run again to verify`);
      });

    } catch (error) {
      t.fail(error);
    }

    t.end();
  });
}
