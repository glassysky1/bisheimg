# 建立一个项目

src/

app.vue

```javascript
<script>
    export default{

    }
</script>

<style>
</style>
```

app.json

```javascript
{
    "pages":[
        "pages/index/main"
    ],
     "window":{
        "navigationBarBackgroundColor": "#489B81"
    }
}
```



main.js

```javascript
import Vue from 'vue'
import App from "./app.vue"

//设置vue的提示功能关闭
Vue.config.productionTip = false;

//声明当前组件的类型
App.mpType ='app'

//生成应用的实例
const app = new Vue(App)

//挂载整个应用
app.$mount()
```

src/pages/index/

main.js

```javascript
import Vue from 'vue'
import Index from "./index.vue";

const index =new Vue(Index)

//挂载当前的页面
index.$mount()
```

index.vue

```javascript
<!--  -->
<template lang>
<div>
<p>Index组件</p>
</div>
</template>

<script>

export default {

}
</script>
<style  scoped>

</style>
```

删掉dist，cnpm start



## index的导航颜色

main.json

```javascript
{
    "navigationBarBackgroundColor": "#8ed145",
    "navigationBarTitleText": "WeChat"
}
```

## 模板必须加main.js

## mpVue_Vuex

安装：

```shell
cnpm install vuex
```

src/store下

store.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import state from './state'
import actions from './actions'
import mutations from './mutaions'
import getters from './getters'

//声明使用vuex
Vue.use(Vuex)

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})


```

src下main.js

```javascript
import Vue from 'vue'
import store from "./store/store";
import App from "./app.vue"

//设置vue的提示功能关闭
Vue.config.productionTip = false;

//声明当前组件的类型
App.mpType ='app'

//将store对象放置在Vue的原型上，为的是每个实例都可以使用
Vue.prototype.$store = store

//生成应用的实例
const app = new Vue(App)

//挂载整个应用
app.$mount()
```

