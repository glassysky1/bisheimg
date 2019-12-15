
//变量提升
console.log(username)//undefined
var username = 'kobe'
console.log(username)//kobe

fun()//正常执行函数
function fun() {
  console.log('fun()')

}

ECObj ={
  变量对象:{变量，函数，函数的形参},
  scopeChain:父级作用域链 + 当前的变量对象,
  this:{window || 调用其的对象}
}