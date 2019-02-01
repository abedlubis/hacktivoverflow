<template>
    <b-card>
        <h6 slot="header"
            class="mb-0">
            Job for you
        </h6>
        <div class="text-xs-left">
            <b-card v-for="(job, index) in jobs.slice(0, 5)"  :key="index" :title="job.title"
                :sub-title="job.location" class="mt-2">
                <p v-html="job.how_to_apply" class="card-text">
                </p>
                <b-link :href="job.url"
                    class="card-link">i'm interest</b-link>
            </b-card>
        </div>
    </b-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  created () {
    this.fetchMyWatchTag()
    this.fetchJobStreet(this.myWatchs)
  },
  methods: {
    ...mapActions([
      'fetchJobStreet',
      'fetchMyWatchTag'
    ])
  },
  computed: {
    ...mapState([
      'jobs',
      'myWatchs'
    ])
  }
}
</script>

<style>

</style>
