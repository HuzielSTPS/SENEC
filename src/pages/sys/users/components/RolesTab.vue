<template>
  <div style="font-weight: normal">
    <div class="row q-col-gutter-xs q-pa-xs">
      <div class="col-xs-12 col-sm-3 icon-color">
        <q-select
          class="uppcase"
          color="dark"
          borderless
          bg-color="secondary"
          filled
          v-model="role.role_id"
          :options="selectRoles"
          :error="v$.role.role_id.$error"
          label="Rol"
          emit-value
          map-options
          :rules="rules.role_id">
          <template v-slot:prepend>
            <q-icon name="badge"></q-icon>
          </template>
        </q-select>
      </div>
      <div class="col-xs-12 col-sm-4 q-mt-sm q-ml-md">
        <q-btn color="positive" icon="add" label="Agregar" style="box-shadow: 5px 5px 5px #8b8989 !important;" @click="addRole()"/>
      </div>
    </div>
    <div class="col q-pa-xs flex-center justify-center table-all-roles">
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
        class="table-roles"
      >
      <template v-slot:top>
          <div style="width: 100%;" class="buscador-roles icon-color">
            <q-input dense debounce="300" v-model="filter" placeholder="Buscar" @update:model-value="v => { filter = v.toUpperCase() }">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" class="icon-color">
            <q-td key="name" style="text-align: left;" :props="props">{{ props.row.name }}</q-td>
            <q-td key="actions" :props="props">
              <q-btn color="red" icon="delete" flat @click="deleteSelectedRow(props.row.id)">
                <q-tooltip class="bg-red">Eliminar</q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import api from 'src/commons/api.js'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'RolesTab',
  setup: () => ({ v$: useVuelidate() }),
  validations () {
    return {
      role: {
        role_id: { required }
      }
    }
  },
  data () {
    return {
      role: {
        role_id: null
      },
      loading: true,
      pagination: {
        sortBy: 'name',
        descending: true,
        rowsPerPage: 25
      },
      columns: [
        { name: 'name', align: 'center', label: 'ROL', field: 'name', style: 'width: 20%', sortable: false },
        { name: 'actions', align: 'center', label: 'ACCIONES', field: 'actions', style: 'width: 10%', sortable: false }
      ],
      data: [],
      filter: '',
      selectRoles: []
    }
  },
  mounted () {
    this.fetchFromServer()
  },
  computed: {
    rules (val) {
      return {
        role_id: [
          val => (!this.v$.role.role_id.required.$invalid) || 'Requerido.'
        ]
      }
    }
  },
  methods: {
    fetchFromServer () {
      this.getRoles()
      this.$q.loading.show()
      this.loading = true
      this.qTableRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    deleteSelectedRow (roleId) {
      this.$q.dialog({
        title: 'Confirmación',
        message: '¿Desea eliminar el rol?',
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
        api.delete(`/user-roles/${this.$route.params.id}`, { role_id: roleId }).then(() => {
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
      api.get(`/user-roles/${this.$route.params.id}`, params).then(({ data }) => {
        this.$q.loading.hide()
        this.data = data.data
        this.pagination.totalRowsNumber = data.total
        this.pagination.rowsNumber = data.total
        this.pagination.page = data.current_page
        this.pagination.rowsPerPage = data.per_page
        this.loading = false
      })
    },
    addRole () {
      this.v$.role.$reset()
      this.v$.role.$touch()
      if (this.v$.role.$error) {
        return false
      }
      this.$q.loading.show()
      const params = { ...this.role }
      params.user_id = this.$route.params.id
      api.post('/user-roles', params).then(() => {
        this.fetchFromServer()
        this.v$.role.$reset()
      })
    },
    getRoles () {
      api.get('/roles-options', { user_id: this.$route.params.id }).then(({ data }) => {
        this.selectRoles = data.options
      })
    }
  }
}
</script>

<style>
</style>
