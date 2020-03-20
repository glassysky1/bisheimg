// function checkType(type) {
//   return function (o) {
//     return Object.prototype.toString.call(o) == '[object ' + type +']'
//   }
// }

// const checkIsArray = checkType('Array')

// console.log(checkIsArray([1,2,3]))

// var a = 100
// function testResult() {
//   var b = 2 * a
//   var a = 200
//   var c = a / 2
//   console.log(b)//NaN
//   console.log(a)//200
// }

// testResult()
// function fn(n) {
//   var _arr = []
//   while (_arr.length != n) {
//     var m = parseInt(Math.random() * 31) + 2
//     if (!_arr.includes(m)) {
//       _arr.push(m)
//     }
//   }
//   return _arr
// }

// console.log(fn(30))

function fun(a,b) {
  console.log(a === arguments[0])
  console.log(b === arguments[1])
  a =123
  b =456
  console.log(a === arguments[0])
  console.log(b === arguments[1])

}

fun(3,4)