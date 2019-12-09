## TypeScript library starter

他是开源的TypeScript开发基础库的脚手架工具，可以帮助我们快速初始化一个TypeScript项目

###使用方式

```shell
git clone https://github.com/alexjoverm/typescript-library-starter.git
cnpm istall
```

### 关联远程仓库

```shell
git remote add origin git@github.com:glassysky1/ts-axios.git
git pull origin master
```



## 编写基础请求代码

### src/types/index.ts

```typescript
export type Method = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD' |
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
export interface AxiosRequestConfig {
  //请求地址
  url: string
  //请求方法，默认是get
  method?: Method
  //请求数据
  data?: any
  //请求参数
  params?: any
}
```

### src/xhr.ts

```typescript
import { AxiosRequestConfig } from './types';
export default function xhr(config: AxiosRequestConfig):void {
  //用config发送逻辑
  //结构赋值,给默认参数
  const { data = null, url, method = 'get' } = config

  //实例化定义一个request
  const request = new XMLHttpRequest()
  //方法名要大写，地址，是否异步
  request.open(method.toUpperCase(),url, true)

  //发送请求
  request.send(data)
}
```

### src/index.ts

```typescript
import { AxiosRequestConfig } from './types'
import xhr from './xhr';
function axios(config:AxiosRequestConfig):void {
  xhr(config)
}

export default axios
```

## 基础配置

### 首先我们先安装依赖

- webpack
- webpack-dev-middleware
- webpack-hot-middleware
- ts-loader
- tslint-loader
- express
- body-parser

```shell
npm install webpack webpack-dev-middleware  webpack-hot-middleware ts-loader tslint-loader express body-parser --save-dev
```

其中，webpack 是打包构建工具，webpack-dev-middleware 和 webpack-hot-middleware 是 2 个 express 的 webpack 中间件，ts-loader 和 tslint-loader 是 webpack 需要的 TypeScript 相关 loader，express 是 Node.js 的服务端框架，body-parser 是 express 的一个中间件，解析 body 数据用的。

编写webapck文件

### examples/webpack.config.js

```javascript
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  /**
   * 我们会在 examples 目录下建多个子目录
   * 我们会把不同章节的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),

  /**
   * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
   */
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
```

### examples/server.js

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)
const router = express.Router()

router.get('/simple/get', function (req, res) {
  res.json({
    msg: `hello world`
  })
})

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)


const port = process.env.PORT || 8081
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

```

### examples/global.css

```css
html, body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #2c3e50;
}

ul {
  line-height: 1.5em;
  padding-left: 1.5em;
}

a {
  color: #7f8c8d;
  text-decoration: none;
}

a:hover {
  color: #4fc08d;
}

```

### examples/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>ts-axios examples</title>
    <link rel="stylesheet" href="/global.css">
  </head>
  <body style="padding: 0 20px">
    <h1>ts-axios examples</h1>
    <ul>
      <li><a href="simple">Simple</a></li>
    </ul>
  </body>
</html>

```

### 知识点补充

#### **XMLHttpRequest.open()** 方法初始化一个请求。

**语法**

```javascript
xhrReq.open(method, url);
xhrReq.open(method, url, async);
xhrReq.open(method, url, async, user);
xhrReq.open(method, url, async, user, password);
```

**参数**

+ method
  +  要使用的HTTP方法，比如「GET」、「POST」、「PUT」、「DELETE」、等。对于非HTTP(S) URL被忽略。

+ url
  + 表示要向其发送请求的URL。

+ async(可选)
  +  一个可选的布尔参数，默认为true，表示要不要异步执行操作。如果值为false，send()方法直到收到答复前不会返回。如果true，已完成事务的通知可供事件监听器使用。如果multipart属性为true则这个必须为true，否则将引发异常。

+ user(可选)
  + 可选的用户名用于认证用途；默认为null。

+ password(可选)
  + 可选的密码用于认证用途，默认为null。

#### XMLHttpRequest.send()

**XMLHttpRequest.send()** 方法用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。

**XMLHttpRequest.send()**方法接受一个可选的参数，其作为请求主体；如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null。

如果没有使用setRequestHeader（）方法设置 `Accept`头部信息，则会发送带有* / *的`Accept`头部。

## 编写demo

### exmples/simple/app.ts

```typescript
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
```

### exmples/simple/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Simple example</title>
  </head>
  <body>
    <script src="/__build__/simple.js"></script>
  </body>
</html>

```

加入脚本

### packag.json

```shell
  "scripts": {
    "dev":"node examples/server.js",
```

```shell
cnpm run dev
```

## 处理请求URL

### src/helpers/util.ts

```typescript
//工具辅助方法
const toString = Object.prototype.toString

//谓词保护
export function isDate(val: any): val is Date {
  //判断是否是Date类型
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  //null也是object
  return val !== null && typeof val === 'object'
}
```

### src/helpers/url.ts

```typescript
//存url辅助函数
import { isDate, isPlainObject } from "./util";

function encode(val: string): string {
  //要处理特殊字符,空格变+
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')

}
export function buildURL(url: string, params?: any): string {
  //如果不传则返回地址
  if (!params) {
    return url
  }
  //定义键值对数组，是string类型
  const parts: string[] = []

  //拿到对象的每个key
  Object.keys(params).forEach((key) => {
    const val = params[key]
    //如果是空的
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    //如果是数组,就把数组赋值临时变量
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      //如果不是数组，则把val变成数组
      values = [val]
    }
    //对values进行判断
    values.forEach((val) => {
      //检测是否是Date，如果是则转换为ISO的字符串
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      //需要做成encode
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  //把数组加&
  let serializedParams = parts.join('&')
  //判断是否存在
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    //判断是否存在哈希标识
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    //判断url是否有问号如果没有则加？如果有则拼接&
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

```

### src/index.ts

```typescript
import { AxiosRequestConfig } from './types'
import xhr from './xhr';
import { buildURL } from "./helpers/url";
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

//发送请求之前对config 进行处理
function processConfig(config: AxiosRequestConfig): void {
 //转换后的url重新赋值给config
  config.url = transformURL(config)
}
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
```

## 处理请求body数据

### src/helpers/data.ts

```typescript
import { isPlainObject } from "./util";
//把对象处理成JSON字符串
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
```

### src/index.ts

```typescript
import { AxiosRequestConfig } from './types'
import xhr from './xhr';
import { buildURL } from "./helpers/url";
import { transformRequest } from "./helpers/data";
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

//发送请求之前对config 进行处理
function processConfig(config: AxiosRequestConfig): void {
  //转换后的url重新赋值给config
  config.url = transformURL(config)
  //转换后的data从新赋值给data
  config.data = transformRequestData(config)
}
//处理URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
//处理body
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
export default axios
```

## 处理请求header

### src/helpers/header.ts

```typescript
import { isPlainObject } from "./util";
//把传入headers里面的小写content-type转成首字母大写的
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach((name) => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}
export function processHeaders(headers: any, data: any): any {
  //把传入headers里面的小写content-type转成首字母大写的
  normalizeHeaderName(headers, 'Content-Type')
  //当传入传入的是普通对象时,
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
```

### src/types/index.ts

```typescript
export type Method = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD' |
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
export interface AxiosRequestConfig {
  //请求地址
  url: string
  //请求方法，默认是get
  method?: Method
  //请求数据
  data?: any
  //请求参数
  params?: any
  //请求头
  headers?: any
}
```

### src/xhr.ts

```typescript
import { AxiosRequestConfig } from './types';
export default function xhr(config: AxiosRequestConfig): void {
  //用config发送逻辑
  //结构赋值,给默认参数
  const { data = null, url, method = 'get', headers } = config

  //实例化定义一个request
  const request = new XMLHttpRequest()
  //方法名要大写，地址，是否异步
  request.open(method.toUpperCase(), url, true)

  //请求时设置headers
  Object.keys(headers).forEach((name) => {
    //如果请求数据为空，则headers就没有意义了
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  //发送请求
  request.send(data)
}
```

### src/index.ts

```typescript
import { AxiosRequestConfig } from './types'
import xhr from './xhr';
import { buildURL } from "./helpers/url";
import { transformRequest } from "./helpers/data";
import { processHeaders } from './helpers/header';
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

//发送请求之前对config 进行处理
function processConfig(config: AxiosRequestConfig): void {
  //转换后的url重新赋值给config
  config.url = transformURL(config)
  //先处理headers
  config.headers = transformHeaders(config)
  //转换后的data从新赋值给data
  config.data = transformRequestData(config)
}
//处理URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
//处理body
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
//处理请求头
function transformHeaders(config: AxiosRequestConfig): any {
  //一开始就保证headers存在，即使不传headers也让headers有数据
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
export default axios
```

## 处理响应数据

### src/types/index.ts

```typescript
export type Method = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD' |
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
export interface AxiosRequestConfig {
  //请求地址
  url: string
  //请求方法，默认是get
  method?: Method
  //请求数据
  data?: any
  //请求参数
  params?: any
  //请求头
  headers?: any
  //响应类型
  responseType?:XMLHttpRequestResponseType

}

//暴露响应
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

//继承Promise泛型属性
export interface AxiosPromise extends Promise<AxiosResponse>{

}
```

src/xhr.ts

```typescript
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types';
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    //用config发送逻辑
    //结构赋值,给默认参数
    const { data = null, url, method = 'get', headers, responseType } = config

    //实例化定义一个request
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    //方法名要大写，地址，是否异步
    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        //如果不是4的话是请求不道德
        return
      }
      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }
    //请求时设置headers
    Object.keys(headers).forEach((name) => {
      //如果请求数据为空，则headers就没有意义了
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    //发送请求
    request.send(data)
  })
}
```

src/index.ts

```typescript
import { AxiosRequestConfig, AxiosPromise } from './types'
import xhr from './xhr';
import { buildURL } from "./helpers/url";
import { transformRequest } from "./helpers/data";
import { processHeaders } from './helpers/header';
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}
```

