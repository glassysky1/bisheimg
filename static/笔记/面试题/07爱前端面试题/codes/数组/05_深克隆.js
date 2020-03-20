var a = 10
function fun() {
  console.log(a)
}

(function (fn) {
  var a = 20
  fn()//10,即使外头没有定义a，它也不会找20的
})(fun)