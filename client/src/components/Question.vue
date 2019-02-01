<template>
    <md-card>
        <md-card-content>
            <div class="md-layout md-gutter md-alignment-center-space-between">
                <div class="md-layout-item md-layout md-gutter md-size-30">
                    <div class="md-layout-item">
                        <p class="text-center">{{question.upVote.length - question.downVote.length}}</p>
                        <p class="text-center">votes</p>
                    </div>
                    <div class="md-layout-item">
                        <p class="text-center">{{question.answers.length}}</p>
                        <p class="text-center">answers</p>
                    </div>
                </div>

                <div class="md-layout-item md-layout md-gutter md-size-70">
                    <div class="md-layout-item">
                        <div class="md-layout md-gutter md-alignment-top-space-between">
                            <div class="md-layout-item md-size-90">
                                <h5> <router-link :to="'/questions/'+question._id">{{ question.title }} </router-link> </h5>
                            </div>
                            <div class="md-layout-item md-size-10">
                                <v-icon @click="handleDeleteQuestion(question._id)" v-if="question.user._id == currentUser" color="red darken-4"> delete_forever </v-icon>
                            </div>
                        </div>
                        <div class="md-layout md-gutter md-alignment-top-space-between">
                            <div class="md-layout-item md-size-60">
                                <v-chip v-for="(tag, index) in question.tags" :key="index" small color="#FF961E" text-color="white">{{tag.name}}</v-chip>
                            </div>
                            <div class="md-layout-item md-size-40">
                                <p>published {{ question.createdAt}} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </md-card-content>
    </md-card>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  props: ['question'],
  mounted () {
  },
  data () {
    return {
      currentUser: localStorage.getItem('user')
    }
  },
  methods: {
    ...mapActions([
      'doDeleteQuestion'
    ]),
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
        }
      })
    }
  }
}
</script>

<style>

</style>
