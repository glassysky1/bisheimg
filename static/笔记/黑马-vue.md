# mui

mian.js

```javascript
import './lib/mui/css/mui-min.css'
```

## 报错

```javascript
//.gitignore
/src/lib/mui/js/mui.js
//babel.config.js
 ignore:[
    './src/lib/mui/js/mui.js'
  ]
```



# 把项目提交到码云

```shell
git init
git remote add origin https://gitee.com/wearsao/vue-practice.git
git push -u origin master
```

# 小细节

### 覆盖linkActiveClass类

```javascript
//route.js
export default new Router({
  routes: [
   
  ],
  linkActiveClass:'mui-active'//
});
```

### index.js中children

​	**index.js的children是当前页的路由组件才可以用(比如shop中的三个路由)**

### flex左右分开

```css
//父元素 
display flex
justify-content space-between
```

### 传参

```javascript
:to="'/home/newsinfo/'+news.id"//斜杠要加
//ruoter.js
 path:'/home/newsinfo/:id',
//接收方
this.$route.params.id



```

### 评论加载更多

为防止新数据覆盖老数据的情况，我们在 点击更多的时候，每当获取到新数据，应该让老数据调用 数组的 concat方法，拼接上新数组

```javascript
this.comments  = this.comments.concat(result.body.message)
```

### 子组件向父组件传值

父

```javascript
//html
<GoodsInfoNumber @getCount = "getSelectedCount" />
//javascirpt
 getSelectedCount(count){
      //当子组件把 选中的数量传给父组件时，把选中的值保存到data上
        this.selectedCount = count
 }
```

子

```javascript
//html
<input ref="numbox" class="mui-input-numbox" type="number" value="1" @change="countChanged" />
//JavaScript
  countChanged() {
      //每当文本框的数据修改的时候，立即把 最新额数据，通过事件调用，传递给父组件
      this.$emit('getCount',parseInt(this.$refs.numbox.value))
    }

```

### watch

监视，当值发生改变是做下一步

```javascript
watch:{
    max(newVal,oldVal){
      mui('.mui-numbox').numbox().setOption('max',newVal)
    }
  },
```

### 购物车查找添加数据

```javascript
export default{
  [ADD_TO_CAR](state, goodsInfo){
    // 假设没有找到对应的商品
    let flag = false
    state.car.some(item =>{
      if(item.id === goodsInfo.id){
        item.count += parseInt(goodsInfo.count)
        flag = true
        return true 
      }
    })
    //若果最终循环完毕
    if(!flag){
      state.car.push(goodsInfo)
    }
  }
}
```

### 计算购物车中总数量

```javascript
 getAllCount(state){
   return  state.car.reduce((pretotal,goods)=>pretotal+goods.count,0)
  }
//mapState(['getAllCount'])
```

### 本地存储

```javascript
    localStorage.setItem('car',JSON.stringify(state.car))
	//取出来
	let car = JSON.parse(localStorage.getItem('car')||'[]')
	export default{
  		car//购物车的数据 id,count: price,selected是否被选中
	}

```

数组字符串拼接

```javascript
isArr.join(',')
```

