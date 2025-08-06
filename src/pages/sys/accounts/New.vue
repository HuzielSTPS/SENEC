<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-sm bg-white">
      <div class="row">
        <div class="col-sm-9">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 20px">
              <q-breadcrumbs-el label="" icon="home" to="/" />
              <q-breadcrumbs-el label="Cuentas" to="/accounts" />
              <q-breadcrumbs-el label="Nueva Cuenta" />
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
                v-model="account.code"
                :error="v$.account.code.$error"
                label="Código"
                :rules="rules.code"
                @update:model-value="v => { account.code = v.toUpperCase() }"
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
                v-model="account.name"
                :error="v$.account.name.$error"
                label="Nombre"
                :rules="rules.name"
                @update:model-value="v => { account.name = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="draw" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-mb-sm justify-end">
            <q-btn color="positive" icon="save" label="Guardar" @click="createAccount()" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import api from 'src/commons/api.js'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'

export default {
  name: 'NewAccount',
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    account: {
      code: { required, maxLength: maxLength(5) },
      name: { required, maxLength: maxLength(100) }
    }
  },
  data () {
    return {
      account: {
        code: null,
        name: null
      },
      isPwd: true
    }
  },
  computed: {
    rules (val) {
      return {
        code: [
          val => (!this.v$.account.code.required.$invalid) || 'Requerido.',
          val => (!this.v$.account.code.maxLength.$invalid) || 'No debe exceder los 5 caracteres.'
        ],
        name: [
          val => (!this.v$.account.name.required.$invalid) || 'Requerido.',
          val => (!this.v$.account.name.maxLength.$invalid) || 'No debe exceder los 100 caracteres.'
        ]
      }
    }
  },
  methods: {
    createAccount () {
      this.v$.account.$reset()
      this.v$.account.$touch()
      if (this.v$.account.$error) {
        return false
      }
      this.$q.loading.show()
      const params = { ...this.account }
      api.post('/accounts', params).then(({ data }) => {
        this.$q.loading.hide()
        this.$router.push(`/accounts/${data.id}`)
      })
    }
  }
}
</script>

<style>
</style>
