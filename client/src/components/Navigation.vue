<template>
    <v-navigation-drawer width="200" height="100%" fixed class="blue lighten-1"
        dark
        permanent>
        <v-list dense class="pt-0">
            <v-list-tile>
                <v-list-tile-action>
                <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile>

            <v-list-group
                prepend-icon="account_circle"
                value="true"
            >
                <v-list-tile slot="activator">
                <v-list-tile-title>Public</v-list-tile-title>
                </v-list-tile>
                <v-list-group
                    no-action
                    sub-group
                    value="true"
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-title>Tag</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-title>Users</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-title>Job</v-list-tile-title>
                    </v-list-tile>
                </v-list-group>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      right: null,
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ]
    }
  }
}
</script>

<style>

</style>
