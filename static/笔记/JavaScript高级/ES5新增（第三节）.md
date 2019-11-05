## ES5新增方法
### 数组方法
迭代(遍历)方法：      forEach()、map()、filter()、some()、every()；

#### forEach()
    array.forEach(function(value, index, array))
    1. value每一个数组元素
    2. index每一个数组元素的索引号
    3. array数组本身
```
    var arr = [1, 2, 3]
    arr.forEach(function (value, index, array) {
        console.log('每个数组元素' + value);
        console.log('每个数组元素的索引号' + index);
        console.log('数组本身' + array);
    })
```

#### filter() 
    array.filter(function(value, index, array))
    1. value每一个数组元素
    2. index每一个数组元素的索引号
    3. array数组本身

- filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素，主要用于==筛选数组==。
- **注意它直接返回一个==新==数组**

```
    var arr = [12, 66, 4, 88, 3, 7];
    //newAArr接收返回的数组
    var newArr = arr.filter(function (value, index) {
        // return value >= 20;
        return value % 2 === 0;
    });
    console.log(newArr);
```

#### some()
    array.some(function(value, index, array))
    1. value每一个数组元素
    2. index每一个数组元素的索引号
    3. array数组本身

1. some() 方法用于检测数组中的元素是否满足指定条件。即查找数组中是否有满足条件的元素。
2. 注意它==返回值是布尔值==， 如果查找到这个元素， 就返回true，  如果查找不到就返回false。
3. 如果找到第一个满足条件的元素，则终止循环，不在继续查找。


    1. filter()查找到满足条件的元素后，返回的是一个数组， 
    而且是把所有满足条件的元素返回回来。
    2. some()查找满足条件的元素是否存在，返回的是一个布尔
    值，查找到第一个满足条件的元素就终止循环。



#### some()和forEach的区别

1. 在forEach() 和filter() 里面 return 不会终止迭代。
2. 在some()里面遇到 return true 就是终止遍历，迭代效率更高。

```
    var arr = ['red', 'green', 'blue', 'pink'];
    // 1. forEach迭代 遍历
    arr.forEach(function(value) {
        if (value == 'green') {
            console.log('找到了该元素');
    //         return true; // 在forEach 里面 return 不会终止迭代
        }
        console.log(11);

    })
```
```
    // 如果查询数组中唯一的元素, 用some方法更合适,
    arr.some(function (value) {
        if (value == 'green') {
            console.log('找到了该元素');
            return true; //  在some 里面 遇到 return true 
            //就是终止遍历 迭代效率更高
        }
        console.log(11);

    });
```
```
    arr.filter(function (value) {
        if (value == 'green') {
            console.log('找到了该元素');
            return true; // filter 里面 return 不会终止迭代
        }
        console.log(11);

    });
```
### 字符串方法
#### trim()
- trim() 方法会从一个字符串的两端删除空白字符。       
- trim() 方法并不影响原字符串本身，它返回的是一个新的字符串。
- 解决表单提交用户输入空格的问题。

### 对象方法
#### Object.keys() 
用于获取对象自身所有的属性

    Object.keys(对象参数名)

- 效果类似 for…in
- 返回一个由==属性名==组成的==数组==

### Object.defineProperty() 
定义对象中新属性或修改原有的属性。(了解)

    Object.defineProperty(obj, prop, descriptor)

- obj：必需。目标对象 。
- prop：必需。需要定义或修改的属性的名字。
- descriptor：必需。目标属性所拥有的特性。




####  第三个参数 descriptor 说明： 
**以对象形式 { } 书写**
- value: 设置属性的值。默认为undefined；
- writable: 值是否可以重写。true | false  ，默认为false；
- enumerable: 目标属性是否可以被枚举（能不能被遍历）。true | false  ，默认为 false；
- configurable: 目标属性是否可以被删除或是否可以再次修改特性， true | false  ，默认为false。

```
 // Object.defineProperty() 定义新属性或修改原有的属性
    var obj = {
        id: 1,
        pname: '小米',
        price: 1999
    };
    Object.defineProperty(obj, 'num', {
        value: 1000,
        enumerable: true
    });
    console.log(obj);
    Object.defineProperty(obj, 'price', {
        value: 9.9
    });
    console.log(obj);
    Object.defineProperty(obj, 'id', {
        // 如果值为false 不允许修改这个属性值 默认值也是false
        writable: false,
    });
    obj.id = 2;
    console.log(obj);
    Object.defineProperty(obj, 'address', {
        value: '中国山东蓝翔技校xx单元',
        writable: false,
        // enumerable 如果值为false 则不允许遍历, 默认的值是 false
        enumerable: false,
        // configurable 如果为false 则不允许删除这个属性 
        //不允许再修改第三个参数里面的特性 默认为false
        configurable: false
    });
    console.log(obj);
    console.log(Object.keys(obj));
    delete obj.address;
    console.log(obj);
    delete obj.pname;
    console.log(obj);
    Object.defineProperty(obj, 'address', {
        value: '中国山东蓝翔技校xx单元',
        // 如果值为false 不允许修改这个属性值 默认值也是false
        writable: true,
        // enumerable 如果值为false 则不允许遍历, 默认的值是 false
        enumerable: true,
        // configurable 如果为false 则不允许删除以及这个属性 
        不允许再修改第三个参数里面的特性默认为false
        configurable: true
    });
    console.log(obj.address);//不允许再修改第三个参数里面的特性
```
