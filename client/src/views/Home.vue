<template>
  <div style="height: 100%; margin-top: 5%;">
    <div class="row">
      <div class="col-md-2">
        <Navigation style="top: 10%"> </Navigation>
      </div>
      <div class="col-md-7 d-flex flex-column align-self-start">
         <v-tabs>
            <v-tab @click="fetchQuestions">All Questions </v-tab>
            <v-tab v-if="isLogin" @click="fetchWatchedQuestions">Watch </v-tab>
          </v-tabs>
        <Questions v-for="(question, index) in allquestions" :key="index" :question="question" class="my-2"> </Questions>
      </div>

      <div class="col-md-3 d-flex flex-column align-self-start">
        <WatchTag v-if="isLogin"> </WatchTag>
        <b-card class="mt-2">
          <h6 slot="header"
              class="mb-0">
              Job for you
          </h6>
          <div class="text-xs-left">
            <Job> </Job>
          </div>
        </b-card>
      </div>
    </div>
    <v-btn
      color="#FF961E"
      dark
      fab
      fixed
      bottom
      right
      @click="dialog = !dialog">
      <v-icon>question_answer</v-icon>
    </v-btn>
    <Ask v-if="dialog" :dialog="dialog" @dialog-turn="onChangeDialog"> </Ask>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Questions from '@/components/Question.vue'
import Ask from '@/components/Ask.vue'
import WatchTag from '@/components/WatchTag.vue'
import Job from '@/components/JobCard.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState([
      'questions',
      'isLogin',
      'myWatchs',
      'jobs'
    ])
  },
  components: {
    Navigation,
    Questions,
    Ask,
    WatchTag,
    Job
  },
  created () {

  },
  mounted () {
    this.fetchMyWatchTag()
    this.checkLogin()
    this.fetchQuestions()
    this.getJobFromAPI()
    // this.fetchJobStreet('gang')
  },

  data () {
    return {
      dialog: false,
      allquestions: this.questions
    }
  },
  watch: {
    questions (newVal) {
      this.allquestions = newVal
    },
    myWatchs (newVal) {
      this.getJobFromAPI()
    }
  },
  methods: {
    ...mapActions([
      'fetchQuestions',
      'fetchMyWatchTag',
      'checkLogin',
      'fetchJobStreet'
    ]),
    onChangeDialog (data) {
      this.dialog = data
    },
    fetchWatchedQuestions () {
      var temp = []
      this.myWatchs.forEach((w, i) => {
        this.questions.forEach((q, i) => {
          q.tags.forEach(t => {
            if (t._id === w._id) {
              temp.push(q)
            }
          })
        })
      })
      var magic = Array.from(new Set(temp))
      this.allquestions = magic
    },
    getJobFromAPI () {
      var length = this.myWatchs.length
      var indexWatch = Math.floor(Math.random() * Math.floor(length))
      console.log(this.myWatchs[indexWatch], 'data yg di cari')
      // this.fetchJobStreet(this.myWatchs)
    }
  }

}
</script>

<style>

</style>
