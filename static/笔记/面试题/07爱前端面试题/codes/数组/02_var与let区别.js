//let实际上表示块级作用域，在for循环中有奇效。自动创建闭包
var arr = []

// for (var i = 0; i < 10; i++) {
//   arr[i] = function () {
//     console.log(i)
//   }
// }

// arr[5]()//10

for(var i = 0;i<10;i++){
  (function (i) {
    arr[i] = function () {
      console.log(i)
    }
  })(i)
}

arr[5]()//5