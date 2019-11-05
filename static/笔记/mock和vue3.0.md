# vue ui

## 笔记

### 防止eslint提示

创建.prettierrc

```javascript
{
    "semi":false,
    "singleQuote":true
}
```

# mockjs

src/mock/index.js

```javascript
import Mock from 'mockjs';

Mock.mock('/api/goodslist', 'get', {
  status: 200,
  message: '获取商品列表成功',
  data: [1, 2, 3, 4]
})
```

main.js导入