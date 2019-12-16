//单体模式
var Teacher = {
  name: 'dabinge',
  age: 18,
  job: '10year',
  showName: function () {
    return this.name
  }
}
var student = Object.create(Teacher)
student.name = 'wangtiechui'
student.job = '3Month'
console.log(student.showName())
student.showJob = function () {
  return this.job
}
console.log(student.job)


//伪类继承
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  showName() {
    return this.name
  }
}

class Teacher1 extends Person {
  constructor(name, age, job) {
    super(name, age)
    this.job = job
  }
  showInfo() {
    return this.job + '---' + super.showName()
  }
}

var t1 = new Teacher1('dabinge', 16, '搬砖的')
console.log(t1.showInfo())

