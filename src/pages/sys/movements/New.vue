<template>
  <q-page class="bg-grey-3 background-all">
    <div class="q-pa-sm bg-white">
      <div class="row background-div">
        <div class="col-sm-9">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 20px">
              <q-breadcrumbs-el label="" icon="home" to="/" />
              <q-breadcrumbs-el label="Movimientos" to="/movements" />
              <q-breadcrumbs-el label="Nuevo Movimiento" />
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
                v-model="movements.name"
                :error="v$.movements.name.$error"
                label="Nombre"
                :rules="rules.name"
                @update:model-value="v => { movements.name = v.toUpperCase() }"
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
                v-model="movements.description"
                @update:model-value="v => { movements.description = v.toLowerCase() }"
                :error="v$.movements.description.$error"
                label="Descripción"
                :rules="rules.description"
              >
                <template v-slot:prepend>
                  <q-icon name="alternate_email" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-mb-sm justify-end">
            <q-btn color="positive" icon="save" label="Guardar" @click="createMovement()" />
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
  name: 'NewUser',
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    movements: {
      description: { required, maxLength: maxLength(100) },
      name: { required, maxLength: maxLength(100) }
    }
  },
  data () {
    return {
      movements: {
        description: null,
        name: null
      },
      isPwd: true
    }
  },
  computed: {
    rules (val) {
      return {
        description: [
          val => (!this.v$.movements.description.required.$invalid) || 'Requerido.',
          val => (!this.v$.movements.description.maxLength.$invalid) || 'No debe exceder los 100 dígitos.'
        ],
        name: [
          val => (!this.v$.movements.name.required.$invalid) || 'Requerido.',
          val => (!this.v$.movements.name.maxLength.$invalid) || 'No debe exceder los 100 dígitos.'
        ]
      }
    }
  },
  methods: {
    createMovement () {
      this.v$.movements.$reset()
      this.v$.movements.$touch()
      if (this.v$.movements.$error) {
        return false
      }
      this.$q.loading.show()
      const params = { ...this.movements }
      api.post('/movements', params).then(({ data }) => {
        this.$q.loading.hide()
        this.$router.push(`/movements/${data.id}`)
      })
    }
  }
}
</script>

<style>
</style>
