<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <label>From</label>
        <b-form-select v-model="from">
          <b-form-select-option
            v-for="(item, index) in languages"
            :key="index"
            :value="item.language"
          >
            {{ item.language }}
          </b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col>
        <label>To</label>
        <b-form-select v-model="to">
          <b-form-select-option
            v-for="(item, index) in languages"
            :key="index"
            :value="item.language"
          >
            {{ item.language }}
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
        <b-button @click="eachRecursive(json)">Translate</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'

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
      axios.get('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', {
        headers: {
          'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
          'x-rapidapi-key': '4ae349c6ffmsh378a87e734fc358p1d8361jsn6609af329c04'
        }
      }).then(response => {
        this.languages = response.data.data.languages
      }).catch(error => {
        console.log('ERROR : ', error)
      })
    },
    translate(text, from, to) {
      return new Promise((resolve, reject) => {
        if (text === undefined || text === null) { reject(null) }
        if (from === undefined || from === null) { reject(null) }
        if (to === undefined || to === null) { reject(null) }

        const params = encodeURI('source=' + from + '&q=' + text + '&target=' + to)

        axios.post('https://google-translate1.p.rapidapi.com/language/translate/v2', params, {
          headers: {
            'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
            'x-rapidapi-key': '4ae349c6ffmsh378a87e734fc358p1d8361jsn6609af329c04',
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          // console.log('DATA #1 : ', response.data.data.translations[0].translatedText)
          // console.log('DATA #2 : ', response.data.data)
          // console.log('DATA #3 : ', response.data)
          // resolve(response.data.data.translations[0].translatedText)
        }).catch(error => {
          resolve('text') // for testing...
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
