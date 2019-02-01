<template>
    <div class="col-md-7 m-4">
        <router-link to="/questions">
            <v-btn flat small color="orange darken-2" ligh>
                <v-icon dark left>arrow_back</v-icon>Back
            </v-btn>
        </router-link>
        <md-card>
            <md-card-header>
                <div class="md-title">{{question.title}}</div>
            </md-card-header>
            <md-card-media-actions class="md-layout md-alignment-top-left">
                <md-card-actions class="md-layout-item md-size-10">
                    <md-button class=" md-icon-button" @click="handleUpVoteQuestion(question._id)">
                        <md-icon class="md-size-2x">arrow_drop_up</md-icon>
                    </md-button>
                    <div class="md-title">{{question.upVote.length - question.downVote.length}}</div>
                    <md-button class=" md-icon-button" @click="handleDownVoteQuestion(question._id)">
                        <md-icon class="md-size-2x">arrow_drop_down</md-icon>
                    </md-button>
                </md-card-actions>
                <md-card-content class="md-layout-item md-size-75">
                    <div class="md-layout-item md-size-100">
                        <p v-html="question.description">
                        </p>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <v-chip v-for="(tag, index) in question.tags" :key="index" color="#FF961E" text-color="white">
                            <v-icon left>label</v-icon>{{tag.name}}
                        </v-chip>
                    </div>
                    <div v-if="currentUser == question.user._id" class="mt-2 md-subhead md-layout-item md-size-100">
                        <md-button class="md-dense md-primary" @click="dialog = !dialog">Edit</md-button>
                        <EditAsk v-if="dialog" :dialog="dialog" @dialog-turn="onChangeDialog" :data-question="question"> </EditAsk>
                        <md-button class="md-dense md-primary" @click.prevent="handleDeleteQuestion(question._id)">Delete</md-button>
                    </div>
                    <div v-else class="mt-2 md-layout-item md-size-100">
                        <Comment :question-id="question._id"> </Comment>
                    </div>
                </md-card-content>
            </md-card-media-actions>

            <hr>

            <md-card-header>
                <div class="md-title">{{question.answers.length}} Answers</div>
            </md-card-header>
            <md-card>
                <md-card-media-actions v-for="(answer, index) in question.answers" :key="index" class="md-layout md-alignment-top-left">
                    <md-card-actions class="md-layout-item md-size-10">
                        <md-button class=" md-icon-button"  @click="handleUpVoteAnswer(answer._id)">
                            <md-icon class="md-size-2x">arrow_drop_up</md-icon>
                        </md-button>
                        <div class="md-title">{{answer.upVote.length - answer.downVote.length}}</div>
                        <md-button class=" md-icon-button"  @click="handleDownVoteAnswer(answer._id)">
                            <md-icon class="md-size-2x">arrow_drop_down</md-icon>
                        </md-button>
                    </md-card-actions>

                    <md-card-content class="md-layout-item md-size-75">
                        <div class="md-layout-item md-size-100">
                            <p v-html="answer.message"></p>
                        </div>
                        <div class="md-layout md-alignment-top-right">
                            <div v-if="currentUser == answer.user._id" class="md-layout-item md-size-50">
                                <!-- <md-button class="md-subhead md-dense md-primary">Edit</md-button> -->
                                <EditComment :answer-id="answer._id" :data="answer.message"> </EditComment>
                                <md-button class="md-subhead md-dense md-primary" @click="handleDeleteAnswer(answer._id)">Delete</md-button>
                            </div>
                            <div class="md-layout-item md-size-50 ">
                                <span class="ml-auto float-right">
                                    <p class="md-subhead"> Answered {{changedate(answer.createdAt)}} </p>
                                    <span><img src="https://i.stack.imgur.com/M92ye.jpg?s=32&g=1"/> <span class="md-subhead "> {{getFullName(answer.user.firstName, answer.user.lastName)}} </span> </span>
                                </span>
                            </div>
                        </div>
                    </md-card-content>
                    <hr>
                </md-card-media-actions>

            </md-card>
        </md-card>

        <Alert> </Alert>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import Comment from '@/components/CommentDialog.vue'
import EditComment from '@/components/EditCommentDialog.vue'
import EditAsk from '@/components/EditAsk.vue'
import Swal from 'sweetalert2'
import Alert from '@/components/alertMessage.vue'

export default {
  created () {
    this.fetchOneQuestion(this.$route.params.id)
  },
  components: {
    Comment,
    EditComment,
    Alert,
    EditAsk
  },
  computed: {
    ...mapState([
      'question'
    ])
  },
  data () {
    return {
      dialog: false,
      message: '',
      currentUser: localStorage.getItem('user')
    }
  },
  methods: {
    ...mapActions([
      'fetchOneQuestion',
      'deleteAnswer',
      'doDeleteQuestion',
      'upVoteQuestion',
      'downVoteQuestion',
      'downVoteAnswer',
      'upVoteAnswer'
    ]),
    changedate (date) {
      return moment(new Date(date)).fromNow()
    },
    getFullName (payload1, payload2) {
      return payload1 + ' ' + payload2
    },
    handleDeleteQuestion (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.doDeleteQuestion(id)
          this.$router.push('/questions')
        }
      })
    },
    handleDeleteAnswer (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.deleteAnswer(id)
        }
      })
    },
    handleUpVoteQuestion (id) {
      this.upVoteQuestion(id)
    },
    handleDownVoteQuestion (id) {
      this.downVoteQuestion(id)
    },
    handleUpVoteAnswer (id) {
      this.upVoteAnswer(id)
    },
    handleDownVoteAnswer (id) {
      this.downVoteAnswer(id)
    },
    onChangeDialog (payload) {
      this.dialog = payload
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
