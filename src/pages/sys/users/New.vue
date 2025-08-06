<template>
  <q-page class="bg-grey-3 background-all">
    <div class="q-pa-sm bg-white">
      <div class="row background-div">
        <div class="col-sm-9">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 20px">
              <q-breadcrumbs-el label="" icon="home" to="/" />
              <q-breadcrumbs-el label="Usuarios" to="/users" />
              <q-breadcrumbs-el label="Nuevo Usuario" />
            </q-breadcrumbs>
          </div>
        </div>
      </div>
    </div>

    <div class="q-pa-md bg-grey-3 input-desing ">
      <div class="row border-panel">
        <div class="col q-pa-md q-mt-md">
          <div class="row q-col-gutter-xs">
            <div class="col-xs-12 col-sm-3">
              <q-input
                color="dark"
                bg-color="secondary"
                filled
                v-model="user.name"
                :error="v$.user.name.$error"
                label="Nombre"
                :rules="rules.name"
                @update:model-value="v => { user.name = v.toUpperCase() }"
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
                v-model="user.email"
                @update:model-value="v => { user.email = v.toLowerCase() }"
                :error="v$.user.email.$error"
                label="Email"
                :rules="rules.email"
              >
                <template v-slot:prepend>
                  <q-icon name="alternate_email" />
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
                :rules="rules.password"
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
            <q-btn color="positive" icon="save" label="Guardar" style="box-shadow: 5px 5px 5px #8b8989 !important;" @click="createUser()" />
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
  name: 'NewUser',
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    user: {
      email: { required, maxLength: maxLength(100), email },
      name: { required, maxLength: maxLength(100) },
      password: { required }
    }
  },
  data () {
    return {
      user: {
        email: null,
        name: null,
        password: null
      },
      isPwd: true
    }
  },
  computed: {
    rules (val) {
      return {
        email: [
          val => (!this.v$.user.email.required.$invalid) || 'Requerido.',
          val => (!this.v$.user.email.maxLength.$invalid) || 'No debe exceder los 100 dígitos.',
          val => (!this.v$.user.email.email.$invalid) || 'Debe contener un email válido.'
        ],
        name: [
          val => (!this.v$.user.name.required.$invalid) || 'Requerido.',
          val => (!this.v$.user.name.maxLength.$invalid) || 'No debe exceder los 100 dígitos.'
        ],
        password: [
          val => (!this.v$.user.password.required.$invalid) || 'Requerido.'
        ]
      }
    }
  },
  methods: {
    createUser () {
      this.v$.user.$reset()
      this.v$.user.$touch()
      if (this.v$.user.$error) {
        return false
      }
      this.$q.loading.show()
      const params = { ...this.user }
      api.post('/users', params).then(({ data }) => {
        this.$q.loading.hide()
        this.$router.push(`/users/${data.id}`)
      })
    }
  }
}
</script>

<style>
</style>
