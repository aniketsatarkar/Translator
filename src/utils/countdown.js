export default {
  interval: null,
  count: 1,
  tick: null,
  completed: null,
  countdown: 5,
  promise: {
    resolve: null,
    reject: null
  },
  initialize: function (countdown = 5, tick = null, completed = null) {
    this.countdown = countdown
    this.tick = tick
    this.completed = completed

    this.interval = setInterval(function () {
      if (this.count - 1 === 0) {
        this.completed()
      }
      this.count -= 1
    }, countdown * 1000)

    if (this.tick === null && this.completed === null) {
      return new Promise(function (resolve, reject) {
        this.promise.resolve = resolve
        this.promise.reject = reject
      })
    }
  },
  restart: function () {
    this.clear()
    this.interval = setInterval(function () {
      if (this.count - 1 === 0) {
        this.completed()
      }
      this.count -= 1
    }, countdown * 1000)

    if (this.tick === null && this.completed === null) {
      return new Promise(function (resolve, reject) {
        this.promise.resolve = resolve
        this.promise.reject = reject
      })
    }
  },
  clear: function () {
    if (this.interval !== undefined &&  this.interval !== null) {
      clearInterval(this.interval)
      this.count = 1
    }
  },
  _triggerTick() {
    if (this.tick !== undefined && this.tick !== null) {
      this.tick()
    }
  },
  _triggerCompleted() {
    if (this.completed !== undefined && this.completed !== null) {
      this.completed()
      this.clear()
    }
  }
}
