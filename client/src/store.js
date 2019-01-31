import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/script/axios.js'
import moment from 'moment'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: '',
    errorMessage: '',
    questions: [],
    listTags: [],
    question: ''
  },
  mutations: {
    mutationLogin (state, payload) {
      state.isLogin = payload
      state.user = localStorage.getItem('user')
    },
    mutationRegister (state, payload) {
      state.errorMessage = payload
    },
    mutationMessage (state, payload) {
      state.errorMessage = payload
    },
    mutationFetchQuestions (state, payload) {
      state.questions = payload.reverse()
    },
    mutationAddNewQuestion (state, payload) {
      state.questions.unshift(payload)
    },
    mutationEditQuestion (state, payload) {
      state.question = payload
    },
    mutationFetchTags (state, payload) {
      state.listTags = payload
    },
    mutationFetchOneQuestion (state, payload) {
      state.question = payload
    },
    mutationAddComment (state, payload) {
      state.question.answers.push(payload)
    },
    mutationDeleteAnswer (state, payload) {
      var data = state.question.answers.filter(function (obj) {
        return obj._id !== payload
      })
      state.question.answers = data
    },
    mutationUpdateAnswer (state, payload) {
      state.question.answers.forEach(obj => {
        if (obj._id === payload.updated._id) {
          obj.message = payload.updated.message
        }
      })
    },
    mutationUpVoteQuestion (state, payload) {
      state.question.upVote = payload.upVote
      state.question.downVote = payload.downVote
    },
    mutationDownVoteQuestion (state, payload) {
      state.question.upVote = payload.upVote
      state.question.downVote = payload.downVote
    },
    mutationUpVoteAnswer (state, payload) {
      state.question.answers.forEach(obj => {
        if (obj._id === payload._id) {
          obj.upVote = payload.upVote
          obj.downVote = payload.downVote
        }
      })
    },
    mutationDownVoteAnswer (state, payload) {
      state.question.answers.forEach(obj => {
        if (obj._id === payload._id) {
          obj.downVote = payload.downVote
          obj.upVote = payload.upVote
        }
      })
    }
  },
  actions: {
    checkLogin ({ commit }) {
      let token = localStorage.getItem('token')
      if (token) {
        commit('mutationLogin', true)
      } else {
        commit('mutationLogin', false)
      }
    },
    doLogin ({ commit, dispatch }, data) {
      axios.post('/login', data)
        .then(({ data }) => {
          console.log('data:', data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', data.userId)
          dispatch('checkLogin')
          commit('mutationMessage', { snackbar: true, message: `Successfully login`, color: 'success' })
        })
        .catch(({ response: { data } }) => {
          // console.log(data, '------')
          commit('mutationMessage', { snackbar: true, message: `Oops! Something wrong. ${data.message}`, color: 'error' })
          console.log(data.message)
        })
    },
    doRegister ({ commit }, payload) {
      // console.log(' event dari store register ')
      axios.post('/register', payload)
        .then(({ data }) => {
          commit('mutationRegister', { snackbar: true, message: 'Great! Please login now', color: 'success' })
        })
        .catch(({ response: { data: { error } } }) => {
          console.log(error)
          commit('mutationRegister', { snackbar: true, message: `Oops! Something wrong. ${error.message}`, color: 'error' })
        })
    },
    doLogout ({ commit, dispatch }) {
      localStorage.clear()
      dispatch('checkLogin')
    },
    clearMessage ({ commit }) {
      commit('mutationMessge', '')
    },
    fetchQuestions ({ commit }) {
      axios.get('/questions', { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          console.log(data)
          data.forEach(question => {
            question.createdAt = moment(new Date(question.createdAt)).fromNow()
          })
          commit('mutationFetchQuestions', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    fetchTags ({ commit }) {
      axios.get('/tags')
        .then(({ data }) => {
          var payload = []
          data.forEach(tag => {
            var obj = {}
            obj.text = tag.name
            obj.value = tag._id
            payload.push(obj)
          })
          commit('mutationFetchTags', payload)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    createQuestion ({ commit, dispatch }, payload) {
      console.log('method call', payload)
      axios.post('/questions', payload, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          commit('mutationAddNewQuestion', data)
          // dispatch('fetchQuestions')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    editQuestion ({ commit, dispatch }, payload) {
      // console.log('method call', payload)
      axios.put(`/questions/${payload.id}`, payload.data, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          console.log(data)
          commit('mutationEditQuestion', data.data)
          // dispatch('fetchQuestions')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    doDeleteQuestion ({ commit, dispatch }, payload) {
      axios.delete(`/questions/${payload}`, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          dispatch('fetchQuestions')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    fetchOneQuestion ({ commit }, payload) {
      axios.get(`/questions/${payload}`)
        .then(({ data }) => {
          // console.log(data, '====')
          commit('mutationFetchOneQuestion', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    doComment ({ commit }, payload) {
      axios.post(`/answers/${payload.id}`, payload.data, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          commit('mutationAddComment', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    deleteAnswer ({ commit }, payload) {
      axios.delete(`/answers/${payload}`, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          commit('mutationDeleteAnswer', payload)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    updateAnswer ({ commit }, payload) {
      axios.put(`/answers/${payload.id}`, payload.data, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          console.log(data, 'updated')
          commit('mutationUpdateAnswer', data)
        })
        .catch(({ response }) => {
          commit('mutationMessage', { snackbar: true, message: `Oops! ${response.data.message}`, color: 'error' })
          console.log(response)
        })
    },
    upVoteQuestion ({ commit }, payload) {
      axios.get(`/questions/upvote/${payload}`, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          console.log(data, 'udahupvote')
          commit('mutationUpVoteQuestion', data.result)
        })
        .catch(({ response }) => {
          commit('mutationMessage', { snackbar: true, message: `Oops! ${response.data.message}`, color: 'error' })
          console.log(response)
        })
    },
    downVoteQuestion ({ commit }, payload) {
      axios.get(`/questions/downvote/${payload}`, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          console.log(data, 'udagDownvote')
          commit('mutationDownVoteQuestion', data.result)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    upVoteAnswer ({ commit }, payload) {
      axios.get(`/answers/upvote/${payload}`, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          console.log(data, 'udahupvote')
          commit('mutationUpVoteAnswer', data.result)
        })
        .catch(({ response }) => {
          console.log(response)
          commit('mutationMessage', { snackbar: true, message: `Oops! ${response.data.message}`, color: 'error' })
          console.log(response)
        })
    },
    downVoteAnswer ({ commit }, payload) {
      axios.get(`/answers/downvote/${payload}`, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          console.log(data, 'udahdownvote')
          commit('mutationDownVoteAnswer', data.result)
        })
        .catch(({ response }) => {
          console.log(response)
          commit('mutationMessage', { snackbar: true, message: `Oops! ${response.data.message}`, color: 'error' })
        })
    }
  }
})
