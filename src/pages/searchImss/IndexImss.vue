<template>
    <q-page class="bg-grey-3">
      <div class="q-pa-sm bg-white">
        <div class="row">
          <div class="col-sm-8">
            <div class="q-pa-md q-gutter-sm">
              <q-breadcrumbs align="left" style="font-size: 20px">
                <q-breadcrumbs-el label="" icon="home" to="/" />
                <q-breadcrumbs-el label="Búsqueda" to="/search" />
                <q-breadcrumbs-el :label="'Centro de trabajo '" :to="/search/ + this.clave"/>
                <q-breadcrumbs-el :label="'Registro: ' + this.$route.params.id"/>
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <div class="q-pa-md bg-grey-3">
        <div class="row bg-white border-panel">
          <div class="col q-pa-md">
            <div class="col-sm-12 text-h6" style="color: black; text-align: center;">Trabajadores Asegurados Registrados en el IMSS</div>
            <q-table
        :loading="loading"
        flat
        bordered
        :rows="data"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
        :filter="filter"
        @request="qTableRequest"
      >
      <template v-slot:top>
          <div style="width: 100%;">
            <q-input dense debounce="300" v-model="filter" placeholder="Buscar por NSS Ó CURP" @update:model-value="v => { filter = v.toUpperCase() }">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Periodo" style="text-align: left;" :props="props">{{ formatNumberZero(props.row.Periodo) }}</q-td>
            <q-td key="rfc" style="text-align: left;" :props="props">{{ props.row.rfc }}</q-td>
            <q-td key="nss" style="text-align: left;" :props="props">{{ props.row.nss }}</q-td>
            <q-td key="registro" style="text-align: left;" :props="props">{{ props.row.registro }}</q-td>
            <q-td key="mod" style="text-align: left;" :props="props">{{ props.row.mod }}</q-td>
            <q-td key="curp" style="text-align: left;" :props="props">{{ props.row.curp }}</q-td>
            <q-td key="tpt" style="text-align: left;" :props="props">{{ formatNumberPriceZero(props.row.tpt) }}</q-td>
            <q-td key="te" style="text-align: left;" :props="props">{{ formatNumberPriceZero(props.row.te) }}</q-td>
            <q-td key="cve_mun_final" style="text-align: left;" :props="props">{{ props.row.cve_mun_final }}</q-td>
            <q-td key="cve_ent_final" style="text-align: left;" :props="props">{{ props.row.cve_ent_final }}</q-td>
            <q-td key="sal_cierre" style="text-align: left;" :props="props">{{ formatNumberPrice(props.row.sal_cierre) }}</q-td>
            <q-td key="Salario_minimo" style="text-align: left;" :props="props">{{ formatNumberPrice(props.row.Salario_minimo) }}</q-td>
            <q-td key="Nuevos_Asegurados" style="text-align: left;" :props="props">{{ formatNumberPriceZero(props.row.Nuevos_Asegurados) }}</q-td>
            <q-td key="Num_Nominal" style="text-align: left;" :props="props">{{ formatNumberZero(props.row.Num_Nominal) }}</q-td>
            <q-td key="CVE_FRACCION" style="text-align: left;" :props="props">{{ formatNumberZero(props.row.CVE_FRACCION) }}</q-td>
            <!-- <q-td key="Cambios_RFC" style="text-align: left;" :props="props">{{ props.row.DOMICILIO }}</q-td>
            <q-td key="Cambios_RFC_y_Reg_Pat" style="text-align: left;" :props="props">{{ props.row.Cambios_RFC_y_Reg_Pat }}</q-td>
            <q-td key="Asegurados_Despedidos" style="text-align: left;" :props="props">{{ props.row.Asegurados_Despedidos }}</q-td>
            <q-td key="Cambios_Registros_Pat" style="text-align: left;" :props="props">{{ props.row.Cambios_Registros_Pat }}</q-td>
            <q-td key="TA_Patron" style="text-align: left;" :props="props">{{ props.row.TA_Patron }}</q-td>
            <q-td key="ID_ESTRATO" style="text-align: left;" :props="props">{{ props.row.ID_ESTRATO }}</q-td>
            <q-td key="Edad" style="text-align: left;" :props="props">{{ props.row.Edad }}</q-td> -->
          </q-tr>
        </template>
      </q-table>
          </div>
        </div>
      </div>
    </q-page>
  </template>

<script>
import api from 'src/commons/api.js'
import { formatNumberZero, formatNumberPriceZero, formatNumberPrice } from 'src/commons/utils'

export default {
  name: 'IndexServices',
  setup: () => ({ formatNumberZero, formatNumberPriceZero, formatNumberPrice }),
  data () {
    return {
      loading: true,
      pagination: {
        sortBy: 'nss',
        descending: true,
        rowsPerPage: 5
      },
      columns: [
        { name: 'Periodo', align: 'center', label: 'Periodo', field: 'Periodo', style: 'width: 20%', sortable: false },
        { name: 'rfc', align: 'center', label: 'rfc', field: 'rfc', style: 'width: 20%', sortable: false },
        { name: 'nss', align: 'center', label: 'nss', field: 'nss', style: 'width: 20%', sortable: false },
        { name: 'registro', align: 'center', label: 'registro', field: 'registro', style: 'width: 20%', sortable: false },
        { name: 'mod', align: 'center', label: 'mod', field: 'mod', style: 'width: 20%', sortable: false },
        { name: 'curp', align: 'center', label: 'curp', field: 'curp', style: 'width: 20%', sortable: false },
        { name: 'tpt', align: 'center', label: 'tpt', field: 'tpt', style: 'width: 20%', sortable: false },
        { name: 'te', align: 'center', label: 'te', field: 'te', style: 'width: 20%', sortable: false },
        { name: 'cve_mun_final', align: 'center', label: 'cve_mun_final', field: 'cve_mun_final', style: 'width: 20%', sortable: false },
        { name: 'cve_ent_final', align: 'center', label: 'cve_ent_final', field: 'cve_ent_final', style: 'width: 20%', sortable: false },
        { name: 'sal_cierre', align: 'center', label: 'sal_cierre', field: 'sal_cierre', style: 'width: 20%', sortable: false },
        { name: 'Salario_minimo', align: 'center', label: 'Salario_minimo', field: 'Salario_minimo', style: 'width: 20%', sortable: false },
        { name: 'Nuevos_Asegurados', align: 'center', label: 'Nuevos_Asegurados', field: 'Nuevos_Asegurados', style: 'width: 20%', sortable: false },
        { name: 'Num_Nominal', align: 'center', label: 'Num_Nominal', field: 'Num_Nominal', style: 'width: 20%', sortable: false },
        { name: 'CVE_FRACCION', align: 'center', label: 'CVE_FRACCION', field: 'CVE_FRACCION', style: 'width: 20%', sortable: false }
        /* { name: 'Cambios_RFC', align: 'center', label: 'Cambios_RFC', field: 'Cambios_RFC', style: 'width: 20%', sortable: false },
        { name: 'Cambios_RFC_y_Reg_Pat', align: 'center', label: 'Cambios_RFC_y_Reg_Pat', field: 'Cambios_RFC_y_Reg_Pat', style: 'width: 20%', sortable: false },
        { name: 'Asegurados_Despedidos', align: 'center', label: 'Asegurados_Despedidos', field: 'Asegurados_Despedidos', style: 'width: 20%', sortable: false },
        { name: 'Cambios_Registros_Pat', align: 'center', label: 'Cambios_Registros_Pat', field: 'Cambios_Registros_Pat', style: 'width: 20%', sortable: false },
        { name: 'TA_Patron', align: 'center', label: 'TA_Patron', field: 'TA_Patron', style: 'width: 20%', sortable: false },
        { name: 'ID_ESTRATO', align: 'center', label: 'ID_ESTRATO', field: 'ID_ESTRATO', style: 'width: 20%', sortable: false },
        { name: 'Edad', align: 'center', label: 'Edad', field: 'Edad', style: 'width: 20%', sortable: false } */
      ],
      data: [],
      filter: '',
      selectRoles: [],
      clave: null,
      centro: null,
      modal: false
    }
  },
  created () {
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
    closeModal () {
      this.modal = false
    },
    async qTableRequest (props) {
      const id = this.$route.params.id
      this.pagination = props.pagination
      this.filter = props.filter
      const params = {}
      params.pagination = this.pagination
      params.filter = this.filter
      params.page = this.pagination.page
      params.id = id
      this.modal = true
      api.get('/imssnominal', params).then(({ data }) => {
        this.$q.loading.hide()
        this.data = data.data
        this.clave = data.data[0].rfc
        this.pagination.totalRowsNumber = data.total
        this.pagination.rowsNumber = data.total
        this.pagination.page = data.current_page
        this.pagination.rowsPerPage = data.per_page
      })
    }
  }
}
</script>

<style>
</style>
