<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn v-if="isLogin" class="md-subhead" slot="activator" flat color="secondary" small dark>Comment</v-btn>
        <v-btn v-else class="md-subhead" flat color="secondary" slot="activator" small dark to="/users/login">Comment</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">Give comment</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-layout>
                    <v-flex md12>
                        <wysiwyg
                            v-model="message"
                            required
                        />
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="handleComment">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: ['question-id'],
  mounted () {
    this.checkLogin()
  },
  data () {
    return {
      dialog: false,
      message: ''
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'doComment'
    ]),
    handleComment () {
      this.doComment({ data: { message: this.message }, id: this.questionId })
      this.dialog = false
    }
  }
}
</script>

<style>

</style>
