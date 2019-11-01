# Vue核心

## Vue的基本认识

### 介绍描述

+ 渐进式JavaScript框架
+ 作用：动态构建用户界面

### Vue特点

+ 遵循MVVM模式
+ 编码简洁，体积小，运行效率高，适合移动/PC端开发
+ 它本身只关注UI，可以轻松引入vue插件或其他第三库开发项目

### Vue扩展插件

+ vue-cli:vue 脚手架
+ vue-resource(axios):ajax请求
+ vue-router:路由
+ vuex:状态管理
+ vue-lazyload:图片懒加载
+ vue-sroller:页面滑动相关
+ mint-ui：基于vue的UI组件库(移动端)
+ element-ui：基于vue的UI组件库(PC端)

## Vue的基本使用

![MVVM](https://images2018.cnblogs.com/blog/994496/201804/994496-20180426084919911-1632648650.png )

### MVVM

​	model:模型，数据对象(data)

​	view:视图，模板页面

​	viewModel:视图模型(Vue的实例)

### 模板语法

#### 模板的理解

+ 动态的html页面
+ 包含了一些js语法代码
  + 双大括号表达式(可以在里面调用js语法)
  + 指令(以v-开头的自定义标签属性)

#### 双大括号表示

+ 语法:{{exp}}
+ 功能：向页面输出数据
+ 可以调用对象的方法

#### 指令一:强制数据绑定

+ 功能：指定变化的属性值
+ 完整写法: v-bind=xxx='yyy'
+ 简洁写法: :xxx='yyy'

#### 指令二：绑定事件监听

+ 功能：绑定指定事件名的回调函数
+ 完整写法：
  + v-on:keyup='xxx'
  + v-on:keyup='xxx(参数)'
  + v-on:keyup.enter='xxx'
+ 简洁写法：
  + @keyup='xxx'
  + @keyup.enter='xxx'

### 计算属性和监视

#### 计算属性

+ 在computed属性对象中定义计算属性的方法
+ 在页面中使用{{方法名}}来显示计算的结果
+ 执行时机：初始化显示/相关的data属性数据发生改变

#### 监视属性

+ 监视哪个属性就调用哪个属性的回调函数
+ 通过vm对象的$watch()或watch配置来监视指定的属性
+ 当属性变化时，回调函数自动调用，在函数内部进行计算

```javascript
<!--
1. 计算属性
  在computed属性对象中定义计算属性的方法
  在页面中使用{{方法名}}来显示计算的结果
2. 监视属性:
  通过通过vm对象的$watch()或watch配置来监视指定的属性
  当属性变化时, 回调函数自动调用, 在函数内部进行计算
3. 计算属性高级:
  通过getter/setter实现对属性数据的显示和监视
  计算属性存在缓存, 多次读取只执行一次getter计算
-->
<div id="demo">
  姓: <input type="text" placeholder="First Name" v-model="firstName"><br>
  名: <input type="text" placeholder="Last Name" v-model="lastName"><br>
  <!--fullName1是根据fistName和lastName计算产生-->
  姓名1(单向): <input type="text" placeholder="Full Name1" v-model="fullName1"><br>
  姓名2(单向): <input type="text" placeholder="Full Name2" v-model="fullName2"><br>
  姓名3(双向): <input type="text" placeholder="Full Name3" v-model="fullName3"><br>

  <p>{{fullName1}}</p>
  <p>{{fullName1}}</p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  const vm = new Vue({
    el: '#demo',
    data: {
      firstName: 'A',
      lastName: 'B',
       fullName2: 'A-B'
    },

    // 计算属性配置: 值为对象
    computed: {
      fullName1 () { // 属性的get()
        console.log('fullName1()', this)
        return this.firstName + '-' + this.lastName
      },

      fullName3: {
        // 当获取当前属性值时自动调用, 将返回值(根据相关的其它属性数据)作为属性值
        get () {
          console.log('fullName3 get()')
          return this.firstName + '-' + this.lastName
        },
        // 当属性值发生了改变时自动调用, 监视当前属性值变化, 同步更新相关的其它属性值
        set (value) {// fullName3的最新value值  A-B23
          console.log('fullName3 set()', value)
          // 更新firstName和lastName
          const names = value.split('-')
          this.firstName = names[0]
          this.lastName = names[1]
        }
      }
    },

    watch: {
      // 配置监视firstName
      firstName: function (value) { // 相当于属性的set
        console.log('watch firstName', value)
        // 更新fullName2
        this.fullName2 = value + '-' + this.lastName
      }
    }
  })

  // 监视lastName
  vm.$watch('lastName', function (value) {
    console.log('$watch lastName', value)
    // 更新fullName2
    this.fullName2 = this.firstName + '-' + value
  })

```

### class与style绑定

##### 理解

+ 在应用界面中，某个(些)元素的样式是变化的
+ class/style绑定就是专门用啦实现动态样式效果和技术的

##### class绑定

+ :class='xxx'
+ 表达式是字符串:'classA'
+ 表达式是对象:{classA:isA,classB:isB}(键是变量，值也是变量（布尔值）)
+ 表达式是数组:['classA'，'classB']{值是死的}

### 条件渲染

#### 条件渲染指令

+ v-if与v-else
+ v-show

#### 比较v-if与v-show

+ 如果需要切换v-show较好
+ 当条件不成立时，v-if的所有的子节点不会解析(项目中使用)

### 列表渲染

+ 列表显示指令

  + 数组：v-for/index
  + 对象:  v-for/key

+ 对象的更新显示

  + 删除item
  + 替换item

+ ### [变异方法 (mutation method)](https://cn.vuejs.org/v2/guide/list.html#%E5%8F%98%E5%BC%82%E6%96%B9%E6%B3%95-mutation-method)

  Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：

  - `push()`
  - `pop()`
  - `shift()`
  - `unshift()`
  - `splice()`
  - `sort()`
  - `reverse()`

```javascript
<!--
1. 列表显示
  数组: v-for / index
  对象: v-for / key
2. 列表的更新显示
  删除item
  替换item
-->

<div id="demo">
  <h2>测试: v-for 遍历数组</h2>
  <ul>
    <li v-for="(p, index) in persons" :key="index">
      {{index}}--{{p.name}}--{{p.age}}
      --<button @click="deleteP(index)">删除</button>
      --<button @click="updateP(index, {name:'Cat', age: 16})">更新</button>
    </li>
  </ul>
  <button @click="addP({name: 'xfzhang', age: 18})">添加</button>

  <h2>测试: v-for 遍历对象</h2>

  <ul>
    <li v-for="(item, key) in persons[1]" :key="key">{{key}}={{item}}</li>
  </ul>

</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#demo',
    data: {
      persons: [
        {name: 'Tom', age:18},
        {name: 'Jack', age:17},
        {name: 'Bob', age:19},
        {name: 'Mary', age:16}
      ]
    },

    methods: {
      deleteP (index) {
        this.persons.splice(index, 1) // 调用了不是原生数组的splice(), 而是一个变异(重写)方法
              // 1. 调用原生的数组的对应方法
              // 2. 更新界面
      },

      updateP (index, newP) {
        console.log('updateP', index, newP)
        // this.persons[index] = newP  // vue根本就不知道
        this.persons.splice(index, 1, newP)
        // this.persons = []
      },

      addP (newP) {
        this.persons.push(newP)
      }
    }
  })
</script>
```

+ 列表的高级处理
  + 列表过滤
  + 列表排序

```javascript
<!--
1. 列表过滤
2. 列表排序
-->

<div id="demo">
  <input type="text" v-model="searchName">
  <ul>
    <li v-for="(p, index) in filterPersons" :key="index">
      {{index}}--{{p.name}}--{{p.age}}
    </li>
  </ul>
  <div>
    <button @click="setOrderType(2)">年龄升序</button>
    <button @click="setOrderType(1)">年龄降序</button>
    <button @click="setOrderType(0)">原本顺序</button>
  </div>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#demo',
    data: {
      searchName: '',
      orderType: 0, // 0代表不排序, 1代表降序, 2代表升序
      persons: [
        {name: 'Tom', age:18},
        {name: 'Jack', age:17},
        {name: 'Bob', age:19},
        {name: 'Mary', age:16}
      ]
    },

    computed: {
      filterPersons () {
//        debugger
        // 取出相关数据
        const {searchName, persons, orderType} = this
        let arr = [...persons]//存放persons地址
        // 过滤数组
        if(searchName.trim()) {
          arr = persons.filter(p => p.name.indexOf(searchName)!==-1)
        }
        // 排序
        if(orderType) {
          arr.sort(function (p1, p2) {
            if(orderType===1) { // 降序
              return p2.age-p1.age
            } else { // 升序
              return p1.age-p2.age
            }

          })
        }
        return arr
      }
    },

    methods: {
      setOrderType (orderType) {
        this.orderType = orderType
      }
    }
  })
```

### 事件处理

#### 绑定监听

+ v-on:xxx="fun"
+ @xxx="fun"
+ @xxx="fun(参数)"
+ 默认事件形参：event
+ 隐含属性对象：$event

#### 事件修饰符

+ .prevent:阻止事件默认行为 event.preventDefault()
+ .stop:停止事件冒泡 event.stopPropagation()

#### 按键修饰符

+ .keycode:操作的是某个keycode值的键
+ .keyName:操作的某个键名的键(少部分)

```javascript
<!--
1. 绑定监听:
  v-on:xxx="fun"
  @xxx="fun"
  @xxx="fun(参数)"
  默认事件形参: event
  隐含属性对象: $event
2. 事件修饰符:
  .prevent : 阻止事件的默认行为 event.preventDefault()
  .stop : 停止事件冒泡 event.stopPropagation()
3. 按键修饰符
  .keycode : 操作的是某个keycode值的健
  .enter : 操作的是enter键
-->

<div id="example">

  <h2>1. 绑定监听</h2>
  <button @click="test1">test1</button>
  <button @click="test2('abc')">test2</button>
  <button @click="test3('abcd', $event)">test3</button>

  <h2>2. 事件修饰符</h2>
  <a href="http://www.baidu.com" @click.prevent="test4">百度一下</a>
  <div style="width: 200px;height: 200px;background: red" @click="test5">
    <div style="width: 100px;height: 100px;background: blue" @click.stop="test6"></div>
  </div>

  <h2>3. 按键修饰符</h2>
  <input type="text" @keyup.13="test7">
  <input type="text" @keyup.enter="test7">

</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#example',
    data: {

    },
    methods: {
      test1(event) {
        alert(event.target.innerHTML)
      },
      test2 (msg) {
        alert(msg)
      },
      test3 (msg, event) {
        alert(msg+'---'+event.target.textContent)
      },

      test4 () {
        alert('点击了链接')
      },

      test5 () {
        alert('out')
      },
      test6 () {
        alert('inner')
      },

      test7 (event) {
        console.log(event.keyCode)
        alert(event.target.value)
      }
    }
  })
```

### 表单输入绑定

#### 使用v-model对表单数据自动收集

+ text/textarea
+ checkbox
+ radio
+ select

```javascript
<!--
1. 使用v-model(双向数据绑定)自动收集数据
  text/textarea
  checkbox
  radio
  select
-->
<div id="demo">
  <form action="/xxx" @submit.prevent="handleSubmit">
    <span>用户名: </span>
    <input type="text" v-model="username"><br>

    <span>密码: </span>
    <input type="password" v-model="pwd"><br>

    <span>性别: </span>
    <input type="radio" id="female" value="女" v-model="sex">
    <label for="female">女</label>
    <input type="radio" id="male" value="男" v-model="sex">
    <label for="male">男</label><br>

    <span>爱好: </span>
    <input type="checkbox" id="basket" value="basket" v-model="likes">
    <label for="basket">篮球</label>
    <input type="checkbox" id="foot" value="foot" v-model="likes">
    <label for="foot">足球</label>
    <input type="checkbox" id="pingpang" value="pingpang" v-model="likes">
    <label for="pingpang">乒乓</label><br>

    <span>城市: </span>
    <select v-model="cityId">
      <option value="">未选择</option>
      <option :value="city.id" v-for="(city, index) in allCitys" :key="city.id">{{city.name}}</option>
    </select><br>
    <span>介绍: </span>
    <textarea rows="10" v-model="info"></textarea><br><br>

    <input type="submit" value="注册">
  </form>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#demo',
    data: {
      username: '',
      pwd: '',
      sex: '男',
      likes: ['foot'],
      allCitys: [{id: 1, name: 'BJ'}, {id: 2, name: 'SS'}, {id: 3, name: 'SZ'}],
      cityId: '2',
      info: ''
    },
    methods: {
      handleSubmit () {
        console.log(this.username, this.pwd, this.sex, this.likes, this.cityId, this.info)
        alert('提交注册的ajax请求')
      }
    }
  })
```

### Vue实例生命周期

#### 生命周期流程图

##### ![生命周期](https://img2018.cnblogs.com/blog/47685/201901/47685-20190111173917518-1987865733.png )

#### vue生命周期分析

+ 初始化显示
  + beforeCreate()
  + created()
  + beforeMount()
  + mounted()
+ 更新状态:this.xxx=value
  + beforeUpdate()
  + updated()
+ 销毁vue实例:vm.$destory()

```javascript
<body>
<!--
1. vue对象的生命周期
  1). 初始化显示
    * beforeCreate()
    * created()
    * beforeMount()
    * mounted()
  2). 更新状态
    * beforeUpdate()
    * updated()
  3). 销毁vue实例: vm.$destory()
    * beforeDestory()
    * destoryed()
2. 常用的生命周期方法
  created()/mounted(): 发送ajax请求, 启动定时器等异步任务
  beforeDestory(): 做收尾工作, 如: 清除定时器
-->

<div id="test">
  <button @click="destroyVue">destory vue</button>
  <p v-if="isShow">尚硅谷IT教育</p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#test',
    data: {
      isShow: true
    },

    beforeCreate() {
      console.log('beforeCreate()')
    },

    created() {
      console.log('created()')
    },

    beforeMount() {
      console.log('beforeMount()')
    },

    mounted () {
      console.log('mounted()')
      // 执行异步任务
      this.intervalId = setInterval(() => {
        console.log('-----')
        this.isShow = !this.isShow
      }, 1000)
    },


    beforeUpdate() {
      console.log('beforeUpdate()')
    },
    updated () {
      console.log('updated()')
    },


    beforeDestroy() {
      console.log('beforeDestroy()')
      // 执行收尾的工作
      clearInterval(this.intervalId)
    },

    destroyed() {
      console.log('destroyed()')
    },

    methods: {
      destroyVue () {
        this.$destroy()
      }
    }
  })


</script>
```

### 过度&动画

#### vue动画的理解

+ 操作css的transition或animation
+ vue会给目标元素添加/移除特定的class
+ 过渡的相关类名
  + xxx-enter-active:指定显示的transition
  + xxx-leave-active:指定隐藏的transition
  + xxx-enter/xxx-leave-to:指定隐藏时的样式

```javascript
 <style>
    /*指定过渡样式*/
    .xxx-enter-active, .xxx-leave-active {
      transition: opacity 1s
    }
    /*指定隐藏时的样式*/
    .xxx-enter, .xxx-leave-to {
      opacity: 0;
    }


    .move-enter-active {
      transition: all 1s
    }

    .move-leave-active {
      transition: all 3s
    }

    .move-enter, .move-leave-to {
      opacity: 0;
      transform: translateX(20px)
    }
  </style>
</head>
<body>
<!--
1. vue动画的理解
  操作css的trasition或animation
  vue会给目标元素添加/移除特定的class
2. 基本过渡动画的编码
  1). 在目标元素外包裹<transition name="xxx">
  2). 定义class样式
    1>. 指定过渡样式: transition
    2>. 指定隐藏时的样式: opacity/其它
3. 过渡的类名
  xxx-enter-active: 指定显示的transition
  xxx-leave-active: 指定隐藏的transition
  xxx-enter: 指定隐藏时的样式
-->



<div id="demo">
  <button @click="show = !show">Toggle</button>
  <transition name="xxx">
    <p v-show="show">hello</p>
  </transition>
</div>

<hr>
<div id="demo2">
  <button @click="show = !show">Toggle2</button>
  <transition name="move">
    <p v-show="show">hello</p>
  </transition>
</div>


<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#demo',
    data: {
      show: true
    }
  })

  new Vue({
    el: '#demo2',
    data: {
      show: true
    }
  })

```

```javascript
 <style>
    .bounce-enter-active {
      animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
  </style>
</head>
<body>

<div id="example-2">
  <button @click="show = !show">Toggle show</button>
  <br>
  <transition name="bounce">
    <p v-if="show" style="display: inline-block">Lorem</p>
  </transition>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script>
  new Vue({
    el: '#example-2',
    data: {
      show: true
    }
  })
```

### 过滤器

#### 定义过滤器

```javascript
Vue.filter(filterName,function(value[,arg1,arg2,...])){
           //进行一定的数据处理
           return newValue
           }
```

#### 使用过滤器

```javascript
<div>{{myData|filterName}}</div>
<div>{{myData|filterName(arg)}}</div>
```

```javascript
<!--
1. 理解过滤器
  功能: 对要显示的数据进行特定格式化后再显示
  注意: 并没有改变原本的数据, 可是产生新的对应的数据
2. 编码
  1). 定义过滤器
    Vue.filter(filterName, function(value[,arg1,arg2,...]){
      // 进行一定的数据处理
      return newValue
    })
  2). 使用过滤器
    <div>{{myData | filterName}}</div>
    <div>{{myData | filterName(arg)}}</div>
-->
<!--需求: 对当前时间进行指定格式显示-->
<div id="test">
  <h2>显示格式化的日期时间</h2>
  <p>{{time}}</p>
  <p>最完整的: {{time | dateString}}</p>
  <p>年月日: {{time | dateString('YYYY-MM-DD')}}</p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript" src="https://cdn.bootcss.com/moment.js/2.22.1/moment.js"></script>
<script>
  // 定义过滤器
  Vue.filter('dateString', function (value, format='YYYY-MM-DD HH:mm:ss') {

    return moment(value).format(format);
  })


  new Vue({
    el: '#test',
    data: {
      time: new Date()
    },
    mounted () {
      setInterval(() => {
        this.time = new Date()
      }, 1000)
    }
  })
</script>
```

### 内置指令与自定义指令

#### 常用内置指令

+ v:text:更新元素的textContent
+ v-html:更新元素的innerHtml
+ v-if:如果为true，当前标签才会输出到页面
+ v-else:如果为false，当前标签才会输出到页面
+ v-show:通过控制display样式来控制显示/隐藏
+ v-for:遍历数组/对象
+ v-on:绑定事件监听，一般简写为@
+ v-bind:强制绑定解析表达式，可以省略 v-bind
+ v-model:双向数据绑定
+ ref:指定唯一标识，vue对象通过$refs属性访问这个元素对象
+ v-cloak:防止闪现，与css配合:[v-cloak]{display:none}

#### 自定义指令

+ 注册全局指令

```javascript
Vue.directive('my-directive',function(el,binding)){
              el.innerHTML = binding.value.toupperCase()
              }
```

+ 注册局部指令

```javascript
directives:{
    'my-directive':{
        bind(el,binding){
            el.innerHTML = binding.value.toupperCase()
        }
    }
}
```

+ 使用指令
  + v-my-directive='xxx'

```javascript

<!--
1. 注册全局指令
  Vue.directive('my-directive', function(el, binding){
    el.innerHTML = binding.value.toupperCase()
  })
2. 注册局部指令
  directives : {
    'my-directive' : {
        bind (el, binding) {
          el.innerHTML = binding.value.toupperCase()
        }
    }
  }
3. 使用指令
  v-my-directive='xxx'
-->
<!--
需求: 自定义2个指令
  1. 功能类型于v-text, 但转换为全大写
  2. 功能类型于v-text, 但转换为全小写
-->

<div id="test">
  <p v-upper-text="msg"></p>
  <p v-lower-text="msg"></p>
</div>

<div id="test2">
  <p v-upper-text="msg"></p>
  <p v-lower-text="msg"></p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  // 注册一个全局指令
  // el: 指令所在的标签对象
  // binding: 包含指令相关数据的容器对象
  Vue.directive('upper-text', function (el, binding) {
    console.log(el, binding)
    el.textContent = binding.value.toUpperCase()
  })
  new Vue({
    el: '#test',
    data: {
      msg: "I Like You"
    },
    // 注册局部指令
    directives: {
      'lower-text'(el, binding) {
        console.log(el, binding)
        el.textContent = binding.value.toLowerCase()
      }
    }

  })

  new Vue({
    el: '#test2',
    data: {
      msg: "I Like You Too"
    }
  })
</script>
```

### 插件

#### 说明

+ Vue插件是一个包含install方法的对象
+ 通过install方法给Vue或Vue实例添加方法，定义全局指令等

```javascript
<body>

<div id="test">
  <p v-my-directive="msg"></p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript" src="vue-myPlugin.js"></script>
<script type="text/javascript">
  // 声明使用插件(安装插件: 调用插件的install())
  Vue.use(MyPlugin) // 内部会调用插件对象的install()

  const vm = new Vue({
    el: '#test',
    data: {
      msg: 'HaHa'
    }
  })
  Vue.myGlobalMethod()
  vm.$myMethod()

  new Object()
</script>
```

vue-myPlugin.js

```javascript
(function (window) {
  const MyPlugin = {}
  MyPlugin.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
      console.log('Vue函数对象的myGlobalMethod()')
    }

    // 2. 添加全局资源
    Vue.directive('my-directive',function (el, binding) {
      el.textContent = 'my-directive----'+binding.value
    })

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function () {
      console.log('vm $myMethod()')
    }
  }
  window.MyPlugin = MyPlugin
})(window)

```

# vue组件化编码

## 使用vue-cli创建模板项目

### 创建vue项目

```shell
//2.xxx
cnpm install -g vue-cli
vue init webpack vue_demo
cd vue_demo
cnpm install
cnpm run dev
```

### 项目的打包和发布

#### 打包

```shell
cnpm run build
```

#### 发布1:使用静态服务器工具包

```shell
cnpm install - serve
serve dist
访问：http://localhost:5000
```

#### 发布2:使用动态web服务器(tomcat)

​	修改配置:webpack.prod.conf.js

​	 output:{ publicPath:'/xxx/' //打包文件夹的名称 }

​	 重新打包: npmrunbuild 修改 dist 文件夹为项目名称:xxx 

​	将 xxx 拷贝到运行的 tomcat 的 webapps 目录下 

​	访问:http://localhost:8080/xxx