<template>
  <b-row>
    <b-col>
      <b-row>
        <b-col>
          <b-button @click="initialize">
            Initialize
          </b-button>
        </b-col>
        <b-col>
          <b-button @click="next">
            Next
          </b-button>
        </b-col>
        <b-col>
          <b-button @click="previous">
            Previous
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>{{ item }}</b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import iterate from '@/utils/iterate'

export default {
  data() {
    return {
      item: null
    }
  },
  methods: {
    initialize() {
      // ... set some data to stack...
      const data = [
        {name: 'Aniket'},
        {name: 'Arjit'},
        {name: 'Rahul'},
        {name: 'Lasan'},
        {name: 'Kanda'}
      ]
      iterate.set(data)
      iterate.changed = this.handleChanged
    },
    next() {
      iterate.next()
    },
    previous() {
      iterate.previous()
    },
    handleChanged(item) {
      this.item = item
    }
  }
}
</script>
