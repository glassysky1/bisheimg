## 1.javascript的typeof返回哪些数据类型

```javascript
typeof isNaN//function
typeof isNaN(1)//boolean

object object
number number
fuction fuction
boolean boolean
undefined undefined
string string

//检测数组的几种方式
Array.isArray()//es5
toString.call([])// [object Array]
toString.call(/[0-9]/)//"[object RegExp]"
var arr=[]
arr.constructor//Array//不稳定，构造器容易改变
[] instanceof Array//空数组是Array构造函数的一个实例，早起IE会出问题
```

## 2.传统事件绑定和符合W3C标准的事件绑定有什么区别？

### 传统

```html
<div onclick=""></div>
div1.onclick=function(){}
<button onmouseover=" "></button
```

1. 如果说给同一个元素绑定了两次或者多次相同类型的事件，那么后面的绑定会覆盖前面的绑定
2. 不支持**DOM事件流** 事件捕获阶段=>目标元素阶段=>事件冒泡阶段

### 符合W3C标准的事件绑定的方式

addEventListener/attachEvent

- 非IE浏览器

  addEventListener

  1. 如果说给同一个元素绑定了两次或者多次相同类型的事件，所以的绑定将会一次触发

  2. 支持DOM事件流

  3. 进行事件绑定传参不需要on前缀

     addEventListener("click",function(){},true)//此时的事件就是在事件捕获阶段执行

- IE浏览器

  ie9开始，ie11 edge：addEventListener

  ie9之前 attachEvent/detachEvent

  1. 进行事件类型传参需要带上on前缀
  2. 这种方式只支持时间冒泡，不支事件捕获

## 3.IE和标准下有哪些兼容性的写法

ev=ev || window.event->获取触发事件的对象

## 4.call和apply的区别

```javascript
call和apply相同点：
都是为了用一个不属于一个对象的方法，让这个对象去执行
toString.call([],1,2,3)
toString.apply([],1,2,3)
Object.call(this.obj1,obj2,obj3)
Object.apply(this.arguments)
```

区别：call第二个参数开始接受一个参数列表，apply第二个参数开始接受一个参数数组

```javascript
  var obj1 = {
      say:function(){
        alert('hello')
      }
    }
    var obj2={
      haveLunch:function(a,b){
        alert('吃法')
        console.log(this,a,b)
        
      }
    }
    //为了让obj1执行havelunch方法
    obj2.haveLunch.call(obj1,'dd','xx')
  
```

## 5.javascript如何实现继承？

### 原型链继承

```javascript
  function Animal() {
   this.age = 20 
  }
  function Cat() {
    this.name = 'jacy'
  }
  Cat.prototype=new Animal()//这一步让Cat的对象拥有Animal对象的属性，方法
  var cat = new Cat()
  console.log(cat.age)
```

### 借用构造函数继承

```javascript

   function Animal() {
     this.age =20
   }
   function Cat() {
     Animal.call(this)//这一步就让Cat的所有对象借用Animal对象的构造函数
     this.name = 'jacy'
   }
   var cat = new Cat()
   console.log(cat.age)
```

### 原型+构造函数组合继承



### 寄生式继承

```javascript
    //工厂模式创建对象
    function create(age, sex) {
      var obj = {}
      obj.age = age
      obj.sex = sex
      return obj
    }

    var person1 = create('王五', '女')

    function Japanese(name, language) {
      this.name = name
      this.language = language
    }
    //寄生模式
    function createChinse(name, language) {
      var obj = {}
      Japanese.call(obj, name, language)
      return obj
    }

    var jxc = createChinse('蒋晓聪','中文普通话')
    console.log(jxc.constructor)//object
    
```

## 6.Javascript创建对象的几种方式 

1. 对象字面量、Object构造函数(是一样的)

   ```javascript
   var obj = {}
   var obj2=new Object()
   ```

2. 构造函数

3. 纯构造函数

4. 空构造函数+原型

5. 混合构造函数+原型

6. 动态原型

   ```javascript
       //动态原型
       function Person(name,work) {
         this.name=name
         if(work){
           Person.prototype.working=function(){
             console.log('我的工作是:'+work)
             
           }
         }
       }
   ```

   

7. 寄生构造函数

8. Object.create()---ES5 

   ```javascript
       //动态原型
       function Person(name,work) {
         this.name=name
         if(work){
           Person.prototype.working=function(){
             console.log('我的工作是:'+work)
             
           }
         }
       }
   
   var p1 =new Person("李楠")
   //拷贝了p1的所有属性(属性值)、方法
   var p3=Object.create(p1)
   //类似于
       function extend(obj) {
         var result={}
         for(var prop in obj){
           result[prop] = obj[prop]
         }
         result.construtor=obj.construtor
         return result
       }
   ```

## 7.javaScript this指针、闭包、作用域

this:指向调用上下文

闭包：内层作用域可以访问外层作用域的变量

```javascript
    function doSth() {
      var len = 10
      //step1这个函数称之为闭包函数
      //使用这个闭包函数的意义
      //1.让step1这个函数只能在doSth里面调用，而且又封装了细节
      //如果说把step1这个函数放在全局作用域中，而且又永远不可能被其他函数调用
      //那样做是没有意义的，而且污染了全局作用域，占用了内存
      function step1() {
        console.log(len)

      }
    }
    //闭包的函数另外的意义：可以用来实现模块化
    var common = (function () {
      var name = '通用模块'
      //这是一个初始化页面的方法
      function initPage() {
        console.log(name)
      }
      return {
        initPage2: initPage
      }
    })()
    common.initPage2()

    //一个页面由很多li标签，为了实现点击其中一个li标签打印它是第几个
    var lis = document.querySelectorAll('li')
    for (var i = 0;i < lis.length;i++) {
      var li = list[i]
      //利用闭包函数实现了我们点击某个li标签的时候弹出它的'真实'索引
      li.onclick = (function (i) {
        return function () {
          console.log(i)
          
        }
      })(i)
    }
```

作用域：定义一个函数就开辟了一个局部作用域，整个js执行环境有一个全局作用域

## 8.如歌阻止事件冒泡和默认事件

### 防止冒泡

1. e.stopPropagation()//标准浏览器
2. event.cancelBubble=true;//ie9之前

### 阻止默认事件

为了不让a点击之后跳转，我们就要给他的点击事件进行阻止

1. return false
2. e.preventDefault()

## 9.javascript的同源策略

一段脚本只能读取来自同一来源的窗口和文档的属性，这里的同一来源指的是主机名、协议和端口号的组合

协议:http,ftp

主机名:localhost

端口名:80

http协议的默认端口:80

https协议的默认端口:8083

同源策略带来的麻烦：ajax在不同域名下的请求无法实现

如果说想要请求其他来源的js文件，或者json数据，那么可以通过jsonp来解决

## 10.编写一个数组去重的方法

### 方法1

1. 先创建一个空数组，用来保存最终的结果
2. 循环原数组中的每个元素
3. 再对每个元素进行二次循环，判断是否有与之相同的元素，如果没有，将把这个元素放在新数组中
4. 返回这个新数组

### 方法2

数组的indexOf()方法返回给定元素能找到数组中找到 第一个索引值，否则返回-1

```javascript
  Array.prototype.unique2 = function () {
      var n = []
      for (var i = 0;i < this.length;i++) {
        if (n.indexOf(this[i]) == -1) {
          n.push(this[i])
        }
      }
      return n
    }

    var a = [1,23,4,4,3,2,2]
   var b = a.unique2()
   console.log(b)1
```

## 11.javacript是一门什么样的语言，它又哪些特点？

没有标准答案。

运行环境：浏览器中的JS引擎

运行在nodejs：v8引擎上

语言特性：面向对象(创建对象的多种方式，继承的多种方式、原型链)、动态语言

## 12.如何检测数组的数据类型

1. 判断其是否具有"数组性质"，如slice()方法。可自己给变量定义slice方法,故有时会失效

   ```javascript
   p2.slice = Array.prototyp.slice
   ```

   

2. obj instanceof Array 在某些IE版本中不正确

3. toString.call([])//'[object Array]'

4. 1,2皆有漏洞，在ECMA Script中定义了新方法Array.isArray(),保证其兼容性，最好的方法如下

   ```javascript
   if(typeof Array.isArray ==='undefined'){
       Array.isArray = function(arg){
           return Object.protype.toString.call(arg) ==="[object Array]"
       }
   }
   ```

12.希望获取到页面所有的checkbox怎么做

```javascript
var domList =docment.getElementByTagName('input')
var checkBoxList = []//返回的所有的checkbox
var len = domList.length;//缓存到局部变量
while(len--){
    if(domList[len].type=='checkbox'){
        checkBoxList.push(domList[len])
    }
}
```

## 13.javascript的事件流模型都有什么？

"事件冒泡":事件开始由最具体的元素接收，然后逐级向上传播

"事件捕捉":事件由最不具体的节点先接收，然后逐级向下，一直到最具体的

"DOM事件流":三个阶段：事件捕捉，目标阶段，事件冒泡

## 14.看下列代码输出为何？解释原因

```javascript
var a
alert(typeof a)//undefined
//alert(b)//报错
b = 10
alert(typeof b)//'number'

```

undefined会在一下三种情况下产生

- 一个变量定义了却没有赋值

- 想要获取一个对象上不存在的属性或者方法

- 一个数组中没有被赋值的元素

  ```javascript
  var arr =[1,2,3]
  arr.length=5
  arr[5]
  ```

  

## 15.看代码给答案

```javascript
var a = new Object()
a.value = 1
b = a
b.value = 2
alert(a.value)//2
```

## 16.输出今天的日期，以YYYY-MM-DD的方式

```javascript
var d = new Date()
var year = d.getFullYear()
var month = d.getMonth()+1
//变成两位
month = month <10?'0' + month:month
var day = d.getDate()
day = day <10 ? '0' +day:day
alert(year +'-'+ month +'-'+day)
```

## 18.正则题目

```javascript
 var str =  '<tr><td>{$id}</td><td>{$id}_{$name}</td></tr>'
 //i是不区分大小写,replace是浅拷贝
 str= str.replace(/{\$id}/gi,10).replace(/{\$name}/g,'Tony')

```

## 19.foo = foo||bar

这种写法称之为**短路表达式**

```css
答案：if(!foo) foo = bar//如果foo存在，值不变，否则把bar的赋值给foo

短路表达式：作为“&&” 和“||” 操作符的操作数表达式，这些表达式在进行求值时，只要最终的结果已经可以确定是真或假，求值过程便告终止，这称之为短路求值

注意if条件的真假判定,记住以下是false的情况

空字符串、false、undefined、null、0
```

## 20.如何让a中代码输出123

```javascript
for(var i =1;1<=3;i++){
    setTimeout((function(a){
        console.log(a)
    })(i),0)
}
```