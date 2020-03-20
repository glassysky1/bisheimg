// var arr = [0, [1, 2, 3], [4, [[[[5, 6], 7, 8]]], 9], 10]

// function flatternArray(arr) {
//   var _arr = []
//   //每一项进行遍历，看看是常数还是数组
//   for (let i = 0;i < arr.length;i++) {
//     //数组的识别，typeof检查数组结果是object
//     if (!Array.isArray(arr[i])) {
//       _arr.push(arr[i])
//     } else {
//       _arr = _arr.concat(flatternArray(arr[i]))
//     }
//   }
//   return _arr
// }
// console.log(flatternArray(arr))

// function checkArray(o) {
//   return Object.prototype.toString.call(o) =='[object Array]' && 'push' in o
// }

Array.prototype.max = function () {
  return Math.max.apply(null,this)
}

var arr = [343,32,445,243,35]
console.log(arr.max())