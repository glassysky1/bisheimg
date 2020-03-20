function curry(fn) {
  return function () {
    //备份实参
    var args = arguments
    return function () {
      return fn(...args,...arguments)
    }
  }
}

function fun(a,b,c,d) {
  return a + b + c + d
}

fun = curry(fun)

var fn = fun(1,2,3)
console.log(fn(5))