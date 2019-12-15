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

