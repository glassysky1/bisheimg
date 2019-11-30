## Nuxt.js概述

### 支持

+ Vue 2
+ Vue Router
+ Vuex(included only when using the store option)
+ Vue Server Render(excluded when using mode:'spa')
+ vue-meta 

## Nuxt.js工作流

[链接]: https://blog.csdn.net/lfy836126/article/details/94895711	"地址"

### 安装

```shell
vue init nuxt-community/koa-template projectname
cd projectname
npm install backpack-core@0.7.0 --save-dev

在nuxt.config.js里找到eslint-loader将ctx.isClient改成ctx.Client就可以运行了。

 

extend (config, ctx) {

if (ctx.Client&&ctx.isDev) {
config.module.rules.push({
enforce: 'pre',
test: /\.(js|vue)$/,
loader: 'eslint-loader',
exclude: /(node_modules)/
})
}

 
 最后  cnpm i

 
```

## Nuxt.js基础

### 路由&示例

page里名字创建即路由

layout里是模板，default.vue是默认加载的,laoyout的文件里面放置<nuxt/>相当于pages的文件是layout文件的子路由

layout加载的是components的组件

<nuxt-link>相当于<router-link>

<nuxt/> 相当于<router-view>



#### 如何自定义模板

layout/search.vue

```html
<template>
  <div class="layout-search">
    <h1>search</h1>
    <nuxt/>></nuxt>//这个是路由
    <footer>search layout footer</footer>
  </div>
</template>

<script>
export default {

}
</script>
<style>
.layout-search{
  color:red;
}
</style>
```

pages/search.vue

```html
<template>
  <div class="search">
    Page is search
  </div>
</template>

<script>
export default {
  layout:'search'//引入直接写layout
}
</script>

<style>

</style>
```

#### nuxt.config.js配置

```javascript
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },//加载显示
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.Client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

```

#### server练习

在server/interface/city.js

```shell
cnpm i koa-router
```



```javascript
import Router from 'koa-router'

const router = new Router({
  prefix: '/city'
})

router.get('/list', async (ctx) => {
  ctx.body = ['北京', '天津']
})

export default router

```

server/index.js

```javascript
import cityInterface from './interface/city'
//固定写法
app.use(cityInterface.routes()).use(cityInterface.allowedMethods())
```

注意：asyncData是用于组件数据获取的，fetch是vuex的

```javascript
<template>
  <div class="search">
    搜素
    <ul>
      <li v-for="(item,index) in list" :key="index" >{{item}}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { async } from 'q';
export default {
  data(){
    return{
      list:[]
    }
  },
  //服务端在渲染的时候没有把数据给客户端，查看源码的时候是看不到数据的
  //只在浏览器中才有效果
  // async mounted(){
  //   const {status,data:{list} } = await axios.get('/city/list')
  //   if(status === 200){
  //     this.list = list
  //   }
  // }

  //服务器在渲染的时候就把数据给客户端了
  //所以this是不能用的
  //这是数据，数据不会发生闪烁
  //1服务器端把编译好的内容下发给你(有个Nuxt对象，里面有数据，源码能看到)，2异步获取到的数据也同时扔给浏览器端
  async asyncData(){
    let {status,data:{list}} = await axios.get('http://localhost:3000/city/list')
    if(status === 200){
      return {
        list
      }
    }
  }

}
</script>

<style>

</style>
```

### vuex

store/modules/city.js

```javascript
const state = () => ({
  app: ['a']
})

const mutations = {
  add(state, text) {
    state.app.push(text)
  }
}

const actions = {
  add: ({ commit }, text) => {
    commit('add', text)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

```

store/index.js

```javascript

import Vue from "vue";

import Vuex from "vuex";
import city from "./modules/city";
import navbar from "./modules/navbar";

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    city,
    navbar
  },
  actions: {
    nuxtServerInit({ commit }, { req }) {
      if (req.session.user) {
        commit('city', req.session.user )
      }
    }
  }
})

export default store

```

pages/search.vue

```html
<template>
  <div class="search">
    搜素
    <ul>
      <li v-for="(item,index) in $store.state.city.list" :key="index" >{{item}}</li>
    </ul>
  </div>
</template>
```

