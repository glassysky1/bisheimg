## redis的概念&安装

http://www.drv5.cn/sfinfo/16647.html#softdown

<https://blog.csdn.net/leisure_life/article/details/82078233> 





## 启动

```shell
进目录直接运行长得很正宗的那个
```

## 安装中间件

```shell
cnpm i koa-generic-session koa-redis
```

## 引用

```javascript
const session = require('koa-generic-session') // 用来处理koa和 session操作的中间件
const Redis = require('koa-redis')// 用来处理koa和 redis服务的中间件
// 将程序（包括session）与redis进行连接
app.keys=['keys','keyskeys']
app.use(session({
  key:'mt',
  prefix:'mtpr' // 通过 key 和 prefix 可以改变用户在cookie中存储session的名称
  store:new Redis()
}))
```

在m1中

```javascript
  ctx.session.count++
```

查看值(进redis)

```shell
key *
```

进users.js

```javascript
const Redis =require('koa-redis')

const Store = new Redis().client// 新建 Redis 客户端---通过Store对象拿到Redis客户端
// 这个客户端就是我们的服务器程序
// 直接操作redis数据库
router.get('/fix',async function (ctx) {
 // hset 是 redis的一个命令
  const st = await Store.hset('fix','name',Math.random())
  ctx.body={
    code:0
  }
})
//请求fix

```

进redis

```shell
127.0.0.1:6379> keys *
1) "koa:sess:FMB8yTd3AJnnjIv6jqwnjvIKCxX1oj1l"
2) "fix"
3) "koa:sess:yo62bPeERU73zsZ_i4HkRbRfls60glHK"
127.0.0.1:6379> hget fix name
"0.5615465578402061"
127.0.0.1:6379>

```

不懂