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

## 21.切割字符串

```javascript
    var url = 'http://item.taobao.com/item.htm?a=1&b=2&c=xxx'
    var str = url.substr(url.indexOf('?')+1)
    var arr = str.split('&')
    var obj = {}

    for(var i =0;i<arr.length;i++){
      var arri = arr[i]
      var i2 = arri.split('=')
      obj[i2[0]] = i2[1]
    }
    console.log(obj)
```

## 22.JavaScript中cellee和celler的作用？

arguments.callee获得当前函数的引用

caller是返回一个对函数的引用，该函数调用了当前函数,如果不是其他函数调用，那么返回值是null。

cellee是返回正在被执行的function函数，也就是所指定的function对象的正文。

那么问题来了？如果一对兔子每月生一对兔子，第n个月繁殖成多少对兔子？(使用callee完成)

```javascript
    function fn() {
      console.log(arguments.callee == fn)//true
      console.log(fn.caller)//指向fn2，自己单独调用时是null

    }
    function fn2() {
      fn()
    }
    fn2()
```

## 23.一下两个变量a和b，a+b的哪个结果是NaN?（C）

```javascript
var a = undefind b = NaN //拼写错误
var a = '123' b=NaN //字符串
var a = undefined b = NaN
var a = NaN b = 'undefined' //字符串
```

## 24.var a =10;b=20;c=4;  ++b+c+a++ 以下哪个结果是正确的？答案(b)

```javascript
A、34 B、35 C、36 D、37

typeof运算符返回值中有一个跟javascript数据类型不一致，它是'function'


    var arr = new Array(1, 3, 5)
    arr[4] = 'z'
    arr2 = arr.reverse() // arr2=['z',undefined,5,3,1]
                        //arr = ['z',undefined,5,3,1]
    arr3=arr.concat(arr2)
    console.log(arr3)
    //考点:reverse方法颠倒数组中元素的位置，并返回该数组的引用

```

## 25.函数创建的几种方式

```javascript
    //第一种(函数声明)
    function sum1(num1,num2) {
      return num1 + num2
    }
    //第二种(函数表达式)
    var sum2 = function (num1,num2) {
      return num1 + num2
    }
    //第三种 (函数对象方式)了解
    var sum3 = new Function('num1','num2',"return num1 + num2")

```

## 26.document.write和innerHTML的区别?

document.write 只能重绘整个页面

innerHTML 可以重绘页面的一部分

## 27.解释jsonp的原理

动态创建script标签，给请求的地址中添加一个get参数，这个参数代表回调参数

## 28.javascript的本地对象，内置对象和宿主对象

本地对象为Array RegExp String Boolean等可以new实例化

内置对象为 global Math 等不可以实例化

关于global对象我们无法再浏览器中发现她的存在，因为他的属性和方法被绑定在了window对象中

每个宿主对象他的实现都是取决于不同的浏览器的，这样就产生了浏览器兼容性问题

宿主为浏览器自带的document.window等

## 29.字符串反转，如将'12345678'变成'87654321'

```javascript
var str = '12345678'
str = str.split('').reverse().join('')
```

## 30.window.location.reload()作用

刷新当前页面

## 31.看题作答

```javascript
    function f1() {
      var tmp = 1
      this.x = 3
      console.log(tmp)
      console.log(this.x)
    }
    var obj = new f1() //1 3
    console.log(obj.x)//3
    console.log(f1()) //1 3 undefined
    
	//新的一提
	var o1 = new Object()
    var o2 = o1
    o2.name = 'CSSer'
	console.log(o1.name)//'CSSer'


	//新的一题
	 function changeObjectProperty(o) {
         //var o = o
      o.siteUrl = 'http://www.csser.com/'
      o = new Object()
      o.siteUrl = 'http://www.popcg.com'
    }
    var CSSer = new Object()
    changeObjectProperty(CSSer)
    console.log(CSSer.siteUrl)//csser



    var a = 6
    setTimeout(function () {
      var a = 666 //由于变量a是一个局部变量
      console.log(a)
      //输出666
    });
    a = 66
    console.log(a)//66
    /* 
    先打印全局变量a的值：66，再执行setTimeout里面的局部变量
    因为var a = 666定义了局部变量a，并赋值为666，根据变量作用域链，
    全局变量处在作用域末端，优先访问了局部变量，从而覆盖了全局变量
     */


    window.color = 'red'
    var o = {color:'blue'}
    function sayColor() {
      console.log(this.color)
    }
    sayColor()//red
    sayColor.call(this)//red this指向的是window对象
    sayColor.call(window)//red
    sayColor.call(o)//blue


    function foo() {
      foo.a = function () {console.log(1)}
      this.a = function () {console.log(2)}//obj.a()
      a = function () {console.log(3)}
      var a = function () {console.log(4)}
    }
    foo.prototype.a = function () {console.log(5)}
    foo.a = function () { console.log(6) }
    foo.a()//6
    var obj = new foo()
    obj.a()//2 先查找构造函数，在找原型对象里的
    foo.a()//1



   var a = 5
    function test() {
      a = 0
      console.log(a)
      console.log(this.a)//this指向window
      var a //现在当前作用域作变量提升
      console.log(a)
    }
    test()//0 5 0
    new test()// 0,undefined,0//由于类它自身没有属性a，所以是undefined


  	var bool = !!2 
    console.log(bool)//true


   // 匹配输入字符串：第一个必须是字母或下划线开头，后面就是字母或者数字或下划线构成，长度5-20
    var reg = /^[a-zA-Z][a-zA-Z0-9_]{4,19}/

    
```

## 32.BOM对象有哪些，列举window对象

1. window对象，是JS的最顶层对象，其他的BOM对象都是window对象的属性
2. document对象，文档对象
3. location对象，浏览器当前URL信息
4. navigator对象，浏览器本身信息
5. screen对象，客户端屏幕信息
6. history对象，浏览器访问历史信息

## 33.简单继承

```javascript
    //call方法
      function Parent(name,money) {
        this.name = name
        this.money = money
        this.info=function () {
          console.log('香茗'+this.name+'钱：'+this.money)
        }
      }

      //定义孩子类
      function Children(name) {
        Parent.call(this,name)//继承 姓名属性 ，不要钱
        this.info = function () {
          console.log('姓名'+this.name)
        }
```

## 34.link和import区别

区别1：link是XHML标签，除了加载CSS外，还可以定义RSS等其他事务；@import输入CSS范畴，只能加载CSS

区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载

区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持

区别4：link支持使用Javascipt控制DOM去改变样式；而@import不支持

## 35.看下列代码输出什么？

```
     var foo = '11'+2-'1'
      console.log(foo)
      console.log(typeof foo)//number

```

## 36.如何优化自己的代码？

- 代码重用：声明函数把整个过程封装起来
- 避免全局变量(命名空间，封闭空间，模块化mvc)
- 拆分函数避免函数过于臃肿：单一职责原则
- 适当的注释，尤其是一些复杂的逻辑或者是计算逻辑，都应该写出这个业务逻辑的具体过程
- 内存管理，尤其是闭包中的变量释放

## 37.请简要描述web前端性能需要考虑哪方面

1. 减少http请求
2. 小图弄成大图(雪碧图、精灵图)
3. 合理的设置缓存
4. 资源合并、压缩
5. 将外部的js文件置低

## 38.简述readonly与disabled区别

readonly只针对input(text/password)和textarea有效

而disabled对于所有的表单元素都有效，当表单元素在使用了disable后，当我们将表单以POST和GET的方式提交的话，这个元素的值不会被传递出去，而readonly会将该值传递出去

## 39.进可能详尽的解释ajax的原理



Ajax的原理简单说通过XMLHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用JavaScript来操作DOM而更新界面。这其中最关键的一步就是从服务器获得请求数据。要清楚这个过程的原理，我们必须对XMLHttpRequest有所了解。

​	XMLHttpRequest是ajax的核心机制，它是在IE5中首先引入的，是一种支持异步请求的技术。简单的说，也就是JavaScript可以及时向服务器提出请求和处理响应，而不阻塞用户，达到无刷新的效果

## 40.为什么扩展JavaScript内置对象不是好的做法？

因为扩展内置对象会影响整个程序中所使用的该内置对象的原型属性

Math.prototype.fff

