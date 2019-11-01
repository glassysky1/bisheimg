## jsonp

```shell
cnpm i jsonp
```

封装

```javascript
import originJSONP from "jsonp";
export default jsonp = (url,data,option) =>{
  url += (url.indexOf('?')<0 ? '?' : '&') +param(data)
  return new Promise((resolve,reject) =>{
    originJSONP(url,option,(err,data) =>{
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}
function param(data) {
  let url = ''
  for(var k in data){
    let value = data[k] !==undefined ?data[k] :''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) :''
}
```

## item.creator.name

把字符进行转义

## 判断图片是否加载

```javascript
<img @load="loadImage" :src="item.picUrl" alt />
 //方法
   loadImage(){
      //如果触发load,则触发scroll refresh 方法
      //加载一张图片就触发一次就好
      if(!this.checkLoaded){
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
```

## vue-lazyload

```shell
cnpm i vue-lazyload -S
```

```javascript
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
  loading:require('./assets/logo.png')
})
```

```html
<img v-lazy="item.imgurl" width="60" height="60" />
```

## 如果better-scroll和fastclick冲突

点击冲突加class="needclick"

## 销毁时清除定时器

```javascript
 destroyed() {
    clearTimeout(this.timer);
  }
```

## substr(0,1)

切割字符串

## $el,scroll用

**vm.$el**

获取Vue实例关联的DOM元素；(单个)

```javascript
    this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
```



 **vm.$data**

获取Vue实例的data选项（对象）****

 **vm.$options**

获取Vue实例的自定义属性（如vm.$options.methods,获取Vue实例的自定义属性methods）

 **vm.$refs**

获取页面中所有含有ref属性的DOM元素（如vm.$refs.hello，获取页面中含有属性ref = “hello”的DOM元素，如果有多个元素，那么只返回最后一个）

## action作用

异步获取，对mutation进行封装，若多次使用mutation，则用action

## 方法可以写在html中

```javascript
<p class="desc">{{getDesc(song)}}</p>
//方法
getDesc(song) {
      return `${song.singer.replace(' ','')} . ${song.album}`;
    }
```

## create-keyframe-animation 

```shell
npm install create-keyframe-animation
```

```javascript
import animations from "create-keyframe-animation";
  
enter(el, done) {
      const {x,y,scale}= this._getPosAndScale()
      let animation = {
        0:{
          transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60:{
          transform:`translate3d(0,0,0) scale(1.1)`
        },
        0:{
          transform:`translate3d(0.0.0) scale(1)`
        },
      }
      animations.registerAnimation({
        name:'move',
        animation,
        presets:{
          duration:400,
          easing:'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper,'move',done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      const {x,y,scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style[transform] =`translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend',done)
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    _getPosAndScale() {
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingTop;
      return{
        x,
        y,
        scale
      }
    },
```

## 动画

```css
      &.play
          animation rotate 20s linear infinite
      &.pause
          animation-play-state paused
      @keyframes rotate
          0%
            transform rotate(0)
          100%
            transform rotate(360deg)	
 cdCls(){
      return this.playing ? 'play' : 'play pause'
    },
```

## audio属性

```css
<audio ref="audio" :src="currentSong.url" @play="ready" @error="error"@timeupdate="updateTime" @ended="end"></audio>
```

```javascript
//方法
ready(){
    //音频加载成功调用
}
error(){
    //歌曲无法加载调用
}
updateTime(){
    //歌曲的当前时间
}
end(){
    //歌曲结束调用
}
```

## js-base64

```shell
cnpm install --save js-base64
import { Base64 } from 'js-base64';
Base64.encode('dankogai');  // ZGFua29nYWk=
Base64.encode('小飼弾');    // 5bCP6aO85by+
Base64.encodeURI('小飼弾'); // 5bCP6aO85by-

Base64.decode('ZGFua29nYWk=');  // dankogai
Base64.decode('5bCP6aO85by+');  // 小飼弾
// note .decodeURI() is unnecessary since it accepts both flavors
Base64.decode('5bCP6aO85by-');  // 小飼弾
```

## lyric-parser

```shell
cnpm install lyric-parser
```

## watch

```javascript
    this.$watch('query',(newQuery) =>{
      this.$emit('query',newQuery)
    })
```

## 节流

```javascript

//节流函数,超过delay秒未被调用，这玩意就会被调用一次
export function debounce(func,delay) {
  let timer
  return function (...args) {
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this,args)
    }, delay);
  }
}
```

## 键盘模糊

```javascript
suggest
  <scroll class="suggest" :beforeScroll = "beforeScroll" @beforeScroll="listScroll" :data="result" :pullup = "true" @scrollToEnd = "searchMore" ref="suggest">

 //methods
   listScroll(){
      //父节点接收，因为键盘
      this.$emit('listScroll')
    },
```

```javascript
searchbox
<div class="search-box">
    <Icon type="md-search" class="icon-search" />
    <input class="box" ref="query" v-model="query" :placeholder="placeholder" />
    <Icon @click="clear" v-show="query" type="md-close" class="icon-dismiss" />
  </div>
//methods
 blur(){
      this.$refs.query.blur()
}
```

```javascript
search
      <search-box  ref="searchBox" @query="onQueryChange"></search-box>
      <suggest :query="query" @listScroll = "blurInput"></suggest>

//methods
 blurInput(){
      this.$refs.searchBox.blur()
    }
```

## storage

```shell
cnpm install good-storage
```

```javascript
import storage from 'good-storage'
// localStorage
 storage.set(key,val) 
 
 storage.get(key, def)
 
 // sessionStorage
 storage.session.set(key, val)
 
 storage.session.get(key, val)
```

## transition-group

```javascript
//li里面的key必须不能是index  
<transition-group name="list" tag="ul">
            <li
              ref="listItem"
              class="item"
              @click="selectItem(item,index)"
              v-for="(item,index) in sequenceList"
              :key="item.id"
            >
              <!-- <Icon type="ios-pause-outline" /> -->
              <Icon class="current" :type="getCurrentIcon(item)" />
              <span class="text">{{item.name}}</span>
              <span class="like">
                <Icon class="icon-favorite" type="ios-heart" />
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <Icon type="md-close" class="icon-delete" />
              </span>
            </li>
          </transition-group>
```

```scss
  &.list-enter-active,&.list-leave-active
          transition all .1s linear 
  &.list-enter,&.list-leave-to
          height 0
```

## 图片刷新scroll

```javascript
<img @load="loadImage" v-lazy="item.picUrl" alt class="img" />

loadImage() {
      if(!this.checkloaded){
          this.$refs.scroll.refresh()
          this.checkloaded = true
      }
    }
```

## 歌曲列表滚动

```javascript
    created(){
        this.probeType =3
        this.listenScroll =true
    }
    //scroll标签加入 @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll"

//data里定义srollY:0
	
//method
	scroll(pos){
      this.scrollY = pos.y
    }
//watch scrollY 并赋值给layer
scrollY(newY){
    this.$refs.layer.style['transform'] = `translate3d(0,${newY}px,0)`
}
//list的top可以这样计算 mounted
 this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
 
 //最上滚动距离，就是一个背景的高度
 //mounted
  this.imageHeight = this.$refs.bgImage.clientHeight
  this.minTranslateY = -this.imageHeight+40//顶部预留40px高度
  this.$refs.list.$el.style.top = `${this.imageHeight}px`
 
  //bglayer的top最大只有imageheight的距离
  //watch
 scrollY(newY){
      let translateY = Math.max(this.minTranslateY,newY)
      this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
    }
//layer滚动上去，留40px给image的高度显示出来
//watch
 scrollY(newY){
      let translateY = Math.max(this.minTranslateY,newY)
      let zIndex =0
      this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
      if(newY<this.minTranslateY){
        //如果bglayer滚到顶部
        zIndex = 10
        //就把背景图片的paddingTop为0，高度为40px
        this.$refs.bgImage.style.paddingTop =0
        this.$refs.bgImage.style.height=`${RESERVED_HEIGHT}px`
      }else{
          //如果没滚上去，或者下来了
          zIndex=0
          this.$refs.bgImage.style.paddingTop ='70%'
        this.$refs.bgImage.style.height=0
      }
      //然后层级提高，只能看到背景图的一丢丢
      this.$refs.bgImage.style.zIndex =zIndex
    }

//列表下拉，图片变大、列表上划，高斯模糊
  scrollY(newY){
      let translateY = Math.max(this.minTranslateY,newY)
      let zIndex =0
      let scale =1
      let blur =0
      this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
      
      //下拉的时候
      const percent = Math.abs(newY/this.imageHeight)
      //newY>0,就是下拉的时候，把image的层级提高
      if (newY >0){
        scale = 1 +percent
        zIndex =10
      }else{
          blur = Math.min(20*percent,20)
      }
	this.$refs.filter.style['backdrop-filter'] = `blur(${blur})px`

      if(newY<this.minTranslateY){
        //如果bglayer滚到顶部
        zIndex = 10
        //就把背景图片的paddingTop为0，高度为40px
        this.$refs.bgImage.style.paddingTop =0
        this.$refs.bgImage.style.height=`${RESERVED_HEIGHT}px`
      } else{
        //如果没滚上去，或者下来了
        zIndex =0
          this.$refs.bgImage.style.paddingTop ='70%'
        this.$refs.bgImage.style.height=0
      }
      //然后层级提高，只能看到背景图的一丢丢
      this.$refs.bgImage.style.zIndex =zIndex

      this.$refs.bgImage.style['transform'] = `scale(${scale})`
    }

```

## 动画必看

```css
  &.slide-enter-active,&.slide-leave-active
    transition all .4s
    .menu-wrapper,.bg-layer
      transition all .4s
  &.slide-enter,&.slide-leave-to
    .menu-wrapper
      transform translate3d(-100%,0,0)
    .bg-layer
      opacity 0
```

## Vue 错误：Avoid mutating a prop directly

这个错误是因为，因为我们直接修改父组件传递过来的参数，这样会存在影响外部 组件的风险。

解决方案：

在组件内部再构建一套属性域，来存储父组件传递过来的参数,从而与外界解耦

## router-view

只有子路由的时候才能使用

## 设置action时候，两个参数以上要用对象