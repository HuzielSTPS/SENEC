<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-sm bg-white">
      <div class="row">
        <div class="col-sm-8">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 20px">
              <q-breadcrumbs-el label="" icon="home" to="/" />
              <q-breadcrumbs-el label="Cuentas" />
            </q-breadcrumbs>
          </div>
        </div>
        <div class="col-xs-6 col-md-4 justify-end">
          <div class="row q-pa-sm q-gutter-sm justify-end">
            <q-btn color="blue-6" icon="add" label="Nuevo" @click="$router.push('/accounts/new')" />
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
            row-key="email"
            v-model:pagination="pagination"
            :filter="filter"
            @request="qTableRequest"
          >
          <template v-slot:top>
              <div style="width: 100%;">
                <q-input dense debounce="300" v-model="filter" placeholder="Buscar" @input="v => { filter = v.toUpperCase() }">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="code" style="text-align: center;" :props="props">{{ props.row.code }}</q-td>
                <q-td key="name" style="text-align: left;" :props="props">{{ props.row.name }}</q-td>
                <q-td key="status" style="text-align: center;" :props="props">
                  <q-chip square text-color ="white" :color="statusColor(props.row.status)">{{ props.row.status }}</q-chip>
                </q-td>
                <q-td key="actions" :props="props">
                  <q-btn color="blue" icon="edit" flat @click="editSelectedRow(props.row.id)">
                    <q-tooltip class="bg-blue">Editar</q-tooltip>
                  </q-btn>
                  <q-btn :color="props.row.status === 'ACTIVO' ? 'red' : 'green'" :icon="props.row.status === 'ACTIVO' ? 'cancel' : 'check'" flat @click="toogleStatus(props.row)">
                    <q-tooltip :class="props.row.status === 'ACTIVO' ? 'bg-red' : 'bg-green'">{{ props.row.status === 'ACTIVO' ? 'Baja' : 'Reactivar'}}</q-tooltip>
                  </q-btn>
                </q-td>
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
import { statusColor } from 'src/commons/utils'

export default {
  name: 'IndexUsers',
  setup: () => ({ statusColor }),
  data () {
    return {
      pagination: {
        sortBy: 'code',
        descending: false,
        rowsPerPage: 25,
        rowsNumber: 0
      },
      columns: [
        { name: 'code', align: 'center', label: 'CODIGO', field: 'code', style: 'width: 20%', sortable: true },
        { name: 'name', align: 'center', label: 'NOMBRE', field: 'name', style: 'width: 30%', sortable: true },
        { name: 'status', align: 'center', label: 'STATUS', field: 'status', style: 'width: 10%', sortable: true },
        { name: 'actions', align: 'center', label: 'ACCIONES', field: 'actions', style: 'width: 10%', sortable: false }
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
      this.qTableRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    editSelectedRow (id) {
      this.$router.push(`/accounts/${id}`)
    },
    toogleStatus (row) {
      this.$q.dialog({
        title: 'Confirmación',
        message: row.status === 'ACTIVO' ? '¿Desea dar de baja esta cuenta?' : '¿Desea reactivar esta cuenta?',
        persistent: true,
        ok: {
          label: 'Aceptar',
          color: 'positive'
        },
        cancel: {
          label: 'Cancelar',
          color: 'red'
        }
      }).onOk(() => {
        api.put(`/accounts/toogle-status/${row.id}`).then(() => {
          this.fetchFromServer()
        })
      })
    },
    async qTableRequest (props) {
      this.pagination = props.pagination
      this.filter = props.filter
      const params = {}
      params.pagination = this.pagination
      params.filter = this.filter
      params.page = this.pagination.page
      api.get('/accounts', params).then(({ data }) => {
        this.$q.loading.hide()
        this.data = data.data
        this.pagination.totalRowsNumber = data.total
        this.pagination.rowsNumber = data.total
        this.pagination.page = data.current_page
        this.pagination.rowsPerPage = data.per_page
      }).catch(error => error)
    }
  }
}
</script>

<style>
</style>
