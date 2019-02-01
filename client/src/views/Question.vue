<template>
  <div style="height: 100%; margin-top: 5%;">

    <div class="row" >
        <div class="col-md-2">
            <Navigation style="top: 10%"> </Navigation>
        </div>
        <router-view></router-view>
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
import Ask from '@/components/Ask.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Navigation,
    Ask
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    ...mapActions([
    ]),
    onChangeDialog (data) {
      this.dialog = data
    }
  },
  computed: {
  }
}
</script>

<style>

</style>
