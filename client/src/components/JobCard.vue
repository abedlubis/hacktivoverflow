<template>
    <b-card>
        <h6 slot="header"
            class="mb-0">
            Job for you
        </h6>
        <div class="text-xs-left">
            <b-card v-for="(job, index) in jobs" :key="index" :title="job.title"
                :sub-title="job.location" class="mt-2">
                <p class="card-text">
                    {{job.how_to_apply}}
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
//   props: ['my-watch'],
  data () {
    return {
    }
  },
  created () {
    this.fetchJobStreet()
  },
  methods: {
    ...mapActions([
      'fetchJobStreet'
    ])
  },
  computed: {
    ...mapState([
      'jobs'
    ])
  }
}
</script>

<style>

</style>
