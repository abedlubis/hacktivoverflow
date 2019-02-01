<template>
  <div style="height: 100%; margin-top: 5%;">
    <div class="row">
      <div class="col-md-2">
        <Navigation style="top: 10%"> </Navigation>
      </div>
      <div class="col-md-7 d-flex flex-column">
         <v-tabs right>
            <v-tab @click="fetchQuestions">All Questions </v-tab>
            <v-tab v-if="isLogin" @click="fetchWatchedQuestions">Watch </v-tab>
          </v-tabs>
        <Questions v-for="(question, index) in allquestions" :key="index" :question="question" class="my-2"> </Questions>
      </div>

      <div class="col-md-3 d-flex flex-column align-self-start">
        <WatchTag v-if="isLogin"> </WatchTag>
        <Job class="mt-4" :my-watch="myWatchs"> </Job>
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
      'myWatchs'
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
    this.checkLogin()
    this.fetchQuestions()
  },
  mounted () {
    this.fetchMyWatchTag()
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
    }
  },
  methods: {
    ...mapActions([
      'fetchQuestions',
      'fetchMyWatchTag',
      'checkLogin'
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
    }
  }
}
</script>

<style>

</style>
