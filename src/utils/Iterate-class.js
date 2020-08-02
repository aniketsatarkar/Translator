/**
 * Class to iterate over an array maintaining history
 * Author: Aniket Satarkar <aniketsatarkar9@gmail.com>
 * ex: const iterator = new Iterator([...], (item) => { change event handler })
 * const nextItem iterator.next()
 * const previousItem iterator.previous()
 */

export default class {
  stack = [] // stack will be there reference point to iterate on
  index = 0
  changed = null

  // initialize an object of an iterator
  constructor (stack, changed = null) {
    this.changed = changed

    if (stack === undefined)
      throw "canno't set stack to undefield"

    if (stack === null)
      throw "canno't set stack to null"

    if (!Array.isArray(stack))
      throw "stack must be an array"

    this.stack = stack
  }

  // clear stack
  clear () {
    this.stack = []
  }

  // get the next item from the stack
  next (item = null) {
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
  }

  // get the previous item from the list
  previous () {
    const index = (this.index - 1)
    if (this.stack[index] !== undefined) {
      this.index -= 1
      return this._triggerChange(this.stack[index])
    }

    return -1
  }

  // method to trigger change event on either next or previous method call
  _triggerChange (data) {
    console.log('this.changed : ', this.changed)
    if (this.changed !== undefined && this.changed !== null) {
      console.log('this.changed : ', this.changed)
      this.changed(data)
    }

    return data
  }

} // end of class
