function shuffleArray(array) {
  const length = array.length;

  for(let i = 0; i < length; i++){
    const position = Math.floor(i + (Math.random() * length - i));

    const temp = array[i];
    array[i] = array[position];
    array[position] = temp;
  }
}

function assignGifts(list) {

  const names = Object.keys(list);
  shuffleArray(names);
  const offset = Math.floor(Math.random() * (names.length - 1)) + 1;

  const returnMap = {};

  for(let i=0; i<names.length; i++){
    returnMap[names[i]] = list[names[(i+offset)%names.length]].gift;
  }

  return returnMap;
}

function assignGifts2(list){
  const names = Object.keys(list);
  let values = [];
  names.forEach((name)=>{
    values.push(list[name].gift);
  });

  const map = {};

  shuffleArray(values);
  shuffleArray(names);

  names.forEach((name, i)=> {
    console.log(i);
    if(!(list[name].gift == values[0])) {
      map[name] = values[0];
      values.splice(0,1);
      return;
    }

    if(i == (names.length - 1)){
      if(!(list[name].gift == values[0])) {
        map[name] = values[0];
        values.splice(0,1);
        return;
      } else {
        map[name] = map[names[0]];
        map[names[0]] = values[0];
      }
    } else {
      map[name] = values[1];
      values.splice(1,1);
    }
  });

  return map;
}

module.exports = assignGifts2;