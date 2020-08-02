export default {
  interval: null,
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

    this.interval = setInterval(() => {
      this._triggerTick()
      if (this.countdown - 1 === 0) {
        this._triggerCompleted()
      }
      this.countdown -= 1
    }, 1000)

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
      if (this.countdown - 1 === 0) {
        this._triggerCompleted()
      }
      this.countdown -= 1
    },1000)

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
      this.countdown = 1
    }
  },
  _triggerTick: function() {
    if (this.tick !== undefined && this.tick !== null) {
      this.tick(this.countdown)
    }
  },
  _triggerCompleted: function() {
    if (this.completed !== undefined && this.completed !== null) {
      this.completed()
    }
    this.clear()
  }
}
