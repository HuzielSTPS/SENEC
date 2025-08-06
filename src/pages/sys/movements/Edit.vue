<template>
  <q-page class="bg-grey-3 background-all">
    <div class="q-pa-sm bg-white">
      <div class="row background-div">
        <div class="col-sm-6">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 20px">
              <q-breadcrumbs-el label="" icon="home" to="/" />
              <q-breadcrumbs-el label="Movimientos" to="/movements" />
              <q-breadcrumbs-el :label="movements.name"/>
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
                :error="v$.movements.description.$error"
                label="Descripcción"
                :rules="rules.description"
                @update:model-value="v => { movements.description = v.toLowerCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="alternate_email" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-mb-sm justify-end">
              <q-btn color="positive" icon="save" label="Actualizar" @click="updateMovement()" />
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
import { hasRole } from 'src/commons/utils'

export default {
  name: 'EditUser',
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    movements: {
      description: { required, maxLength: maxLength(150) },
      name: { required, maxLength: maxLength(150) }
    }
  },
  mounted () {
    if (!hasRole(['ADMIN'])) {
      this.$router.push('/')
    }
  },
  data () {
    return {
      movements: {
        id: null,
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
          val => (!this.v$.movements.description.maxLength.$invalid) || 'No debe exceder los 150 caracteres.'
        ],
        name: [
          val => (!this.v$.movements.name.required.$invalid) || 'Requerido.',
          val => (!this.v$.movements.name.maxLength.$invalid) || 'No debe exceder los 150 caracteres.'
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
      api.get(`/movements/${id}`).then(({ data }) => {
        if (!data || !data.movement || !data.movement.id) {
          this.$router.push('/movements')
        } else {
          this.movements = data.movement
          this.$q.loading.hide()
        }
      })
    },
    updateMovement () {
      this.v$.movements.$reset()
      this.v$.movements.$touch()
      if (this.v$.movements.$error) {
        return false
      }
      this.$q.loading.show()
      const params = { ...this.movements }
      api.post(`/movements-actualizar/${params.id}`, params)
    }
  }
}
</script>

<style>
</style>
