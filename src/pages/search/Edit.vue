<template>
    <q-page class="bg-grey-3">
      <div class="q-pa-sm bg-white">
        <div class="row">
          <div class="col-sm-6">
            <div class="q-pa-md q-gutter-sm">
              <q-breadcrumbs align="left" style="font-size: 20px">
                <q-breadcrumbs-el label="" icon="home" to="/" />
                <q-breadcrumbs-el label="Búsqueda" to="/search" />
                <q-breadcrumbs-el :label="'Centro de trabajo ' + factptu.NombredelCentrodetrabajo"/>
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <div class="q-pa-md bg-grey-3">
        <div class="row bg-white border-panel">
          <div class="col q-pa-md q-mt-md">
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-6">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.NombredelCentrodetrabajo"
                  label="Nombre Centro de trabajo"
                >
                  <template v-slot:prepend>
                    <q-icon name="house" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.RFC"
                  label="RFC"
                >
                  <template v-slot:prepend>
                    <q-icon name="draw" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.TipodePersona"
                  label="Tipo de persona"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.Jurisdicción"
                  label="Jurisdicción"
                >
                  <template v-slot:prepend>
                    <q-icon name="gavel" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.Estado"
                  label="Estado"
                >
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.Municipio"
                  label="Municipio"
                >
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.Colonia"
                  label="Colonia"
                >
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.CódigoPostal"
                  label="Código Postal"
                >
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.NombredeCalle"
                  label="Nombre de Calle"
                >
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.NúmeroExterior"
                  label="Número Exterior"
                >
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.NúmeroInterior"
                  label="Número Interior"
                >
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="factptu.ClavedelaActividadEconómica"
                  label="Clave de la Actividad Económica"
                >
                  <template v-slot:prepend>
                    <q-icon name="book" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                  dark
                  color="dark"
                  bg-color="primary"
                  filled
                  v-model="factptu.UtilidadFiscal"
                  label="Utilidad Fiscal"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_money" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                  dark
                  color="dark"
                  bg-color="primary"
                  filled
                  v-model="factptu.PTUGeneradaenelEjercicio"
                  label="PTU Generada en el Ejercicio"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_money" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                  dark
                  color="dark"
                  bg-color="primary"
                  filled
                  v-model="factptu.PTUPagadaenelEjercicio"
                  label="PTU Pagada en el Ejercicio"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_money" />
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white border-panel q-mt-lg">
        <q-tabs
          v-model="tab"
          class="text-primary"
        >
          <q-tab name="ptu" icon="badge" label="Registros Patronales Registrados en el IMSS" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="ptu">
            <ImssPatronalTab v-on:tengo_resultados="onResultados"/>
            <ImssNominalTab :sheet="sheet"/>
          </q-tab-panel>
        </q-tab-panels>
      </div>
      </div>
    </q-page>
  </template>

<script>
import api from 'src/commons/api.js'
import useVuelidate from '@vuelidate/core'
import ImssPatronalTab from './components/ImssPatronalTab.vue'
import ImssNominalTab from './components/ImssNominalTab.vue'
import { formatNumberPrice } from 'src/commons/utils'

export default {
  name: 'EditSearch',
  components: {
    ImssPatronalTab,
    ImssNominalTab
  },
  setup: () => ({ v$: useVuelidate(), formatNumberPrice }),
  data () {
    return {
      sheet: null,
      factptu: {
        Jurisdicción: null,
        TipodePersona: null,
        NombredelCentrodetrabajo: null,
        RFC: null,
        NombredeCalle: null,
        NúmeroExterior: null,
        NúmeroInterior: null,
        Colonia: null,
        Municipio: null,
        CódigoPostal: null,
        Estado: null,
        ClavedelaActividadEconómica: null,
        UtilidadFiscal: null,
        PTUGeneradaenelEjercicio: null,
        PTUPagadaenelEjercicio: null
      },
      isPwd: true,
      tab: 'ptu'
    }
  },
  created () {
    this.fetchFromServer()
  },
  methods: {
    onResultados (datos) {
      // console.log(datos)
      this.sheet = datos
      // console.log(this.sheet)
    },
    fetchFromServer () {
      this.$q.loading.show()
      const id = this.$route.params.id
      api.get(`/busqueda/getData/${id}`).then(({ data }) => {
        if (!data || !data.factptu || !data.factptu.RFC) {
          this.$router.push('/busqueda')
        } else {
          this.factptu = data.factptu
          this.factptu.PTUGeneradaenelEjercicio = formatNumberPrice(data.factptu.PTUGeneradaenelEjercicio)
          this.factptu.UtilidadFiscal = formatNumberPrice(data.factptu.UtilidadFiscal)
          this.factptu.PTUPagadaenelEjercicio = formatNumberPrice(data.factptu.PTUPagadaenelEjercicio)
          this.$q.loading.hide()
        }
      })
    }
  }
}
</script>
<style>
</style>
