# vue源码分析

## 说明

+ 分析vue作为一个MVVM框架的基本实现原理
  + 数据代理
  + 模板解析
  + 数据绑定
+ 不直接看vue.js的源码
+ 剖析github上某基友仿vue实现的mvvm库
+ 地址：https://github.com/DMQ/mvvm

## 准备工作

````html
Array.prototype.slice.call(lis)：将伪数组转换为真数组
const list = document.getElementByTagName('li)//lis是伪数组

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>

<div id="test">尚硅谷IT教育</div>

<ul id="fragment_test">
  <li>test1</li>
  <li>test2</li>
  <li>test3</li>
</ul>


<!--
1. [].slice.call(lis): 将伪数组转换为真数组
2. node.nodeType: 得到节点类型
3. Object.defineProperty(obj, propertyName, {}): 给对象添加属性(指定描述符)
4. Object.keys(obj): 得到对象自身可枚举属性组成的数组
5. obj.hasOwnProperty(prop): 判断prop是否是obj自身的属性
6. DocumentFragment: 文档碎片(高效批量更新多个节点)
-->

<script type="text/javascript">
  //1. [].slice.call(lis): 根据伪数组生成对应的真数组
  const lis = document.getElementsByTagName('li') // lis是伪数组(是一个特别的对象, length和数值下标属性)
  console.log(lis instanceof Object, lis instanceof Array)//true false
  // 数组的slice()截取数组中指定部分的元素, 生成一个新的数组  [1, 3, 5, 7, 9], slice(0, 3)
  // slice2()
  Array.prototype.slice2 = function (start, end) {
    start = start || 0
    end = start || this.length
    const arr = []
    for (var i = start; i < end; i++) {
      arr.push(this[i])
    }
    return arr
  }
  const lis2 = Array.prototype.slice.call(lis)  // lis.slice()
  console.log(lis2 instanceof Object, lis2 instanceof Array)//true true
  // lis2.forEach()

  //2. node.nodeType: 得到节点类型
  const elementNode = document.getElementById('test')
  const attrNode = elementNode.getAttributeNode('id')
  const textNode = elementNode.firstChild
  //1  2  3
  console.log(elementNode.nodeType, attrNode.nodeType, textNode.nodeType)

  //3. Object.defineProperty(obj, propertyName, {}): 给对象添加属性(指定描述符)
  const obj = {
    firstName: 'A',
    lastName: 'B'
  }
  //obj.fullName = 'A-B'
  Object.defineProperty(obj, 'fullName', {
    // 属性描述符:

    // 数据描述符

    //访问描述符
    // 当读取对象此属性值时自动调用, 将函数返回的值作为属性值, this为obj
    get () {
      return this.firstName + "-" + this.lastName
    },
    // 当修改了对象的当前属性值时自动调用, 监视当前属性值的变化, 修改相关的属性, this为obj
    set (value) {
      const names = value.split('-')
      this.firstName = names[0]
      this.lastName = names[1]
    }
  })

  console.log(obj.fullName) // A-B
  obj.fullName = 'C-D'
  console.log(obj.firstName, obj.lastName) // C D

  Object.defineProperty(obj, 'fullName2', {
    configurable: false, //是否可以重新define
    enumerable: true, // 是否可以枚举(for..in / keys())
    value: 'A-B', // 指定初始值
    writable: false // value是否可以修改
  })
  console.log(obj.fullName2)  // A-B
  obj.fullName2 = 'E-F'
  console.log(obj.fullName2) // A-B

  /*Object.defineProperty(obj, 'fullName2', {
    configurable: true,
    enumerable: true,
    value: 'G-H',
    writable: true
  })*/


  //4. Object.keys(obj): 得到对象自身可枚举属性组成的数组
  const names = Object.keys(obj)
  console.log(names)
  // Array(3)0: "firstName"1: "lastName"2: "fullName2"length: 3__proto__: Array(0)



  //5. obj.hasOwnProperty(prop): 判断prop是否是obj自身的属性
  console.log(obj.hasOwnProperty('fullName'), obj.hasOwnProperty('toString'))  // true false
  //true false

  //6. DocumentFragment: 文档碎片(高效批量更新多个节点)
  // document: 对应显示的页面, 包含n个elment  一旦更新document内部的某个元素界面更新
  // documentFragment: 内存中保存n个element的容器对象(不与界面关联), 如果更新framgnet中的某个element, 界面不变
  /*
  <ul id="fragment_test">
    <li>test1</li>
    <li>test2</li>
    <li>test3</li>
  </ul>
   */
  const ul = document.getElementById('fragment_test')
  // 1. 创建fragment
  const fragment = document.createDocumentFragment()
  // 2. 取出ul中所有子节点取出保存到fragment
  let child
  while(child=ul.firstChild) { // 一个节点只能有一个父亲
    fragment.appendChild(child)  // 先将child从ul中移除, 添加为fragment子节点
  }

  // 3. 更新fragment中所有li的文本
  Array.prototype.slice.call(fragment.childNodes).forEach(node => {
    if (node.nodeType===1) { // 元素节点 <li>
      node.textContent = 'atguigu'
    }
  })

  // 4. 将fragment插入ul
  ul.appendChild(fragment)

</script>
</body>
</html>

````

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>

<div id="test">尚硅谷IT教育</div>

<div id="app">
  <ul>
    <li>test1</li>
    <li>test2</li>
    <li>test3</li>
    <li>test3</li>
    <li>test3</li>
    <li>test3</li>
    <li>test3</li>
    <li>test3</li>
    <li>test3</li>
    <li>test3</li>
    <li>test3</li>
    <li>test3</li>
    <li>test3</li>
  </ul>
</div>



<script type="text/javascript">

  //6. DocumentFragment: 文档碎片(高效批量更新多个节点)
  // document: 对应显示的页面, 包含n个elment  一旦更新document内部的某个元素界面更新
  // documentFragment: 内存中保存n个element的容器对象(不与界面关联), 如果更新framgnet中的某个element, 界面不变
  /*
  <div id="app">
    <ul>
      <li>test1</li>
      <li>test2</li>
      <li>test3</li>
      <li>test3</li>
      <li>test3</li>
      <li>test3</li>
      <li>test3</li>
      <li>test3</li>
    </ul>
  </div>
   */
  const div = document.getElementById('app')
  // 1. 创建fragment
  const fragment = document.createDocumentFragment()
  // 2. 取出ul中所有子节点取出保存到fragment
  let child
  while(child=div.firstChild) { // 一个节点只能有一个父亲
    fragment.appendChild(child)  // 先将child从ul中移除, 添加为fragment子节点
  }

  // 3. 更新fragment中所有li的文本
  Array.prototype.slice.call(fragment.childNodes).forEach(node => {
    if (node.nodeType===1) { // 元素节点 <ul>
      Array.from(node.children).forEach(li => li.textContent = 'atguigu')
    }
  })

  // 4. 将fragment插入ul
  div.appendChild(fragment)

</script>
</body>
</html>
```

## 数据代理

+ 数据代理：通过一个对象来代理对另一个对象中属性的读写(读/写)
  + 大意:有对象a，b，通过a改变a达到改变b的效果，a代理b，b是a 的子集
+ vue数据代理:通过vm对象来代理 data对象中所有的属性的操作
+ 好处:更方便的操作data中的数据
+ 基本的实现流程
  + 通过Object.defineProperty()给vm添加与 data对象的属性对应的属性描述符
  + 所有添加的属性都包含getter/setter
  + getter/setter内部去操作data中对应的属性数据

## 模板解析

