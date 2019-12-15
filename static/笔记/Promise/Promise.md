# 准备

## 区别实例对象与函数对象

+ 实例对象：new函数产生的对象，称为实例对象，简称对象
+ 函数对象:将函数作为对象使用时，简称函数对象

```javascript
    function Fn() {
      
    }
    const fn = new Fn() //Fn是构造函数，fn是实例对象(简称对象)
    //a.b.c()能看出来a.b.c是个函数
    //a()[0]()能看出来a是个函数，返回值是数组，数组第一个元素是函数
    //a()[0]()()看出来a()[0]()是函数

    console.log(Fn.prototype);// 从上看()的左边是函数，.的左边是对象，所以Fn是函数对象
    //当函数作为一个对象使用时，就称之为函数对象 
    Fn.bind({})//调用函数对象有bind方法,实例对象没有，bind改变的是this指向
    //bind定义在大写Fn的原型上
    Fn.call({})//调用方法/函数，Fn是函数对象

    $('#test')//$是jQuery函数
    $.get('/test')//调用JQuery函数对象的函数/方法
```

## 二种类型的回调函数

定义：三个条件必须满足

+ 首先是你定义
+ 回调函数我不会调用
+ 但最终会执行

### 同步回调

理解：立即执行，完全执行完了才结束，不会放入回调队列中

例子：数组遍历相关的回调函数/Promise的excutor函数

```javascript
     //1.同步回调函数
    const arr = [1, 3, 5]
    arr.forEach(item =>{//遍历回调，同步回调函数，只有把forEach里面执行完了，才能结束，才会打印下面的
      console.log(item);
    })
    console.log('forEach()之后');

```



### 异步回调

理解：不会立即执行，会放入回调队列中将来执行

例子：定时器回调/ajax回调/Promise的成功|失败的回调

```javascript
    //2.异步回调函数
    setTimeout(() => {//异步回调函数，会放入队列中将来执行，即使延迟是0
      console.log('timout callback()');//先执行下面的才会执行setTimeout
    }, 0);
    console.log('setTimeout()之后');
```

### 如何辨别

在函数下面打印输入，如果打印输出是在函数执行后，则是同步函数，反之是异步函数

## 常见的内置错误

如果报错，下面代码就不会执行

### ReferenceError(常见)

引用错误，引用了一个不存在的变量

```javascript
console.log(a)//ReferenceError: a is not defined
```

### TypeError(常见)

类型错误

```javascript
    let b = null
    console.log(b.xxx); //TypeError: Cannot read property 'xxx' of null
	
```

```javascript
    let b ={}
    console.log(b.xxx);//这个不会报错，会undefined
	//没有任何属性和方法/函数都是会报错
    console.log(b.xxx());//TypeError: b.xxx is not a function
```

### RangeError

数据值不在其所允许的范围内

```javascript
    //递归调用，死循环
    function fn() {
      fn()
    }
    fn()//RangeError: Maximum call stack size exceeded
```

### SytaxError

语法错误

```javascript
const c = """"//SyntaxError: Unexpected string,不期待的字符串
```

## 错误的处理

### 捕获错误:try...catch

用try..catch，出错地方后面都可以执行，因为被捕获处理了

```javascript
   try {
      let d
      console.log(d.xxx);
    } catch (error) {
      //Cannot read property 'xxx' of undefined
      console.log(error.message);//message出错信息
      //TypeError: Cannot read property 'xxx' of undefined
      //at index.html: 15
      console.log(error.stack);
    }

```

### 抛出错误:throw error

```javascript
    function something() {
      if(Date.now()%2 ===1){
        console.log('当前时间为奇数，可以执行任务');
        
      }else{//如果是偶数抛出异常，由调用者来处理
        throw new Error('当前时间为偶数无法执行任务')
      }
    }

    //铺货处理异常
    try{
      something()
    } catch(error){
      alert(error.message)
    }
```

### error对象的结构

1. message属性:错误相关信息
2. stack属性:函数调用栈记录信息

# Promise的理解和使用

## Promise是什么？

### 理解

#### 抽象表达

Promise是JS中进行异步编程的新的解决方案(旧的是谁?)

旧的是纯回调形式

#### 具体表达

+ 从语法上来说:Promise是一个构造函数(就是类，要创建实例的)
+ 从功能上来说:promise对象用来封装一个异步操作并可以获取其结果

### promise的状态改变

pending是未确定的

+ pending变为resolved
+ pending变为rejected

说明:只有这2中，且一个promise对象只能改变一次，无论变为成功还是失败，都会有一个结果数据，成的结果数据一般称为value,失败的结果数据一般称为reason

### promise基本流程

![](\iamges\基本流程.png)

### promise基本使用

```javascript
    //1.创建一个新的promise对象
    const p = new Promise((resolve, reject) => {//执行器函数 同步回调
      //2.执行异步操作任务
      setTimeout(() => {
        const time = Date.now()//如果当前时间是偶数就代表成功，否则是失败
        //3.1.如果成功了，调用resolve(vlaue)
        if (time % 2 === 0) {
          resolve('成功的数据，time=' + time)
        } else {
          //3.2.如果失败了，调用reject(reason)
          reject('失败的数据，time' + time)
        }

      }, 1000);

    })
    //看到on基本上是回调函数
    p.then(
      value => {//接收得到成功的value数据, onResolved
        console.log('成功的回调',value);
      },
      reason => {//接收得到失败的reason数据, onRejected
      console.log('失败的回调',reason);
      
      }
    )

```

## 为什么要用Promise

### 指定回调函数的方式更加灵活

+ 旧的:必须在启动异步任务前指定
+ promise:启动异步任务 => 返回promise对象 => 给promise对象绑定回调函数(甚至可以在异步任务结束后指定/多个)

```javascript
   //1.创建一个新的promise对象
    const p = new Promise((resolve, reject) => {//执行器函数
      //2.执行异步操作任务
      setTimeout(() => {
        const time = Date.now()//如果当前时间是偶数就代表成功，否则是失败
        //3.1.如果成功了，调用resolve(vlaue)
        if (time % 2 === 0) {
          resolve('成功的数据，time=' + time)
        } else {
          //3.2.如果失败了，调用reject(reason)
          reject('失败的数据，time' + time)
        }

      }, 1000);

    })
    //看到on基本上是回调函数
    //即使回调函数在启动异步任务前后都可以取到结果
    //比起纯回调函数，指定回调函数更加灵活
    setTimeout(() => {
      p.then(
        value => {//接收得到成功的value数据, onResolved
          console.log('成功的回调', value);
        },
        reason => {//接收得到失败的reason数据, onRejected
          console.log('失败的回调', reason);

        }
      )
    }, 2000);
```

### 支持链式调用，可以解决回调地狱问题

什么是回调地狱？回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调函数执行的条件

回调地狱的缺点？ 不便于阅读/不便于异常处理

解决方案? promise链式调用

终极解决方案？ async/await

## 如何使用Promise

### API

1. Promise构造函数：Promise(excutor){}

   1. excutor函数:执行器 (resolve,reject) =>{}
   2. resolve函数:内部定义成功时我们调用的函数 value =>{}
   3. reject函数：内部定义失败时我们调用的函数 reason =>{}

   说明：excutor会在Promise内部立即同步回调,异步操作在执行器中执行

2. Promise.prototype.then方法:(onResolved,onRejected) =>{}

   1. onResolved函数：成功的回调函数 (value)=> {}
   2. onRejected函数：失败的回调函数 (reason) =>{}

   说明：指定用于得到成功value的成功回调和用于得到失败reason的失败回调返回一个新的promise对象

3. Promise.prototype.catch方法:(onRejected)=>{}

   1. onRejected函数:失败的回调函数(reason) =>{}

   说明:then()的语法糖，相当于:then(undefined,onRejected)

4. Promise.resolve 方法:(value) =>{}

   1. value:成功的数据或promise对象

   说明:返回一个成功/失败的promise对象

5. Promise.reject方法:(reason) =>{}

   1. reason:失败的原因

   说明:返回一个失败的promise对象

6. Promise.all方法:(promises)=>{}

   1. promises:包含n个promise的数组

   说明:返回一个新的promise，只能所有的promise都成功才成功，只有一个失败了就直接失败

7. Promise.rece方法:(promises)=>{}

   1. promises:包含n个promise的数组

   说明:返回一个新的promise,第一个完成的promise的结果状态就是最终的结果状态

```javascript
    //传入执行器函数
    new Promise ((resolve,reject)=>{
      setTimeout(() => {
        //只能执行一次
        //Promise.resolve()
        resolve('成功的数据')
        // reject('失败的数据')
      }, 1000);
      //Promise.prototype.then()
    }).then(
      //成功的回调函数
      value =>{
        console.log('onResolved()1',value);
      }
    ).catch(
      reason =>{
        console.log('onRejected()1',reason);
      }
    )

    //产生一个成功值为1的promise对象
    const p1 = new Promise((resolve,reject)=>{
      resolve(1)
    })
    //语法糖
    const  p2 = Promise.resolve(2)
    const p3 = Promise.reject(3)
    p1.then(value => {console.log(value)})
    p2.then(value => {console.log(value)})
    p2.catch(reason => {console.log(reason)})

    //Promise.all
    //如果三个异步任务都成功了才会成功
    const pAll = Promise.all([p1,p2,p3])
    pAll.then(
      values=>{
        console.log('all onResolved',values);
        
      },
      reason=>{
        //失败的原因是三
        console.log('all onRejected()',reason);//3
      }
    )
    
    //Promise.race
    //看第一个任务是成功还是失败
    const pRace = Promise.race([p1,p2,p3])
    pRace.then(
      value=>{
        console.log('race onResolved',value);
        
      },
      reason=>{
        //失败的原因是三
        console.log('race onRejected()',reason);//3
      }
    )
```

### 几个问题

+ 如何改变promise的状态?

  + resolve(value):如果当前是pending就会变成resolved
  + reject(reason):如果当前是pending就会变成rejected
  + 抛出异常：如果当前是pending就会变成rejected

  ```javascript
     const p = new Promise((resolve,reject) =>{
        resolve(1)//promise变成resolved成功状态
        rejected(2)//promise变成rejected失败状态
        throw new Error('出错了')//抛出异常，promise变成rejected失败状态
        throw 3//语法上，可以抛任何东西
      })
  ```

+ 一个promise指定多个成功/失败回调函数，都会调用吗？

  + 当promise改变对应的状态时都会调用

  ```javascript
      const p = new Promise((resolve,reject) =>{
        // resolve(1)//promise变成resolved成功状态
        // rejected(2)//promise变成rejected失败状态
        // throw new Error('出错了')//抛出异常，promise变成rejected失败状态
        throw 3//语法上，可以抛任何东西
      })
      p.then(
        value =>{},
        reason => {console.log('reason',reason);
        }
      )
      p.then(
        value =>{},
        reason => {console.log('reason2',reason);
        }
      )
  ```

+ 改变promise状态和指定回调函数谁先谁后？

  + 都有可能，可能情况下先指定回调再改变状态，但也可以先改变状态在指定回调

  ```javascript
      new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(1)//改变的状态(同时指定指定数据)，异步执行回调函数
        }, 1000);
      }).then(//先指定回调函数，保存当前指定的回调函数
        value=>{},
        reason=>{console.log('reason',reason);
        }
      )
  ```

  

  + 如何先改状态在指定回调？

    + 在执行器中直接调用resolve()/reject()

    ```javascript
      new Promise((resolve,reject)=>{
              resolve(1)//先(同步)改变改变状态(同时指定数据)
        }).then(//后（同步）指定回调函数，异步执行回调函数，不用存回调函数
          value=>{},
          reason=>{console.log('reason',reason);
          }
        )
    ```

    

    + 延迟更长时间才调用then()

    ```javascript
        const p = new Promise((resolve, reject) => {
          setTimeout(() => {
          resolve(1)
          }, 1000);
        })
    
        setTimeout(() => {
          p.then(
            value =>{console.log('value3',value)},
            reason =>{console.log('value2',reason)}
          )
        }, 1100);
    ```

  + 什么时候才能得到数据？

    + 如果先指定的回调，那当状态发生改变时，回调函数会调用，得到数据
    + 如果先改变的状态，那当指定回调是，回调函数就会调用，得到数据

 + promise.then()返回的新promise的结果状态由什么决定？（面试会问）

     + 简单表达:有then()指定的回调函数执行的结果决定

     + 详细表达:

         + 如果抛出异常，新promise变成rejected，reason为抛出的异常
         + 如果返回的是非promise的任意值，新promise变为resolved，value为返回值
         + 如果返回的是另一个新promise，此promise的结果就会成为新promise的结果

       ```javascript
           const p = new Promise((resolve, reject) => {
             resolve(1)
             // reject(1)
           }).then(
             value =>{
               console.log('onResolved1()',value);
               // return 2
               // return Promise.resolve(3)
               // return Promise.reject(4)
               // throw 5
             },
             reason =>{
               console.log('onRejected()',reason);
             }
           ).then(
             value =>{
               console.log('onResolved2()',value);
             },
             reason =>{
               console.log('onRejected2()',reason);
             }
           )
       ```

+ promise如何串联多个操作任务

  + promise的then()返回一个新的promise，可以写成then()的链式调用
  + 通过then的链式调用串联多个同步/异步任务

  ````javascript
      const p = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('执行任务1(异步)');
          resolve(1)
        }, 1000);
      }).then(
        value => {
          console.log('任务1的结果:', value);
          console.log('执行任务2(同步)');
          //  resolve(2)这个不可以,这个是Promise的
          return 2
        },
      ).then(
        value => {
          console.log('任务2的结果:', value);
          //异步要重新new Promise
          return new Promise((resolve, reject) => {
            //启动异步任务3(异步)
            setTimeout(() => {
              console.log('执行任务3(异步)');
              resolve(3)
            }, 1000);
  
          })
        },
      ).then(
        value => {
          console.log('任务3的结果: ', value);
  
        }
      )
      /* 
  执行任务1(异步)
  index.html:20 任务1的结果: 1
  index.html:21 执行任务2(同步)
  index.html:27 任务2的结果: 2
  index.html:32 执行任务3(异步)
  index.html:40 任务3的结果:  3
      
       */
  ````

+ promise异常传/穿透？

  + 当使用promise的then链式调用时，可以在最后指定失败的回调
  + 当任何操作作出了异常，都会传到最后失败的回调中处理

  ```javascript
    new Promise((resolve, reject) => {
        //resolve(1)
        reject(1)
        //失败的话会找失败的回调函数，如果没有就会一直向下抛，知道找到
      }).then(
        value => {
          console.log('onResolved1()', value);
          return 2
        },
        //系统会指定默认
        // reason => { throw reason }
      ).then(
        value => {
          console.log('onResolved2()', value);
          return 3
        },
        //return
        // reason => Promise.reject(reason)
      ).then(
        value => {
          console.log('onResolved3()', value);
          return 4
        },
        // reason => { throw reason }
      ).catch(reason =>{
        console.log('onRejecte1()',reason);
      })
  
      /* 
      onRejecte1() 1
       */
  
  ```

  

+ 中间promise？

     + 当使用promise的then链式调用时，在中间中断，不再调出后面的回调函数
     + 办法：在回调函数中返回一个pending状态的promise对象

     ```javascript
        new Promise((resolve, reject) => {
           // resolve(1)
           reject(1)
         }).then(
           value => {
             console.log('onResolved1()', value);
             return 2
           },
         ).then(
           value => {
             console.log('onResolved2()', value);
             return 3
           },
         ).then(
           value => {
             console.log('onResolved3()', value);
             return 4
           },
         ).catch(reason =>{
           console.log('onRejecte1()',reason);
           return new Promise(()=>{})//返回一个pending的promise，下面就不会执行，中断promise链
         }).then(
           value =>{
             console.log('onResolved3()',value);
           },
           reason =>{
             console.log('onRejected2()',reason);
             
           }
         )
     
         /* 
         onRejecte1() 1
          */
     ```

     

# 自定义(手写)Promise

## 定义整体结构

```javascript
/* 
自定义Promise函数模块: IIFE
 */
//用es5定义模块
(function (window) {
  /* 
  Promise构造函数
  excutor：执行器函数(同步执行)
  */
  function Promise(excutor) {

  }

  /* 
    Promise原型对象的then()
    指定成功和失败回调函数
    返回一个新的promise对象
    */
  Promise.prototype.then = function (onResolved, onRejected) {

  }

  /* 
  Promise原型对象的catch()
  指定败回调函数
  返回一个新的promise对象
  */
  Promise.prototype.catch = function (onRejected) {

  }

  /* 
   Promise函数对象resolve方法
   返回指定结果的成功的promise
  */
  Promise.resolve = function (value) {

  }

  /* 
  Promise函数对象reject方法
  返回一个指定reason的失败的promise
  */
  Promise.reject = function (reason) {

  }

  /* 
  Promise函数对象all方法
  返回一promise，只有当所有promise都成功时才成功，否则只有一个失败的就失败
  */
  Promise.all = function (promises) {

  }


  /* 
  Promise函数对象race方法
  返回一个promise，其结果由第一个完成的promise决定
  */
  Promise.race = function (promises) {

  }


  //向外暴露Promise函数
  window.Promise = Promise
})(window)
```

## 构造函数的实现

```javascript
 function Promise(excutor) {
    //将当前promise对象保存起来
    const self = this
    //this代表类型，Promise类型
    self.status = 'pending'//给promise对象指定status属性，初始化为pending
    self.data = undefined //给promise对象指定一个用于存储结果数据的属性
    self.callbacks = []//每个元素结构：{ onResolved(){},onRejected(){} }
    function resolve(value) {
      //如果当前状态不是pending，直接结束
      //状态只能改一次
      if (self.status !== 'pending') {
        return
      }
      //将状态改成resolved
      self.status = 'resolved'
      //保存value数据
      self.data = value
      //如果有待执行callback函数，立即异步执行回调函数onResolved
      if (self.callbacks.length > 0) {
        setTimeout(() => {//放入队列中执行所有成功的回调
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          });
        });
      }
    }
    function reject(reason) {
      //如果当前状态不是pending，直接结束
      //状态只能改一次
      if (self.status !== 'pending') {
        return
      }

      //将状改成rejected
      self.status = 'rejected'
      //保存reason数据
      self.data = reason
      //如果有待执行callback函数，立即执行异步回调函数onRejected
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          })
        });
      }
    }
    //立即同步执行excutor
    try {
      excutor(resolve, reject)
    } catch (error) {//如果执行器 抛出异常，promise对象变为rejected状态
      reject(error)
    }
  }

  /* 
    Promise原型对象的then()
    指定成功和失败回调函数
    返回一个新的promise对象
    */
  Promise.prototype.then = function (onResolved, onRejected) {
    const self= this
    //假设当前状态是pending状态，将回调函数保存起来
    self.callbacks.push({
      onResolved,
      onRejected
    })
  }

  /* 
  Promise原型对象的catch()
  指定败回调函数
  返回一个新的promise对象
  */
  Promise.prototype.catch = function (onRejected) {

  }
```

index.html

```html
  <script src="../lib/Promise.js"></script>
  <script>
    const p = new Promise((resolve, reject) => {
      // 现指定回调函数再改变状态,先让回调函数存数据，再读数据
      setTimeout(() => {
        // resolve(1)//value
        reject(2)//reason
      }, 100);
    })
    p.then(
      value => {
        console.log('onResolved1()', value);
      },
      reason => {
        console.log('onRejected1()', reason);

      }
    )

    p.then(
      value => {
        console.log('onResolved2()', value);
      },
      reason => {
        console.log('onRejected2()', reason);

      }
    )

  </script>
```

## Promise_then()/catch()的实现

### Promise_then的实现1

```javascript
 /* 
    Promise原型对象的then()
    指定成功和失败回调函数
    返回一个新的promise对象
    */
  Promise.prototype.then = function (onResolved, onRejected) {
    const self = this

    //返回一个新的Promise对象
    return new Promise((resolve, reject) => {
      //假设当前状态是pending状态，将回调函数保存起来
      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved,
          onRejected
        })
      } else if (self.status === RESOLVED) {
        setTimeout(() => {
          /* 
          */
          try {
            const result = onResolved(self.data)
            //  2.如果回到函数返回是promise，return的promise结果就是这个promise
            if (result instanceof Promise) {
              result.then(
                //return不return 不重要，只要结果出来了就行了
                value => resolve(value),//当result成功时，让return的promise也成功
                reason => reject(reason)///当reject时，让return的promise也成功
              )
            } else {
              // 3.如果回调函数返回不是promise，return的promise就会失败，value就是返回的值
              resolve(result)
            }
          } catch (error) {
            // 1.如果执行抛出异常，return的promise就会失败，reason就是error
            reject(error)
          }

        });
      } else {//'rejected'
        setTimeout(() => {
          onRejected(self.data)
        });
      }

    })
  }
```

### Promise_then的实现2

简洁代码

```javascript
 Promise.prototype.then = function (onResolved, onRejected) {
    const self = this

    //返回一个新的Promise对象
    return new Promise((resolve, reject) => {
      //假设当前状态是pending状态，将回调函数保存起来
      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved,
          onRejected
        })
      } else if (self.status === RESOLVED) {
        setTimeout(() => {
          /* 
          */
          try {
            const result = onResolved(self.data)
            //  2.如果回到函数返回是promise，return的promise结果就是这个promise
            if (result instanceof Promise) {
              // result.then(
              //   //return不return 不重要，只要结果出来了就行了
              //   value => resolve(value),//当result成功时，让return的promise也成功
              //   reason => reject(reason)///当reject时，让return的promise也成功
              // )
              result.then(resolve, reject)
            } else {
              // 3.如果回调函数返回不是promise，return的promise就会失败，value就是返回的值
              resolve(result)
            }
          } catch (error) {
            // 1.如果执行抛出异常，return的promise就会失败，reason就是error
            reject(error)
          }

        });
      } else {//'rejected'
        setTimeout(() => {
          /* 
          */
          try {
            const result = onRejected(self.data)
            //  2.如果回到函数返回是promise，return的promise结果就是这个promise
            if (result instanceof Promise) {
              // result.then(
              //   //return不return 不重要，只要结果出来了就行了
              //   value => resolve(value),//当result成功时，让return的promise也成功
              //   reason => reject(reason)///当reject时，让return的promise也成功
              // )
              result.then(resolve, reject)
            } else {
              // 3.如果回调函数返回不是promise，return的promise就会失败，value就是返回的值
              resolve(result)
            }
          } catch (error) {
            // 1.如果执行抛出异常，return的promise就会失败，reason就是error
            reject(error)
          }

        });
      }

    })
  }
```

### Promise_then的实现3

promise.js

```javascript
 Promise.prototype.then = function (onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : value =>value//向后传递成功的value
    //指定默认的失败的回调(实现错误/异常传透的关键点),不能return，否则会进入成功的处理
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }///向后传递失败的reason

    const self = this

    //返回一个新的Promise对象
    return new Promise((resolve, reject) => {
      /* 
      调用指定回调函数处理，根据执行结果，改变return的promise状态
      */
      function handle(callback) {
        try {
          const result = callback(self.data)
          //  2.如果回到函数返回是promise，return的promise结果就是这个promise
          if (result instanceof Promise) {
            // result.then(
            //   //return不return 不重要，只要结果出来了就行了
            //   value => resolve(value),//当result成功时，让return的promise也成功
            //   reason => reject(reason)///当reject时，让return的promise也成功
            // )
            result.then(resolve, reject)
          } else {
            // 3.如果回调函数返回不是promise，return的promise就会失败，value就是返回的值
            resolve(result)
          }
        } catch (error) {
          // 1.如果执行抛出异常，return的promise就会失败，reason就是error
          reject(error)
        }

      }
      //当前状态是pending状态，将回调函数保存起来
      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved() {
            handle(onResolved)
          },
          onRejected() {
            handle(onRejected)
          }
        })
      } else if (self.status === RESOLVED) {//如果当前是resolved状态，异步执行onResolve并改变return的promise状态
        //如果是resolved，我就异步处理回调
        setTimeout(() => {
          handle(onResolved)
        });
      } else {////如果当前是rejected状态，异步执行onRejected并改变return的promise状态
        setTimeout(() => {
          handle(onRejected)
        });
      }

    })
  }

  /* 
  Promise原型对象的catch()
  指定败回调函数
  返回一个新的promise对象
  */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined,onRejected)
  }

```

index.html

```javascript
<script>
    const p = new Promise((resolve, reject) => {
        reject(2)//reason
    }).then(
      value => {
        console.log('onResolved1()', value);
      },
      reason => {
        console.log('onRejected1()', reason);
        // return 3
        // throw 4
        return new Promise((resolve,reject)=>reject(5))
      }
    ).then(
      value => {
        console.log('onResolved2()', value);
      },
      reason => {
        console.log('onRejected2()', reason);
        //中断Promise链
        return new Promise(()=>{})
      }
    ).catch(reason=>{
      console.log('onRejected3()',reason);
      
    }).then(
      value => {
        console.log('onResolved4()', value);
      },
      reason => {
        console.log('onRejected4()', reason);
      }
    )

  </script>
```

## Promise.resolve()/reject()的实现

Promise.js

```javascript
 /* 
   Promise函数对象resolve方法
   返回指定结果的成功的promise
  */
  Promise.resolve = function (value) {
    //返回一个成功/失败的promise
    return new Promise((resolve,reject)=>{
      //value是promise
      if(value instanceof Promise){//使用value的结果作为promise的结果
        value.then(resolve,reject)
      }else{//value不是promise => promise变为成功，数据是value
        resolve(value)
      }
    })
  }

  /* 
  Promise函数对象reject方法
  返回一个指定reason的失败的promise
  */
  Promise.reject = function (reason) {
    //返回一个失败的promise
    return new Promise ((resolve,reject) =>{
      reject(reason)
    })
  }

```

index.html

```html
 <script>
    const p1 = Promise.resolve(2)//如果是一般值，p1成功，value就是和这个值
    const p2 = Promise.resolve(Promise.resolve(3))//如果是成功的promise,p2成功，value是这个promise订单value
    const p3 = Promise.resolve(Promise.reject(4))//如果是失败的promise，p3失败，reason是这个promise的reason
    p1.then(value =>{console.log('p1',value)})
    p2.then(value =>{console.log('p2',value)})
    p3.catch(reason =>{console.log('p3',reason)})
    /* 
    p1 2
    p2 3
    p3 4
    */
  </script>
```

## Promise.all()的实现

Promise.js

```javascript
 /* 
  Promise函数对象all方法
  返回一promise，只有当所有promise都成功时才成功，否则只有一个失败的就失败
  */
  Promise.all = function (promises) {
    //用来保存所有成功value的数组
    const values = new Array(promises.length)
    //用来保存成功promise的数量
    let resolveCount = 0

    //返回一个新的promise
    return new Promise((resolve, reject) => {
      //遍历获取每个promise的结果
      promises.forEach((p, index) => {
        p.then(
          value => {
            resolveCount++ //成功的数量加1
            //p成功，将成功的value保存values
            values[index] = value

            //如果全部成功了,将return的promise改为成功
            if (resolveCount === promises.length) {
              resolve(values)
            }
          },
          reason => {//只要有一个失败了，return的promise就失败
            reject(reason)
          }
        )
      })
    })
  }
```

index.html

````javascript
 const p1 = Promise.resolve(2)//如果是一般值，p1成功，value就是和这个值
    const p2 = Promise.resolve(Promise.resolve(3))//如果是成功的promise,p2成功，value是这个promise订单value
    const p3 = Promise.resolve(Promise.reject(4))//如果是失败的promise，p3失败，reason是这个promise的reason


  const p4 = new Promise(resolve =>{
    setTimeout(() => {
      resolve(5)
    }, 1000);
  })
    const pAll = Promise.all([p4,p1, p2])

    pAll.then(
      values => {
        console.log('race onResolved()', values);
      },
      reason => {
        console.log('race onRejected()', reason);
      }
    )

````

## Promise.race的实现

Promise.js

```javascript
  /* 
  Promise函数对象race方法
  返回一个promise，其结果由第一个完成的promise决定
  */
  Promise.race = function (promises) {
    //返回一个promise
    return new Promise((resolve,reject) =>{
      promises.forEach((p,index) =>{
        p.then(
          value =>{//一旦有成功了，将return变为成功
            resolve(value)
          },
          reason =>{//一旦有失败了，将return 变为失败
            reject(reason)
          }
        )
      })
    })
  }

```

index.html

```javascript
 const p1 = Promise.resolve(2)//如果是一般值，p1成功，value就是和这个值
    const p2 = Promise.resolve(Promise.resolve(3))//如果是成功的promise,p2成功，value是这个promise订单value
    const p3 = Promise.resolve(Promise.reject(4))//如果是失败的promise，p3失败，reason是这个promise的reason


    const p4 = new Promise(resolve => {
      setTimeout(() => {
        resolve(5)
      }, 1000);
    })

    const p5 = Promise.reject(6)
    // const pAll = Promise.all([p4,p1, p2])

    // pAll.then(
    //   values => {
    //     console.log('race onResolved()', values);
    //   },
    //   reason => {
    //     console.log('race onRejected()', reason);
    //   }
    // )

    //谁最先完成，他成功我就成功，她失败我就失败
    const pRace = Promise.race([p4, p5, p1, p2, p3])

    pRace.then(
      value => {
        console.log('race onResolved()', value);
      },
      reason => {
        console.log('race onRejected()', reason);
      }
    )
```

## 完善all和race方法

Promise.js

```javascript
  /* 
  Promise函数对象all方法
  返回一promise，只有当所有promise都成功时才成功，否则只有一个失败的就失败
  */
  Promise.all = function (promises) {
    //用来保存所有成功value的数组
    const values = new Array(promises.length)
    //用来保存成功promise的数量
    let resolveCount = 0

    //返回一个新的promise
    return new Promise((resolve, reject) => {
      //遍历获取每个promise的结果
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          value => {
            resolveCount++ //成功的数量加1
            //p成功，将成功的value保存values
            values[index] = value

            //如果全部成功了,将return的promise改为成功
            if (resolveCount === promises.length) {
              resolve(values)
            }
          },
          reason => {//只要有一个失败了，return的promise就失败
            reject(reason)
          }
        )
      })
    })
  }


  /* 
  Promise函数对象race方法
  返回一个promise，其结果由第一个完成的promise决定
  */
  Promise.race = function (promises) {
    //返回一个promise
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          value => {//一旦有成功了，将return变为成功
            resolve(value)
          },
          reason => {//一旦有失败了，将return 变为失败
            reject(reason)
          }
        )
      })
    })
  }

```

index.html

```javascript
 const p1 = Promise.resolve(2)//如果是一般值，p1成功，value就是和这个值
    const p2 = Promise.resolve(Promise.resolve(3))//如果是成功的promise,p2成功，value是这个promise订单value
    const p3 = Promise.resolve(Promise.reject(4))//如果是失败的promise，p3失败，reason是这个promise的reason


    const p4 = new Promise(resolve => {
      setTimeout(() => {
        resolve(5)
      }, 1000);
    })

    const p5 = Promise.reject(6)
    const pAll = Promise.all([p4,p1,7, p2])

    pAll.then(
      values => {
        console.log('race onResolved()', values);
      },
      reason => {
        console.log('race onRejected()', reason);
      }
    )

    //谁最先完成，他成功我就成功，她失败我就失败
    // const pRace = Promise.race([p4, 7, p5, p1, p2, p3])

    // pRace.then(
    //   value => {
    //     console.log('race onResolved()', value);
    //   },
    //   reason => {
    //     console.log('race onRejected()', reason);
    //   }
    // )

```

## Promise.resolveDelay()/rejectDelay的实现

Promise.js

```javascript
  /* 
    返回一个promise对象，在指定的时间后才确定结果
  */
  Promise.resolveDelay = function (value, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      }, time);
    })
  }

  /* 
  返回一个promise对象，它在指定的时间才会失败
  */
  Promise.rejectDelay = function (reason, time) {
    //返回一个失败的promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason)
      }, time);
    })
  }
```

index.html

```javascript
    const p1 = Promise.resolve(2)//如果是一般值，p1成功，value就是和这个值
    const p2 = Promise.resolve(Promise.resolve(3))//如果是成功的promise,p2成功，value是这个promise订单value
    const p3 = Promise.resolve(Promise.reject(4))//如果是失败的promise，p3失败，reason是这个promise的reason


    const p4 = new Promise(resolve => {
      setTimeout(() => {
        resolve(5)
      }, 1000);
    })

    const p5 = Promise.reject(6)

    const p6 = Promise.resolveDelay(66, 2000)
    const p7 = Promise.rejectDelay(77, 3000)
    p6.then(value =>{console.log('p6',value)})
    p7.catch(reason =>{console.log('p7',reason)})
```

## Promise的最终版本

```javascript
/* 
自定义Promise函数模块: IIFE
 */
//用es5定义模块
(function (window) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  /* 
  Promise构造函数
  excutor：执行器函数(同步执行)
  */
  function Promise(excutor) {
    //将当前promise对象保存起来
    const self = this
    //this代表类型，Promise类型
    self.status = PENDING//给promise对象指定status属性，初始化为pending
    self.data = undefined //给promise对象指定一个用于存储结果数据的属性
    self.callbacks = []//每个元素结构：{ onResolved(){},onRejected(){} }
    function resolve(value) {
      //如果当前状态不是pending，直接结束
      //状态只能改一次
      if (self.status !== PENDING) {
        return
      }
      //将状态改成resolved
      self.status = RESOLVED
      //保存value数据
      self.data = value
      //如果有待执行callback函数，立即异步执行回调函数onResolved
      if (self.callbacks.length > 0) {
        setTimeout(() => {//放入队列中执行所有成功的回调
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          });
        });
      }
    }
    function reject(reason) {
      //如果当前状态不是pending，直接结束
      //状态只能改一次
      if (self.status !== PENDING) {
        return
      }

      //将状改成rejected
      self.status = REJECTED
      //保存reason数据
      self.data = reason
      //如果有待执行callback函数，立即执行异步回调函数onRejected
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          })
        });
      }
    }
    try {
      //new的时候会调用excutor函数，形参传过来的 
      excutor(resolve, reject)
    } catch (error) {//如果执行器 抛出异常，promise对象变为rejected状态
      //立即同步执行excutor
      reject(error)
    }
  }

  /* 
    Promise原型对象的then()
    指定成功和失败回调函数
    返回promise的结果由onResolved/onRejected执行结果决定
    */
  Promise.prototype.then = function (onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : value => value//向后传递成功的value
    //指定默认的失败的回调(实现错误/异常传透的关键点),不能return，否则会进入成功的处理
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }///向后传递失败的reason

    const self = this

    //返回一个新的Promise对象
    return new Promise((resolve, reject) => {
      /* 
      调用指定回调函数处理，根据执行结果，改变return的promise状态
      */
      function handle(callback) {
        try {
          const result = callback(self.data)
          //  2.如果回到函数返回是promise，return的promise结果就是这个promise
          if (result instanceof Promise) {
            // result.then(
            //   //return不return 不重要，只要结果出来了就行了
            //   value => resolve(value),//当result成功时，让return的promise也成功
            //   reason => reject(reason)///当reject时，让return的promise也成功
            // )
            result.then(resolve, reject)
          } else {
            // 3.如果回调函数返回不是promise，return的promise就会失败，value就是返回的值
            resolve(result)
          }
        } catch (error) {
          // 1.如果执行抛出异常，return的promise就会失败，reason就是error
          reject(error)
        }

      }
      //当前状态是pending状态，将回调函数保存起来
      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved() {
            handle(onResolved)
          },
          onRejected() {
            handle(onRejected)
          }
        })
      } else if (self.status === RESOLVED) {//如果当前是resolved状态，异步执行onResolve并改变return的promise状态
        //如果是resolved，我就异步处理回调
        setTimeout(() => {
          handle(onResolved)
        });
      } else {////如果当前是rejected状态，异步执行onRejected并改变return的promise状态
        setTimeout(() => {
          handle(onRejected)
        });
      }

    })
  }

  /* 
  Promise原型对象的catch()
  指定败回调函数
  返回一个新的promise对象
  */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }

  /* 
   Promise函数对象resolve方法
   返回指定结果的成功的promise
  */
  Promise.resolve = function (value) {
    //返回一个成功/失败的promise
    return new Promise((resolve, reject) => {
      //value是promise
      if (value instanceof Promise) {//使用value的结果作为promise的结果
        value.then(resolve, reject)
      } else {//value不是promise => promise变为成功，数据是value
        resolve(value)
      }
    })
  }

  /* 
  Promise函数对象reject方法
  返回一个指定reason的失败的promise
  */
  Promise.reject = function (reason) {
    //返回一个失败的promise
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  /* 
  Promise函数对象all方法
  返回一promise，只有当所有promise都成功时才成功，否则只有一个失败的就失败
  */
  Promise.all = function (promises) {
    //用来保存所有成功value的数组
    const values = new Array(promises.length)
    //用来保存成功promise的数量
    let resolveCount = 0

    //返回一个新的promise
    return new Promise((resolve, reject) => {
      //遍历获取每个promise的结果
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          value => {
            resolveCount++ //成功的数量加1
            //p成功，将成功的value保存values
            values[index] = value

            //如果全部成功了,将return的promise改为成功
            if (resolveCount === promises.length) {
              resolve(values)
            }
          },
          reason => {//只要有一个失败了，return的promise就失败
            reject(reason)
          }
        )
      })
    })
  }


  /* 
  Promise函数对象race方法
  返回一个promise，其结果由第一个完成的promise决定
  */
  Promise.race = function (promises) {
    //返回一个promise
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          value => {//一旦有成功了，将return变为成功
            resolve(value)
          },
          reason => {//一旦有失败了，将return 变为失败
            reject(reason)
          }
        )
      })
    })
  }

  /* 
    返回一个promise对象，在指定的时间后才确定结果
  */
  Promise.resolveDelay = function (value, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      }, time);
    })
  }

  /* 
  返回一个promise对象，它在指定的时间才会失败
  */
  Promise.rejectDelay = function (reason, time) {
    //返回一个失败的promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason)
      }, time);
    })
  }

  //向外暴露Promise函数
  window.Promise = Promise
})(window)
```

## Promise的class版本

```javascript
/* 
自定义Promise函数模块: IIFE
 */
//用es5定义模块
(function (window) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  class Promise {
    /* 
Promise构造函数
excutor：执行器函数(同步执行)
*/
    constructor(excutor) {
      //将当前promise对象保存起来
      const self = this
      //this代表类型，Promise类型
      self.status = PENDING//给promise对象指定status属性，初始化为pending
      self.data = undefined //给promise对象指定一个用于存储结果数据的属性
      self.callbacks = []//每个元素结构：{ onResolved(){},onRejected(){} }
      function resolve(value) {
        //如果当前状态不是pending，直接结束
        //状态只能改一次
        if (self.status !== PENDING) {
          return
        }
        //将状态改成resolved
        self.status = RESOLVED
        //保存value数据
        self.data = value
        //如果有待执行callback函数，立即异步执行回调函数onResolved
        if (self.callbacks.length > 0) {
          setTimeout(() => {//放入队列中执行所有成功的回调
            self.callbacks.forEach(callbacksObj => {
              callbacksObj.onResolved(value)
            });
          });
        }
      }
      function reject(reason) {
        //如果当前状态不是pending，直接结束
        //状态只能改一次
        if (self.status !== PENDING) {
          return
        }

        //将状改成rejected
        self.status = REJECTED
        //保存reason数据
        self.data = reason
        //如果有待执行callback函数，立即执行异步回调函数onRejected
        if (self.callbacks.length > 0) {
          setTimeout(() => {
            self.callbacks.forEach(callbacksObj => {
              callbacksObj.onRejected(reason)
            })
          });
        }
      }
      try {
        //new的时候会调用excutor函数，形参传过来的 
        excutor(resolve, reject)
      } catch (error) {//如果执行器 抛出异常，promise对象变为rejected状态
        //立即同步执行excutor
        reject(error)
      }
    }
    /* 
      Promise原型对象的then()
      指定成功和失败回调函数
      返回promise的结果由onResolved/onRejected执行结果决定
      */
    then(onResolved, onRejected) {
      onResolved = typeof onResolved === 'function' ? onResolved : value => value//向后传递成功的value
      //指定默认的失败的回调(实现错误/异常传透的关键点),不能return，否则会进入成功的处理
      onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }///向后传递失败的reason

      const self = this

      //返回一个新的Promise对象
      return new Promise((resolve, reject) => {
        /* 
        调用指定回调函数处理，根据执行结果，改变return的promise状态
        */
        function handle(callback) {
          try {
            const result = callback(self.data)
            //  2.如果回到函数返回是promise，return的promise结果就是这个promise
            if (result instanceof Promise) {
              // result.then(
              //   //return不return 不重要，只要结果出来了就行了
              //   value => resolve(value),//当result成功时，让return的promise也成功
              //   reason => reject(reason)///当reject时，让return的promise也成功
              // )
              result.then(resolve, reject)
            } else {
              // 3.如果回调函数返回不是promise，return的promise就会失败，value就是返回的值
              resolve(result)
            }
          } catch (error) {
            // 1.如果执行抛出异常，return的promise就会失败，reason就是error
            reject(error)
          }

        }
        //当前状态是pending状态，将回调函数保存起来
        if (self.status === PENDING) {
          self.callbacks.push({
            onResolved() {
              handle(onResolved)
            },
            onRejected() {
              handle(onRejected)
            }
          })
        } else if (self.status === RESOLVED) {//如果当前是resolved状态，异步执行onResolve并改变return的promise状态
          //如果是resolved，我就异步处理回调
          setTimeout(() => {
            handle(onResolved)
          });
        } else {////如果当前是rejected状态，异步执行onRejected并改变return的promise状态
          setTimeout(() => {
            handle(onRejected)
          });
        }

      })
    }

    /* 
    Promise原型对象的catch()
    指定败回调函数
    返回一个新的promise对象
    */
    catch(onRejected) {
      return this.then(undefined, onRejected)
    }

    /* 
     Promise函数对象resolve方法
     返回指定结果的成功的promise
    */
   static resolve = function (value) {
      //返回一个成功/失败的promise
      return new Promise((resolve, reject) => {
        //value是promise
        if (value instanceof Promise) {//使用value的结果作为promise的结果
          value.then(resolve, reject)
        } else {//value不是promise => promise变为成功，数据是value
          resolve(value)
        }
      })
    }

    /* 
    Promise函数对象reject方法
    返回一个指定reason的失败的promise
    */
    static reject = function (reason) {
      //返回一个失败的promise
      return new Promise((resolve, reject) => {
        reject(reason)
      })
    }

    /* 
    Promise函数对象all方法
    返回一promise，只有当所有promise都成功时才成功，否则只有一个失败的就失败
    */
    static all = function (promises) {
      //用来保存所有成功value的数组
      const values = new Array(promises.length)
      //用来保存成功promise的数量
      let resolveCount = 0

      //返回一个新的promise
      return new Promise((resolve, reject) => {
        //遍历获取每个promise的结果
        promises.forEach((p, index) => {
          Promise.resolve(p).then(
            value => {
              resolveCount++ //成功的数量加1
              //p成功，将成功的value保存values
              values[index] = value

              //如果全部成功了,将return的promise改为成功
              if (resolveCount === promises.length) {
                resolve(values)
              }
            },
            reason => {//只要有一个失败了，return的promise就失败
              reject(reason)
            }
          )
        })
      })
    }


    /* 
    Promise函数对象race方法
    返回一个promise，其结果由第一个完成的promise决定
    */
    static race = function (promises) {
      //返回一个promise
      return new Promise((resolve, reject) => {
        promises.forEach((p, index) => {
          Promise.resolve(p).then(
            value => {//一旦有成功了，将return变为成功
              resolve(value)
            },
            reason => {//一旦有失败了，将return 变为失败
              reject(reason)
            }
          )
        })
      })
    }

    /* 
      返回一个promise对象，在指定的时间后才确定结果
    */
    static resolveDelay = function (value, time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value instanceof Promise) {
            value.then(resolve, reject)
          } else {
            resolve(value)
          }
        }, time);
      })
    }

    /* 
    返回一个promise对象，它在指定的时间才会失败
    */
    static rejectDelay = function (reason, time) {
      //返回一个失败的promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(reason)
        }, time);
      })
    }

  }



  //向外暴露Promise函数
  window.Promise = Promise
})(window)
```

# async与await

## async 函数

+ 函数的返回值为promise对象
+ promise对象的结果由async函数执行的返回值决定

```java
    //async函数的返回值是一个promise对象
    //async函数返回的promise的结果由函数执行的结果决定
    async function fn1() {
      // return 1
      //产生一个失败 promise
      // throw 2
      // return Promise.reject(3)
      // return Promise.resolve(3)
      return new Promise((resolve,reject) =>{
        setTimeout(() => {
          resolve(4)
        }, 1000);
      })
    }
    const result = fn1()
    // console.log(result)
    result.then(
      value =>{
        console.log('onResolved()',value);
      },
      reason  =>{
        console.log('onRejected()',reason);
        
      }
    )
```



## await 表达式

+ await右侧的表达式一般为promise对象，但也可以是其他值
+ 如果表达式是promise对象，await返回的是promise成功的值
+ 如果表达式是其他值，直接将此值作为await的返回值

```javascript
    function fn2() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(5)
        }, 1000);
      })
    }
    function fn4() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(6)
        }, 1000);
      })

    }
    async function fn3() {
      //不一定放promise对象 // await右侧表达式为promise，得到的结果就是promise成功的value
      // const value = await fn2()
      // const value = await 6//await右侧表达式不是promise,得到的结果就是它本身

      try {
        const value = await fn4()//得到失败的结果，用trycatch
        console.log('value', value);
      } catch (error) {
        console.log('失败的结果',error);
        //失败的结果 6
      }

    }
    fn3()
```

## 注意

+ await必须写在async函数中，但async函数中可以没有await
+ 如果await的promise失败了，就会抛出异常，需要同try...catch来捕获处理

# JS异步值宏队列与微队列

## 原理图

![](\iamges\原理图.png)

## 说明

+ JS中用来存储待执行回调函数的队列包含2个不同特定的队列
+ 宏队列：用来保存待执行的宏任务(回调)，比如:定时器回调/DOM事件回调/ajax回调
+ 微队列:用来保存待执行额微任务(回调),比如：promise的回调/MutationObserver的回调
+ JS执行时会区别这2个队列
  + JS引擎首先必须先执行所有初始化同步任务代码
  + 每次准备取出第一个宏任务执行前，都要将所有的微任务一个一个取出来执行



```javascript
  	setTimeout(() => {//会立即 放入宏队列
      console.log('timeout callback1()')
      Promise.resolve(3).then(
        value => {//会立即放入微队列
          console.log('Promise onResolved2()', value);
        }
      )
    }, 0)
    setTimeout(() => {//会立即 放入宏队列
      console.log('timeout callback2()')
    }, 0)
    Promise.resolve(1).then(
      value => {//会立即放入微队列
        console.log('Promise onResolved1()', value);
      }
    )
    Promise.resolve(2).then(
      value => {//会立即放入微队列
        console.log('Promise onResolved2()', value);
      }
    )
    /*
宏队列与微队列.html:26 Promise onResolved1() 1
宏队列与微队列.html:31 Promise onResolved2() 2
宏队列与微队列.html:14 timeout callback1()
宏队列与微队列.html:17 Promise onResolved2() 3
宏队列与微队列.html:22 timeout callback2()
```

# 面试题

## 1

```javascript
  //放入宏队列
    setTimeout(() => {
      console.log(1);
    }, 0);
    Promise.resolve().then(() => {
      //放入微队列
      console.log(2);
    })
    Promise.resolve().then(() => {
      //放入微队列
      console.log(3);
    })
    //先执行同步代码
    console.log(4);
    /*
    3
    2
    4
    1
    */

```

## 2

```javascript
 //放入宏队列
    setTimeout(() => {
      console.log(1);
    }, 0);
    new Promise((resolve) => {
      //立即执行
      console.log(2);
      resolve()
    }).then(() => {
      console.log(3);

    }).then(() => {
      console.log(4);

    })
    //立即执行
    console.log(5);

    // 2 5 3 4 1
    /*
    宏:[1]
    微:[4]
    */
```

## 3

```javascript
    const first = () => (new Promise((resolve, reject) => {
      console.log(3);
      let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
          console.log(5);
          resolve(6)
        }, 0);
        resolve(1)
      })
      resolve(2)
      p.then((arg) => {
        console.log(arg);
      })
    }))

    first().then((arg) =>{
      console.log(arg);
    })

    console.log(4);
    
    // 3 7 4 1 2 5
```

## 4

```javascript
    // 从上往下依次执行
    /*
    初始化同步代码
    先执行立即执行函数 
    1 7
        宏:[0]
        立马调用resolve就会立马把2,8放入微队列中
        先把2输出，然后立马把3输出，调用reslve输出4的回调函数进入微队列，也会把5的回调函数缓存起来
        return undefined， 6的回调函数会放入微队列中[8,4,6],然后取出8执行，在取4执行，再把5放到队列中[6,5]
        微:[2，8]
     */
    /*
    初始化同步代码
    先执行立即执行函数 
    1 7 2 3 8 4 6 5 0
        宏:[]
        4不执行，5就放不进去
        微:[]
     */
    setTimeout(() => {
      console.log(0);
    }, 0);
    new Promise((resolve, reject) => {
      console.log(1);
      resolve()
    }).then(() => {
      console.log(2);
      new Promise((resolve, reject) => {
        console.log(3);
        resolve()
      }).then(() => {
        console.log(4);
      }).then(() => {
        console.log(5);
      })
    }).then(() => {
      console.log(6);
    })
    new Promise((resolve, reject) => {
      console.log(7);
      resolve()
    }).then(() => {
      console.log(8);
    })
```

