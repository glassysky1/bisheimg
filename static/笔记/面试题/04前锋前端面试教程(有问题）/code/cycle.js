//文件遍历

//node环境下是基于commonjs的语法
const fs = require('fs')
const path = require('path')
// import fs from 'fs'
const readDir = (entry)=>{
  //读入当前文件夹
  const dirInfo = fs.readdirSync(entry)
  dirInfo.forEach(item=>{
    //路径拼接
    const location = path.join(entry,item)
    //查看当前的文件或文件夹信息
    const info = fs.statSync(location)
    //如果是文件夹，递归
    if(info.isDirectory()){
      console.log(`dir:${location}`)
      readDir(location)
    }else{
      console.log(`file:${location}`)
      
    }

  })
}

readDir(__dirname)
