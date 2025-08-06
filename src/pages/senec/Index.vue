<template>
  <q-page class="q-pa-sm background-all" style="padding: 0; margin: 0;">
    <div class="row" style="margin: 0; padding: 0; width: 100vw;">
      <div :class="['filter-sidebar', { expanded: isExpanded }]">
         <q-btn
         v-if="!isMobile"
          flat
          dense
          round
          :icon="isExpanded ? 'chevron_left' : 'chevron_right'"
          @click="isExpanded = !isExpanded"
          class="toggle-btn"
        />
        <div class="filter-content ">
          <q-card class="no-shadow responsive-card">
      <q-card-section>
        <div class="q-pa-sm filtros-wrapper">
            <div class="column q-col-gutter-xss" id="filtros">
              <div>
               <q-select
                  ref="selectAnio"
                  v-show="isExpanded"
                  filled
                  dense
                  borderless
                  standout="bg-teal"
                  v-model="ptu.anio"
                  :error="v$.ptu.anio.$error"
                  :rules="rules.anio"
                  label="Año"
                  input-debounce="0"
                  :options="anioOptions"
                  emit-value
                  :bg-color="ptu.anio === null ? 'secondary' : 'dark'"
                  class="custom-select"
                  map-options
                  :menu-anchor="isExpanded ? 'bottom left' : 'top right'"
                  :menu-self="isExpanded ? 'top left' : 'top left'"
                  :menu-offset="[10, 0]"
                  :transition-show="false"
                  :transition-hide="false"
                >
                  <template v-slot:prepend>
                    <q-icon name="event"  :style="isExpanded ? 'color: white !important' : ''"/>
                  </template>
                </q-select>

                <div v-if="!isExpanded" class="collapsed-icon">
                  <q-icon name="event" class="cursor-pointer" @click="$refs.selectAnio.showPopup()" />
                  <q-tooltip>Año</q-tooltip>
                </div>
              </div>
              <div>
                <q-select
                  ref="selectMes"
                  v-show="isExpanded"
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
                  map-options
                  :menu-anchor="isExpanded ? 'bottom left' : 'top right'"
                  :menu-self="isExpanded ? 'top left' : 'top left'"
                  :menu-offset="[10, 0]"
                  :transition-show="false"
                  :transition-hide="false"
                >
                  <template v-slot:prepend>
                    <q-icon name="calendar_month" :style="isExpanded ? 'color: white !important' : ''" />
                  </template>
                </q-select>

                <div v-if="!isExpanded" class="collapsed-icon">
                  <q-icon
                    name="calendar_month"
                    class="cursor-pointer"
                    @click="$refs.selectMes.showPopup()"
                  />
                  <q-tooltip>Mes</q-tooltip>
                </div>
              </div>
            <div>
              <q-select
                ref="selectEntidad"
                v-show="isExpanded"
                filled
                borderless
                dense
                class="uppcase custom-select"
                :bg-color="Entidad_id === '' ? 'secondary' : 'dark'"
                v-model="Entidad_id"
                :options="selectEntidad"
                label="Entidad"
                emit-value
                map-options
                :rules="rules.role_id"
              >
                <template v-slot:prepend>
                  <q-icon name="share_location" :style="isExpanded ? 'color: white !important' : ''"/>
                </template>
              </q-select>

              <div v-if="!isExpanded" class="collapsed-icon">
                <q-icon
                  name="share_location"
                  class="cursor-pointer"
                  @click="$refs.selectEntidad.showPopup()"
                />
                <q-tooltip>Entidad</q-tooltip>
              </div>
            </div>
        <div>
           <div v-if="isExpanded">
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
                 <q-icon name="format_list_bulleted" :style="isExpanded ? 'color: white !important' : ''"></q-icon>
               </template>
             </q-select>
           </div>
           <div v-else class="collapsed-icon">
                <q-icon name="format_list_bulleted"/>
                <q-tooltip>División de Actividad Económica</q-tooltip>
              </div>
        </div>
        <div v-if="DIV_id">
          <div v-if="isExpanded">
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
                <q-icon name="format_list_bulleted" :style="isExpanded ? 'color: white !important' : ''"></q-icon>
              </template>
            </q-select>
          </div>
           <div v-else class="collapsed-icon">
                <q-icon name="format_list_bulleted"/>
                <q-tooltip>Grupo de Actividad Económica</q-tooltip>
              </div>
        </div>
            <div v-if="GPO_id">
              <div v-if="isExpanded">
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
                    <q-icon name="format_list_bulleted" :style="isExpanded ? 'color: white !important' : ''"></q-icon>
                  </template>
                </q-select>
              </div>
               <div v-else class="collapsed-icon">
                <q-icon name="format_list_bulleted" />
                <q-tooltip>Actividad Económica</q-tooltip>
              </div>
        </div>
        <div>
          <!-- <div v-if="isExpanded">
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
          <div v-else class="collapsed-icon">
                <q-icon name="filter_list" />
                <q-tooltip>Más Filtros</q-tooltip>
              </div> -->
      </div>
</div>
</div>
</q-card-section>
</q-card>
</div>
<UserMenu :isExpanded="isExpanded"/>
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12" :class="['main-content', { 'with-sidebar': isExpanded }]" style="overflow-x: none !important;">
        <q-card class="no-shadow position-card" style="background: transparent; border-radius: 10px">
    <q-card-section>
      <div class="q-pa-sm" style="border-radius: 10px">
        <div class="row q-col-gutter-xs" style="justify-content: center;">
          <div class="col-xs-12 col-sm-2">
              <q-input
                dense
                :bg-color="(ptu.rfc === null || ptu.rfc === '') ? 'accent' : 'primary'"
                outlined
                v-model="ptu.rfc"
                label="RFC Empresa"
                class="text-white-input no-padding-left prepend-icon-full input-all"
                @update:model-value="v => { ptu.rfc = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <div class="icons-background">
                    <q-icon name="assignment" />
                  </div>
                </template>
              </q-input>
            </div>
      <div class="col-xs-12 col-sm-4">
    <q-select
      class="uppcase text-white-input no-padding-left prepend-icon-full input-all"
      :class="{ 'sin-borde-select': isEmpresaNombreLargo, 'prepend-icon-full': !isEmpresaNombreLargo }"
      :bg-color="(ptu.name === null || ptu.name === '') ? 'accent' : 'primary'"
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
      <div class="icons-background">
        <q-icon name="domain" />
      </div>
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
                :bg-color="( ptu.cve === null || ptu.cve === '') ? 'accent' : 'primary'"
                filled
                dense
                v-model="ptu.cve"
                label="Registro Patronal"
                class="text-white-input no-padding-left prepend-icon-full input-all"
                @update:model-value="v => { ptu.cve = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <div class="icons-background">
                    <q-icon name="note_alt" />
                  </div>
                </template>
              </q-input>
            </div>
            <!-- <div class="col-lg-1 col-md-1 col-xs-4 col-sm-4">
            <q-btn class="responsive-btn" color="warning" icon="search" label="Buscar" @click="fetchFromServer()" />
          </div> -->
          <!-- <div class="col-lg-1 col-md-1 col-xs-4 col-sm-4">
            <q-btn class="responsive-btn" color="red" icon="search_off" label="Limpiar" @click="cleamInputs()" />
          </div> -->
          <!-- <div class="col-lg-1 col-md-1 col-xs-4 col-sm-4">
            <q-btn class="responsive-btn" color="green-8" icon="add" label="Nuevo" @click="$router.push('/senec/new')" />
          </div> -->
          <div class="button-container">
            <div class="button-wrapper">
              <div class="col-lg-1 col-md-1 col-xs-4 col-sm-4">
              <button type="button" class="button-search" @click="fetchFromServer()">
                <span class="button__text">Buscar</span>
                <span class="button__icon">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
                  <line x1="16.6464" y1="16.6464" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </span>
              </button>
              </div>
            </div>
            <div class="button-wrapper">
              <div class="col-lg-1 col-md-1 col-xs-4 col-sm-4">
                <button type="button" class="button-new" @click="$router.push('/senec/new')">
                  <span class="button__text">Nuevo</span>
                  <span class="button__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg">
                      <line y2="19" y1="5" x2="12" x1="12"></line>
                      <line y2="12" y1="12" x2="19" x1="5"></line>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div class="button-wrapper">
              <div class="col-lg-1 col-md-1 col-xs-4 col-sm-4">
                <button class="button-clear" @click="cleamInputs()">
                  <span class="text">Limpiar</span>
                  <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
    </q-card-section>
  </q-card>
  <!--Agregaremos la tabla y dos q-card uno para el q-table el otro para los botones
  -->
  <div class="row q-col-gutter-none">
    <div class="col-12" style="padding: 0; margin: 0;">
      <q-card class="no-shadow" style="background: transparent; border-radius: 0 0 10px 10px; width: 100%;">
    <q-card-section>
          <!--RESULTADOS DE LA BUSQUEDA-->
          <div class="row bg-grey-3 border-panel my-card"  style="border-radius: 10px;">
        <div class="col q-pa-md" v-show ="this.mostrarPrincipal">
          <q-expansion-item v-model="MostrarRB" :duration="1000" class="bg-grey-2 text-h5 text-center" style="border-left: 5px solid #700c0c; color: #000; border-radius: 8px; padding: 8px 16px;box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 50px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;" label="Resultados de la Búsqueda"
          >
          <q-card class="background-card-1" style="min-width: 100%; border-radius: 0 0 10px 10px;">
          <div>
          <div class="row q-col-gutter-xs">
              </div>
            </div>
          <q-card-section style="background-color: transparent; border-radius: 0 0 10px 10px;">
            <div class="table-scroll">
              <q-table
              style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important; border: none; width: 100%;"
              class="custom-table"
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
                    <q-td key="RFC" style="text-align: center; cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="mostrarDetallesDelRegistro(props.row,props.rowIndex)">
                      {{ props.row.RFC === '' ? 'RFC no localizado' : props.row.RFC }}
                    </q-td>
                     <q-td key="REGISTRO" style="text-align: center;" :props="props">{{ props.row.REGISTRO === null ? 'Entidad no localizada' : props.row.REGISTRO }}</q-td>
                      <q-td key="razon" style="text-align: left;" :props="props">{{ (props.row.razon === null) ? 'Nombre no localizado' : props.row.razon }}</q-td>
                      <q-td key="Causa" style="text-align: center;" :props="props">{{ props.row.Causa }}</q-td>
                      <q-td key="Propiedad" style="text-align: center;" :props="props"><q-chip :color="props.row.Propiedad === 'PRIVADA' ? 'orange' : 'blue'" text-color="white" size="sm">{{ props.row.Propiedad }}</q-chip></q-td>
                      <q-td key="Acciones" class="text-center button-icon-desing"><q-btn flat round icon="description" color="primary" :title="'Ver documento'" @click="verDocumento(props.row)"/></q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
            </q-card-section>
            </q-card>
            </q-expansion-item>
          </div>
      </div>
    </q-card-section>
  </q-card>
    </div>
</div>
<div v-if="mostrarDetalle" class="row q-col-gutter-none">
  <div class="col-12" style="padding: 0; margin: 0;">
    <q-card class="no-shadow" style="background: transparent; border-radius: 0 0 10px 10px; width: 100%;">
      <q-card-section>
        <div class="row bg-grey-3 border-panel my-card" style="border-radius: 10px;">
          <div class="col q-pa-md">
            <q-expansion-item
              default-opened
              class="bg-grey-2 text-h5 text-center"
              style="border-left: 5px solid #700c0c; color: #000; border-radius: 8px; padding: 8px 16px; box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 50px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;"
              label="Detalles del Registro"
            >
              <q-card class="background-card-1" style="min-width: 100%; border-radius: 0 0 10px 10px;">
                <q-card-section style="background-color: transparent; border-radius: 0 0 10px 10px;">
                  <div class="table-scroll" style="width: 100%;">
                    <q-table
                      style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important; border: none; width: 100%;"
                      class="custom-table"
                      flat
                      bordered
                      :rows="dataSenec"
                      :columns="columnsSenec"
                      row-key="ID"
                      v-model:pagination="paginationSenec"
                      :filter="filterSenec"
                      @request="qTableRequestSenec"
                    >
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td key="Contrato_Completo" style="text-align: left;" :props="props">
                            {{ props.row.Contrato_Completo === null ? 'Contrato no localizado' : props.row.Contrato_Completo }}
                          </q-td>
                          <q-td key="Desc_Contrato_o_Convenio" style="text-align: center;" :props="props">
                            <q-chip :color="props.row.Desc_Contrato_o_Convenio === 'CONVENIO' ? 'orange' : 'blue'" text-color="white" size="sm">
                              {{ props.row.Desc_Contrato_o_Convenio }}
                            </q-chip>
                          </q-td>
                          <q-td key="TrabConInc" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.TrabConInc) }}</q-td>
                          <q-td key="IncrementoNominal" style="text-align: center;" :props="props">{{ formatNumberPrice(props.row.IncrementoNominal) }}</q-td>
                          <q-td key="IncrementoReal" style="text-align: center;" :props="props">{{ formatNumberPrice(props.row.IncrementoReal) }}</q-td>
                          <q-td key="FechaRecep" style="text-align: center;" :props="props">{{ props.row.FechaRecep }}</q-td>
                        </q-tr>
                      </template>
                    </q-table>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</div>

  </div>
      </div>
  </q-page>
  </template>
<script>

import UserMenu from 'src/components/UserMenu.vue'
import api from 'src/commons/api.js'
import useVuelidate from '@vuelidate/core'
import { formatNumberPriceZero, formatNumberPrice, formatNumberZero, str10, hasRole, statusEntidad } from 'src/commons/utils'
import { required } from '@vuelidate/validators'
import { QSpinnerFacebook } from 'quasar'
export default {
  name: 'IndexServices',
  setup: () => ({ v$: useVuelidate(), formatNumberPriceZero, formatNumberPrice, formatNumberZero, str10, hasRole, statusEntidad }
  ),
  components: {
    UserMenu
  },
  validations: {
    ptu: {
      mes: { required },
      anio: { required },
      subReg: { required }
    }
  },
  data () {
    return {
      isExpanded: false,
      isMobile: false,
      expandedSelect: null,
      mostrarDetalle: false,
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
        { name: 'RFC', align: 'center', label: 'RFC', field: 'RFC', style: 'width: 20%', sortable: false },
        { name: 'REGISTRO', align: 'center', label: 'Registro', field: 'REGISTRO', style: 'width: 20%', sortable: false },
        { name: 'razon', align: 'center', label: 'Nombre', field: 'razon', style: 'width: 20%', sortable: true },
        { name: 'Causa', align: 'center', label: 'Causa', field: 'Causa', style: 'width: 20%', sortable: false },
        { name: 'Propiedad', align: 'center', label: 'Propiedad', field: 'Propiedad', style: 'width: 20%', sortable: true },
        { name: 'Acciones', align: 'center', label: 'Acciones', field: 'Acciones', style: 'width: 20%', sortable: true }
      ],
      paginationSenec: {
        sortBy: 'ID',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsSenec: [
        { name: 'Contrato_Completo', align: 'center', label: 'Contrato', field: 'Contrato_Completo', style: 'width: 20%', sortable: true },
        { name: 'Desc_Contrato_o_Convenio', align: 'center', label: 'Descripción', field: 'Desc_Contrato_o_Convenio', style: 'width: 20%', sortable: false },
        { name: 'TrabConInc', align: 'center', label: 'Trabajadores con Incremento', field: 'TrabConInc', style: 'width: 20%', sortable: true },
        { name: 'IncrementoNominal', align: 'center', label: 'Incremento Nominal', field: 'IncrementoNominal', style: 'width: 20%', sortable: false },
        { name: 'IncrementoReal', align: 'center', label: 'Incremento Real', field: 'IncrementoReal', style: 'width: 20%', sortable: false },
        { name: 'FechaRecep', align: 'center', label: 'Fecha Recepción', field: 'FechaRecep', style: 'width: 20%', sortable: true }
      ],
      cantSenec: 0,
      dataSenec: [],
      filterSenec: '',
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
      selectOptionCae: [],
      selectOptionCausa: [],
      selectOptionJurisdiccion: [],
      selectoptionCausa: [],
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
    },
    isEmpresaNombreLargo () {
      return this.ptu.name && this.ptu.name.length > 60
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
    this.getCae()
    this.getJurisdiccion()
    this.getContratosConvenios()
    this.getCausa()
    this.getFormaPago()
    this.getCausaEmp()
    this.getCausaHuelga()
    // this.getJson()
    this.checkScreen()
    window.addEventListener('resize', this.checkScreen)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.checkScreen)
  },
  methods: {
    checkScreen () {
      if (window.innerWidth <= 768) {
        this.isExpanded = true
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },
    mostrarDetallesDelRegistro (row) {
      this.mostrarDetalle = true

      // Aquí haces la petición al backend por RFC
      this.$q.loading.show() // opcional
      this.$axios.post('senec-detalle', { rfc: row.RFC })
        .then(res => {
          this.dataSenec = res.data
          this.cantSenec = res.data.length
        })
        .catch(err => {
          console.error('Error al obtener detalles SENEC:', err)
          this.dataSenec = []
        })
        .finally(() => {
          this.$q.loading.hide() // opcional
        })
    },
    verDocumento (row) {
      if (row.Ruta_Completa) {
        const rutaCorregida = row.Ruta_Completa.replace(/\\/g, '/')
        const urlArchivo = `http://172.16.33.10:8000/${rutaCorregida}`
        const urlVerificacion = `http://172.16.33.10:8000/api/verificar-archivo?ruta=${encodeURIComponent(rutaCorregida)}`

        fetch(urlVerificacion)
          .then(res => res.json())
          .then(data => {
            if (data.existe) {
              window.open(urlArchivo, '_blank')
            } else {
              this.$q.notify({
                type: 'warning',
                message: 'El archivo no fue encontrado en el servidor'
              })
            }
          })
          .catch(() => {
            this.$q.notify({
              type: 'negative',
              message: 'Error al verificar el archivo'
            })
          })
      } else {
        this.$q.notify({
          type: 'warning',
          message: 'No se encontró la ruta del documento'
        })
      }
    },
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
        this.controladorserachClave = api.get('/empresas-searchClave-senec', params).then(({ data }) => {
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
      this.mostrarDetalle = false
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
      this.dataSenec = []
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
        this.selectEntidad.unshift({ label: 'Selecciona una Entidad', value: null })
      })
    },
    getInstitucion () {
      api.get('/catalogo-options-institucion').then(({ data }) => {
        this.selectOptionInstitucion = data.options
        this.selectOptionInstitucion.unshift({ label: 'Todos (Organismos)', value: null })
      })
    },
    getCae () {
      api.get('/catalogo-options-cae').then(({ data }) => {
        this.selectOptionCae = data.options
        this.selectOptionCae.unshift({ label: 'SELECCIONA', value: null })
      })
    },
    getJurisdiccion () {
      api.get('/catalogo-options-Jurisdiccion').then(({ data }) => {
        this.selectOptionJurisdiccion = data.options
        this.selectOptionJurisdiccion.unshift({ label: 'SELECCIONA', value: null })
      })
    },
    getContratosConvenios () {
      api.get('/catalogo-options-ContratosConvenios').then(({ data }) => {
        this.selectOptionContratosConvenios = data.options
        this.selectOptionContratosConvenios.unshift({ label: 'SELECCIONA', value: null })
      })
    },
    getCausa () {
      api.get('/catalogo-options-Causa').then(({ data }) => {
        this.selectOptionCausa = data.options
        this.selectOptionCausa.unshift({ label: 'SELECCIONA', value: null })
      })
    },
    getFormaPago () {
      api.get('/catalogo-options-FormaPago').then(({ data }) => {
        this.selectOptionFormaPago = data.options
        this.selectOptionFormaPago.unshift({ label: 'SELECCIONA', value: null })
      })
    },
    getCausaEmp () {
      api.get('/catalogo-options-CausaEmp').then(({ data }) => {
        this.selectOptionCausaEmp = data.options
        this.selectOptionCausaEmp.unshift({ label: 'SELECCIONA', value: null })
      })
    },
    getCausaHuelga () {
      api.get('/catalogo-options-CausaHuelga').then(({ data }) => {
        this.selectOptionCausaHuelga = data.options
        this.selectOptionCausaHuelga.unshift({ label: 'SELECCIONA', value: null })
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
      this.mostrarDetalle = true
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
