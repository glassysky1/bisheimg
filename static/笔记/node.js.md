###day02

js中

```javascript
//模板引擎只关系字符串
var http = require('http')
var fs = require('fs')
var template = require('art-template')

var server = http.createServer()

var wwwDir = 'D:/Movie/www'

server.on('request', function (req, res) {
  var url = req.url
  fs.readFile('./template-apache.html', function (err, data) {
    if (err) {
      return res.end('404 Not Found.')
    }
    // 1. 如何得到 wwwDir 目录列表中的文件名和目录名
    //    fs.readdir
    // 2. 如何将得到的文件名和目录名替换到 template.html 中
    //    2.1 在 template.html 中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
    //    2.2 根据 files 生成需要的 HTML 内容
    // 只要你做了这两件事儿，那这个问题就解决了
    fs.readdir(wwwDir, function (err, files) {
      if (err) {
        return res.end('Can not find www dir.')
      }

      // 这里只需要使用模板引擎解析替换 data 中的模板字符串就可以了
      // 数据就是 files
      // 然后去你的 template.html 文件中编写你的模板语法就可以了
      var htmlStr = template.render(data.toString(), {
        title: '哈哈',
        files: files
      })

      // 3. 发送解析替换过后的响应数据
      res.end(htmlStr)
    })
  })
})
server.listen(3000, function () {
  console.log('running...')
})

```

html中

```html
 <title id="title">{{ title }}</title>
 {{each files}}
      <tr>
        <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">{{$value}}/</a></td>
        <td class="detailsColumn" data-value="0"></td>
        <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
      </tr>
      {{/each}}
```

小案例
```javascript
http
  .createServer(function (req, res) { // 简写方式，该函数会直接被注册为 server 的 request 请求事件处理函数
    // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
    var parseObj = url.parse(req.url, true)

    // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
    var pathname = parseObj.pathname

    if (pathname === '/') {
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        var htmlStr = template.render(data.toString(), {
          comments: comments
        })
        res.end(htmlStr)
      })
    } else if (pathname === '/post') {
      // 其它的都处理成 404 找不到
      fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else if (pathname.indexOf('/public/') === 0) {
      // /public/css/main.css
      // /public/js/main.js
      // /public/lib/jquery.js
      // 统一处理：
      //    如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源
      //    所以我们就直接可以把请求路径当作文件路径来直接进行读取
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else if (pathname === '/pinglun') {
      // 注意：这个时候无论 /pinglun?xxx 之后是什么，我都不用担心了，因为我的 pathname 是不包含 ? 之后的那个路径
      // 一次请求对应一次响应，响应结束这次请求也就结束了
      // res.end(JSON.stringify(parseObj.query))

      // 我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串给解析成一个对象了
      // 所以接下来要做的就是：
      //    1. 获取表单提交的数据 parseObj.query
      //    2. 将当前时间日期添加到数据对象中，然后存储到数组中
      //    3. 让用户重定向跳转到首页 /
      //       当用户重新请求 / 的时候，我数组中的数据已经发生变化了，所以用户看到的页面也就变了
      var comment = parseObj.query
      comment.dateTime = '2017-11-2 17:11:22'
      comments.unshift(comment)
      // 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了

      // 如何通过服务器让客户端重定向？
      //    1. 状态码设置为 302 临时重定向
      //        statusCode
      //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
      //        setHeader
      // 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求
      // 所以你就能看到客户端自动跳转了
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    } else {
      // 其它的都处理成 404 找不到
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function () {
    console.log('running...')
  })

```

###express

安装

```shell
cnpm init -y
cnpm i -S express
```



```javascript
var express = require('express')
var fs = require('fs')
var app = express()

//静态公共目录
app.use('/public/',express.static('./public/'))

app.get('/',function (req,res) {
    fs.readFile('./index.html',function (err,data) {
        if(err){
            return res.end('Not Found 404')
        }
        res.end(data)
    })
})

app.listen(3000,function () {
    console.log('runing....');
    
})
```
安装nodemon自动重启****
```shell
cnpm install --global nodemon
```

**基本路由*

get:

```javascript
//当你以GET方法请求/的时候就，执行对应的处理函数
app.get('/',function(req,res){
    res.send('Hello World')
})
```



post:

```javascript
//当你以POST方法请求/的时候就，执行对应的处理函数
app.get('/',function(req,res){
    res.send('Hello World')
})
```

路由表：

```javascript
app
	.get('/login',函数)
	.get('/adasd',函数)
	.post('/dfds/fds'，函数)
```

#####**在Express中配置使用art-template模板引擎**

安装：

```shell
cnpm install --save art-template
cnpm install --save express-art-template
```

配置：

```javascript
app.engine('html',require('express-art-template'))
```

使用：

```javascript
app.get('/'，function(req,res){
    //express默认目录会去项目中的views目录找index.html
    res.render('index.html',{
        title:'hello world'
    })
})
```

如果希望修改默认的**views**视图渲染存储目录，可以:

```javas
app.set('views',目录路径)
```



重写小案例

```javascript

var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use('/public/', express.static('./public/'))

// 配置使用 art-template 模板引擎
// 第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
// 虽然外面这里不需要记载 art-template 但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template
app.engine('html', require('express-art-template'))

// Express 为 Response 相应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中

// 如果想要修改默认的 views 目录，则可以
// app.set('views', render函数的默认路径)

// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var comments = [{
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

app.get('/', function (req, res) {
  res.render('index.html', {
    comments: comments
  })
})

app.get('/post', function (req, res) {
  res.render('post.html')
})

// 当以 POST 请求 /post 的时候，执行指定的处理函数
// 这样的话我们就可以利用不同的请求方法让一个请求路径使用多次
app.post('/post', function (req, res) {
  // 1. 获取表单 POST 请求体数据
  // 2. 处理
  // 3. 发送响应

  // req.query 只能拿 get 请求参数
  // console.log(req.query)

  var comment = req.body
  comment.dateTime = '2017-11-5 10:58:51'
  comments.unshift(comment)

  // res.send
  // res.redirect
  // 这些方法 Express 会自动结束响应
  res.redirect('/')
  // res.statusCode = 302
  // res.setHeader('Location', '/') 
})

// app.get('/pinglun', function (req, res) {
//   var comment = req.query
//   comment.dateTime = '2017-11-5 10:58:51'
//   comments.unshift(comment)
//   res.redirect('/')
//   // res.statusCode = 302
//   // res.setHeader('Location', '/')
// })

app.listen(3000, function () {
  console.log('running...')
})

```



##### 在Express获取表单GET请求参数

```javascript
req.query
```



#####在Express获取表单POST请求体数据

在Express中没有内置获取表单POST请求体的API，需要一个第三方包:body-parser

安装：

```shell
cnpm install --save body-parser
```

配置：

```javascript
var express = require('express')
var app = express()

var bodyParser = require('body-parser')
//配置 body-parser
//只要加入这个配置，则在req请求对象上会多出来一个属性:body
//也就是说你就可以直接通过req.body来获取表单POST请求体数据了
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
   //可以通过req.body来获取表单POST
  res.end(JSON.stringify(req.body, null, 2))
})
```

Json数据：

```json
{
    "student":[
        {
            "id":1,
            "name":"daixiao",
            "gender":0,
            "age":18,
            "hobbies":"吃饭睡觉打豆豆"
        },
        {
            "id": 1,
            "name": "daixiao",
            "gender": 0,
            "age": 18,
            "hobbies": "吃饭睡觉打豆豆"
        },
        {
            "id": 1,
            "name": "daixiao",
            "gender": 0,
            "age": 18,
            "hobbies": "吃饭睡觉打豆豆"
        }
    ]
}
```

##### 利用Express添加路由

router.js

```javascript
//Express提供了一种更好的方式
//专门用来包装路由
var express = require('express')
//1.创建一个路由
var router = express.Router()
//2.把路由器挂载到router路由容器中
router.get('/students',function(req,res){
    
})
//3.把router导出
module.exports = router

```

app.js

```javascript
//引入路由
var router = require('./router')
//把路由器你挂载到app服务中
app.use(router)
```

##### 设计操作数据的API文件模块

```java
/**
/** 
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的 数据，只处理数据，不关心业务
*/

/**
 * 
 * 获取所有学生列表
 * return[]
 */

exports.find = function () {

}

/**
 * 添加保存学生
 */
exports.save = function () {

}

/**h
 *更新学生 
 */

exports.update = function () {

}

/**
 * 删除学生
 * 
 */
exports.delete = function () {

}
/
```

##### 获取异步操作的结果

```javascript
function add(x,y,callback){
    setTimeout(function(){
        var ret = x + y
        callback(ret)
    })
}
add(10,30,function(ret){
    console.log(ret)
})
```

##### 在express配置使用`express-session`插件

> 参考文档:https://github.com/expressjs/session

安装:

```shell
cnpm install express-session
```

配置:

```javascript
//该插件会为req请求大对象添加一个成员:req.session 默认是一个对象
//这是最简单的配置方式，暂且先不用关心里面参数的含义
aap.use(session({
	//配置加密字符串，它会在原有加密基础上和和这个字符串拼接起来加密
    //目的是为了增强安全性，防止客户端恶意伪造
    secret: 'itcast',
    resave:false,
    saveUninitialized:false//无论你是否使用Session,我都会默认直接给你分配一把钥匙
}))
```

使用：

```javascript
//添加 Session 数据
req.session.foo = 'bar'

//获取 Session 数据
req.session.foo
```

提示:默认 Session数据是内存存储的，服务器一旦重启就会丢失，真正的生产环境会把Session进行持久化存储

### MongoDB

####启动和关闭数据库

启动：

```javascript
# mongodb 默认使用执行 mongod 命令所处盘符根目录下的 /data/db作为自己的数据存储目录
#所以在第一次执行该命令之前先做自己手动新建一个目录 /data/db
mongod
```

如果想要修改默认的数据存储目录，可以:

```shell
mongod --dbpath=数据存储目录路径
```

停止：

```
在开启服务的控制台，直接 ctrl+c即可停止
或者直接关闭开启服务的控制台也可以
```

####连接和退出

连接:

```shell
# 该命令默认连接本机的 MOngoDB服务
mongo
```

退出:

```shell
#在连接状态输入 exit 退出连接
exit
```

#### 基本命令

+ `show dbs`
  + 查看显示所有数据库
+ `db`
  + 查看当前操作的数据库
+ `ues 数据库名称`
  + 切换到指定的数据(如果没有回新建)
+ 插入数据
  + 

#### 在Node中如何操作MongoDB数据

##### 使用官方的包里操作

> https://github.com/mongodb/node-mongodb-native

##### 使用第三方mongoose来操作MongoDB数据库

第三方包:`mongoose`基于MongoDB官方的`mongodb`包再一次做了封装

+ 网址: <https://mongoosejs.com/> 

##### MongoDB数据库的基本概念

+ 可以有多个数据库
+ 一个数据库有多个集合(表)
+ 一个集合中可以有多个文档(表记录)
+ 文档结构很灵活，没有任何限制
+ MongoDB非常灵活，不需要像MySQL一样先创建数据库、表、设计表结构
  + 在这里只需要：当你需要插入数据的时候，只需要指定往哪个数据库的哪个集合操作就可以了
  + 一切都又MongoDB来帮你自动完成建库

```javascript
//MongoDB是一个大对象
{
    //创一个qq数据库
    qq:{
        //集合就是mysql里面的表
        //集合就是数组
        users:[
           	//每一条对象相当于一条记录
            //记录就是文档
            {name:'张三'，age:15},
            {name:'李四'，age:20},
            {name:'王五'，age:15}
        ]，
        products:[
            
        ]
    }
    //淘宝数据库
    taobao:{
        
    }
}
```

安装:

```shell
cnpm i mongoose
```

hello world:

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

**设计Schema，发布model**

```javascript
var mongoose = require('mongoose')

//架构
var Schema = mongoose.Schema
//1.连接数据库
mongoose.connect('mongodb://localhost/itcast',{ useNewUrlParser: true })

//2.设计集合结构(表结构)
//约束
var userSchema = new Schema({
   username:{
       type:String,
       required:true
   },
   password:{
       type:String,
       required:true
   },
   email:{
    type:String
   }
});

//3.将文档架构发布为模型
// mongoose.model方法就是将一个架构发布为model
//第一个参数:插入一个大写名词数字串用来表示你的数据库名称
//          mongoose会自动将大写名词的字符串生成 小写复数 的集合名称
//          例如这里的 User 最终会变为 users 集合名称
//第二个参数:结构 Schema

// 返回值: 模型构造函数
var User = mongoose.model('User',userSchema)

//4.当我们有了模型构造函数，就可以使用这个构造函数对users集合中的数据为所欲为了 

//module.exports = mongoose.model('Student', studentSchema)
```

**添加数据**

```javascript
var admin = new User({
    username:'admin',
    password:'123456',
    email:'admin@admin.com'
})
admin.save(function (err,ret) {
    if(err){
        console.log('保存失败');
        
    }else{
        console.log('保存成功');
        console.log(ret);
        
        
    }
})
```

**查询数据**

查询所有:

```javascript
User.find(function (err,ret) {
    if(err){
        console.log('查询失败');
        
    }else{
        console.log(ret);
        
    }
})
```

按条件查询所有:

```javascript
User.find({
    username:'zs'
}，function (err,ret) {
    if(err){
        console.log('查询失败');
        
    }else{
        console.log(ret);
        
    }
})
```

按条件查询单个

```javascript
User.findOne({
    username:'zs'
},function (err,ret) {
    if(err){
        console.log('查询失败');
        
    }else{
        console.log(ret);
        
    }
})
```

**删除数据**

```javascript
//删除数据
User.remove({
    username:'zs'
},function (err,ret) {
    if(err){
        console.log('删除失败');
        
    }else{
        console.log('删除成功');
        console.log(ret);
        
    }
})
```

**更新数据**

```javascript
//更新数据
// User.findByIdAndUpdate('5d1f42b51e782a28d4902c99',{
//     password:'123'
// },function (err,ret) {
//     if(err){
//         console.log('更新失败');   
//     }else{
//         console.log('更新成功');
        
//     }
// })
```

### 用node.js操作MySQL

安装:

```shell
npm install --save mysql
```

开始：

```javascript
var mysql = require('mysql');
//1.创建连接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'baixiu-dev'
});
//2.连接数据库
connection.connect();
//3.执行数据操作
connection.query('select *from `users`', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});
//关闭连接
connection.end();
```



### 异步编程

无法保证顺序的代码

未来解决以上编码方式带来的问题(回调地狱嵌套),所以在EcmaScript6中新增了一个API:`Promise`

promise基本语法:

```javascript
var fs = require('fs')
//在 EcmaScript 6 中新增了一个API Promise
//Promise 是一个构造函数

var p2 = new Promise(function (resolve, reject) {
    fs.readFile('./b.txt', 'utf8', function (err, data) {
        if (err) {
            //把容器的Pending状态改为Rejected
            //调用reject就相当于调用了then方法的第二个参数函数
            reject(err)

        } else {
            //承诺容器中的任务成功了
            //把容器的Pending状态改成成功 Resolved
            //也就是说这里调用的 resolve 方法实际上就是 then方法传递的那个function
            resolve(data)
        }
    })
})

var p3 = new Promise(function (resolve, reject) {
    fs.readFile('./c.txt', 'utf8', function (err, data) {
        if (err) {
            //把容器的Pending状态改为Rejected
            //调用reject就相当于调用了then方法的第二个参数函数
            reject(err)

        } else {
            //承诺容器中的任务成功了
            //把容器的Pending状态改成成功 Resolved
            //也就是说这里调用的 resolve 方法实际上就是 then方法传递的那个function
            resolve(data)
        }
    })
})
//创建 Promise 容器
//1.给别人一个承诺 I promise you
// Promise容器一旦创建，就开始执行里面的代码
var p1 =  new Promise(function (resolve,reject) {
    fs.readFile('./a.txt','utf8',function (err,data) {
        if(err){
            //把容器的Pending状态改为Rejected
            //调用reject就相当于调用了then方法的第二个参数函数
            reject(err)
            
        }else{
            //承诺容器中的任务成功了
            //把容器的Pending状态改成成功 Resolved
            //也就是说这里调用的 resolve 方法实际上就是 then方法传递的那个function
            resolve(data)
        }
    })
})
//p1 就是那个承诺
//当 p1 成功了 然后(then)做指定的操作
//then 方法接收的 funciton 就是容器的 resolve函数
p1
  .then(function (data) {
      console.log(data);
      return p2
      //当teturn
  },function (err) {
      console.log('读取失败了');
      
  })
  .then(function (data) {
      console.log(data);
      return p3
  },function (err) {
    console.log('读取失败了');
      
  })
  .then(function (data) {
      console.log(data);
    
  },function (err) {
      console.log('读取失败了');
      
  })
```

封装后的`promise`版本

```javascript
var fs = require('fs')
function pReadFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                //把容器的Pending状态改为Rejected
                //调用reject就相当于调用了then方法的第二个参数函数
                reject(err)

            } else {
                //承诺容器中的任务成功了
                //把容器的Pending状态改成成功 Resolved
                //也就是说这里调用的 resolve 方法实际上就是 then方法传递的那个function
                resolve(data)
            }
        })
    })
}

pReadFile('./a.txt')
.then(function (data) {
    console.log(data);
    return pReadFile('./b.txt')
})
.then(function (data) {
    console.log(data);
    return pReadFile('./c.txt')
})
.then(function (data) {
    console.log(data);
    
})
```



### 综合案例

#### 目录结构

```shell
.
|--app.js			项目的入口文件
|--controllers
|--models			存储使用 mongoose 设计的数据模型
|--node_modules		第三方包
|--package.json		包描述文件
|--package-lock.json 第三方包版本锁定文件(npm 5 以后才有)
|--public			(公共的静态资源)
|--README.md		项目说明文档
|--routes
|__views			存储视图目录
```



#### 模板页

><https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF> 

#### 路由设计

| 路径      | 方法 | get参数 | post参数                  | 是否需要登陆 | 备注         |
| --------- | ---- | ------- | ------------------------- | ------------ | ------------ |
| /         | GET  |         |                           |              | 渲染首页     |
| /register | GET  |         |                           |              | 渲染注册页面 |
| /register | POST |         | email、nickname、password |              | 处理注册请求 |
| /login    | GET  |         |                           |              | 渲染登陆页面 |
| /login    | POST |         | email、password           |              | 处理登陆请求 |
| /logout   | GET  |         |                           |              | 处理退出请求 |

**注**：服务端重定向针对异步请求无效

装的东西:

```shell
cnpm i express
cnpm i body-parser
cnpm i express-session
cnpm i blueimp-md5
```

#### 模型设计

#### 功能实现

#### 书写步骤

+ 创建目录结构
+ 整合静态页-模板页
  + include
  + block
  + extend
+ 设计用户登录、退出、注册的路由
+ 用户注册
  + 先处理好客户端页面的内容(表单控件的name、收集表单数据、发起请求)
  + 服务端
    + 获取客户端表单请求数据
    + 操作数据库
    + 如果有错，发送 500 告诉客户端服务器错了
    + 其它的根据你的业务发送不同的响应数据
+ 用户登录
+ 用户退出