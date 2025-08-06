<template>
  <q-page class="bg-grey-3 background-all">
    <div class="q-pa-sm bg-white">
      <div class="row background-div">
        <div class="col-sm-9">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 20px">
              <q-breadcrumbs-el label="" icon="home" to="/" />
              <q-breadcrumbs-el label="Rol" to="/roles" />
              <q-breadcrumbs-el label="Nuevo Rol" />
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
                v-model="rol.name"
                :error="v$.rol.name.$error"
                label="Nombre"
                :rules="rules.name"
                @update:model-value="v => { rol.name = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="draw" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-mb-sm justify-end">
            <q-btn color="positive" icon="save" label="Guardar" style="box-shadow: 5px 5px 5px #8b8989 !important;" @click="createrol()" />
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
  name: 'NewRole',
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    rol: {
      name: { required, maxLength: maxLength(100) }
    }
  },
  data () {
    return {
      rol: {
        email: null
      },
      isPwd: true
    }
  },
  computed: {
    rules (val) {
      return {
        name: [
          val => (!this.v$.rol.name.required.$invalid) || 'Requerido.',
          val => (!this.v$.rol.name.maxLength.$invalid) || 'No debe exceder los 100 dígitos.'
        ]
      }
    }
  },
  methods: {
    createrol () {
      this.v$.rol.$reset()
      this.v$.rol.$touch()
      if (this.v$.rol.$error) {
        return false
      }
      this.$q.loading.show()
      const params = { ...this.rol }
      api.post('/roles', params).then(({ data }) => {
        this.$q.loading.hide()
        this.$router.push(`/roles/${data.id}`)
      })
    }
  }
}
</script>

<style>
</style>
