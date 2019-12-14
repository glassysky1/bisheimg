# 第一章:HTTP相关

## HTTP请求交互的基本过程

![](\images\HTTP请求交互的基本过程.png)

+ 前后应用从浏览器端向服务器发送HTTP请求(请求报文)
+ 后台服务器接收到请求后，调度服务器应用处理请求，向浏览器返回HTTP响应(响应报文)

##  HTTP请求报文

### 请求行

+ method url(请求方式 地址)
  + GET  /product_detail?id=2
  + POST /login

### 多个请求头

+ Host: www.baidu.com(这个是主机)

Host: www.baidu.com(这个是主机)

+ Cookie: BAIDUID=AD3B0FA706E;BIDUPSID=AD3B0FA706(浏览器利用Cookie请求头携带Cookie交给服务器)

+ Content-Type: application/x-www-form-urlencoded 或者 application/json(内容类型)

### 请求体

username=tom&pwd=123(urlencoded参数)

{"username":"tom","pwd":123}(json格式)

## HTTP响应报文

### 响应状态行 

status : statusText(400,502是服务器出错)

### 多个响应头

+ Content-Type:text/html;charset=utf-8
+ Set-Cookie:BD_CK_SAM=1;path=/(服务器生成Cookie数据使用set-cookie给浏览器去存)

### 响应体

+ html 文本/json文本/js/css/图片...

## post请求体参数格式

+ Content-Type:application/x-www-form-urencoded;charset=utf-8
  + 用于键值对参数，参数的键值=连接，参数之间用&连接
  + 列如:name=%jskdajfk&age=12
+ Content-Type:application/json;charset=utf-8
  + 用于json字符串参数
  + 例如:{"name":"sdfsd","age",12}
+ Content-Type:multipart/form-data
  + 用于文件上传请求

## 常见的响应状态码

| 200  | OK                    | 请求成功。一般用GET与POST请求          |
| ---- | --------------------- | -------------------------------------- |
| 201  | Created               | 已创建。成功请求并创建了新的资源       |
| 401  | Unauthorized          | 未授权/请求要求用户的身份认证          |
| 404  | Not Found             | 服务器无法根据用户客户端的请求找到资源 |
| 500  | Internal Server Error | 服务器内部错误，无法完成请求           |

## 不同类型的请求及其作用

1. GET:从服务器端读取数据
2. POST:想服务器端添加新数据
3. PUT:更新服务器端已经有的数据
4. DELETE: 删除服务器端数据

## API的分类

1. REST API: restful
   1. 发送请求进行CRUD那个操作由请求方式来决定
   2. 同一个请求路径可以进行多个操作
   3. 请求方式会用到GET/POST/PUT/DELETE
2. 非REST API:restless
   1. 请求方式不决定请求的CRUD操作
   2. 一个请求路径只对应一个操作
   3. 一般只有GET/POST

## 使用json-server搭建REST API

### json-server是什么？

用来款速搭建REST API的工具包

# 第二章:XHR的理解和使用

## MDN文档

https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest

## 理解

1. 使用XMLHttpRequest(XHR)对象可以与服务器交互，也就是发送ajax请求
2. 前端可以获取到数据，而无需让整个页面刷新
3. 这使得Web页面可以只更新页面的局部，而不影响用户的操作

## 区别一般http请求与ajax请求

1. ajax请求是一种特别的http请求
2. 对服务器端来说，没有任何区别，区别在浏览器端
3. 浏览器发请求：只有XHR或fetch发出的才是ajax请求，其它所有的都是非ajax请求
4. 浏览器端接收到响应
   1. 一般请求:浏览器一般会直接显示响应体数据，也就是我们常说的刷新/跳转页面
   2. ajax请求：浏览器不会对界面进行任何更新操作，只是调用监视的回调函数并传入响应相关数据

## API

1. XMLHttpRequest():创建XHR对象的构造函数

2. status:响应状态码值，比如200,404

3. statusText:响应状态文本

4. readyState:标识请求状态的只读属性

   0：初始

   1：open()之后

   2：send()之后

   3：请求中

   4：请求完成

5. onreadystatechange:绑定readyState改变的监听

6. responseType:指定响应数据类型，如果是'json',得到响应后自动解析响应体数据

7. response:响应体数据，类型取决于responseType的指定

8. timeout：指定请求超时时间，默认0代表没有限制

9. ontimeout：绑定超时的监听

10. onerror：绑定请求网络错误的监听

11. open()：初始化一个请求，参数为：(method,url[,async])

12. send(data):发送请求

13. abort()：中断请求

14. getResponseHeader(name):获取指定名称的响应头值

15. getAllResponseHeaders():获取所有响应头组成的字符串

16. setRequestHeader(name,value):设置请求头

## XHR的ajax封装(简单版axios)

### 特点

1. 函数的返回值为promise，成功的结果为response，异常的结果为error
2. 能处理多种类型的请求:GET/POST/PUT/DELETE
3. 函数的参数为一个配置对象

```javascript

    url:'',//请求地址
    method:'',//请求方式GET/POST/PUT/DELETE
    params:{},//GET/DELETE请求的query参数
    data:{},//POST或DELETE请求的请求体函数
}
```

4. 响应json数据自动解析为js

```javascript
 <script>

    function testGet() {
      axios({
        url: 'http://localhost:3000/posts',
        method: 'GET',
        params: {
          id: 1,
          xxx: 'abc'
        }
      }).then(
        response => {
          console.log(response);
        },
        error => {
          console.log(error.message);

        }
      )
    }
    function testPost() {
      axios({
        url: 'http://localhost:3000/posts',
        method: 'POST',
        data: {
          "title": "json-server---1",
          "author": "typeicode---"
        }

      })
    }

    function testPut() {
      axios({
        url: 'http://localhost:3000/posts/1',
        method: 'put',
        data: {
          "title": "json-server+++",
          "author": "typecode+++"
        }
      }).then(
        response => {
          console.log(response);
        },
        error => {
          alert(error.message)
        }
      )
    }
    function testDelete() {
      axios({
        url: 'http://localhost:3000/posts/2',
        method: 'delete',
      }).then(
        response => {
          console.log(response);
        },
        error => {
          alert(error.message)
        }
      )
    }
    /* 
    1. 函数的返回值为promise，成功的结果为response，异常的结果为error
    2. 能处理多种类型的请求:GET/POST/PUT/DELETE
    3. 函数的参数为一个配置对象
  
            url:'',//请求地址
            method:'',//请求方式GET/POST/PUT/DELETE
            params:{},//GET/DELETE请求的query参数
            data:{},//POST或DELETE请求的请求体函数
        }
  
    4. 响应json数据自动解析为js的对象/数组
     */
    function axios({
      url,
      method = 'GET',
      params = {},
      data = {}
    }) {//解构函数params可省略
      //返回一个promise 对象
      return new Promise((resolve, reject) => {
        //处理method
        method = method.toUpperCase()

        //处理query参数(拼接到url上) id=1&xxx=abc
        /* 
        {
          id:1,
          xxx:'abc'
        }
         */
        let queryString = ''
        Object.keys(params).forEach((key) => {
          params[key]
          queryString += `${key}=${params[key]}&`
        })
        if (queryString) {
          //去除最后的&
          //substring浅拷贝
          queryString = queryString.substring(0, queryString.length - 1)
          //接到url
          url += '?' + queryString
        }
        //1.执行异步ajax请求
        //创建xhr对象
        const request = new XMLHttpRequest()
        //打开连接
        request.open(method, url, true)//方式，url，是否异步


        //发送请求
        // 判断是否是GET请求,就不传数据过去
        if (method === 'GET' || method ==='DELETE') {
          request.send()
        } else if (method === 'POST' || method==='PUT') {
          //告诉服务器请求体的格式是json
          request.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
          //把json数据改成字符串
          request.send(JSON.stringify(data))//发送json格式请求体参数
        }

        //绑定状态改变的监听，注意这个是监听。。。。
        //因为request.send()是异步的，所以下面同步代码放在哪里都可以
        request.onreadystatechange = function () {
          //如果请求没完成，直接结束
          if (request.readyState !== 4) {
            return
          }
          //如果响应状态码在[200,300)之间代表成功，否则失败
          //2.1.如果请求成功了，调用resolve(0
          const { status, statusText } = request
          if (status >= 200 && status <= 299) {
            //准备结果数据对象response
            const response = {
              data: JSON.parse(request.response),
              status,
              statusText
            }
            //这个是给浏览器看的
            resolve(response)
          } else {
            //2.2.如果请求失败了，调用reject()
            reject(new Error('request error status is ' + status))
          }
        }
      })
    }
  </script>
```



# 第三章：axios的理解和使用

## axios是什么？

1. 前端最流行的ajax请求库
2. react/vue官方都推荐使用axios发ajax请求
3. 文档:https://github.com/axios/axios

## axios特点

1. 基本promise的异步ajax请求库
2. 浏览器端/node端都可以使用
3. 支持请求/响应拦截器
4. 支持请求取消
5. 请求/响应数据转换
6. 批量发送多个请求

## axios常用语法

axios(config):通用/最本质的发送任意类型请求的方式

axios(url[,config]):可以只指定url发get请求

axios.request(config):等同于axios(config)

axios.get(url[,config]):发get请求

axios.delete(url[,config]):发delete请求

axios.post(url[,data,config]):发post请求

axios.put(url[,data,config]):发put请求



axios.defaults.xxx:请求的默认全局配置

axios.interceptors.request.use():添加请求拦截器

axios.interceptors.reponse.use():添加响应拦截器



axios.create([config]):创建一个新的axios(它没有下面的功能)



axios.Cancel():用于创建取消请求 的错误对象

axios.CancelToken():用于创建取消请求的token对象

axios.isCancel():是否是一个取消请求的错误

axios.all(promises):用于批量执行多个异步请求 

axios.spread():用来指定接收所有成功数据的回调函数的方法

```html
<body>
  <div>
    <button onclick="testGet()">GET请求</button>
    <button onclick="testPost()">POST请求</button>
    <button onclick="testPut()">PUT请求</button>
    <button onclick="testDelete()">DELETE请求</button>
  </div>
  <script src="https://cdn.bootcss.com/axios/0.19.0/axios.min.js"></script>
  <script>
    //指定默认配置
    axios.defaults.baseURL = 'http://localhost:3000'
    function testGet() {
      // axios.get('http://localhost:3000/posts?id=1')
      axios({
        url:'/posts',
        params:{
          id:1
        }
      })
        .then((response) => {
          console.log('/posts', response.data);

        })
    }
    function testPost() {
      // axios.post('/posts', { "title": "json-server", "author": "typicode" })
      axios({
        url:'/posts',
        method:'post',
        data: { "title": "json-server12", "author": "typicode" }
      })
        .then(response => {
          console.log('/posts post', response);

        },
        
        )
    }

    function testPut() {
      axios.put('/posts/4', { "title": "json-server3", "author": "typicode3" })
    }
    function testDelete(params) {
      axios.delete('/posts/4')
    }
  </script>
</body>

```

## 难点语法的理解和使用

### axios.create(config)

1. 根据指定配置创建一个新的axios,也就是每个新axios都有自己的配置

2. 新axios只是没有取消请求和批量发请求的方法，其他所有语法都是一致的

3. 为什么要设计这个语法？

   1. 需求，项目中有部分接口需要的配置与另一部分接口的需要的配置不太一样，如何处理
   2. 解决：创建2个新axios，每个都有自己特有对的配置，分别应用到不同 要求的接口请求中

   

```javascript
  <script src="https://cdn.bootcss.com/axios/0.19.0/axios.min.js"></script>
  <script>

  const instance = axios.create({
    baseURL:'http://localhost:3000'
  })
  //使用instance发请求
  instance({
    url:'/posts'
  })
  const instance1 = axios.create({
    baseURL:'http://localhost:4000'
  })
  //使用instance发请求
  instance1.get('/posts')
  </script>
```

### 拦截器

1. 说明：调用axios()并不是立即发送ajax请求，而是需要经历一个较长的流程
2. 流程：请求拦截器2=> 请求拦截器1=>发ajax请求 =>响应拦截器1=>响应拦截器2=>请求的回调
3. 注意：此流程是通过promise串联起来的，请求拦截器传递的是config,响应拦截器传递的是response

```javascript
 <script>
    //添加请求拦截器(回调函数)
    axios.interceptors.request.use(
      config => {
        console.log('request interceptor1 onResolved()')
        return config
      },
      error => {
        console.log('request error2 onRejected()');
        return Promise.reject(error)
      }
    )
    //添加请求拦截器(回调函数)
    axios.interceptors.request.use(
      config => {
        console.log('request interceptor2 onResolved()')
        return config
      },
      error => {
        console.log('request error2 onRejected()');
        return Promise.reject(error)
      }
    )
    //添加响应拦截器
    axios.interceptors.response.use(
      response => {
        console.log('response interceptor1 onResolved()');
        return response
      },
      error => {
        console.log('response interceptor1 onRejected()');
        return Promise.reject(error)
      }
    )
    //添加响应拦截器
    axios.interceptors.response.use(
      response => {
        console.log('response interceptor2 onResolved()');
        return response
      },
      error => {
        console.log('response interceptor2 onRejected()');
        return Promise.reject(error)
      }
    )
    axios.get('http://localhost:3000/posts')
      .then((response) => {
        console.log('data', response.data);

      }).catch((err) => {
        console.log('err', err.message);
      });
  </script>
```

### 取消请求

1. 基本流程

   配置cancelToken对象

   缓存用于取消请求的cancel函数

   在后面特定时机调用cancel函数取消请求

   在错误回调中判断如果error是cancel，做相应处理

2. 实现功能

   点击按钮，取消某个正在请求中的请求

   在请求一个接口前，取消前面一个未完成的请求

#### 1

```html
<body>
  <button onclick="getProducts1()">获取商品列表1</button>
  <button onclick="getProducts2()">获取商品列表2</button>
  <button onclick="cancelReq()">取消请求</button>
  <script src="https://cdn.bootcss.com/axios/0.19.0/axios.min.js"></script>
  <script>
    let cancel//用于保存取消请求的函数
    function getProducts1() {
      axios({
        url: 'http://localhost:4000/products1',
        cancelToken: new axios.CancelToken((c) => {//c是用于取消当前请求的函数
          //保存取消函数，用于之后可能需要取消当前请求
          cancel = c
        })
      }).then(
        response => {
          cancel = null
          console.log('请求1成功了', response.data)
        },
        error => {
          cancel = null
          console.log('请求1失败了',error.message)
        }
      )
    }
    function getProducts2() {
      axios({
        url: 'http://localhost:4000/products2'
      }).then(
        response => {
          cancel = null
          console.log('请求2成功了', response.data);
        },
        error => {
          cancel = null
          console.log('请求2失败了', error.message);
        }
      )
    }
    function cancelReq() {
      //执行取消请求的函数
      if (typeof cancel === 'function') {
        cancel('强制取消请求')
      } else {
        console.log('没有可取消的请求')
      }
    }
  </script>
</body>

```

#### 2

```html
<body>
  <button onclick="getProducts1()">获取商品列表1</button>
  <button onclick="getProducts2()">获取商品列表2</button>
  <button onclick="cancelReq()">取消请求</button>
  <script src="https://cdn.bootcss.com/axios/0.19.0/axios.min.js"></script>
  <script>
    //添加请求拦截器
    axios.interceptors.request.use(config => {
      //在准备发请求前，取消未完成的请求
      if (typeof cancel === 'function') {
        cancel('取消请求')
      }
      config.cancelToken = new axios.CancelToken((c) => {//c是用于取消当前请求的函数
        //保存取消函数，用于之后可能需要取消当前请求
        cancel = c
      })
      return config
    })

    //添加响应拦截器
    axios.interceptors.response.use(
      response => {
        cancel = null
        return response
      },
      error => {
        if (axios.isCancel(error)) {//取消请求的错误处理
          console.log('请求取消的错误', error.message)
          //中断promise链
          return Promise(() => { })
        } else {
          cancel = null
          //将错误向下传递
          //throw error
          return Promise.reject(error)
        }

      }
    )

    let cancel//用于保存取消请求的函数
    function getProducts1() {
      axios({
        url: 'http://localhost:4000/products1',
      }).then(
        response => {
          console.log('请求1成功了', response.data)
          
        },
        error => {//只要处理请求失败的情况，取消请求的错误不做处理
          console.log('请求1失败', error.message)
        }
      )
    }
    function getProducts2() {
      axios({
        url: 'http://localhost:4000/products2',
      }).then(
        response => {
          console.log('请求2成功了', response.data);
        },
        error => {
          console.log('请求2失败', error.message)
        }
      )
    }
    function cancelReq() {
      //执行取消请求的函数
      if (typeof cancel === 'function') {
        cancel('强制取消请求')
      } else {
        console.log('没有可取消的请求')
      }
    }
  </script>
</body>
```

# 第四章：axios源码分析

## 源码目录结构

├── /dist/ 										# 项目输出目录 

├── /lib/ 											# 项目源码目录 

│ ├── /adapters/ 							# 定义请求的适配器 xhr、http 

│ │ ├── http.js 								# 实现 http 适配器(包装 http 包) 

│ │ └── xhr.js 								# 实现 xhr 适配器(包装 xhr 对象) 

│ ├── /cancel/ 								# 定义取消功能 

│ ├── /core/ 									#一些核心功能 

│ │ ├── Axios.js 							# axios 的核心主类 

│ │ ├── dispatchRequest.js 		# 用来调用 http 请求适配器方法发送请求的函数 

│ │ ├── InterceptorManager.js # 拦截器的管理器 

│ │ └── settle.js 							# 根据 http 响应状态，改变 Promise 的状态 

│ ├── /helpers/ 							# 一些辅助方法 

│ ├── axios.js  								# 对外暴露接口 

│ ├── defaults.js 							# axios 的默认配置 

│ └── utils.js 									# 公用工具 

├── package.json 							# 项目信息 

├── index.d.ts 								# 配置 TypeScript 的声明文件 

└── index.js 									# 入口文件

## 源码分析 

### axios与Axios的关系

1. 从语法上来说:axios不是Axios的实例
2. 从功能上来说:axios是Axios的实例
3. axios是Axios.prototype.request函数bind()返回的函数
4. axios作为对象有Axios原型对象上的所有方法，有Axios对象上所有属性

### instance与axios的区别

1. 相同：
   1. 都是一个能发任意请求的函数:request(config)
   2. 都能发特定请求的各种方法:get()/post()/put()/delete()
   3. 能有默认配置和拦截器的属性:default/interceptors
2. 不同
   1. 默认匹配的值很可能不一样
   2. instance没有axios后面添加的一些方法：create()/CancelToken()/all()

### axios运行的整体流程

![](\images\axios流程图.png)

1. 整体流程：

   request(config) ==> dispatchRequest(config) ==> xhrAdapter(config)

2. request(config)

   将请求拦截器/dispatchRequest()/响应拦截器 通过promise链串联连起来，返回promise

3. distpatchRequest(config):

   转换请求数据 ==> 调用xhrAdapter()发请求 ==> 请求返回后转换响应数据，返回promise

4. xhrAdapter(config)

   创建XHR对象，根据config进行相应设置，发送特定请求，并接受响应数据，返回promise

### axios的请求/响应拦截器是什么

![](\images\请求响应拦截器.png)

1. 请求拦截器：

   在真正发送请求前执行的回到函数

   可以对请求进行检查或配置进行特定处理

   成功的回调函数，传递的默认是config(也必须是)

   失败的回调函数，传递的默认是error

2. 响应拦截器

   在请求得到响应后执行的回调函数

   可以对响应数据进行特定处理

   成功的回到函数，传递的默认是response

   失败的是回调函数，传递的默认是error

### axios的请求/响应数据转换器是什么

1. 请求转换器:对请求头和请求体数据进行特定处理的函数

   ```javascript
   //如果data是对象，指定请求体参数格式为json，并将参数数据对象转换为json  
   if (utils.isObject(data)) {
         setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
         return JSON.stringify(data);
     }
   ```

2. 响应转换器：将响应体json字符串解析为js对象或数据的函数

```javascript
response.data = JSON.parse(response.data)
```

### response的整体结构

```javascript
 {
        data,
        status,
        statusTextt,
        headers,
        config,
        request
   }
```

### error的整体结构

```javascript
{
    message,
    response,
    request
}
```

### 如果取消未完成的请求?

1. 当配置了cancelToken对象时，保存cancel函数
   1. 创建一个用于将来中断请求的cancelPromise
   2. 并定义了一个用于取消请求的cancel函数
   3. 将cancel函数传递出来
2. 调用cancel()取消请求
   1. 执行cancel函数，传入错误message
   2. 内部会让cancelPromise变为成功，且成功的值为一个Cancel对象
   3. 在cancelPromise的成功回调中中断请求，并让发请求的promise失败，失败的reason为Cancel对象