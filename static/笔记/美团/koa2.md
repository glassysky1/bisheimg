## 开始

安装

```shell
cnpm install -g koa-generator
```

创建项目 -e是ejs模板 并安装依赖

```shell
koa2 -e koa2-learn
```

执行命令

```shell
cnpm run dev//可以读到路由 glabal.console.log('d')的d
```

## async和await语法

### 异步的概念

想做一件事情，是不是现在执行，过一段时间执行，但不知道结果，知道执行后才知道结果

### 注意点

+ 函数有await，外部函数必须有async,但外部函数有async，内部可以没有await

+ 和promise区别

  + promise都是.then,的级联操作

  + ```javascript
    //await用同步的写法，完成异步的过程
    router.get('/', async (ctx, next) => {
      const a = await A
      const b = await B
      global.console.log(a,b)
      await ctx.render('index', {
        title: 'Hello Koa 2!'
      })
    })
    ```

  + 

## koa中间件

原理：先接受浏览器请求，在给浏览器响应,引用顺序不一样，但是执行顺序没差别

![](images\中间件.png)

创建 middleware

```javascript
function pv(ctx) {
  global.console.log('pv',ctx.path)
}

//导出是函数有，因为app.js里面use的是函数(如 app.use(json()))

module.exports = function () {
  return async function (ctx,next) {
    //当前中间件运行完，
    pv(ctx)
    //交给下一个处理
    await next()
  }
}
```

app.js

```javascript
const pv = require('./middleware/koa-pv')
app.use(pv())

/** 中间件原理：
 *  koa 框架---是服务端框架----服务端应用程序----接收浏览器发出的应用请求----中间件----响应请求
*
 *   洋葱图
 *   1.顺序：
 *    中间件的引用顺序跟代码顺序可以不一致
 *   middleware 目录下-----有中间件实例
* */

```

### 洋葱模式

```javascript
function m1(ctx) {
  global.console.log('m1')
}

//导出是函数有，因为app.js里面use的是函数(如 app.use(json()))

module.exports = function () {
  return async function (ctx,next) {
    //进入这个圈开始，把它看成洋葱的最外层
    global.console.log('m1 start')
    //处理过程
    m1(ctx)
    //叫给下一个中间件，倒数第二个圈
    await next()
    //出这个圈，把它看成最外层
    global.console.log('m1 end')
  }
}
```

```javascript
function m2(ctx) {
  global.console.log('m2')
}

//导出是函数有，因为app.js里面use的是函数(如 app.use(json()))

module.exports = function () {
  return async function (ctx, next) {
    //进这个圈，看成第二层
    global.console.log('m2 start')
    //处理函数
    m2(ctx)
    //交给里面那个圈
    await next()
    //出这个圈
    global.console.log('m2 end')
  }
}
```

```she
m1 start//外圈
m1//外圈
m2 start//二圈
m2//二圈
m3 start
m3
  <-- GET /stylesheets/style.css
m3 end
m2 end//二圈
m1 end//外圈
```

## koa路由

```javascript
const router = require('koa-router')()

//prifex('/users)
//意味着你当下所有的接口，在加上这个路径，才能显示
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router

```

```javascript
//若要是页面渲染，用await，接口则不用
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  //渲染页面
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  //返回接口
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router

```

## cookie和session

```javascript
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  //渲染页面
  //种一个cookies
  ctx.cookies.set('pvid',Math.random())
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  //返回接口
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
      //获取cookies
    cookie:ctx.cookies.get('pvid')
  }
})

module.exports = router

```

