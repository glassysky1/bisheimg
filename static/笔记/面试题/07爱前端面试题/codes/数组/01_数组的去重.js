var arr = [1,1,1,3,3,3,2,2,,2]

// //Set
// const set = new Set(arr)

// console.log(set)//{1,3,2}
// console.log([...set])//[1,3,2]

function uniq(arr) {
  var _result =[]
  for (let i = 0; i < arr.length; i++) {
    if(!_result.includes(arr[i])){//===严格
      _result.push(arr[i])
    }
  }
  return _result
}

console.log(uniq(arr))