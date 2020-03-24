// function sum(a,b) {
//   return a + b
// }

// var m = sum(3,4)
// console.log(m)


// function sumAfter2000ms(a,b) {
//  setTimeout(() => {
//    return a + b
//  }, 2000); 
// }
// var  m = sumAfter2000ms(3,4)
// console.log(m)

// function sumAfter2000ms(a, b, cb) {
//   setTimeout(() => {
//     cb(a + b)
//   }, 2000);
// }

// sumAfter2000ms(3, 4, function (m) {
//   console.log(m)//7
//   sumAfter2000ms(5, 5, function (m) {
//     console.log(m)//10
//     sumAfter2000ms(1, 3, function (m) {
//       console.log(m)//4
//     })
//   })
// })


// function sumAfter2000md(a, b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a + b)
//     }, 2000);
//   })
// }

// sumAfter2000md(3, 4)
// .then((m) => {
//   console.log(m)
//   return sumAfter2000md(5, 5)
// })
// .then(function (m) {
//   console.log(m)
//   return sumAfter2000md(1,3)
// })
// .then(m =>{
//   console.log(m)
// })

class Chengnuo {
  constructor(fn) {
    this.cb = null
    fn(function (a) {
      console.log(a)
    })
  }
  then(cb) {
        
  }
}

function sumAfter2000ms(a, b) {
  return new Chengnuo((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000);
  })
}

sumAfter2000ms(3, 4)