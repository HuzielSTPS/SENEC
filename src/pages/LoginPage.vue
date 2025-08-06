<template>
  <q-layout>
    <q-header elevated class="header-login">
      <q-toolbar>
        <!-- <div>
          <img src="../assets/images-7.png" width="50" height="50" class="logo-icon">
        </div>
        <div class="text-title">
          SENEC
        </div> -->
        <q-toolbar-title>
        </q-toolbar-title>
        <div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
    <q-page class="background-login">
  <div class="row justify-center" style="padding-top: 7%;">
    <div class="custom-login-container">
      <div class="column items-center login-logo">
        <img src="../assets/logo-senec-sombra.png" alt="Iniciar Sesión" width="160" @dblclick="magic" style="z-index: 1">
      </div>

      <div class="q-gutter-md input-desing">
        <q-input
          v-model="email"
          bg-color="secondary"
          label-color="black"
          outlined
          filled
          label="Correo electrónico"
          type="email"
          class="custom-input"
          :error="v$.email.$error"
          :rules="rules.email"
          v-on:keyup.enter="logIn()">
        <template v-slot:prepend>
          <q-icon name="account_circle"></q-icon>
        </template>
      </q-input>/>

        <q-input
          v-model="password"
          bg-color="secondary"
          label-color="black"
          outlined
          filled
          label="Contraseña"
          class="custom-input"
          :type="isPwd ? 'password' : 'text'"
          :error="v$.password.$error"
          :rules="rules.password"
          v-on:keyup.enter="logIn()"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="q-pt-sm">
          <button
            class="cssbuttons-io-button"
            @click="logIn()"
            :disabled="loading"
          >
            Iniciar sesión
            <div class="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </div>
         <div class="row justify-center">
          <img src="../assets/LOGOS_INS_NEW-color.png" width="320" style="z-index: 1">
        </div>
      </div>
    </div>
  </div>
</q-page>

    </q-page-container>
    <q-footer elevated style="float: right;  text-align: right;" class="footer-login">
        <!-- <q-toolbar style="float: right;  text-align: right;" >
          <q-toolbar-title>
        </q-toolbar-title>
          <div class="row justify-right">
          <img src="../assets/LOGOS_INS_NEW.png" width="380">
        </div>
        </q-toolbar> -->
      </q-footer>
  </q-layout>
</template>

<script>
import api from '../commons/api.js'
import { useUserStore } from '../stores/user'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  name: 'LoginPage',
  data () {
    return {
      email: null,
      password: null,
      isPwd: true,
      loading: false
    }
  },
  setup: () => ({ v$: useVuelidate(), user: useUserStore() }),
  validations: {
    email: { required, email },
    password: { required }
  },
  created () {
    const JWT = localStorage.getItem('JWT')
    if (JWT !== null && JWT !== '') {
      this.$axios.defaults.headers.common.Authorization = `Bearer ${JWT}`
      this.user.check().then(() => {
        this.$router.push('/')
      })
    }
  },
  computed: {
    rules (val) {
      return {
        email: [
          val => (!this.v$.email.required.$invalid) || 'Requerido.',
          val => (!this.v$.email.email.$invalid) || 'Debe contener una dirección de correo electrónico válida.'
        ],
        password: [
          val => (!this.v$.password.required.$invalid) || 'Requerido.'
        ]
      }
    }
  },
  methods: {
    magic () {
      this.email = ''
      this.password = ''
    },
    logIn () {
      this.v$.email.$reset()
      this.v$.email.$touch()
      this.v$.password.$reset()
      this.v$.password.$touch()
      if (this.v$.email.$error || this.v$.password.$error) {
        return false
      }
      const params = {
        email: this.email,
        password: this.password
      }
      this.loading = true
      api.post('/login', params).then(async ({ data }) => {
        this.loading = false
        localStorage.setItem('JWT', data.api_token)
        this.$axios.defaults.headers.common.Authorization = `Bearer ${data.api_token}`
        await this.user.check()
        this.$router.push('/senec')
      }).catch((err) => {
        console.error(err)
        this.loading = false
      })
    }
  }
}
</script>

<style>
</style>
