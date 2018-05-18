function assignGifts(list) {
  let names = Object.keys(list)
  let chosen = []
  let thingy = false
  while (!thingy) {
    let arr = []
    for (let i in Object.keys(list)) {
      arr.push(i)
    }
    for (let i = 0; i < Object.keys(list).length; i++) {
      var number = parseInt(Math.random()*10%arr.length)
      if (i < Object.keys(list).length - 1) {
        while (arr[number] === i) {
          number = Math.round(Math.random()*arr.length)
        }
      } else {
        number = 0
      }
      chosen.push(arr[number])
      arr.splice(number, 1)
    }
    if (chosen[chosen.length - 1] !== chosen.length - 1) {
      thingy = true
    }
  }
  var output = new Object()
  for (let i in names) {
    output[names[i]] = list[names[chosen[i]]]["gift"]
  }
  return output
}

module.exports = assignGifts;