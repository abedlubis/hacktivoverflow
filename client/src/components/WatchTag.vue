<template>
     <b-card>
        <h6 slot="header"
            class="mb-0">
            Watch Tag
            <span class="text" v-b-toggle.collapse1>
                Edit
            </span>
        </h6>
         <div class="text-xs-left">
            <v-chip v-for="(watch, index) in myWatchs" :key="index" label color="light-blue darken-1" text-color="white" close @input="handleDeleteWatch(watch._id)">
                <v-icon left>label</v-icon> {{watch.name}}
            </v-chip>
         </div>
        <b-collapse id="collapse1" class="mt-2" @show="select = ''">
            <b-card>
                <p class="card-text">Add new watch tag...</p>
                <v-autocomplete
                    clearable
                    background-color="orange lighten-3"
                    :loading="loading"
                    :items="listTags"
                    :search-input.sync="search"
                    v-model="select"
                    cache-items
                    flat
                    hide-no-data
                    hide-details
                    label="select tag"
                    solo-inverted>
                    <v-icon @click="handleAddWatch" slot="append-outer">remove_red_eye</v-icon>
                </v-autocomplete>
            </b-card>
        </b-collapse>

    </b-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'listTags',
      'myWatchs'
    ])
  },
  mounted () {
    this.fetchTags()
    this.fetchMyWatchTag()
  },
  data () {
    return {
      loading: false,
      search: null,
      select: null,
      states: [
      ]
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    }
  },
  methods: {
    ...mapActions([
      'fetchTags',
      'fetchMyWatchTag',
      'addWatchTag',
      'deleteWatchTag'
    ]),
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
    handleAddWatch () {
      this.addWatchTag({
        watchTags: this.select
      })
    },
    handleDeleteWatch (id) {
      this.deleteWatchTag(id)
    }
  }
}
</script>

<style>
.text {
    float: right;
    cursor: pointer;
}
.text:hover {
    color: rgb(255, 145, 0);
}
</style>
