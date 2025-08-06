<template>
  <q-page class="bg-grey-3 background-all">
    <div class="q-pa-sm bg-white">
      <div class="row background-div">
        <div class="col-sm-6">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 20px">
              <q-breadcrumbs-el label="" icon="home" to="/" />
              <q-breadcrumbs-el label="Usuarios" to="/users" />
              <q-breadcrumbs-el :label="user.name"/>
            </q-breadcrumbs>
          </div>
        </div>
      </div>
    </div>

    <div class="q-pa-md bg-grey-3 input-desing">
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
                :error="v$.user.email.$error"
                label="Email"
                :rules="rules.email"
                @update:model-value="v => { user.email = v.toLowerCase() }"
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
              <q-btn color="positive" icon="save" label="Actualizar" style="box-shadow: 5px 5px 5px #8b8989 !important;" @click="updateUser()" />
          </div>
        </div>
      </div>

      <div class="border-panel q-mt-lg background-div-1">
        <q-tabs
          v-model="tab"
        >
          <q-tab name="roles" icon="badge" label="Roles"/>
        </q-tabs>
        <q-tab-panels v-model="tab" animated class="background-roles">
          <q-tab-panel name="roles">
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import api from 'src/commons/api.js'
import useVuelidate from '@vuelidate/core'
import { required, email, maxLength } from '@vuelidate/validators'
import { hasRole } from 'src/commons/utils'

export default {
  name: 'EditSenec',
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    user: {
      email: { required, maxLength: maxLength(150), email },
      name: { required, maxLength: maxLength(150) },
      password: { }
    }
  },
  mounted () {
    console.log('mounted')
    if (!hasRole(['ADMIN'])) {
      this.$router.push('/')
    }
  },
  data () {
    return {
      user: {
        id: null,
        email: null,
        name: null,
        password: null,
        role: null
      },
      isPwd: true,
      tab: 'roles'
    }
  },
  computed: {
    rules (val) {
      return {
        email: [
          val => (!this.v$.user.email.required.$invalid) || 'Requerido.',
          val => (!this.v$.user.email.maxLength.$invalid) || 'No debe exceder los 150 caracteres.',
          val => (!this.v$.user.email.email.$invalid) || 'Debe contener una dirección de correo electrónico válida.'
        ],
        name: [
          val => (!this.v$.user.name.required.$invalid) || 'Requerido.',
          val => (!this.v$.user.name.maxLength.$invalid) || 'No debe exceder los 150 caracteres.'
        ]
      }
    }
  },
  created () {
    this.fetchFromServer()
  },
  methods: {
    fetchFromServer () {
      this.$q.loading.show()
      const id = this.$route.params.id
      api.get(`/users/${id}`).then(({ data }) => {
        if (!data || !data.user || !data.user.id) {
          this.$router.push('/users')
        } else {
          this.user = data.user
          this.$q.loading.hide()
        }
      })
    },
    updateUser () {
      this.v$.user.$reset()
      this.v$.user.$touch()
      if (this.v$.user.$error) {
        return false
      }
      this.$q.loading.show()
      const params = { ...this.user }
      api.post(`/users-actualizar/${params.id}`, params).then(() => {
        this.$q.loading.hide()
      })
    }
  }
}
</script>

<style>
</style>
