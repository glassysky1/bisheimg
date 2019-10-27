const express = require('express')
const app = express()

app.use(express.static('./static'))

// app.get(/.*/,function (req,res) {
//   res.sendFile(__dirname+'./dist/index.html')
// })

app.listen(9000,()=>{
  console.log('Server started....');
  
})