<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-sm bg-white">
      <div class="row">
        <div class="col-sm-9">
          <div class="q-pa-md q-gutter-md">
            <q-breadcrumbs align="left" style="font-size: 20px">
              <q-breadcrumbs-el label="" icon="home" to="/" />
              <q-breadcrumbs-el :label="'Perfil ' + user.email" />
            </q-breadcrumbs>
          </div>
        </div>
      </div>
    </div>

    <div class="q-pa-md bg-grey-3">
      <div class="row bg-white border-panel">
        <div class="col q-pa-md q-mt-md">

          <div class="row q-col-gutter-xs">
            <div class="col-xs-12 col-sm-3">
              <q-input
                color="dark"
                bg-color="secondary"
                filled
                v-model="user.email"
                :error="v$.user.email.$error"
                label="Email"
                :rules="emailRules"
                @input="v => { user.email = v.toLowerCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="alternate_email" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-4">
              <q-input
                color="dark"
                bg-color="secondary"
                filled
                v-model="user.name"
                :error="v$.user.name.$error"
                label="Nombre"
                :rules="nameRules"
                @input="v => { user.name = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="draw" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-3">
              <q-input
                color="dark"
                bg-color="secondary"
                filled
                v-model="user.password"
                :error="v$.user.password.$error"
                label="Contraseña"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:prepend>
                  <q-icon name="key" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-mb-sm justify-end">
              <q-btn color="positive" icon="save" label="Guardar" @click="editUser()" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import api from 'src/commons/api.js'
import useVuelidate from '@vuelidate/core'
import { required, email, maxLength } from '@vuelidate/validators'

export default {
  name: 'ProfilePage',
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    user: {
      email: { required, maxLength: maxLength(100), email },
      name: { required, maxLength: maxLength(100) },
      password: { }
    }
  },
  data () {
    return {
      user: {
        id: null,
        email: null,
        name: null,
        password: null
      },
      isPwd: true
    }
  },
  computed: {
    emailRules (val) {
      return [
        val => (this.v$.user.email.required) || 'Requerido.',
        val => (this.v$.user.email.maxLength) || 'No debe exceder los 100 dígitos.',
        val => (this.v$.user.email.email) || 'Debe contener un email válido.'
      ]
    },
    nameRules (val) {
      return [
        val => (this.v$.user.name.required) || 'Requerido.',
        val => (this.v$.user.name.maxLength) || 'No debe exceder los 100 dígitos.'
      ]
    }
  },
  created () {
    this.fetchFromServer()
  },
  methods: {
    fetchFromServer () {
      api.get('/check').then(({ data }) => {
        if (!data.user) {
          this.$router.push('/')
        } else {
          this.user = data.user
          this.$q.loading.hide()
        }
      })
    },
    editUser () {
      this.v$.user.$reset()
      this.v$.user.$touch()
      if (this.v$.user.$error) {
        this.$q.dialog({
          title: 'Error',
          message: 'Por favor, verifique las validaciones.',
          persistent: true
        })
        return false
      }
      this.$q.loading.show()
      const params = { ...this.user }
      api.put('/users/params.id', params).then(({ data }) => {
        this.$q.notify({
          message: data.message.content,
          position: 'top',
          color: data.result ? 'positive' : 'warning'
        })
        if (data.result) {
          this.$q.loading.hide()
          window.location.reload()
        } else {
          this.$q.loading.hide()
          if (data.errors && data.errors.message === 'Expired token') {
            localStorage.removeItem('JWT')
            window.location.reload()
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
