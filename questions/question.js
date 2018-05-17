/*You are the host of a party.  Guests will arrive with a gift and as host,
you are tasked with writing a secret santa program to assign the gifts randomly
amongst guests.

Here are the specifications and requirements:

1. Each guest will have a unique name.
2. Guests should not receive their own gift. (If Mark brings a balloon, he should not receive a balloon.)
3. Your program should accept the sampleInput below and output a list of assignments in the sampleOutput format.
4. The assignments should be random. (Your program should allow for any one guest to receive any other guest's gift.)

*/

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

const sampleOutput = {
  fred: 'toy airplane',
  mark: 'candy cane',
  alice: 'top hat',
  wendy: 'balloon'
}