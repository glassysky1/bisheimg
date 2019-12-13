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