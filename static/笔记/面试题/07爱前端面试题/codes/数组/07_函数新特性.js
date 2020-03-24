// function getValue(value) {
//   return value +5
// }

// function add(a , b = getValue(a)) {
//   return a + b
// }


// var m = add(3,4)
// console.log(m)//7

// var n = add(3)
// console.log(n)//11
// function add(a = b ,b) {
//   return a + b
// }

// console.log(add(3,4))//7
// console.log(add(undefined,9))//报错

// function fun(a,...b) {
//   console.log(a)
//   console.log(b)
// }

// fun(3,4,5,6,7)
// var arr = [43,3423,213,23]
// console.log(Math.max(...arr))

// const sum = (a,b) => a + b
// console.log(sum(2,3))

// var obj = {
//   a:10,
//   fun(){
//     console.log(this.a)
//   }
// }

// var a  = 8
// obj.fun() //10

// var f = obj.fun
// f()//undefined

function fun() {
  return () =>{
    console.log(this)
  }
}

var laowang = {'name':'老王'}
var xiaoliu = {'name':'小刘'}

var arrowFN= fun.call(laowang)
arrowFN()//老王
arrowFN.call(xiaoliu)//老王
arrowFN = arrowFN.bind(xiaoliu)
arrowFN()//老王