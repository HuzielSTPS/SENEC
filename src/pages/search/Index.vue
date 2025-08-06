<template>
    <q-page class="bg-grey-3">
      <div class="q-pa-sm bg-white">
        <div class="row">
          <div class="col-sm-8">
            <div class="q-pa-md q-gutter-sm">
              <q-breadcrumbs align="left" style="font-size: 20px">
                <q-breadcrumbs-el label="" icon="home" to="/" />
                <q-breadcrumbs-el label="Búsqueda" />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <div class="q-pa-md bg-grey-3">
        <div class="row bg-white border-panel">
          <div class="col q-pa-md">
            <q-table
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
                  <q-input dense debounce="300" v-model="filter" placeholder="Buscar por RFC PTU" @input="v => { filter = v.toUpperCase() }">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="actions" :props="props">
                      <q-btn color="blue" icon="search" flat @click="editSelectedRow(props.row.RFC_PTU)">
                        <q-tooltip class="bg-blue">Ver</q-tooltip>
                      </q-btn>
                    </q-td>
                    <q-td key="RFC_PTU" style="text-align: center; cursor: pointer; text-decoration: underline; color: blue;" :props="props" @click="editSelectedRow(props.row.RFC_PTU)">
                      {{ props.row.RFC_PTU }}
                    </q-td>
                    <q-td key="RFC_IMSS" style="text-align: left;" :props="props">{{ props.row.RFC_IMSS }}</q-td>
                    <q-td key="CVE_PATRON" style="text-align: center;" :props="props">{{ props.row.CVE_PATRON }}</q-td>
                    <q-td key="NOMBRE" style="text-align: left;" :props="props">{{ props.row.NOMBRE }}</q-td>
                    <q-td key="TA" style="text-align: right;" :props="props">{{ formatNumberPriceZero(props.row.TA) }}</q-td>
                    <q-td key="CVE_ENT_FEDERATIVA" style="text-align: center;" :props="props">{{ props.row.CVE_ENT_FEDERATIVA }}</q-td>
                    <q-td key="CVE_MUNICIPIO" style="text-align: center;" :props="props">{{ props.row.CVE_MUNICIPIO }}</q-td>
                    <q-td key="GIRO" style="text-align: left;" :props="props">{{ props.row.GIRO }}</q-td>
                    <q-td key="Jurisdicción" style="text-align: center;" :props="props">{{ props.row.Jurisdicción }}</q-td>
                    <q-td key="TipodePersona" style="text-align: center;" :props="props">{{ props.row.TipodePersona }}</q-td>
                    <q-td key="CLASE" style="text-align: center;" :props="props">{{ props.row.CLASE }}</q-td>
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
import { formatNumberPriceZero } from 'src/commons/utils'

export default {
  name: 'IndexServices',
  setup: () => ({ formatNumberPriceZero }),
  data () {
    return {
      pagination: {
        sortBy: 'RFC_PTU',
        descending: false,
        rowsPerPage: 15,
        rowsNumber: 0
      },
      columns: [
        { name: 'actions', align: 'center', label: 'ACCIONES', field: 'actions', style: 'width: 10%', sortable: false },
        { name: 'RFC_PTU', align: 'center', label: 'RFC PTU', field: 'RFC_PTU', style: 'width: 20%', sortable: true },
        { name: 'RFC_IMSS', align: 'center', label: 'RFC IMSS', field: 'RFC_IMSS', style: 'width: 20%', sortable: true },
        { name: 'CVE_PATRON', align: 'center', label: 'CVE PATRON', field: 'CVE_PATRON', style: 'width: 20%', sortable: true },
        { name: 'NOMBRE', align: 'center', label: 'NOMBRE', field: 'NOMBRE', style: 'width: 20%', sortable: true },
        { name: 'TA', align: 'center', label: 'TRABAJADORES ASEGURADOS', field: 'TA', style: 'width: 20%', sortable: true },
        { name: 'CVE_ENT_FEDERATIVA', align: 'center', label: 'CVE ENT FEDERATIVA', field: 'CVE_ENT_FEDERATIVA', style: 'width: 20%', sortable: true },
        { name: 'CVE_MUNICIPIO', align: 'center', label: 'CVE MUNICIPIO', field: 'CVE_MUNICIPIO', style: 'width: 20%', sortable: true },
        { name: 'GIRO', align: 'center', label: 'GIRO', field: 'GIRO', style: 'width: 20%', sortable: true },
        { name: 'Jurisdicción', align: 'center', label: 'JURISDICCÓN', field: 'Jurisdicción', style: 'width: 20%', sortable: true },
        { name: 'TipodePersona', align: 'center', label: 'TIPO DE PERSONA', field: 'TipodePersona', style: 'width: 20%', sortable: true },
        { name: 'CLASE', align: 'center', label: 'CLASE', field: 'CLASE', style: 'width: 20%', sortable: true }
      ],
      data: [],
      filter: ''
    }
  },
  created () {
    this.fetchFromServer()
  },
  methods: {
    fetchFromServer () {
      this.$q.loading.show()
      this.qTableRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    editSelectedRow (id) {
      this.$router.push(`/search/${id}`)
    },
    async qTableRequest (props) {
      this.pagination = props.pagination
      this.filter = props.filter
      const params = {}
      params.pagination = this.pagination
      params.filter = this.filter
      params.page = this.pagination.page
      api.get('/busqueda', params).then(({ data }) => {
        this.$q.loading.hide()
        this.data = data.data
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
