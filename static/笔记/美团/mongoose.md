## 开始

查看是否安装成功

```shell
which mongod
```

启动服务

```shell
mongod
```

可视化工具，studio 3T

## 步骤(不支持es6)

Schema描述于表中的字段，model是具备了对数据的行为和操作

在服务端目录下建立dbs/config.js

```javascript
// 数据库配置文件 config.js---用来声明数据库的配置选项
module.exports = {
    dbs: 'mongodb://127.0.0.1:27017/dbs'
    // 协议为 mongodb，地址是127.0.0.1，端口号是27017，数据库是dbs
}


```

dbs/models/person.js

```javascript
const mongoose = require('mongoose')

// 声明一个schema---描述表中的字段
// 在 Mongoose 中，所有东西都从一个 Schema 开始。
let personSchema = new mongoose.Schema({
    name: String,
    age: Number
})

// 由schema生成一个model并导出
// 在 Mongoose 中，模型是通过已定义的 Schema 生成
module.exports = mongoose.model('Person', personSchema)

/**
*  知识点：
 *  数据库--->数据表--->model---->schema
 *   dbs    person.js   Person     name,age字段
 *
 *   注意数据表的名字，默认为文件名---person.js
 *   所以models目录下的，文件名不要随便取，因为models目录下的文件名就是对象数据库里面的表的名字
 *
 *   mongoose: 集合collection----文档document----field
 *
 *   mysql: 表table----row ----column
* */
```

app.js

```javascript
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')
mongoose.set('useCreateIndex', true) //加上这个
//数据库进行连接
mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true,
  useUnifiedTopology: true
}) // 把koa服务与数据库服务进行连接
```

routes/users.js

```javascript
const Person = require('../dbs/models/person') // 引入模型model
//prifex('/users)
//意味着你当下所有的接口，在加上这个路径，才能显示
router.prefix('/users')
//开始post请求

// 1. 向数据库“增加”数据 --->实例.save()
// 定义一个接口: addPerson，接口类型为post，需要给接口传name和age字段
router.post('/addPerson', async function (ctx) {
  const person = new Person({
    //body是post才能用对的
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    await person.save()
    code = 0
  } catch (error) {
    code =1
  }
  ctx.body = {
    code:code
  }
})

```

```shell
curl -d 'name=lilei&&age=27' http://localhost:3000/users/addPerson    -d是post请求
```

## 增删改查

```javascript
const router = require('koa-router')()

const Person = require('../dbs/models/person')

//prifex('/users)
//意味着你当下所有的接口，在加上这个路径，才能显示
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

//开始post请求
router.post('/addPerson', async function (ctx) {
  const person = new Person({
    //body是post才能用对的
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    //用的是实例方法
    await person.save()
    code = 0
  } catch (error) {
    code =1
  }
  ctx.body = {
    code:code,
    person
  }
})

router.post('/getPerson',async function (ctx) {
  //用的是静态方法
  const result = await Person.findOne({name:ctx.request.body.name})
  const results = await Person.find({name:ctx.request.body.name})
  ctx.body ={
    code :0,
    result,
    results
  }
})

router.post('/updatePerson',async function (ctx) {
  //更新第一条
  const result = await Person.where({
    name:ctx.request.body.name
  }).update({

    //updateMany是更新多条
    age:ctx.request.body.age
  },)
  ctx.body={
    code:0,
    result
  }
})
//删除
router.post('/removePerson',async function (ctx) {
  const result = await Person.where({
    name:ctx.request.body.name
  }).remove()
  ctx.body={
    code:0
  }
})

module.exports = router

```

