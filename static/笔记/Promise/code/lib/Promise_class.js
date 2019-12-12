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