## Vue

### Vue基础

#### 大纲

1.安装Vue

  注：node版本必须大于等于8.9

  vue-cli3.x:npm install -g @vue/cli

  vue-cli2.x:npm install -g @vue/cli-init

 

2.创建项目

  vue init webpack my-project

  注：安装依赖的时候，选择最后一个，就是自己安装

  cd my-project

  npm start/npm run dev

 

3.工程目录

 

4.基础指令

  Mustache：{{ 变量 }}  只能存在单行语句

  v-once:只能渲染一次

  v-html:解析HTML结构

  v-bind:指令（解析属性中的对象）

  v-bind简写：(:)

  v-if:条件渲染

  v-show:条件渲染

 

5.v-if vs v-show

  v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

  v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

  相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

  一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

 

6.列表渲染

  v-for

 

7.事件处理

  1.事件改变data数据，data数据改变会引起视图的变化

  2.事件传递参数

​    $event

  3.数组更新检测

​    append，unshift

​    最开始讲数组的时候：老师在讲一个方法的时候会说，返回一个原数组还是新数组

​    变异方法：

​      改变原数组，则可以引起视图更新

​      不改变原数组，创建新数组，则无法引起视图更新

 

8.计算属性

  计算属性缓存 vs 方法

​    我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数

 

9.Class与Style绑定

 

10.表单输入绑定

  修饰符：

​    .lazy

​    .number

​    .trim

  watch:监听事件

 

11.组件传递数据props

12.自定义事件向父组件传递数据

  $emit(自定义事件)

#### v-for

```javascript
<template>
  <div class="hello">
    {{ msg }}
    <p v-text="hello"></p>
    <p v-if="flag">dsfdf</p>
    <p v-else>fdsfs</p>
    <button @click="change">点我</button>
    <ul>
      <li v-for="(item, index) in names" :key="index"> {{item.name}}==={{item.age}} </li>
    </ul>
    <ul>
      <li v-for="(value,key, index) in obj" :key="index" > {{value}} === {{key}} </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        hello: '<h3>he</h3>',
        msg: 'Welcome to Your Vue.js App',
        url: 'http://taobao.com',
        flag: false,
        names: [
          {
            name: 'ifdsf',
            age: 20
          },
           {
            name: 'ifdsf',
            age: 20
          }, 
          {
            name: 'ifdsf',
            age: 20
          }
        ],
        obj:{
          name:'daixiao',
          age:18
        }
      }
    },
    methods: {
      change() {
        this.flag = !this.flag
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
```



####  计算属性

```javascript
<!--  -->
<template>
    <div class=''>
        {{ getMsg }}

        <p v-text="getMsg"></p>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        name: 'Learn',
        components: {},
        data() {
            //这里存放数据
            return {
                msg: '默认'
            };
        },
        //监听属性 类似于data概念
        computed: {
            getMsg() {
                return this.msg.split('').reverse().join('')
            }
        }
    }
</script>
<style lang="css" scoped>

</style>
```

#### Class与Style绑定

```javascript
<!--  -->
<template>
    <div class=''>
        <p v-text="getMsg" :class="[isActive ? activeClass:'']" ></p>
        <button @click="change">改变</button>
		<p :style="{ 'color':color}">111</p>
		<p :class="{on:'/msite'===this.$route.path}"></p>
        <p :style="style">222</p>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        name: 'Learn',
        components: {},
        data() {
            //这里存放数据
            return {
                msg: '默认',
                activeClass:'active',//声明
                isActive:false,
                color:'red',
                style:{
                    color:'red'
                }
            };
        },
        //监听属性 类似于data概念
        computed: {
            getMsg() {
                return this.msg.split('').reverse().join('')
            }
        },
        methods: {
            change(){
                this.isActive=!this.isActive
            }
        },
    }
</script>
<style lang="css" scoped>
    .active{
        color: red;
    }
</style>
```

#### 表单绑定

```javascript
<!--  -->
<template>
    <div class=''>
        <input type="text" name="" id="" v-model="msg">
        <p v-text="msg"></p>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        name: 'Learn',
        components: {},
        data() {
            //这里存放数据
            return {
                msg: '默认',
                activeClass:'active',//声明
                isActive:false
            };
        }
    }
</script>
<style lang="css" scoped>
    
</style>
```

#### 基本组件

```javascript
//三个部分引入
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    {{ demo }}
    <Learn/>//第一个
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Learn from './components/Learn'//第二个
export default {
  data(){
    return{
      demo:''
    }
  },
  name: 'App',
  components: {
    HelloWorld,
    Learn//第三个注入
  },
  methods: {
      getSonMsg(data){
      this.demo =data
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

#### keep-alive

```javascript
//父亲，保存之前状态
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button @click="change">改变</button>
    <keep-alive>
      <component v-bind:is="currentCompoent" ></component>
    </keep-alive>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Learn from './components/Learn'
import A from './components/A'
import B from './components/B'
export default {
  data(){
    return{
      demo:'',
      currentCompoent:A,
      flag:true
    }
  },
  name: 'App',
  components: {
    HelloWorld,
    Learn,
    A,
    B
  },
  methods: {
     change(){
       this.currentCompoent= this.flag?A:B
       this.flag = !this.flag
     }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


//B

```

#### 数据父传子

父亲

```javascript
<!--  -->
<template>
    <div class=''>
        父组件:
        <Child title="一个小目标：一个亿" />
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import Child from './Child'
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            Child
        },
        data() {
            //这里存放数据
            return {

            };
        }
    }
</script>
<style lang='css' scoped>

</style>
```

子：

```javascript
<!--  -->
<template>
    <div class=''>
        子组件, {{title}}
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        name:'Child',
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {

            };
        },
        props:{
            title:{
                type:String
            }
        }
    }
</script>
<style lang='css' scoped>

</style>
```



#### 数据子传父

子

```javascript
<!--  -->
<template>
    <div class=''>
        子组件, {{title}}
        <button @click ="sendMoney" >赚了</button>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        name:'Child',
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {

            };
        },
        props:{
            title:{
                type:String
            }
        },
        methods: {
            sendMoney(){
                this.$emit('money','翻了5倍')
            }
        },
    }
</script>
<style lang='css' scoped>

</style>
```

父

```javascript
<!--  -->
<template>
    <div class=''>
        父组件:
        {{ money }}
        <Child @money="getMoney"/>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import Child from './Child'
    export default {

        //import引入的组件需要注入到对象中才能使用
        components: {
            Child
        },
        data() {
            //这里存放数据
            return {
                money:""
            };
        },
        methods: {
            getMoney(data){
                this.money=data
            }
        },
    }
</script>
<style lang='css' scoped>

</style>
```



### Vue网络请求

#### 大纲1

1.基础插槽

2.具名插槽

3.编译作用域

  父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在子级作用域内编译。

4.作用域插槽（数据传递）

  在 2.5.0+，slot-scope 不再限制在 <template> 元素上使用，而可以用在插槽内的任何元素或组件上。

#### 大纲2

跨域处理：



  main.js：

​    Vue.prototype.HOST = "/doubai_api"

 

  访问：

​    var url = this.HOST + "/v2/movie/top250";

​    this.$axios({

​      method: 'get',

​      url: url

​    })

​    .then(res => {

​      console.log(res.data);

​    })

​    .catch(error => {

​      console.log(error);

​    })

 

#### 组件深入操作DOM

```javascript
<!--  -->
<template>
<div class=''>
    音乐实例
    <p ref="p1">原生p元素</p>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$refs.p1.innerHTML = '改变吧'//加s
},
}
</script>
<style lang='css' scoped>

</style>
```

#### 插槽(内容分发)

app.vue

```javascript
<template>
  <div id="app">
   <SlotDemo>
     <div>
       hello 插槽
     </div>
   </SlotDemo>
  </div>
</template>

```

slotDemo.vue

```javascript
<!--  -->
<template>
    <div class='slotdemo'>
        <slot></slot>
    </div>
</template>


```

#### 具名插槽

HeaderTop.vue

```javascript
<template>
  <div id="app">
 <header class="header">
      <slot name="left"></slot>
      <span class="header_title">
        <span class="header_title_text ellipsis"> {{title}} </span>
      </span>
      <slot name="right"></slot>
    </header>
  </div>
</template>


```

Msite.vue

```javascript
<!--  -->
<template>
    <div class='msite'>
        <headerTop title="昌平区北七家宏福科技园(337省道北)">
          <span class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
          </span>
          <span class="header_login" slot="right">
            <span class="header_login_text">登录|注册</span>
          </span>
    </headerTop>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
	import HeaderTop from "../../components/HeaderTop/HeaderTop";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
				HeaderTop
            };
        },
        //监听属性 类似于data概念a
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {

        },
    }
</script>
<style lang='css' scoped>

</style>
```

#### 作用域插槽

slotDemo

```javascript
<!--  -->
<template>
    <div class='slotdemo'>
        <slot ct="我是儿子的数据"></slot>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {

            };
        },
        //监听属性 类似于data概念a
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {

        },
    }
</script>
<style lang='css' scoped>

</style>
```

app.vue

```javascript
<template>
  <div id="app">
   <SlotDemo>
     <template slot-scope="slotProps">
      <h1> {{ slotProps.ct }} </h1>
     </template>
   </SlotDemo>
  </div>
</template>

<script>

import SlotDemo from './components/slotDemo'
export default {
  data(){
    return{
    
    }
  },
  name: 'App',
  components: {
    SlotDemo
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

#### 过渡动画

```javascript
<!--  -->
<template>
    <div class="anim">
        <button @click="show=!show">Toggle</button>
        <transition name="iwen">
            <p v-if="show">hello</p>
        </transition>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        name: 'anim',
        components: {},
        data() {
            //这里存放数据
            return {
                show: true
            };
        },
    }
</script>
<style lang='css' scoped>
/* 0 */
.iwen-enter,.iwen-leave-to{
    opacity: 0;
}
/* 1 */
.iwen-enter-to,.iwen-leave{
    opacity: 1; 
}
.iwen-enter-active, .iwen-leave-active{
    transition: opacity 0.5s;
}

</style>
```

```javascript
<!--  -->
<template>
    <div class="anim">
        <button @click="show=!show">Toggle</button>
        <transition name="iwen">
            <p v-if="show">hello</p>
        </transition>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        name: 'anim',
        components: {},
        data() {
            //这里存放数据
            return {
                show: true
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {

        }
    }
</script>
<style lang='css' scoped>
/* 0 */
.iwen-enter-active{
    animation: bounce-in .5s;
} 
.iwen-leave-active{
    animation: bounce-out .5s reverse;
}
@keyframes bounce-in{
    0%{
        transform: scale(0);
    }
    50%{
        transform: scale(1.5);
    }
    100%{
        transform: scale(1)
    }
}
@keyframes bounce-out{
    0%{
        transform: scale(0);
    }
    50%{
        transform: scale(1.5);
    }
    100%{
        transform: scale(1)
    }
}

</style>
```

用Animate.css库

index.html

```javascript
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

```

其他地方

```javascript
<!--  -->
<template>
    <div class="anim">
        <button @click="show=!show">Toggle</button>
        <transition 
        name="custom-classes-transition" 
        enter-active-class="animated tada"
        leave-active-class="animated bounceOutRight">
            <p v-if="show">hello</p>
        </transition>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        name: 'anim',
        components: {},
        data() {
            //这里存放数据
            return {
                show: true
            };
        },
      
    }
</script>
<style lang='css' scoped>
    
</style>
```

#### 自定义指令****

**全局指令**，在main.js(比如获取焦点)，在其他地方直接v-focus

```javascript
//自定义指令
Vue.directive("focus",{
   //当前指令的生命周期
  inserted:function (el) {
    el.focus()
  }
})

```

**局部指令**

```javascript
//与data同级
directives:{
            focus:{
                inserted:function (el) {
                    el.focus()
                }
            },
            myStyle:{
                inserted: function (el) {
                    el.style.fontSize="40px"
                }
            }
        }
```

#### 过滤器

```javascript
<!--  -->
<template>
    <div class="filter">
        {{ money|rmb}}
    </div>
</template>

<script>
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                money:20
            };
        },
        filters:{
            rmb:function(value){
                if(!value) return
                value = value.toString()
                return '¥' + value
            }
        }
    }
</script>
<style lang='css' scoped>

</style>
```

#### Axios

react -> fetch

中文参考站点：https://www.kancloud.cn/yunye/axios/234845

vue官网维护了一个网络请求：vue-resource,后期不维护了，推荐使用axios

vue -> axios：

  Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

  安装：

```shell
    npm install axios --save
```

在main.js引入挂载

```javascript
  import Axios from "axios"

   Vue.prototype.$axios = Axios
```

使用：

get请求

```javascript
mounted(){
 this.$axios.get("http://www.wwtliu.com/sxtstu/blueberrypai/getChengpinInfo.php")

      .then(res => {

        console.log(res.data);

      })

      .catch(error => {

        console.log(error);

      })

    }

```

```javascript
mounted() {
      this.$axios.get("http://api.douban.com/v2/movie/top250", {
        params: {
          type: 'yule',
          count: 30
        }
      })
        .then(res => {
          console.log(res.data);

        })
        .catch(error => {
          console.log(error);

        })
    }
```

post请求



```javascript
<script>
  import qs from 'qs'//解决参数格式的转码问题 ?name=iwen&age=20 {name:iwen,age:20}
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      this.$axios.post("地址",qs.stringify({
        user_id:"iwen@qq.com",
        pasword:"iwen123"
      }))
      .then(res =>{
        console.log(res.data);
      })
      .catch(error =>{
        console.log(error);
        
      })
    }
  }
</script>
```

##### Axios全局配置

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from "axios"

Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'https://api.example.com';
Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

```

##### 拦截器

```javascript
import qs from 'qs'
//接着上面
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.method === 'post'){
        config.data = qs.stringify(config.data)
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(!response.data){
        return{
            msg:"数据返回不合理"
        }
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

##### 跨域处理

在index.js里的dev

```javascript
  proxyTable: {
      '/douban_api': {
        target: 'http://tingapi.ting.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/douban_api': ''
        }
      }
    },
```

在main.js

```javascript
    Vue.prototype.HOST = "/doubai_api"
```

```javascript
 mounted() {
      var url =  this.HOST+"/v1/restserver/ting?method=baidu.ting.billboard.billList&type=2&size=3&offset=0"
      this.$axios({
        method:  'get',
        url:url
      })
      .then(res =>{
        console.log(res.data);
        
      })
      .catch(error =>{
        console.log(error);
        
      })
    }
```

### Vue路由

Vue Router安装：

```shell
 cnpm install vue-router --save
```

如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：

```javascript
 import Vue from 'vue'
 import VueRouter from 'vue-router'
 Vue.use(VueRouter)
```

创建路由

```javascript
  const router = new VueRouter({
    routes:[
      {
        path:"/",
        name:"HelloWorld",
        component:HelloWorld
      }
    ]
  })
```

给出路由显示的位置(在app.vue中)

```javascript
  <router-view />
```

实例

main.js

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import HelloWorld from './components/HelloWorld'//引用
Vue.use(VueRouter) 
Vue.config.productionTip = false
const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//注入
  components: { App },
  template: '<App/>'
})

```

#### 文件提取

把main.js 中的路由信息提取到router下的index.js

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'//引用
Vue.use(VueRouter) 
export default new VueRouter({
    routes: [
        {
            path: "/hello",
            name: "HelloWorld",
            component: HelloWorld
        }
    ]
})

```

main.js中引入

```javascript
import Vue from 'vue'
import App from './App'
import router from './router'//引入
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//注入
  components: { App },
  template: '<App/>'
})

```

#### 路由跳转

```javascript
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ul>
       //最重要的两行代码
      <router-link tag="li" to="/hello">Hello</router-link>
      <router-link tag="li" to="/learn">Learn</router-link>
    </ul>
      <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li{
  text-decoration: underline;
}
</style>

```

#### 动态路由

index.js

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'//引用
import LearnVue from '@/components/LearnVue'
Vue.use(VueRouter) 
export default new VueRouter({
    routes: [
        {
            path: "/hello",
            name: "HelloWorld",
            component: HelloWorld
        },
        {
            path: "/learn/:id",
            name: "LearnVue",
            component: LearnVue
        }
    ]
})

```

learnVue.vue

```javascript
<!--  -->
<template>
<div>hhhhhh
    <p> {{this.$route.params.id}} </p>
</div>
</template>

<script>

export default {
}
</script>
<style lang='css' scoped>

</style>
```

#### 路由嵌套

index.js

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'//引用
import LearnVue from '@/components/LearnVue'
import Base from '@/components/base'
import Http from '@/components/http'
Vue.use(VueRouter) 
export default new VueRouter({
    routes: [
        {
            path: "/hello",
            name: "HelloWorld",
            component: HelloWorld
        },
        {
            path: "/learn",
            name: "LearnVue",
            component: LearnVue,
            children:[
                {
                    path:'base',
                    component:Base
                },
                {
                    path:'http',
                    component:Http
                }
            ]
        }
    ]
})

```

LearnVue.vue

```javascript
<!--  -->
<template>
<div>hhhhhh
    <ul>
        <router-link tag="li" to="/learn/base">base</router-link>
        <router-link tag="li" to="/learn/http">http</router-link>
    </ul>
    <router-view />//路由跳转必须加
</div>

</template>

<script>

export default {
}
</script>
<style lang='css' scoped>

</style>
```

#### 编程式导航

```javascript
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ul>
      <router-link tag="li" to="/hello">Hello</router-link>
      <router-link tag="li" to="/learn">Learn</router-link>
    </ul>
    <button @click="tohello">hello</button>
    <button @click="$router.back()">hello</button>

      <router-view />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
   methods: {
        tohello() {
          this.$router.push("/hello")//去hello
          // this.$router.push({
          //   path:"/hello"
          // })//去hello
          //push和replace的区别是push向栈加界面,go(-1)
        }
      },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li{
  text-decoration: underline;
}
</style>

```

#### 命名路由的参数传递

根据名字跳转(地址栏看不到参数传递)

App.vue

```javascript
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ul>
        //主要代码
      <router-link tag="li" :to="{ name: 'HelloWorld',params:{ id:helloparams }}">Hello</router-link>
      <router-link tag="li" :to="{ name: 'LearnVue'}">Learn</router-link>
    </ul>
    <button @click="tohello">hello</button>
      <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      helloparams:'helloparams',
      clickparams:'clickparams'
    }
  },
   methods: {
        tohello() {
            //主要代码
          this.$router.push({name:'HelloWorld',params:{id: this.clickparams}})
        }
      },
}
</script>
```

HelloWorld.vue

```javascript
<template>
  <div class="hello">
      //注意route后面没有r
  <p> {{this.$route.params.id}} </p>
  </div>
</template>

<script>
  import qs from 'qs'//解决参数格式的转码问题 ?name=iwen&age=20 {name:iwen,age:20}
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
   
    }
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
```

#### 路由重定向

在index.js

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'//引用
import LearnVue from '@/components/LearnVue'
import Base from '@/components/base'
import Http from '@/components/http'
import NotFound from '@/components/NotFound'
Vue.use(VueRouter) 
export default new VueRouter({
    routes: [
        {
            path:'*',
            component: NotFound
        },
        {
            path:'/',
            redirect:'/hello'
        },
        {
            path: "/hello",
            name: "HelloWorld",
            component: HelloWorld
        },
        {
            path: "/learn",
            name: "LearnVue",
            component: LearnVue,
            children:[
                {
                    path:'base',
                    component:Base
                },
                {
                    path:'http',
                    component:Http
                }
            ]
        }
    ]
})

```

#### 路由高亮

点击某个路由时，会多一个router-link-active类，弄成全局的话直接进App.vue的css样式里面改。

若改类名进路由增加

```javascript
linkActiveClass:'active'
```

精准路由就是二级路由linkExactActiveClass

#### ElementUI

安装:

```shell
npm i element-ui -S
```

在 main.js 中写入以下内容： 

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

### 实战易错点

1.子路由不能加/

2.api域名是个网站

3.参数要有键值