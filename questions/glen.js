const sampleInput = {
  "fred": {
    "gift": "candy cane"
  },
  "alice": {
    "gift": "toy airplane"
  },
  "mark": {
    "gift": "balloon"
  },
  "wendy": {
    "gift": "top hat"
  }
}
// ["fred", "alice", "mark", "wendy"]
// ["candy cane", "toy airplane", "balloon", "top hat"]
const randomIntBelow = (cutoff) => parseInt((Math.random() * 10) % cutoff)
const getPeople = (list) => Object.keys(list)
const getGifts = (list, people) => people.map(p => list[p].gift)
// randomly swap two items in an array
const randomArrSwap = (arr) => {
  const swapOne = randomIntBelow(arr.length)
  const swapTwo = randomIntBelow(arr.length)
  let tmp = arr[swapOne]
  arr[swapOne] = arr[swapTwo]
  arr[swapTwo] = tmp
  return arr
}
// make sure no person is assigned their own gift
const foundAHoarder = (list, people, gifts) => {
  return people.find((person, idx) => {
    // see if the person's gift is the same as the gift array
    // if so, they're holding on to their own item making them a hoarder
    return list[person].gift === gifts[idx]
  })
}
const assignGifts = (list) => {
  const orderedPeople = getPeople(list)
  const orderedGifts = getGifts(list, orderedPeople)
  // recrusive swapper that runs til we ensure nobody is a hoarder anymore
  const doSwap = (people, gifts) => {
    // if a person is a hoarder, swap again
    if (foundAHoarder(list, people, gifts)) {
      return doSwap(people, randomArrSwap(gifts))
    }
    // if nobody is a hoarder, we're done
    return [people, gifts]
  }
  // recursively swap elements til nobody is a hoarder
  const [people, swappedGifts] = doSwap(orderedPeople, orderedGifts)
  // re-format the arrays back into an object
  return people.reduce((acc, person, idx) => {
    acc[person] = swappedGifts[idx]
    return acc
  }, {})
}

module.exports = assignGifts;

// assignGifts(sampleInput)