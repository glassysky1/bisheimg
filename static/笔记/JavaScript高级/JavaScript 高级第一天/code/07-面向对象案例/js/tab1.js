let that
class Tab {
  constructor(id) {
    //获取元素
    that = this
    this.main = document.querySelector(id)
    //增加 按钮
    this.add = this.main.querySelector('.tabadd')
    // li 的父元素
    this.ul = this.main.querySelector('.fisrstnav ul:first-child')
    //section父元素
    this.fsection = this.main.querySelector('.tabscon')
    this.init()
  }
  init() {
    this.updateNode()
    //初始化操作让相关元素绑定事件
    this.add.onclick =this.addTab
    for(var i = 0;i <this.lis.length;i++){
      this.lis[i].index = i
      this.lis[i].onclick = this.toggleTab
      this.remove[i].onclick = this.removeTab
    }
  }
  updateNode(){
    this.lis = this.main.querySelectorAll('li')
    this.sections = this.main.querySelectorAll('section')
    this.remove = this.main.querySelectorAll('.icon-guanbi')
    this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
  }
  //添加功能
  addTab(){
    that.clearClass()
    var random = Math.random()
    var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
    var section = '<section class="conactive">测试 ' + random + '</section>';
    that.ul.insertAdjacentHTML('beforeEnd',li)
    that.fsection.insertAdjacentHTML('beforeEnd',section)

    //重新初始化,重新获取所有的li和section
    that.init()
  }
  //清除所有li 和section的类
  clearClass(){
    for(let i =0;i<this.lis.length;i++){
      this.lis[i].className = ''
      this.sections[i].className = ''
    }
  }
  //切换功能
  toggleTab(){
    that.clearClass()
    this.className = 'liactive'
    that.sections[this.index].className = 'conactive'
  }

  //删除功能
  removeTab(e){
    e.stopPropagation()
    var index = this.parentNode.index
    console.log(index);
    that.lis[index].remove()
    that.sections[index].remove()
    that.init()

    //当我们删除的不是选中状态的li的时候，原来的选中状态li保持不变
    if(document.querySelector('.liactive')) return
    //当我们删除了选中状态的li的时候，让它的前一个li处于选定状态
    index--
    that.list[index]
  }
}
new Tab('#tab')