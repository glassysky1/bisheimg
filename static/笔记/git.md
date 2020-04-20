```shell
git config --global user.name "you name"
git config --global user.email "email@example.com"
```

## 创建版本库

```shell
git init

git add .//添加东西到仓库(1)//暂存区
git git commit -m '第一个文件'(1，2)是循环的//工作区

git status//查看状态
git diff//查看修改什么内容
git log//查看历史
git reset --hard HEAD^//回退上一次版本(千万别乱用)
git reset --hard 版本号，回到指定版本

git branch new_branch2//创建分支
git checkout -b iwen//创建子分支,切换新分支
git branch *//查看分支
git checkout master//切换分支//switch
git merge iwen//子分支合并到主分支，iwen是子分支
git branch -d iwen //删除子分支
```

## 上传

```shell
//公钥
ssh-keygen -t rsa -C "邮箱"
//c盘/用户
打开github，设置，SSH and GPG keys
new 一个，，把c盘的钥匙放到github中
//在github创建一个仓库，看github操作

```

## 管理

```shell
//创建一个文件夹
git clone (后面写你复制的地址)

//如果要和别人共同开发，添加别人成员，别人复制地址clone，别人上传以后，
//我用
git pull
```

## 最近的



