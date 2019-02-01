<template>
    <v-layout justify-center class="mt-4">
        <v-flex text-center xs12 sm10 md6 lg5>
            <h3> YoungFox Overflow is part of the StackExchange network of 173 QA communities. </h3>
            <v-layout column class="mt-4">
                <v-flex text- xs12 md4>
                    <v-card class="mt-4 mx-auto" ref="form" max-width="400">
                        <v-card-text >
                            <form @submit.prevent="handleLogin" id="loginForm">
                            <v-text-field
                                v-model="email"
                                :error-messages="emailErrors"
                                label="Email"
                                required
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"
                            ></v-text-field>
                            <v-text-field
                                type="password"
                                v-model="password"
                                :error-messages="passwordErrors"
                                label="Password"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                            ></v-text-field>
                            </form>
                        </v-card-text>
                        <v-divider class="mt-1"></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-slide-x-reverse-transition>
                                <v-tooltip
                                v-if="formHasErrors"
                                left
                                >
                                <v-btn
                                    slot="activator"
                                    icon
                                    class="my-0"
                                    @click="clear"
                                >
                                    <v-icon>refresh</v-icon>
                                </v-btn>
                                <span>Refresh form</span>
                                </v-tooltip>
                            </v-slide-x-reverse-transition>
                            <v-btn color="primary" flat @submit.prevent="handleLogin" type="submit" form="loginForm">Login   </v-btn>
                        </v-card-actions>
                    </v-card>
                    <p> don't have account? <router-link to="register">sign up now! </router-link></p>
                </v-flex>
            </v-layout>
        </v-flex>
        <Alert> </Alert>
    </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'
import Alert from '@/components/alertMessage'

export default {
  mixins: [validationMixin],
  validations: {
    password: { required },
    email: { required, email }
  },
  mounted () {
    this.checkLogin()
    if (this.isLogin === true) {
      this.$router.push('/')
    }
  },
  data: () => ({
    formHasErrors: false,
    email: '',
    password: ''
  }),
  components: {
    Alert
  },
  computed: {
    ...mapState([
      'isLogin'
    ]),
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },
  watch: {
    isLogin (val) {
      if (val === true) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'doLogin'
    ]),
    handleLogin () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.doLogin({ email: this.email, password: this.password })
        this.clear()
      } else {
        this.formHasErrors = true
      }
    },
    clear () {
      this.$v.$reset()
      this.password = ''
      this.email = ''
      this.formHasErrors = false
    }
  }
}
</script>

<style>

</style>
