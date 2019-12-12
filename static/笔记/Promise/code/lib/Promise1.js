(function (window) {
  function Promise(excutor) {
    let self = this
    self.status = 'pending'
    self.data = undefined
    self.callbacks = []

    function resolve(value) {
      if (self.status !== 'pending') return
      self.status = 'resolved'
      self.data = value
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          })
        });
      }

    }
    function reject(reason) {
      if (self.status !== 'pending') return
      self.status = 'rejected'
      self.data = reason
      if (self.callbacks.length > 0) {
        setTimeout(callbacksObj => {
          callbacksObj.onRejected(reason)
        });
      }
    }
    try {
      excutor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  Promise.resolve = function (value) {

  }

  Promise.reject = function (reason) {

  }

  Promise.prototype.then = function (onResolved, onRejected) {
    let self = this
    self.callbacks.push(
      {
        onResolved,
        onRejected
      }
    )
  }
  Promise.prototype.catch = function (onRejected) {

  }

  Promise.all = function (promises) {

  }
  Promise.race = function (promises) {

  }
  return window.Promise = Promise
})(window)