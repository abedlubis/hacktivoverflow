<template>
  <v-app>
    <Navbar class="fixed-top"> </Navbar>
    <router-view style="margin-top: 5%;"></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  created () {
    this.fetchMyWatchTag()
  },
  components: {
    Navbar
  },
  methods: {
    ...mapActions([
      'fetchMyWatchTag'
    ])
  },
  data () {
    return {
      //
    }
  }
}
</script>
