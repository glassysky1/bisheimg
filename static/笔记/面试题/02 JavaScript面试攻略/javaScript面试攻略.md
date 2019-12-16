## JavaScript数据类型

js数据类型

```javascript
//JavaScript数据类型
//usbno
/* 
  undefined
  string
  boolean
  number
  Ojbect
*/
```

js基本数据类型(function不是)

```javascript
/* 
  undefined
  string
  boolean
  number
*/
```

## NaN

Not  a  Number

isNaN->ES5 NaN 并不靠谱，ES6修复这个问题

NaN 跟谁都不相等，包括它本身

```javascript
Number('100xx') //NaN
```

检测一个变量是不是NaN

1. ES6 isNaN

2. ES5 

   ```javascript
   a != a
   false 不是NaN
   true 是NaN
   ```

## 作用域

全局作用域：整个js文件都能使用

函数作用域：函数内部才可以用

块级作用域: 推荐使用

```javascript
//num挂载了window上全局
for(var i =0;i<5;i++){
  var num = 12
}
console.log(num)//12


//块级作用域
for(var i =0;i<5;i++){
  let num = 12
}
console.log(num)//报错

```

## 作用域链

子函数没有的找父级，它的父级跟你在哪执行的函数没有关系，而是跟你物理代码位置有关系

```javascript
var a =666
function show() {
  var a = 12
  show2()
}
function show2() {
  console.log(a)
}

show()//666
```

```javascript
var a =666
function show() {
  var a = 12
  function show2() {
    console.log(a)
  }
  show2()
}
show()//12
```

## 变量提升

```javascript
console.log(a)//undefined
var a = 666

test()//555
function test() {
  console.log(555)
  
}

```

## 严格模式

严格模式下，不允许使用未定义的变量

‘user strict’ 以后在工作中你一定要加

```javascript
'use strict'
var num1 = 333
num2 = 999//未定义
console.log(num1)

```

## IIFE

匿名函数自执行

1. 处理变量污染

```javascript
(function () {
  console.log(333)
})()
```

```javascript
(function () {
 var num1 = 456
})();
(function () {
 var num2 = 123
})()

```

## IIFE与闭包面试题

```javascript
// js没有块级作用域
var arr = []
for (var i = 0;i < 3;i++) {
  arr[i] = function () {
    return i
  }
}
console.log(arr[0]())//3
console.log(arr[1]())//3
console.log(arr[2]())//3


for (var i = 0;i < 3;i++) {
  (function (num) {
    // 函数是立马执行的
    arr[num] = function () {
      return num
    }
  })(i)
}

console.log(arr[0]())//0
console.log(arr[1]())//1
console.log(arr[2]())//2



var arr = []
for (let i = 0;i < 3;i++) {
  arr[i] = function () {
    return i
  }
}
console.log(arr[0]())//0
console.log(arr[1]())//1
console.log(arr[2]())//2
```

## this

1. 全局

   1. this在浏览器下 ->Window

2. 函数this

   1. show();//Window
   2. 如果use strict,undefined

3. 对象

   1. this ->对象{}

4. 面试

   严格模式下：undefined

   ```javascript
   'use strict'
   var teacher ={
     name:'leolau',
     showName:function () {
       function testThis() {
         console.log(this)
       }
       testThis()
     }
   }
   teacher.showName()
   ```

   非严格模式下：Window

   ```javascript
   var teacher ={
     name:'leolau',
     showName:function () {
       function testThis() {
         console.log(this)
       }
       testThis()
     }
   }
   teacher.showName()
   ```

   解决：

   1. let 接一下
   2. 箭头函数
   3. bind call apply

   ```javascript
   var teacher ={
     name:'leolau',
     showName:function () {
       let that = this
       function testThis() {
         console.log(that)
       }
       testThis()
     }
   }
   teacher.showName()
   ```

   

## call、apply、bind区别

call(矫正this,参数1，参数2，参数3,...)

```javascript
var teacher ={
  name:'leolau',
  showName:function () {
    function testThis() {
      console.log(this)
    }
    testThis.call(this)
  }
}
teacher.showName()
```

bind()不执行，加参数

```javascript
var teacher ={
  name:'leolau',
  showName:function () {
    var testTHis = function () {
      console.log(this)
    }.bind(this)
    testTHis()
  }
}
teacher.showName()
```

apply(this,[参数1，参数2，参数3])

```javascript
var arr = [12,5,8]
console.log(Math.max.apply(null, arr))
```

js里面面向对象编程(OO编程)

```javascript
//单体模式
var Teacher = {
  name: 'debinge',
  age: 18,
  showname: function () {
    return this.name
  }
}
Teacher.showname()
//原型模式
// 属性放在构造函数里，方法放在原型上
function Teacher1(name, age) {
  this.name = name
  this.age = age
}
Teacher1.prototype.showName = function () {
  return this.name
}
var dabingge = new Teacher1('da')
dabingge.showName()
//伪类模式()
class Teacher2 {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  showName() {
    return this.name
  }
}

```

## 面向对象编程继承

```javascript
//单体模式
var Teacher = {
  name: 'dabinge',
  age: 18,
  job: '10year',
  showName: function () {
    return this.name
  }
}
var student = Object.create(Teacher)
student.name = 'wangtiechui'
student.job = '3Month'
console.log(student.showName())
student.showJob = function () {
  return this.job
}
console.log(student.job)


//伪类继承
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  showName() {
    return this.name
  }
}

class Teacher1 extends Person {
  constructor(name, age, job) {
    super(name, age)
    this.job = job
  }
  showInfo() {
    return this.job + '---' + super.showName()
  }
}

var t1 = new Teacher1('dabinge', 16, '搬砖的')
console.log(t1.showInfo())


```

## 数据处理

1. JSONP原理

   1. js是可以跨域
   2. 服务器返回数据，show{[12,5,8]}
   3. 本地  方法的定义 function show(data){console.log(data)}

   JSONP只能get方式

2. CROS

   1. 必须需要服务器端配合，否则没戏
   2. access-allow