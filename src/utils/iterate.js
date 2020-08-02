/**
 * A module to iterate through as stack
 * Author: Aniket Satarkar <aniketsatarkar9@gmail.com>
 * ----------------------------------------------------
 * Usage:
 * import Iterator from 'iterate.js' 
 * 
 * Set change handler:
 * Iterator.changed = function (item) { ... }
 * 
 * add item to the stack:
 * Iterator.next(item) 
 * 
 * get previous item from list:
 * const item = Iterator.previous()
 */

export default {
  stack: [],
  index: 0,
  changed: null,

  next: function (item = null) {
    const index = (this.index + 1)
    if (this.stack[index] !== undefined) {
      this.index += 1
      return this._triggerChange(this.stack[index])
    } else if (item !== undefined && item !== null) {
      this.index += 1
      this.stack.push(item)
      return this._triggerChange(this.stack[index])
    }

    return -1
  },
  previous: function () {
    const index = (this.index - 1)
    if (this.stack[index] !== undefined) {
      this.index -= 1
      return this._triggerChange(this.stack[index])
    }

    return -1
  },
  set: function (stack) {
    if (stack === undefined)
      throw "canno't set stack to undefield"

    if (stack === null)
      throw "canno't set stack to null"

    if (!Array.isArray(stack))
      throw "stack must be an array"

    this.stack = stack
  },
  clear: function () {
    this.stack = []
  },
  _triggerChange: function (data) {
    if (this.changed !== undefined && this.changed !== null) {
      this.changed(data)
    }

    return data
  }
}
