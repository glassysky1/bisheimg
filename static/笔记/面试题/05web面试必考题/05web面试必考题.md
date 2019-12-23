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

## 41.HTTP协议中，GET和POST有什么区别？分别适用于什么场景？

get传送的数据长度有限制，post没有

get通过url传递，在浏览器地址栏可见，post在报文中传递



通用场景：

post一般用于表单提交

get一般用于简单的数据查询，严格要求不是那么高的场景

## 42.HTTP状态消息200、302、304、403、404、500分别表示什么？

200：请求已成功，请求所希望的响应头或数据体将随此响应返回。

302：请求的资源临时从不同的URL响应请求。由于这样的重定向是临时的，客户端应当继续向地址发送以后的请求。只有在Cache-Control或Expires中进行了指定的情况下，这个响应才可缓存。

304：如果客户端发送了一个带条件的GET请求且该请求已被允许，而文档的内容(自上次访问以来或者根据请求的条件)并没有改变，则服务器应当返回这个状态码。304响应禁止包含消息体，因此始终以消息头后的第一个空行结尾。

403：服务器已经理解请求，但是拒绝执行它

404：请求失败，请求所希望得到的资源未被服务器上发现

500：服务器遇到一个未曾预料的状况，导致了它无法完成请求的处理。一般来说，这个问题都会在服务器端的源代码出现错误时的出现

## 43.HTTP协议中，header信息里面，怎么控制页面失效时间(last-modified,cahe-control,Expires分别代表什么)

| Last-Modified | 文档的最后改动时间。客户可以通过If-Modifed-Since请求头提供一个日期，该请求将视为一个条件GET，只有改动时间迟于指定时间的文档 才会返回，否则返回一个304(Not Modified)状态。Lat-Modified方法来设置 |
| ------------- | ------------------------------------------------------------ |
| Expires       | 应该在什么时候认为文档已经过期，从而不再缓存它？             |

## 44.请列举js数组类型中的常用方法

| 方法            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| concat()        | 连接两个或更多的数组，并返回结果                             |
| join()          | 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分割 |
| pop()           | 删除并返回数组的最后一个元素                                 |
| push()          | 向数组的末尾添加一个或更多元素，并返回新的长度               |
| reverse()       | 颠倒数组中元素的顺序                                         |
| shift()         | 删除并返回数组的第一个元素                                   |
| slice()         | 从某个已有的数组返回特定的元素                               |
| sort()          | 对数组的元素进行排序                                         |
| splice()        | 删除元素，并向数组添加新元素                                 |
| toSource()      | 返回该对象的源码                                             |
| toString()      | 把数组的开头添加一个或更多元素，并返回新的长度               |
| toLocalString() | 把数组转换为本地数组，并返回结果                             |
| unshift()       | 想数组的开头添加一个或更多元素，并返回新的长度               |
| valueOf()       | 返回素组对象的原始值                                         |
## 45.如何获取对象a拥有的所有属性(可枚举的、不可枚举的、不包括继承来的属性)

```javascript
Object.keys ---IE9+ES5
//或者
for(o in obj){
    if(obj.hasOwnproperty(o)){//判断o不是继承来的属性
        //把o这个属性放入一个数组中
    }
}
```

## 46.选择题（D)

```javascript
A:Http状态码302表示暂时性转移 //对
B.domContentLoaded事件早于onload事件//正确
	当onload事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了
    当DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表图片，flash
    
C:IE678不支持事件捕获
```

## 47.js组成部分

ecmascritpt:对js语法发布的一个规范，规定了js语法支持哪些内容

​	es1-3

​	es5:严格模式、Object.create()、Object.defineProperty()、、、、

​	es6:2015年发布的规范版本



​	变量、数据类型、控制语句、函数等

bom：window、document、history

dom：对一些节点的操作

## 48.写一个post请求并带有发送数据和返回数据的样例

```javascript
$.ajax({
    url:'1.html',
    data:{name:'张三',age:18},//post数据
    dataType:'json',
    type:'POST',
    success:function(data){
    
	},
    error:function(){
    
}
})
```

## 49.在JavaScript中什么是伪数组？如何将伪数组转换为标准数组？

伪数组(类数组)：无法直接调用方法或期望length属性有什么特殊的行为，但仍可以对真正数组遍历方法来遍历它们，典型的函数的argument参数，还有像调用getElementsByTagName之类的，它们都返回NodeList对象都属于伪数组。

可以使用 Array.prototype.slice.call(fakeArray)将数组转换为真正的Array对象

## 50.正则区号3-4位，第一位是0，中横线，7-8位数字，中横线，3-4位分机号格式的固定号

```javascript
/0[0-9]{2,3}-\d{7-8}/
```

## 51.下面的代码会有什么样的输出

```javascript
      var User = {
        count :1,
        getCount:function () {
          return this.count
        }
      }
      console.log(User.getCount())//1
      var func = User.getCount
      console.log(func())//undefined,指向window



   
      (function test() {
      //b是一个隐式的全局变量
      var a = b = 5
      console.log(typeof a)
      console.log(typeof b)
    })()
    console.log(typeof a)
    console.log(typeof b)
    //number number undefined number






    var a
    console.log(a)///undefined
    var b = a * 0
    console.log(b)//NaN
    if (b == b) {
      console.log(b * 2 + '2' - 0 + 4)
    } else {
      console.log(!b * 2 + '2' - 0 + 4)//26
    }
    console.log(true*2-0)//2

    /* 
      考点：乘号运算符的运算规则
      1.如果其中一个数时NaN，则结果就是NaN
      2.如果乘积超过了ECMAScript设定的范围，那么就会返回Infinty、-Infinity
      3.如果参与乘法运算的某个操作数不是数值，js引擎会先调用Number()将这个数变成一个数值类型
        比如：空字符串就会变成0 布尔值true就会变成1，空数组[]也会变成0，undefined转换结果则变成NaN
     */



   var t = 10
    function test(test) {
      t = t + test //undefined +10 =NaN
      console.log(t)
      var t = 3
    }
    test(t)
    console.log(t)//NaN 10




    var a 
    var b = a/0
    if(b==b){//b=infinity
      console.log(b*2+'2'+4)
    }else{
      console.log(!b*2 + '2'+4)
    }
    //infinity24
```

## 52.下列JavaScript代码执行后，运行结果是

```html
  <button id="btn">点击我</button>
  <script>
  var btn = document.getElementById('btn')
  var handle ={
    id:'eventHandle',
    exec:function(){
      console.log(this.id)
    }
  }
  btn.addEventListener('click',handle.exec)//btn
  </script>
```

## 53.下列JavaScript代码执行后，一次打印的结果是

```javascript
  var obj = {
      proto: {
        a: 1,
        b: 2
      }
    }
    function F(){}
    F.prototype = obj.proto
    var f= new F()
    obj.proto.c=3
    obj.proto = {a:-1,b:-2}//直接改引用(地址)了，但是F.prototype引用(地址)没变
    console.log(f.a)//1
    console.log(f.c)//3
    delete F.prototype['a']
    console.log(f.a)//undefined
    console.log(obj.proto.a)//-1
    
```

## 54.给字符串扩展一个兼容所有浏览器的清除前后的空格的方法

```javascript
    if (!String.prototype.trim) {
      String.prototype.trim = function () {
        return this.replace(/^\s+/,'').replace(/\s+$/,'')
      }
    }
```

```javascript
    function setName() {
      name = '张三'
    }
    setName()
    console.log(name)//张三



    var b =2//全局变量，相当于b=2或者window.b=2
    function test2() {
      window.b =3
      console.log(b)
    }

    test2()//3




   c = 5//声明一个全局变量
    function test3() {
      window.c=3
      console.log(c)//答案：undefined，由于此时的c是一个局部变量c，并且没有被赋值
      var c 
      console.log(window.c)//答案：3原因：这里的c就是一个全局变量c
    }
    test3()




  var arr = []
  arr[0] = 'a'
  arr[1] = 'b'
  arr[10] = 'c'
  console.log(arr.length)//1
  console.log(arr[5])//undefined




   console.log(null==undefined)//true
   console.log('1'==1)//true,因为会将数字1先转换为字符串1
   console.log('1'===1) //false，因为数据类型不一致




    parseInt(3.14)//3
    parseFloat('3asdf')//3
    parseInt('1,23abdc456')
    parseInt(true) // 'true'=>NaN
	//对一个非数字或者一个非字符串进行数据类型转换的时候，会先把这个数据转换为一个字符串类型，然后再转换为数值类型
  




 //函数声明提前
  function bar() {
    return foo
    foo=10
    function foo(){}
  }
  console.log(typeof bar)//function




  var foo = 1
  function bar() {
    foo = 10
    return
    function foo(){}//相当于var foo = function(){},整个要变量提升
  }
  bar()
  console.log(foo)//答案：1




  console.log(a)//函数
  var a = 3
  function a(){}//相当于 var a = function(){},整个都提升到上面
  console.log(a)//3



  //对arguments的操作
  function foo(a) {
    arguments[0] = 2
    console.log(a)//答案：2，因为：a、arguments是度实参的访问 b、通过arguments[i]可以修改指定实参的值
  }
  foo(1)



  function foo(a) {
    console.log(arguments.length)//3,因为arguments是对实参的访问
  }
  foo(1,2,3)





// bar()//报错
  var foo = function bar(name) {
    console.log('hello'+name)
    console.log(bar)
  }
  foo('world')//'helloworld',函数
  // console.log(bar)//undefined
  console.log(foo.toString())//函数
  bar()//报错，报错就是不执行了

```

## 55.jQuery的slideUp动画，如果目标元素被外部事件驱动，当鼠标快速地连续触发外部元素事件，动画会滞后反复 执行，该如何处理呢？

先top(true,true)后slideUp()

## 56.Ajax是什么？如何创建一个Ajax

​	Ajax并不是一种新的技术，全称是 asynchronous JavaScript and xml，可以说是已有技术的组合，主要用来实现客户端与服务端的异步通信效果，实现页面的局部刷新，早期的浏览器并不能原生支持ajax，可以隐藏帧(iframe)方式变相实现异步效果，后来浏览器提供了对ajax的原生支持。

​	使用ajax原生方式发送请求主要通过XMLHttpRequest(标准浏览器)，ActiveXObject(IE浏览器)对象实现异步通信效果

基本步骤

```javascript
 var xhr = null//创建对象
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest()
  }else{
    xhr = new ActiveXObject('MicrosoftXMLHTTP')
  }
  xhr.open('方式','地址','标志位')//初始化请求
  xhr.setRequestHeader()//设置http头信息
  xhr.onreadystatechange = function () {//指定回调函数
  }
  xhr.send()//发送请求
```

## 57.同步和异步的区别？

同步：阻塞的

1. 张三叫李四去吃饭，李四一直忙着不停，张三一直等着，一直忙完两个人一块去吃饭
2. 浏览器向服务器请求数据，服务器比较忙，浏览器一直等着(页面白屏)，直到服务器返回数据，浏览器才能显示页面

异步：非阻塞的

1. 张三叫李四去吃饭，李四在忙，张三说了一声然后自己吃饭了，李四忙完后自己去吃饭
2. 浏览器向服务器请求数据，服务器比较忙，浏览器可以自如 干原来的事情(显示页面)，服务器返回数据的时候通知浏览器一声，浏览器把返回的数据渲染到页面，局部更新

## 58.GET和POST的区别，何时使用POST？

GET:一般用于信息获取，使用URL传递参数，对所发送信息的数量也有限制，一般在2000个字符，有的浏览器是8000个字符

POST：一般用于修改服务器的资源，对所发送的信息没有限制

​	在以下情况中，请使用POST请求：

1. ​	无法使用缓存文件(更新服务器上的文件或数据库)
2. 向服务器发送大量数据（POST没有数据量限制)
3. 发送包含未知字符的用户输入时，POST比GET更稳定也更可靠

## 59.ajax缺点

1.  ajax不支持浏览器back按钮
2. 安全问题，ajax暴露了服务器交互的细节
3. 对搜索引擎的支持比较弱
4. 破坏了程序的异常机制
5. 无法跨域请求

60.Http常见的状态码有哪些?分别代表是什么意思？

| 200 OK                    | 客户请求成功                                         |
| ------------------------- | ---------------------------------------------------- |
| 400 Bad Request           | 客户端请求有语法错误，不能被服务器所理解             |
| 403 Forbidden             | 服务器收到请求，但是拒绝提供服务                     |
| 404 Not Found             | 请求资源不存在，输入流错误的URL                      |
| 500 Internal Server Error | 服务器发生不可预期的错误                             |
| 503 Server Unavailable    | 服务器当期不能处理客户端的请求，一段时间可能恢复正常 |

## 60.new操作符具体干了什么？

1. 创建一个空对象，并且this变量引用该对象，同时还继承了该函数的原型
2. 属性和方法被加入到了this引用的对象中
3. 新创建的对象由this所引用，并且最后隐式的返回this