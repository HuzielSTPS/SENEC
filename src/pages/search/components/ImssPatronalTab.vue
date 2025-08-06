<template>
  <div style="font-weight: normal">
    <div class="col q-pa-xs flex-center justify-center">
      <q-table
        :loading="loading"
        flat
        bordered
        :rows="data"
        :columns="columns"
        row-key="RFC"
        v-model:pagination="pagination"
        :filter="filter"
        @request="qTableRequest"
      >
      <template v-slot:top>
          <div style="width: 100%;">
            <q-input dense debounce="300" v-model="filter" placeholder="Buscar por Clave Patronal" @update:model-value="v => { filter = v.toUpperCase() }">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="actions" :props="props">
              <q-btn color="blue" icon="search" flat @click="editSelectedRow(props.row.CVE_PATRON)">
                <q-tooltip class="bg-blue">Ver</q-tooltip>
              </q-btn>
            </q-td>
            <q-td key="CVE_PATRON" style="text-align: center; cursor: pointer; text-decoration: underline; color: blue;"  :props="props" @click="buscarDatos(props.row.CVE_PATRON)">{{ props.row.CVE_PATRON }}</q-td>
            <q-td key="NOMBRE" style="text-align: left;" :props="props">{{ props.row.NOMBRE }}</q-td>
            <q-td key="RFC" style="text-align: left;" :props="props">{{ props.row.RFC }}</q-td>
            <q-td key="CVE_MOD_N" style="text-align: left;" :props="props">{{ props.row.CVE_MOD_N }}</q-td>
            <q-td key="TA" style="text-align: right;" :props="props">{{ formatNumberPriceZero(props.row.TA) }}</q-td>
            <q-td key="TP" style="text-align: right;" :props="props">{{ formatNumberPriceZero(props.row.TP) }}</q-td>
            <q-td key="TEU" style="text-align: right;" :props="props">{{ formatNumberPriceZero(props.row.TEU) }}</q-td>
            <q-td key="TEC" style="text-align: right;" :props="props">{{ formatNumberPriceZero(props.row.TEC) }}</q-td>
            <q-td key="DIV_FINAL" style="text-align: right;" :props="props">{{ props.row.DIV_FINAL }}</q-td>
            <q-td key="GPO_FINAL" style="text-align: right;" :props="props">{{ props.row.GPO_FINAL }}</q-td>
            <q-td key="CVE_FRACCION" style="text-align: center;" :props="props">{{ props.row.CVE_FRACCION }}</q-td>
            <q-td key="CLASE" style="text-align: center;" :props="props">{{ props.row.CLASE }}</q-td>
            <q-td key="CVE_ENT_FEDERATIVA" style="text-align: center;" :props="props">{{ props.row.CVE_ENT_FEDERATIVA }}</q-td>
            <q-td key="CVE_MUNICIPIO" style="text-align: center;" :props="props">{{ props.row.CVE_MUNICIPIO }}</q-td>
            <q-td key="CURP" style="text-align: left;" :props="props">{{ props.row.CURP }}</q-td>
            <q-td key="DOMICILIO" style="text-align: left;" :props="props">{{ props.row.DOMICILIO }}</q-td>
            <q-td key="LOCALIDAD" style="text-align: left;" :props="props">{{ props.row.LOCALIDAD }}</q-td>
            <q-td key="RL_NOMBRE" style="text-align: left;" :props="props">{{ props.row.RL_NOMBRE }}</q-td>
            <q-td key="COD_POS" style="text-align: center;" :props="props">{{ props.row.COD_POS }}</q-td>
            <q-td key="EMAIL_RL" style="text-align: left;" :props="props">{{ props.row.EMAIL_RL }}</q-td>
            <q-td key="TELEFONO" style="text-align: center;" :props="props">{{ props.row.TELEFONO }}</q-td>
            <q-td key="GIRO" style="text-align: left;" :props="props">{{ props.row.GIRO }}</q-td>
            <q-td key="num_empresas" style="text-align: center;" :props="props">{{ formatNumberPriceZero(props.row.num_empresas) }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import api from 'src/commons/api.js'
import useVuelidate from '@vuelidate/core'
import { formatNumberPriceZero } from 'src/commons/utils'

export default {
  name: 'ImssPatronalTab',
  setup: () => ({ v$: useVuelidate(), formatNumberPriceZero }),
  data () {
    return {
      loading: true,
      pagination: {
        sortBy: 'CVE_PATRON',
        descending: true,
        rowsPerPage: 5
      },
      columns: [
        { name: 'actions', align: 'center', label: 'ACCIONES', field: 'actions', style: 'width: 10%', sortable: false },
        { name: 'CVE_PATRON', align: 'center', label: 'CVE_PATRON', field: 'CVE_PATRON', style: 'width: 20%', sortable: false },
        { name: 'NOMBRE', align: 'center', label: 'NOMBRE', field: 'NOMBRE', style: 'width: 20%', sortable: false },
        { name: 'RFC', align: 'center', label: 'RFC', field: 'RFC', style: 'width: 20%', sortable: false },
        { name: 'CVE_MOD_N', align: 'center', label: 'CVE_MOD_N', field: 'CVE_MOD_N', style: 'width: 20%', sortable: false },
        { name: 'TA', align: 'center', label: 'TA', field: 'TA', style: 'width: 20%', sortable: false },
        { name: 'TP', align: 'center', label: 'TP', field: 'TP', style: 'width: 20%', sortable: false },
        { name: 'TEU', align: 'center', label: 'TEU', field: 'TEU', style: 'width: 20%', sortable: false },
        { name: 'TEC', align: 'center', label: 'TEC', field: 'TEC', style: 'width: 20%', sortable: false },
        { name: 'DIV_FINAL', align: 'center', label: 'DIV_FINAL', field: 'DIV_FINAL', style: 'width: 20%', sortable: false },
        { name: 'GPO_FINAL', align: 'center', label: 'GPO_FINAL', field: 'GPO_FINAL', style: 'width: 20%', sortable: false },
        { name: 'CVE_FRACCION', align: 'center', label: 'CVE_FRACCION', field: 'CVE_FRACCION', style: 'width: 20%', sortable: false },
        { name: 'CLASE', align: 'center', label: 'CLASE', field: 'CLASE', style: 'width: 20%', sortable: false },
        { name: 'CVE_ENT_FEDERATIVA', align: 'center', label: 'CVE_ENT_FEDERATIVA', field: 'CVE_ENT_FEDERATIVA', style: 'width: 20%', sortable: false },
        { name: 'CVE_MUNICIPIO', align: 'center', label: 'CVE_MUNICIPIO', field: 'CVE_MUNICIPIO', style: 'width: 20%', sortable: false },
        { name: 'CURP', align: 'center', label: 'CURP', field: 'CURP', style: 'width: 20%', sortable: false },
        { name: 'DOMICILIO', align: 'center', label: 'DOMICILIO', field: 'DOMICILIO', style: 'width: 20%', sortable: false },
        { name: 'LOCALIDAD', align: 'center', label: 'LOCALIDAD', field: 'LOCALIDAD', style: 'width: 20%', sortable: false },
        { name: 'RL_NOMBRE', align: 'center', label: 'RL_NOMBRE', field: 'RL_NOMBRE', style: 'width: 20%', sortable: false },
        { name: 'COD_POS', align: 'center', label: 'COD_POS', field: 'COD_POS', style: 'width: 20%', sortable: false },
        { name: 'EMAIL_RL', align: 'center', label: 'EMAIL_RL', field: 'EMAIL_RL', style: 'width: 20%', sortable: false },
        { name: 'TELEFONO', align: 'center', label: 'TELEFONO', field: 'TELEFONO', style: 'width: 20%', sortable: false },
        { name: 'GIRO', align: 'center', label: 'GIRO', field: 'GIRO', style: 'width: 20%', sortable: false },
        { name: 'num_empresas', align: 'center', label: 'num_empresas', field: 'num_empresas', style: 'width: 20%', sortable: false }
      ],
      data: [],
      filter: ''
    }
  },
  mounted () {
    this.fetchFromServer()
  },
  methods: {
    fetchFromServer () {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    editSelectedRow (id) {
      this.$router.push(`/search-imss/${id}`)
    },
    async qTableRequest (props) {
      this.pagination = props.pagination
      this.filter = props.filter
      const params = {}
      params.pagination = this.pagination
      params.filter = this.filter
      params.page = this.pagination.page
      params.id = this.$route.params.id
      api.get('/imsspatronal', params).then(({ data }) => {
        this.$q.loading.hide()
        this.data = data.data
        this.pagination.totalRowsNumber = data.total
        this.pagination.rowsNumber = data.total
        this.pagination.page = data.current_page
        this.pagination.rowsPerPage = data.per_page
      })
    },
    async buscarDatos (registro) {
      this.$emit('tengo_resultados', registro)
      registro = null
    }
  }
}
</script>

<style>
</style>
