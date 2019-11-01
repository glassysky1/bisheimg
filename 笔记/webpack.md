## webpack什么

+ webpack构建工具
+ 自带模块化(commonjs规范)(module.exports)
+ 编译:es6 -> es5,jsx->es5, ts(typescript)  -> js

## 安装webpack3.x

+ 安装全局webpack

  + ```shel
    cnpm install -g webpack@3.x
    cnpm install -g webpack-cli@2.x
    ```

+ 项目初始化package.js

  + ```shell
    cnpm init -y
    ```

+ 安装项目依赖的webpack

  + ```shell
    cnpm install -D webpack@3.x
    ```

+ 项目根目录创建两个文件夹src和dist

  + src:源码文件
  + dist:编译之后的文件

+ 编写代码

  + ```javascript
    app.js:document.write("hello webpackc")
    ```

+ 执行webpack

  + webpack 路径/入口文件  路径/出口文件

  + ```shell
    webpack src/app.js dist/bundle.js
    ```

## webpack.config配置文件

```javascript
module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
}
```

### webpack的快捷方案

在package.json文件中代替webpack中执行//cnpm run build

```javascript
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build":"webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.12.0"
  }
}
```

## 服务器

+ 全局安装服务器

```shell
cnpm install -g webpack-dev-server@2.x
```

+ 安装项目依赖

  + ```shell
    cnpm install -D webpack-dev-server@2.x
    ```

+ 运行服务器

  + ```shell
    webpack-dev-server
    ```

+ 配置服务器

  + ```javascript
    //package.json
    {
      "name": "webpack",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "build":"webpack",
        "dev":"webpack-dev-server"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "webpack": "^3.12.0"
      }
    }
    
    ```

  + 执行cnpm run dev

+ 修改服务器根路径

  + ```javascript
    "scripts": {
        "build":"webpack",
        "dev":"webpack-dev-server --content-base dist"
      },
    ```

+ 热更新

  + ```javascript
    "dev":"webpack-dev-server --content-base dist --inline --hot"
    ```

+ 改端口

  + ```javascript
    "dev":"webpack-dev-server --content-base dist --inline --hot --port"
    ```

## module

### loaders(use)

loader是webpack可以通过配置脚本，或者外部依赖来执行一些功能

如:es6 -> es5  jsx -> js  less -> css

+ 配置loaders

  + test:一个配置loader要做操作的文件的一个正则表达式(必须)
  + loader:loader要执行的任务的名字(必须)
  + options:为loader提供一些外部选项配置(可选项)

+ 安装依赖

  + ```shell
    cnpm install -D babel-core babel-loader babel-preset-es2015//失败es6
    ```

+ 配置webpack.config.js文件

  + ```javascript
    module.exports = {
      entry: './src/app.js',
      output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
      },
      module:{
        rules:[
          {
            test:/\.js$/,
            use:'babel-loader',
            options:{
              presets:['es2015']
            }
          }
        ]
      }
    }
    ```

  + 

## webpack处理css和图片

+ 安装css/图片相关依赖

  + ```shell
    cnpm install -D css-loader style-loader
    cnpm install -D file-loader url-loader
    ```

+ 添加配置

  + ```javascript
    module.exports = {
      entry: './src/app.js',
      output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
      },
      module:{
        rules:[
          {
            test:/\.js$/,
            use:'babel-loader',
            options:{
              presets:['es2015']
            }
          },
          {
            test:/\.css$/,
            use:[
              'style-loader',
              'css-loader'
            ]
          },
           {
           	test:/\.(png|jpg|gif|jpeg|svg)&/,
               use:"url-loader?limit=2048"//大于靓照进行压缩
          }
        ]
      }
    }
    ```

## less-loader添加

+ 安装

  + ```shell
    cnpm install --save-dev less less-loader
    ```

  + ```javascript
    {
        test:/\.less&/,
            user:[
                'style-loader',
                'css-loader',
                'less-loader'
            ]  
     }
    ```

## 插件（plugins）

### 自动打开浏览器

+ 安装：

  + ```shell
    cnpm install -D open-browser-webpack-plugin
    ```

  + ```javascript
    var borwerOpen = require('open-browser-webpack-plugin')
    module.exports = {
      entry: './src/app.js',
      output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
      },
      module:{
        rules:[
          {
            test:/\.js$/,
            use:'babel-loader',
            options:{
              presets:['es2015']
            }
          },
          {
            test:/\.css$/,
            use:[
              'style-loader',
              'css-loader'
            ]
          }
        ]
      },
      plugins:[
        //自动打开浏览器
        new borwerOpen({
          url:'http://localhost:8080'
        })
      ]
    }
    ```


## 版本升级

```shell
cnpm install -g webpack
cnpm install -g webpack-cli@2.x
```

+ 执行

  + ```shell
    webpack --mode=development ./src/app.js  //mode模式，生产模式
    ```

+ 新的命令行

  + ```shell
    webpack-cli init:自动生成webpack.config.js
    ```

  + ```javascript
    //package.json
    "dev":"webpack-dev-server --mode development --open --hot"
    "build":"webpack --mode production"
    ```

  + 