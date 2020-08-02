<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <label>From</label>
        <b-form-select v-model="from">
          <b-form-select-option
            v-for="(item, index) in languages"
            :key="index"
            :value="item.code"
          >
            {{ item.name }}
          </b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col>
        <label>To</label>
        <b-form-select v-model="to">
          <b-form-select-option
            v-for="(item, index) in languages"
            :key="index"
            :value="item.code"
          >
            {{ item.name }}
          </b-form-select-option>
        </b-form-select>
      </b-col>
    </b-row>

    <!-- text-area -->
    <b-row>
      <b-col>
        <b-form-textarea
          v-model="input"
          placeholder="JSON Object..."
          rows="15"
        />
      </b-col>
      <b-col>
        <b-form-textarea
          v-model="json"
          placeholder="JSON Object..."
          rows="15"
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 text-center">
      <b-col>
        <b-button @click="eachRecursive(json)">
          Translate
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import langs from '@/utils/langs'

export default {
  data() {
    return {
      languages: [],
      from: 'en',
      to: 'zh',
      input: null,
      output: {},
      json: {
        name: 'Aniket',
        dob: {
          day: '2nd',
          month: 'April',
          year: 'Ninetien Ninty Four'
        },
        age: 'Twenty Five Years'
      }
    }
  },
  created() {
    this.getLanguages()
  },
  methods: {
    getLanguages() {
      const keys = Object.keys(langs)
      for (const index in keys) {
        this.languages.push({
          name: keys[index],
          code: langs[keys[index]]
        })
      }
    },
    translate(text, from, to) {
      return new Promise((resolve, reject) => {
        if (text === undefined || text === null) { reject(null) }
        if (from === undefined || from === null) { reject(null) }
        if (to === undefined || to === null) { reject(null) }

        const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + from + '&tl=' + to + '&dt=t&q=' + encodeURI(text)

        axios.get(url).then(response => {
          console.log('DATA : ', response.data[0][0][0])
          resolve(response.data[0][0][0])
        }).catch(error => {
          reject(error)
        })
      })
    },
    // This function handles arrays and objects
    eachRecursive(object) {
      for (var index in object) {
        if (typeof object[index] === 'object' && object[index] !== null) {
          this.eachRecursive(object[index])
        } else {
          this.translate(object[index], this.from, this.to).then(response => {
            object[index] = response
          }).catch(error => {
            console.log('Error: ', error)
          })
        }
      }
    }
    // ...
  }
}
</script>
