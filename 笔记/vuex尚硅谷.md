# 实例

写的规则，组件->action ->mutation

在src下创建store.js

```javascript
/**
 * vuex的核心管理对象模块:store
 */
import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)
//状态对象
const state = {
    count: 0
}
//包含多个更新state函数的对象
const mutations = {
    //增加的mutation
    INCREMENT(state) {
        state.count++
    },
    //减少的mutation
    DECREMENT(state) {
        state.count--
    }
}
//包含多个对应事件回调函数的对象
const actions = {
    //增加的action
    increment({ commit }) {
        //提交mutation
        commit('INCREMENT')
    },
    //减少的action
    decrement({ commit }) {
        //提交mutation
        commit('DECREMENT')
    },
    //带条件的action
    incrementIfOdd({ commit, state }) {
        if (state.count % 2 ===0) {
            commit('INCREMENT')
        }
    },
    //异步的action
    incrementAsync({ commit }) {
        //在action中直接可以执行异步代码
        setTimeout(() => {
            commit('INCREMENT')
        }, 1000);
    }
}
//包含多个getter计算属性函数的对象
const getters = {
    evenOrOdd(state) {
        return state.count % 2 == 0 ? '偶数' : '奇数'
    }
}





export default new Vuex.Store({
    state,//状态对象
    mutations,//包含多个更新state函数的对象
    actions,//包含多个对应事件回调函数的对象
    getters//包含多个getter计算属性函数的对象
})
```

在main.js

```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";//引入
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,//注入
  components: { App },
  template: '<App/>'
})

```

HelloWorld.vue

```javascript
<template>
  <div class="hello">
   <p>click  {{$store.state.count}} times, count is {{evenOrOdd}}</p>
   <button @click="increment">+</button>
   <button @click="decrement">-</button>
   <button @click="incrementIfOdd">increment if odd</button>
   <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
      }
    },
    methods: {
      increment(){
        //通知vuex去增加
        this.$store.dispatch('increment')//触发store的action
      },
      decrement(){
        this.$store.dispatch('decrement')
      },
      //如果是奇数才增加
      incrementIfOdd(){
        this.$store.dispatch('incrementIfOdd')
      },
      //过1s才增加
      incrementAsync(){
         this.$store.dispatch('incrementAsync')
      }
    },
    computed: {
     evenOrOdd(){
       return this.$store.getters.evenOrOdd
     } 
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
```

# 组件优化

HelloWorld.vue

```javascript
<template>
  <div class="hello">
   <p>click  {{count}} times, count is {{evenOrOdd}}</p>
   <button @click="increment">+</button>
   <button @click="decrement">-</button>
   <button @click="incrementIfOdd">increment if odd</button>
   <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
  //映射
  import { mapState,mapGetters,mapActions } from "vuex";
  export default {
    name: 'HelloWorld',
    data() {
      return {
      }
    },
    methods: {
     ...mapActions(['increment','decrement','incrementIfOdd', 'incrementAsync'])
    },
    computed: {
      //从state读属性
      ...mapState(['count']),
      ...mapGetters(['eventOrOdd'])
    //  evenOrOdd(){
    //    return this.$store.getters.evenOrOdd
    //  } 
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
```

