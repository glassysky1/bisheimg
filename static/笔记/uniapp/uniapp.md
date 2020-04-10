## page.js

```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"app-plus": {
					"scrollIndicator": "none", //隐藏滚动条
					"bounce":"none", //关闭反弹效果
					"titleNView": {
						// 搜索框配置
						"searchInput": {
							"align": "center",
							"backgroundColor": "#F7F7F7",
							"borderRadius": "4px",
							"placeholder": "搜索糗事",
							"placeholderColor": "#CCCCCC",
							"disabled": true
						},
						// 配置按钮
						"buttons": [
							// 左边
							{
								"color": "#FF9619",
								"colorPressed": "#BBBBBB",
								"float": "left",
								"fontSize": "44upx",
								"fontSrc": "/static/font/icon.ttf",
								"text": "\ue609"
							},
							// 右边
							{
								"color": "#000000",
								"colorPressed": "#BBBBBB",
								"float": "right",
								"fontSize": "44upx",
								"fontSrc": "/static/font/icon.ttf",
								"text": "\ue653"
							}
						]
					}
				}
			}
		}, {
			"path": "pages/news/news",
			"style": {
				"app-plus": {
					"titleNView": false,
					"scrollIndicator": "none" ,//隐藏滚动条
					"bounce":"none" //关闭反弹效果
				}
			}
		}, {
			"path": "pages/paper/paper",
			"style": { 
				"enablePullDownRefresh":true, //开启下拉刷新
				"navigationBarTitleText":"小纸条",
				"app-plus": {
					"scrollIndicator": "none" ,//隐藏滚动条
					"titleNView": {
						// 配置按钮
						"buttons": [
							// 左边
							{
								// "color": "#FF9619",
								"colorPressed": "#BBBBBB",
								"float": "left",
								"fontSize": "44upx",
								"fontSrc": "/static/font/icon.ttf",
								"text": "\ue845"
							},
							// 右边
							{
								"color": "#000000",
								"colorPressed": "#BBBBBB",
								"float": "right",
								"fontSize": "44upx",
								"fontSrc": "/static/font/icon.ttf",
								"text": "\ue684"
							}
						]
					}
				}
			}
		}, {
			"path": "pages/home/home",
			"style": {
				"navigationBarTitleText":"我的",
				"app-plus": {
					"scrollIndicator":"none",
					"titleNView":{
						"buttons":[
							{
								"type":"menu"
							}
						]
					}
				}
			}
		}, {
			"path": "pages/search/search",
			"style": {
				"enablePullDownRefresh":true,
				"app-plus": {
					"scrollIndicator": "none", //隐藏滚动条
					// "bounce":"none", //关闭反弹效果
					"titleNView": {
						"autoBackButton": false,
						// 搜索框配置
						"searchInput": {
							"align": "left",
							"backgroundColor": "#F7F7F7",
							"borderRadius": "4px",
							"placeholder": "搜索糗事",
							"placeholderColor": "#CCCCCC",
							"disabled": false
						},
						// 配置按钮
						"buttons": [
							// 右边
							{
								"color": "#000000",
								"colorPressed": "#BBBBBB",
								"float": "right",
								"fontSize": "16px",
								"text": "取消"
							}
						]
					}
				}
			}
		}, {
			"path": "pages/add-input/add-input",
			"style": {
				"app-plus": {
					"titleNView": false,
					"scrollIndicator": "none" ,//隐藏滚动条
					"animationType":"slide-in-bottom",
					"animationDuration":200
				}
			}
		}
	    ,{
            "path" : "pages/topic-nav/topic-nav",
            "style": {
				"navigationBarTitleText":"话题分类",
            	"app-plus": {
            		"scrollIndicator": "none" ,//隐藏滚动条
					"bounce":"none" //关闭反弹效果
            	}
            }
        }
        ,{
            "path" : "pages/topic-detail/topic-detail",
            "style": {
				"enablePullDownRefresh":true, //开启下拉刷新
            	"app-plus": {
            		"titleNView": {
						"type":"transparent", //渐变
						"buttons":[{
							"type":"menu"
						}]
					},
            		"scrollIndicator": "none" //隐藏滚动条
            	}
            }
        }
        ,{
            "path" : "pages/user-list/user-list",
            "style": {
            	"app-plus": {
            		"scrollIndicator": "none", //隐藏滚动条
					"animationType":"slide-in-left", //进场动画
            		"titleNView": {
            			"autoBackButton": false,
            			// 搜索框配置
            			"searchInput": {
            				"align": "left",
            				"backgroundColor": "#F7F7F7",
            				"borderRadius": "4px",
            				"placeholder": "搜索糗事",
            				"placeholderColor": "#CCCCCC",
            				"disabled": false
            			},
            			// 配置按钮
            			"buttons": [
            				// 右边
            				{
            					"color": "#000000",
            					"colorPressed": "#BBBBBB",
            					"float": "right",
            					"fontSize": "16px",
            					"text": "取消"
            				}
            			]
            		}
            	}
            }
        }
        ,{
            "path" : "pages/user-chat/user-chat",
            "style": {
            	"navigationBarTitleText":"聊天页",
            	"app-plus": {
            		"scrollIndicator": "none" ,//隐藏滚动条
            		"titleNView": {
            			// 配置按钮
            			"buttons": [
            				// 左边
            				{
            					// "color": "#FF9619",
            					"colorPressed": "#BBBBBB",
            					"float": "right",
            					"fontSize": "44upx",
            					"fontSrc": "/static/font/icon.ttf",
            					"text": "\ue628"
            				}
            			]
            		}
            	}
            }
        }
        ,{
            "path" : "pages/detail/detail",
            "style" : {
				"navigationBarTitleText":"内容页",
				"app-plus":{
					"scrollIndicator":"none",
					"bounce":"none",
					"titleNView":{
						"buttons":[{
							"type":"menu"
						}]
					}
				}
			}
        }
        ,{
            "path" : "pages/user-set/user-set",
            "style" : {
				"navigationBarTitleText":"设置"
			}
        }
        ,{
            "path" : "pages/user-set-repassword/user-set-repassword",
            "style" : {
				"navigationBarTitleText":"修改密码",
				"app-plus":{
					"scrollIndicator":"none"
				}
			}
        }
        ,{
            "path" : "pages/user-set-email/user-set-email",
            "style" : {
            	"navigationBarTitleText":"修改邮箱",
            	"app-plus":{
            		"scrollIndicator":"none"
            	}
            }
        }
        ,{
            "path" : "pages/user-set-userinfo/user-set-userinfo",
            "style" : {
            	"navigationBarTitleText":"修改资料",
            	"app-plus":{
            		"scrollIndicator":"none"
            	}
            }
        }
        ,{
            "path" : "pages/user-set-help/user-set-help",
            "style" : {
            	"navigationBarTitleText":"意见反馈",
            	"app-plus":{
            		"scrollIndicator":"none"
            	}
            }
        }
        ,{
            "path" : "pages/user-set-about/user-set-about",
            "style" : {
            	"navigationBarTitleText":"关于糗百",
            	"app-plus":{
            		"scrollIndicator":"none"
            	}
            }
        }
        ,{
            "path" : "pages/login/login",
            "style" : {
				"app-plus":{
					"titleNView":false,
					"bounce":"none",
					"scrollIndicator":"none"
				}
			}
        }
        ,{
            "path" : "pages/user-space/user-space",
            "style" : {
				"navigationBarTitleText":"个人空间",
				"app-plus":{
					"scrollIndicator":"none",
					"titleNView":{
						"type":"transparent",
						"buttons":[
							{"type":"menu"}
						]
					}
				}
			}
        }
    ],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "仿糗事百科",
		"navigationBarBackgroundColor": "#FFFFFF",
		"backgroundColor": "#FFFFFF"
	},
	"tabBar": {
		"color": "#ADADAD",
		"selectedColor": "#FEE42A",
		"backgroundColor": "#FFFFFF",
		"borderStyle": "black",//上边框线
		"list": [{
				"pagePath": "pages/index/index",
				"text": "糗事",
				"iconPath": "static/tabbar/index.png",
				"selectedIconPath": "static/tabbar/indexed.png"
			},
			{
				"pagePath": "pages/news/news",
				"text": "动态",
				"iconPath": "static/tabbar/news.png",
				"selectedIconPath": "static/tabbar/newsed.png"
			},
			{
				"pagePath": "pages/paper/paper",
				"text": "小纸条",
				"iconPath": "static/tabbar/paper.png",
				"selectedIconPath": "static/tabbar/papered.png"
			},
			{
				"pagePath": "pages/home/home",
				"text": "我的",
				"iconPath": "static/tabbar/home.png",
				"selectedIconPath": "static/tabbar/homed.png"
			}
		]
	}
	// ,"condition": { //模式配置，仅开发期间生效
	//     "current": 1, //当前激活的模式（list 的索引项）
	//     "list": [
	//         {
	//             "name": " test", //模式名称
	//             "path" : "pages/user-space/user-space",
	//             "query": "" //启动参数，在页面的onLoad函数里面得到。
	//         }
	//     ]
	// }
}

```

## 自定义图标

进阿里，下载到本地，把css复制下来，一大坨不删其他删掉

## common.css(flex)

```css
/* flex布局 */
.u-f,.u-f-ac,.u-f-ajc {
	display: flex;
}
.u-f-ac,.u-f-ajc{
	align-items: center;
}

.u-f-ajc {
	justify-content: center;
}

.u-f-jsb {
	justify-content: space-between;
}

.u-f1 {
	flex: 1;
}

.u-f-column {
	flex-direction: column;
}

```

## v-for渲染用block标签

```html
		<block v-for="(item, index) in list" :key="index"><index-list :item="item" :index="index"></index-list></block>
```

## 导航栏

```vue
<template>
	<view>
		<view class="uni-tab-bar">
			<!-- 滚动条 -->
			<scroll-view scroll-x="true" class="uni-swiper-tab" :scroll-into-view="scrollInto">
				<block v-for="(tab, index) in tabBars" :key="index">
					<view class="swiper-tab-list" :class="{ active: tabIndex === index }" @tap="tabtap(index)">
						{{ tab.name }}
						<view class="swper-tab-line"></view>
					</view>
				</block>
			</scroll-view>
		</view>

		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{'height':swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items, index) in newList" :key="index">
					<scroll-view scroll-y="true" class="list">
						<block v-for="(item, index1) in items.list" :key="index1"><index-list :item="item" :index="index1"></index-list></block>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import indexList from '../../components/index/index-list.vue';
export default {
	components: {
		indexList
	},
	data() {
		return {
			scrollInto:'',
			swiperheight:100,
			tabIndex: 0,
			tabBars: [
				{
					name: '关注',
					id: 'guanzhu'
				},
				{
					name: '推荐',
					id: 'tuijian'
				},
				{
					name: '体育',
					id: 'tiyu'
				},
				{
					name: '热点',
					id: 'redian'
				},
				{
					name: '财经',
					id: 'caijing'
				},
				{
					name: '娱乐',
					id: 'yule'
				},
				{
					name: '军事',
					id: 'junshi'
				},
				{
					name: '历史',
					id: 'lishi'
				},
				{
					name: '本地',
					id: 'bendi'
				}
			],
			newList: [
				{
					loadtext: '上拉加载更多',
					list: [
						{
							userpic: '../../static/demo/userpic/1.jpg',
							username: '昵称',
							isguanzhu: false,
							title: '我是标题1',
							type: 'img', //img:图文 video: 视频
							titlepic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								index: 1, //0 - 没有操作, 1 - 顶, 2 - 踩
								dingNum: 11,
								caiNum: 12
							},
							commentNum: 12,
							shareNum: 123
						},
						{
							userpic: '../../static/demo/userpic/1.jpg',
							username: '昵称',
							isguanzhu: true,
							title: '我是标题2',
							type: 'video', //img:图文 video: 视频
							titlepic: '../../static/demo/datapic/11.jpg',
							playNum: '20w',
							long: '2:47',
							infoNum: {
								index: 2, //0 - 没有操作, 1 - 顶, 2 - 踩
								dingNum: 1,
								caiNum: 14
							},
							commentNum: 12,
							shareNum: 123
						}
					]
				},
				{
					loadtext: '上拉加载更多',
					list: [
						{
							userpic: '../../static/demo/userpic/2.jpg',
							username: '昵称',
							isguanzhu: false,
							title: '我是标题3',
							type: 'img', //img:图文 video: 视频
							titlepic: '../../static/demo/datapic/12.jpg',
							infoNum: {
								index: 1, //0 - 没有操作, 1 - 顶, 2 - 踩
								dingNum: 11,
								caiNum: 12
							},
							commentNum: 12,
							shareNum: 123
						},
						{
							userpic: '../../static/demo/userpic/2.jpg',
							username: '昵称',
							isguanzhu: true,
							title: '我是标题4',
							type: 'video', //img:图文 video: 视频
							titlepic: '../../static/demo/datapic/11.jpg',
							playNum: '20w',
							long: '2:47',
							infoNum: {
								index: 2, //0 - 没有操作, 1 - 顶, 2 - 踩
								dingNum: 1,
								caiNum: 14
							},
							commentNum: 12,
							shareNum: 123
						}
					]
				},
				{
					loadtext: '上拉加载更多',
					list: []
				},
				{
					loadtext: '上拉加载更多',
					list: []
				},
				{
					loadtext: '上拉加载更多',
					list: []
				},
				{
					loadtext: '上拉加载更多',
					list: []
				}
			]
		};
	},
	onLoad(){
		uni.getSystemInfo({
			success:(res) =>{
				let height = res.windowHeight -uni.upx2px(100)//一百是导航栏高度
				this.swiperheight = height
				console.log(height)
				console.log(res.windowHeight)//窗口高度
				console.log(res.screenHeight)//窗口高度
			}
		})
	},
	methods: {
		tabtap(index) {//点击事件
			this.switchTab(index)
		},
		tabChange(e){//滑动事件
			this.switchTab(e.detail.current)
		},
		switchTab(index){
			if (this.tabIndex === index) {
			    return;
			}
			this.tabIndex = index;
			this.scrollInto = this.tabBars[index].id
			console.log(this.scrollInto)
		}
	}
};
</script>

<style scoped>
.uni-swpier-tab {
	border-bottom: 1upx solid #eeeeee;
}
.swiper-tab-list {
	color: #969696;
	font-weight: bold;
}
.uni-tab-bar .active {
	color: #343434;
}
.active .swper-tab-line {
	border-bottom: 6upx solid #fede33;
	width: 70upx;
	margin: auto;
	border-top: 6upx solid #fede33;
	border-radius: 20upx;
}

</style>

```

## 导航栏头组件

```vue
<template>
	<view class="uni-tab-bar">
		<!-- 滚动条 -->
		<scroll-view scroll-x="true" :style="scrollStyle" class="uni-swiper-tab">
			<block v-for="(tab, index) in tabBars" :key="index">
				<view :style="scrollItemStyle" class="swiper-tab-list" :class="{ active: tabIndex === index }" @tap="tabtap(index)">
					{{ tab.name }} {{tab.num?tab.num:''}}
					<view class="swper-tab-line"></view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		tabBars: Array,
		tabIndex: Number,
		scrollStyle: {
			type: String,
			default: ''
		},
		scrollItemStyle: {
			type: String,
			default: ''
		}
	},
	methods:{
		tabtap(index){
			this.$emit('tabtap',index)
		}
	}
};
</script>

<style scoped>
.uni-swpier-tab {
	border-bottom: 1upx solid #eeeeee;
}
.swiper-tab-list {
	color: #969696;
	font-weight: bold;
}
.uni-tab-bar .active {
	color: #343434;
}
.active .swper-tab-line {
	border-bottom: 6upx solid #fede33;
	width: 70upx;
	margin: auto;
	border-top: 6upx solid #fede33;
	border-radius: 20upx;
}
</style>

```

## 监听原生搜索点击事件

```javascript
onNavigationBarSearchInputClicked
在介绍，页面生命周期
```

## 路由跳转

```javascript
uni.navigateTo(OBJECT)
api里面
```

## 监听原生标题导航按钮点击事件

applus 默认返回消失autoBackButton

介绍，页面生命周期

```javascript
			
				onNavigationBarButtonTap(e){
						switch (e.index){
							case 1:
							uni.navigateTo({
								url:'../add-input/add-input'
							})
							break;
						}
		},
```

## 监听搜索内容变化事件

```javascript
onNavigationBarSearchInputChanged
```

## 监听软键盘点击搜索事件

```javascript
onNavigationBarSearchInputConfirmed
```

## 显示菜单

接口界面交互

```javascript
uni.showActionSheet({
    itemList: ['A', 'B', 'C'],
    success: function (res) {
        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
    },
    fail: function (res) {
        console.log(res.errMsg);
    }
});
```

## 弹窗

```javascript
uni.showModal({
    title: '提示',
    content: '这是一个模态弹窗',
    success: function (res) {
        if (res.confirm) {
            console.log('用户点击确定');
        } else if (res.cancel) {
            console.log('用户点击取消');
        }
    }
});
```

## 监听页面返回

```javascript
//与data齐名
onBackPress(){
    
}
```

## 兼容

manifest.json下的mp-weixin 

```java
"usingComponents":true,
```

## 弹性盒子防止被压缩

```javascript
	flex-shrink: 0;
```



