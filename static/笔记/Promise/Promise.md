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

在异步函数下面打印输入，如果打印输出是在异步函数执行后，则是同步函数，反之是异步函数

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

## Promise_then的实现1

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

## Promise_then的实现2

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

## Promise_then的实现3

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

