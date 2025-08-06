<template>
  <q-page class="q-pa-sm background-all">
    <div class="row q-col-gutter-lg">
      <div class="col-lg-2 col-md-2 col-xs-12 col-sm-12">
        <q-card class="no-shadow responsive-card"  style="background: #161A1D;  border-radius: 10px; box-shadow: 5px 5px 5px #8b8989 !important;">
          <q-card-section>
        <div class="text-h6 text-center"><q-label style="color: azure">Filtros</q-label></div>
      </q-card-section>
    <q-separator dark inset color="white" />
    <q-card-section>
      <div class="q-pa-sm bg-white" style="border-radius: 10px; max-height: 755px; overflow-y: auto;">
          <div class="row q-col-gutter-xs">
            <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <q-select
              filled
              dense
              borderless
              v-model="ptu.anio"
              :error="v$.ptu.anio.$error"
              :rules="rules.anio"
              label="Año"
              input-debounce="0"
              :options="anioOptions"
              emit-value
              :bg-color="ptu.anio === null ? 'secondary' : 'dark'"
              class="custom-select"
              map-options>
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-select>
            </div>
            <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <q-select
              dense
              :bg-color="ptu.mes === null ? 'secondary' : 'dark'"
              filled
              borderless
              v-model="ptu.mes"
              :error="v$.ptu.mes.$error"
              :rules="rules.mes"
              label="Mes"
              :options="mesOptions"
              emit-value
              class="custom-select"
              map-options>
                <template v-slot:prepend>
                  <q-icon name="calendar_month" />
                </template>
              </q-select>
            </div>
          <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-select
          class="uppcase custom-select"
          filled
          borderless
          dense
          :bg-color="(Entidad_id === '') ? 'secondary' : 'dark'"
          v-model="Entidad_id"
          :options="selectEntidad"
          label="Entidad"
          emit-value
          map-options
          :rules="rules.role_id">
          <template v-slot:prepend>
            <q-icon name="share_location"></q-icon>
          </template>
        </q-select>
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-select
          class="uppcase custom-select"
          borderless
          dense
          :bg-color="(DIV_id === '') ? 'dark' : 'dark'"
          filled
          v-model="DIV_id"
          :options="selectDIV"
          label="División de Actividad Económica"
          @update:model-value="getGPO(DIV_id)"
          emit-value
          map-options>
          <template v-slot:prepend>
            <q-icon name="format_list_bulleted"></q-icon>
          </template>
        </q-select>
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12" v-if="DIV_id">
        <q-select
          class="uppcase custom-select"
          borderless
          dense
          :bg-color="(GPO_id === null || GPO_id === '') ? 'dark' : 'dark'"
          filled
          v-model="GPO_id"
          :options="selectGPO"
          label="Grupo de Actividad Económica"
          emit-value
          @update:model-value="getActividad(GPO_id)"
          map-options>
          <template v-slot:prepend>
            <q-icon name="format_list_bulleted"></q-icon>
          </template>
        </q-select>
      </div>
          <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12" v-if="GPO_id">
        <q-select
          class="uppcase custom-select"
          borderless
          dense
          :bg-color="(Actividad_id === null || Actividad_id === '')  ? 'dark' : 'dark'"
          filled
          v-model="Actividad_id"
          :options="selectActividad"
          label="Actividad Económica"
          emit-value
          map-options>
          <template v-slot:prepend>
            <q-icon name="format_list_bulleted"></q-icon>
          </template>
        </q-select>
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
  <q-select
    filled
    dense
    borderless
    v-model="ptu.OtrosFiltros"
    label="Más Filtros"
    input-debounce="0"
    :options="OtrosFiltrosOptions"
    emit-value
    map-options
    multiple
    class="custom-select"
    :bg-color="ptu.OtrosFiltros === null ? 'secondary' : 'dark'"
  >
    <template v-slot:prepend>
      <q-icon name="filter_list" />
    </template>
    <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
      <q-item v-bind="itemProps" clickable @click="toggleOption(opt)">
        <q-item-section>
          <q-item-label>{{ opt.label }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle :model-value="selected" @update:model-value="value => toggleOption(opt)" />
        </q-item-section>
        <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
          {{ opt.tooltip }}
        </q-tooltip>
      </q-item>
    </template>
  </q-select>
</div>
          </div>
        </div>
    </q-card-section>
  </q-card>
      </div>
      <div class="col-lg-10 col-md-10 col-xs-12 col-sm-12">
        <q-card class="no-shadow" style="background: #161A1D; border-radius: 10px">
    <q-separator/>
    <q-card-section>
      <div class="q-pa-sm bg-white" style="border-radius: 10px">
        <div class="row q-col-gutter-xs">
          <div class="col-xs-12 col-sm-2">
              <q-input
              dense
                :bg-color="(ptu.rfc === null || ptu.rfc === '') ? 'secondary' : 'dark'"
                filled
                v-model="ptu.rfc"
                label="RFC Empresa"
                class="custom-select"
                @update:model-value="v => { ptu.rfc = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="assignment" />
                </template>
              </q-input>
            </div>
      <div class="col-xs-12 col-sm-5">
    <q-select
      class="uppcase custom-select"
      :bg-color="(ptu.name === null || ptu.name === '') ? 'secondary' : 'dark'"
      borderless
      filled
      dense
      use-input
      map-options
      label="Nombre de la Empresa o Razón Social"
      v-model="ptu.name"
      :options="claveProdOptions"
      @filter="searchClave"
      clear
      popup-content-class="scrollable-options"
    >
    <template v-slot:prepend>
      <q-icon name="domain" />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
    </q-select>
  </div>
            <div class="col-xs-12 col-sm-2 border-panel">
              <q-input
                :bg-color="( ptu.cve === null || ptu.cve === '') ? 'secondary' : 'dark'"
                filled
                dense
                v-model="ptu.cve"
                label="Registro Patronal"
                class="custom-select"
                @update:model-value="v => { ptu.cve = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="note_alt" />
                </template>
              </q-input>
            </div>
            <div class="col-lg-1 col-md-1 col-xs-4 col-sm-4 text-right">
            <q-btn class="responsive-btn" color="primary" icon="search" label="Buscar" style="box-shadow: 5px 5px 5px #8b8989 !important;" @click="fetchFromServer()" />
          </div>
          <div class="col-lg-1 col-md-1 col-xs-4 col-sm-4">
            <q-btn class="responsive-btn" color="red" icon="search_off" label="Limpiar" style="box-shadow: 5px 5px 5px #8b8989 !important;" @click="cleamInputs()" />
          </div>
          <div class="col-lg-1 col-md-1 col-xs-4 col-sm-4">
            <q-btn class="responsive-btn" color="green-8" icon="add" label="Nuevo" style="box-shadow: 5px 5px 5px #8b8989 !important;" @click="$router.push('/senec/new')" />
          </div>
          </div>
        </div>
    </q-card-section>
  </q-card>
  <!--Agregaremos la tabla y dos q-card uno para el q-table el otro para los botones
  -->
  <div class="row q-col-gutter-xs">
    <div class="col-xs-12 col-sm-12">
      <q-card class="no-shadow" style="background: transparent; border-radius: 0 0 10px 10px;">
    <q-card-section>
          <!--RESULTADOS DE LA BUSQUEDA-->
          <div class="row bg-grey-3 border-panel my-card"  style="border-radius: 10px;">
        <div class="col q-pa-md" v-show ="this.mostrarPrincipal">
          <q-expansion-item v-model="MostrarRB" :duration="1000" dark class="bg-primary text-h6" style="min-width: 50%; min-height: 50%; border-radius: 10px; color: white; text-align: center !important; border-radius: 10px;" label="Resultados de la búsqueda"
          >
          <q-card class="background-card-1" style="min-width: 100%; border-radius: 0 0 10px 10px;">
          <div class="col q-pa-md" style="background-color: #ececec;">
          <div class="row q-col-gutter-xs">
              </div>
            </div>
          <q-card-section style="background-color: #ececec; border-radius: 0 0 10px 10px;">
            <q-table
            style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important; border: none;"
            class=""
              flat
              bordered
              :rows="dataEA"
              :columns="columnsEA"
              v-model:pagination="paginationEA"
              :filter="filterEA"
              @request="qTableRequestEA"
              row-key="REGISTRO"
              selection="single"
              @row-click="seleccionarFila"
            >

            <template v-slot:body="props">
                <q-tr :props="props" :class="{ 'fila-seleccionada': props.rowIndex === filaSeleccionada,'fila-no-seleccionada': props.rowIndex !== filaSeleccionada && filaSeleccionada !== null
                }"
                >
                  <q-td key="RFC" style="text-align: center; cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props">
                    {{ props.row.RFC === '' ? 'RFC no localizado' : props.row.RFC }}
                  </q-td>
                   <q-td key="REGISTRO" style="text-align: center;" :props="props">{{ props.row.REGISTRO === null ? 'Entidad no localizada' : props.row.REGISTRO }}</q-td>
                    <q-td key="razon" style="text-align: left;" :props="props">{{ (props.row.razon === null) ? 'Nombre no localizado' : props.row.razon }}</q-td>
                    <q-td key="Causa" style="text-align: center;" :props="props">{{ props.row.Causa }}</q-td>
                    <q-td key="Propiedad" style="text-align: center;" :props="props">{{ props.row.Propiedad }}</q-td>
                </q-tr>
              </template>
            </q-table>
            </q-card-section>
            </q-card>
            </q-expansion-item>
          </div>
      </div>
    </q-card-section>
    <q-card-section>
    </q-card-section>
  </q-card>
    </div>
</div>
  </div>
      </div>
  </q-page>
  </template>
<script>

import api from 'src/commons/api.js'
import useVuelidate from '@vuelidate/core'
import { formatNumberPriceZero, formatNumberPrice, formatNumberZero, str10, hasRole, statusEntidad } from 'src/commons/utils'
import { required } from '@vuelidate/validators'
import { QSpinnerFacebook } from 'quasar'
export default {
  name: 'IndexServices',
  setup: () => ({ v$: useVuelidate(), formatNumberPriceZero, formatNumberPrice, formatNumberZero, str10, hasRole, statusEntidad }
  ),
  validations: {
    ptu: {
      mes: { required },
      anio: { required },
      subReg: { required }
    }
  },
  data () {
    return {
      pagination: {
        sortBy: 'RFC',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columns: [
        { name: 'actions', align: 'center', label: 'Acciones', field: 'actions', style: 'width: 10%', sortable: false },
        { name: 'RFC', align: 'center', label: 'RFC Empresa', field: 'RFC', style: 'width: 20%', sortable: true },
        { name: 'CVE_PATRON', align: 'center', label: 'Registro', field: 'CVE_PATRON', style: 'width: 20%', sortable: true },
        { name: 'NOMBRE', align: 'center', label: 'Nombre', field: 'NOMBRE', style: 'width: 20%', sortable: true },
        { name: 'CVE_ENT_FEDERATIVA', align: 'center', label: 'Entidad Federativa', field: 'CVE_ENT_FEDERATIVA', style: 'width: 20%', sortable: true },
        { name: 'CVE_MUNICIPIO', align: 'center', label: 'Municipio', field: 'CVE_MUNICIPIO', style: 'width: 20%', sortable: true },
        { name: 'GIRO', align: 'center', label: 'Giro', field: 'GIRO', style: 'width: 20%', sortable: true },
        { name: 'CVE_MOD_N', align: 'center', label: 'Modalidad', field: 'CVE_MOD_N', style: 'width: 20%', sortable: true },
        { name: 'DESC_DIVISION', align: 'center', label: 'División de Actividad', field: 'DESC_DIVISION', style: 'width: 20%', sortable: true },
        { name: 'DESC_GPO_ACT', align: 'center', label: 'Grupo de Actividad', field: 'DESC_GPO_ACT', style: 'width: 20%', sortable: true },
        { name: 'DESC_FRACION', align: 'center', label: 'Actividad Economica', field: 'DESC_FRACION', style: 'width: 20%', sortable: true }
      ],
      EmisorRFCAux: null,
      tipo_inst_seguridadAux: null,
      NombreAux: null,
      cvepatronAux: null,
      EmisorRegistroPatronalAux: null,
      id_entidadAux: null,
      entidadAux: null,
      empresaAux: null,
      divAux: null,
      grpAux: null,
      fraccionAux: null,
      idfraccionAux: null,
      MenuPrincipalBotones: false,
      data: [],
      filter: '',
      selectedOption: null,
      MostrarRB: true,
      fila: [],
      mostrarPrincipal: false,
      filaSeleccionada: null,
      claveProdOptions: [],
      selectActividad: [],
      Actividad_id: '',
      selectEntidad: [],
      Entidad_id: null,
      selectGPO: [],
      GPO_id: '',
      selectDIV: [],
      DIV_id: null,
      ptu: {
        rfc: null,
        cve: null,
        name: null,
        anio: '2023',
        mes: '06',
        subReg: 1,
        OtrosFiltros: [],
        tipo_inst_seguridad: null,
        tamanio: null,
        num_extranjeros: null,
        rango_sat: null,
        rango_imss: null
      },
      columnsEA: [
        { name: 'RFC', align: 'center', label: 'RFC SENEC', field: 'RFC', style: 'width: 20%', sortable: false },
        { name: 'REGISTRO', align: 'center', label: 'Registro', field: 'REGISTRO', style: 'width: 20%', sortable: false },
        { name: 'razon', align: 'center', label: 'Nombre SENEC', field: 'razon', style: 'width: 20%', sortable: true },
        { name: 'Causa', align: 'center', label: 'Causa', field: 'Causa', style: 'width: 20%', sortable: false },
        { name: 'Propiedad', align: 'center', label: 'Propiedad', field: 'Propiedad', style: 'width: 20%', sortable: true }
      ],
      filterEA: '',
      dataEA: [],
      paginationEA: {
        sortBy: 'ID',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      EA: {
        Num_Centros_SAT: null,
        TA_SAT: null,
        Num_Centros_IMSS: null,
        TA_IMSS: null,
        total: null,
        descuento: null,
        organismo: null,
        institucion: null,
        TA_SOLO_SAT: null,
        TA_SOLO_IMSS: null,
        TA_SOLO_SAT_MAYOR: null,
        TA_SOLO_SAT_MENOR: null,
        TA_Hombres_IMSS: null,
        TA_Mujeres_IMSS: null,
        TA_Hombres_SAT: null,
        TA_Mujeres_SAT: null,
        sin_curp_sat: null,
        sin_curp_imss: null
      },
      cubos: {
        inm: null,
        ptu: null,
        repse: null,
        velavo: null,
        sidil: null,
        inspecciones: null,
        infonacot: null,
        extranjeros: null
      },
      nodataCentros: 'NO HAY DATOS DISPONIBLES',
      OtrosFiltrosOptions: [
        { label: 'Seleccionar todos', value: 'all', tooltip: 'Selecciona todos los filtros' },
        { label: 'PTU', value: '1', tooltip: 'Información de la Participación de los Trabajadores en las Utilidades o PTU a nivel Nacional' },
        { label: 'RIESGOS', value: '2', tooltip: 'Información de Riesgos Registrados en el IMSS' },
        { label: 'SIAAT', value: '3', tooltip: 'Sistemas de Avisos de Accidentes de Trabajo' },
        { label: 'REPSE', value: '4', tooltip: 'Registro de Prestadoras de Servicios Especializados u Obras Especializadas' },
        { label: 'ICSOE', value: '5', tooltip: 'Inforativa de Contratos de Servicios u Obras Especializados' },
        { label: 'SISUB', value: '6', tooltip: 'Sistema de Información de Subcontratación' },
        { label: 'Inspecciones', value: '7', tooltip: '' },
        { label: 'VELAVO', value: '8', tooltip: 'Programa de Verificación Voluntaria' },
        { label: 'INM', value: '9', tooltip: 'Instituto Nacional de Migración' },
        { label: 'CFCRL', value: '10', tooltip: 'Centro Federal de Conciliación y Registro Laboral' },
        { label: 'SNE', value: '11', tooltip: 'Servicio Nacional de Empleo' },
        { label: 'SIDIL', value: '12', tooltip: 'Sistema de Inteligencia de Datos para la Inspección Laboral' },
        { label: 'INFONACOT', value: '13', tooltip: 'Instituto del Fondo Nacional para el Consumo de los Trabajadores' }],
      anioOptions: [
        { label: '2018', value: '2018' },
        { label: '2019', value: '2019' },
        { label: '2020', value: '2020' },
        { label: '2021', value: '2021' },
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' }],
      mesOptions2: [
        { label: 'Enero', value: '131' },
        { label: 'Febrero', value: '228' },
        { label: 'Marzo', value: '331' },
        { label: 'Abril', value: '430' },
        { label: 'Mayo', value: '531' },
        { label: 'Junio', value: '630' },
        { label: 'Julio', value: '731' },
        { label: 'Agosto', value: '831' },
        { label: 'Septiembre', value: '930' },
        { label: 'Octubre', value: '1031' },
        { label: 'Noviembre', value: '1130' },
        { label: 'Diciembre', value: '1231' }
      ],
      jurisdiccionOption: [
        { label: 'Local', value: 'Local' },
        { label: 'Federal', value: 'Federal' }
      ],
      donde_estaOptions: [
        { label: 'SAT', value: 'SAT' },
        { label: 'IMSS y SAT', value: 'IMSS y SAT' },
        { label: 'IMSS', value: 'IMSS' }
      ],
      mesOptions: [
        { label: 'Enero', value: '01' },
        { label: 'Febrero', value: '02' },
        { label: 'Marzo', value: '03' },
        { label: 'Abril', value: '04' },
        { label: 'Mayo', value: '05' },
        { label: 'Junio', value: '06' },
        { label: 'Julio', value: '07' },
        { label: 'Agosto', value: '08' },
        { label: 'Septiembre', value: '09' },
        { label: 'Octubre', value: '10' },
        { label: 'Noviembre', value: '11' },
        { label: 'Diciembre', value: '12' }
      ],
      yearOptions: [
        { label: '2020', value: '2020' },
        { label: '2021', value: '2021' },
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' }
      ],
      selectOptionInstitucion: [],
      selectOptionTamanio: [
        { label: 'Todas', value: null },
        { label: 'Grande', value: 'Grande' },
        { label: 'Mediana', value: 'Mediana' },
        { label: 'Micro', value: 'Micro' },
        { label: 'Pequeña', value: 'Pequeña' }
      ],
      selectOptionSoloImss: [
        { label: 'Todos', value: null },
        { label: '0-5', value: 1 },
        { label: '6-10', value: 2 },
        { label: '11-20', value: 3 },
        { label: '21-50', value: 4 },
        { label: '51-100', value: 5 },
        { label: 'Mayor a 100', value: 6 }
      ],
      selectOptionSoloSat: [
        { label: 'Todos', value: null },
        { label: '0-5', value: 1 },
        { label: '6-10', value: 2 },
        { label: '11-20', value: 3 },
        { label: '21-50', value: 4 },
        { label: '51-100', value: 5 },
        { label: 'Mayor a 100', value: 6 }
      ],
      selectOptionExtranjero: [
        { label: 'Todos', value: null },
        { label: 'Si', value: 1 },
        { label: 'No', value: 0 }
      ]
    }
  },
  watch: {
    'ptu.OtrosFiltros' (newVal) {
      const allOptionSelected = newVal.includes('all')
      const allOtherOptions = this.OtrosFiltrosOptions
        .filter(option => option.value !== 'all')
        .map(option => option.value)
      if (allOptionSelected) {
        // Si ya están todos seleccionados, deselecciona todos
        if (this.areAllOptionsSelected()) {
          this.ptu.OtrosFiltros = []
        } else {
          // Si no están todos seleccionados, selecciona todos
          this.ptu.OtrosFiltros = allOtherOptions
        }
      }
    }
  },
  computed: {
    colClass () {
      return this.isRowClicked ? 'col-lg-7 col-md-7 col-xs-12 col-sm-12' : 'col-lg-12 col-md-12 col-xs-12 col-sm-12'
    },
    rules (val) {
      return {
        mes: [
          val => (!this.v$.ptu.mes.required.$invalid) || 'El mes es requerido.'
        ],
        anio: [
          val => (!this.v$.ptu.anio.required.$invalid) || 'El año es requerido.'
        ],
        subReg: [
          val => (!this.v$.ptu.subReg.required.$invalid) || 'El sub registro es requerido.'
        ]
      }
    }
  },
  created () {
    if (this.$route.params.id != null) {
      this.fetchFromServerNuevo()
    }
  },
  mounted () {
    this.getDIV()
    this.getEntidad()
    this.getInstitucion()
    // this.getJson()
  },
  methods: {
    areAllOptionsSelected () {
      const allOtherOptions = this.OtrosFiltrosOptions
        .filter(option => option.value !== 'all')
        .map(option => option.value)
      // Verifica si todos los otros filtros están seleccionados
      return allOtherOptions.every(option => this.ptu.OtrosFiltros.includes(option))
    },
    toggleOption (value) {
      const index = this.ptu.OtrosFiltros.indexOf(value)
      if (index === -1) {
        this.ptu.OtrosFiltros.push(value)
      } else {
        this.ptu.OtrosFiltros.splice(index, 1)
      }
    },
    searchClave (val, update) {
      if (val.length < 3) {
        return false
      }
      update(() => {
        const params = {}
        params.name = val
        if (this.controladorserachClave) {
          api.cancel()
        }
        this.controladorserachClave = api.get('/empresas-searchClave', params).then(({ data }) => {
          this.claveProdOptions = data.options
          this.controladorserachClave = null
        }).catch(error => error)
      })
    },
    exportTable () {
      const params = {}
      params.pagination = this.paginationEA
      params.filter = this.filterEA
      params.page = this.paginationEA.page
      params.ptu = this.ptu
      params.DIVid = this.DIV_id
      params.GPOid = this.GPO_id
      params.Actividadid = this.Actividad_id
      params.Entidadid = this.Entidad_id
      api.get('/empresas-agregadas-excel', params).then(({ data }) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'Empresas.csv'
        link.click()
        URL.revokeObjectURL(link.href)
      })
    },
    editSelectedRow (id) {
    },
    fetchFromServer () {
      this.isRowClicked = false
      this.filaSeleccionada = null
      this.MostrarRB = true
      this.cleamInputsBuscar()
      /* this.qTableRequest({
        pagination: this.pagination,
        filter: this.filter
      }) */
      this.qTableRequestEA({
        pagination: this.paginationEA,
        filter: this.filterEA
      })
    },
    async qTableRequestEA (props) {
      this.v$.ptu.$reset()
      this.v$.ptu.$touch()
      if (this.v$.ptu.$error) {
        return false
      }
      this.showLoading('')
      // this.$q.loading.show()
      this.paginationEA = props.pagination
      this.filterEA = props.filter
      const params = {}
      params.pagination = this.paginationEA
      params.filter = this.filterEA
      params.page = this.paginationEA.page
      params.ptu = this.ptu
      params.ptu.EmisorRFC = this.$route.params.id
      params.DIVid = this.DIV_id
      params.GPOid = this.GPO_id
      params.Actividadid = this.Actividad_id
      params.Entidadid = this.Entidad_id
      api.get('/senec', params).then(({ data }) => {
        if (data.data) {
          this.dataEA = data.data
          this.mostrarPrincipal = true
          this.paginationEA.totalRowsNumber = data.total
          this.paginationEA.rowsNumber = data.total
          this.paginationEA.page = data.current_page
          this.paginationEA.rowsPerPage = data.per_page
          /* this.cubos.inm = data.data[0].total_INM
          this.cubos.ptu = data.data[0].total_PTU
          this.cubos.repse = data.data[0].total_REPSE
          this.cubos.velavo = data.data[0].total_VELAVO
          this.cubos.sidil = data.data[0].total_SIDIL
          this.cubos.inspecciones = data.data[0].total_INSPECCIONES
          this.cubos.infonacot = data.data[0].total_INFONACOT
          this.cubos.extranjeros = data.data[0].num_extranjeros */
          this.$q.loading.hide()
        } else {
          // this.cleamInputsBuscar()
          this.$q.loading.hide()
        }
      }).catch((error) => {
        console.error('Error al obtener las opciones:', error)
        this.$q.loading.hide()
      })
    },
    cleamInputs () {
      this.mostrarPrincipal = false
      this.ptu.OtrosFiltros = []
      this.ptu.tipo_inst_seguridad = null
      this.ptu.rfc = null
      this.ptu.cve = null
      this.ptu.name = null
      this.ptu.anio = '2023'
      this.ptu.mes = '06'
      this.ptu.subReg = 1
      this.EA.TA_IMSS = null
      this.EA.TA_SAT = null
      this.EA.Num_Centros_IMSS = null
      this.EA.Num_Centros_SAT = null
      this.EA.TA_SOLO_SAT = null
      this.EA.TA_SOLO_IMSS = null
      this.EA.TA_SOLO_SAT_MAYOR = null
      this.EA.TA_SOLO_SAT_MENOR = null
      this.EA.total = null
      this.EA.descuento = null
      this.EA.organismo = null
      this.EA.institucion = null
      this.EA.TA_Hombres_IMSS = null
      this.EA.TA_Mujeres_IMSS = null
      this.EA.TA_Hombres_SAT = null
      this.EA.TA_Mujeres_SAT = null
      this.EA.sin_curp_sat = null
      this.EA.sin_curp_imss = null
      this.EA.Num_Centros_SAT = false
      this.EA.TA_SAT = false
      this.EA.Num_Centros_IMSS = false
      this.EA.TA_IMSS = false
      this.EA.total = false
      this.EA.descuento = false
      this.EA.organismo = false
      this.EA.institucion = false
      this.EA.TA_Hombres_IMSS = null
      this.EA.TA_Mujeres_IMSS = null
      this.EA.TA_Hombres_SAT = null
      this.EA.TA_Mujeres_SAT = null
      this.EA.sin_curp_sat = null
      this.EA.sin_curp_imss = null
      this.dataEA = []
      this.selectGPO = []
      this.selectActividad = []
      this.GPO_id = null
      this.Actividad_id = null
      this.DIV_id = null
      this.Entidad_id = null
    },
    cleamInputsBuscar () {
    },
    exportTableBusqueda () {
      const params = {}
      params.ptu = this.ptu
      params.rfc = this.EmisorRFC
      params.DIVid = this.divAux
      params.GPOid = this.grpAux
      params.Actividadid = this.fraccionAux
      params.Entidadid = this.id_entidadAux
      api.get('/busqueda-excel', params).then(({ data }) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'Centros.csv'
        link.click()
        URL.revokeObjectURL(link.href)
      })
    },
    getData (idrfc, idcvepatron, row) {
      this.toggleSelectedRow2(row)
    },
    closeLoading () {
      this.$q.loading.hide()
    },
    getActividad (gpoid) {
      this.selectActividad = []
      this.Actividad_id = ''
      const params = {}
      params.gpoid = gpoid
      api.get('/actividad-economica-options', params).then(({ data }) => {
        this.selectActividad = data.options
        this.selectActividad.unshift({ label: 'Todas', value: null })
      })
    },
    getGPO (divid) {
      this.selectGPO = []
      this.selectActividad = []
      this.GPO_id = ''
      this.Actividad_id = ''
      const params = {}
      params.divid = divid
      api.get('actividad-economica-options-GPO', params).then(({ data }) => {
        this.selectGPO = data.options
        this.selectGPO.unshift({ label: 'Todos', value: null })
      })
    },
    getDIV () {
      api.get('/actividad-economica-options-DIV').then(({ data }) => {
        this.selectDIV = data.options
        this.selectDIV.unshift({ label: 'Todas', value: null })
      })
    },
    getEntidad () {
      api.get('/entidad-options').then(({ data }) => {
        this.selectEntidad = data.options
        this.selectEntidad.unshift({ label: 'Todas (Nacional)', value: null })
      })
    },
    getInstitucion () {
      api.get('/catalogo-options-institucion').then(({ data }) => {
        this.selectOptionInstitucion = data.options
        this.selectOptionInstitucion.unshift({ label: 'Todos (Organismos)', value: null })
      })
    },
    toggleSelectedRow (row) {
      this.selected = []
      this.selected.push(row)
    },
    toggleSelectedRow2 (row) {
      this.selected2 = []
      this.selected2.push(row)
    },
    seleccionarFila (index) {
      this.filaSeleccionada = index
    },
    selectOption (option, buttonKey) {
      // Cambiar la opción seleccionada
      if (option !== null) {
        // Reiniciar el estado de todos los botones
        Object.keys(this.buttonStates).forEach(key => {
          this.buttonStates[key] = false
        })
        // Marcar el botón correspondiente como 'info'
        this.buttonStates[buttonKey] = true
        this.selectedOption = option // Actualizar la opción seleccionada
      }
    },
    showLoading ($msg) {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'primary',
        spinnerSize: 300,
        backgroundColor: 'dark',
        message: ' Espere un momento estamos realizando las consultas correspondientes' + $msg,
        messageColor: 'info',
        messageClass: 'custom-loading-message'
      })
      setTimeout(() => {
        const loadingMessage = document.querySelector('.q-loading__message')
        if (loadingMessage) {
          loadingMessage.style.fontSize = '20px'
          loadingMessage.style.textAlign = 'center'
          loadingMessage.style.fontWeight = '700'
          loadingMessage.style.whiteSpace = 'nowrap'
          loadingMessage.style.display = 'flex'
          loadingMessage.style.justifyContent = 'center'
          loadingMessage.style.alignItems = 'center'
          loadingMessage.style.width = '100%'
        }
      }, 100)
    }
  }
}
</script>

<style>
.q-table--col-auto-width{
  display: none;
}
.my-card {
  width: 100%;
  max-width: 100%;
  min-height: 100%;
}
.fila-seleccionada {
  background-color: #000000; /* color de fondo para la fila seleccionada */
}
.responsive-card{
  min-height: 70vh;
  height: auto;
  overflow-y: auto;
}
.responsive-btn{
  display:grid;
  margin: auto;
  font-size: .8rem !important;
  min-height: 2.5rem !important;
}
.responsive-card2--active{
  background-color: #000;
}
/* @media (max-width: 1930px) and (min-width: 1601px) {
  .responsive-card {
    height: 90vh;
  }
} */
@media (max-width: 1600px) and (min-width: 950px) {
  /* .responsive-card {
    height: 75vh !important;
  } */
  .responsive-card2 {
    height: 40vh;
  }
  /* .responsive-btn {
    height: 5.5vh;
} */
  .responsive-btn span {
  font-size: 10px;
}
}
@media (max-width: 1070px) and (min-width: 1001px) {
/* .responsive-btn {
  width: 99%;
  height: 3vh;
} */
.responsive-btn span {
  font-size: 10px;
}
}
.custom-tooltip {
  background-color: #e8dac6 !important; /* Color de fondo del tooltip */
  color: #000 !important;           /* Color del texto del tooltip */
  font-size: 14px;                   /* Tamaño de la letra */
  border-radius: 4px;                /* Esquinas redondeadas */
  padding: 5px;                      /* Espaciado interno */
}
.submenu-hover{
  color: #FFF
}
.submenu-hover:hover{
  background-color: #e8dac6;
}
.button-padding{
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
.highlight-active-tab {
  font-weight: bold;
  background-color: #0c231e; /* Cambia esto por el color que desees */
  color: white !important; /* Color del texto */
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}
.scrollable-options {
  max-height: 500px !important; /* Ajusta la altura deseada */
  overflow-y: auto !important;
}
.custom-loading-message {
  font-size: 80px !important; /* Cambia a tu tamaño preferido */
  font-weight: bold !important; /* Opcional: para hacer el texto más grueso */
}
.panel {
  margin-bottom: 25px;
  background-color: #fff;
  border: 1px solid transparent;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}
.panel-default {
  border-color: #ddd;
}
.panel-default > .panel-heading {
  color: #fff;
  background-color: #621132;
  border-color: #ddd;
}
.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
    border-bottom-color: transparent;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.background-all{
  background: url(../../assets/fondo-aleph.png);
}
.custom-select {
  background: #9d9d9d;
  border-radius: 8px;
  padding: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-bottom: 5px;
}
.custom-select .q-field__label {
  color: #000;
  font-weight: 600;
}
.custom-select .q-icon {
  color: #1f1f1f;
}
.q-menu .q-item:hover {
  color: white !important;
}
.q-menu .q-item{
  background-color: #202325;
  color: #fff;
}
/* Agregue esto para que el color del texto en mi lista de los botones se ponga de color blanco */
.text-black {
  color: #fff !important;
}
.rfc-hover b:hover {
  color: #621132;
  font-size: 1rem;
  transition: all 0.3s ease;
}

</style>
