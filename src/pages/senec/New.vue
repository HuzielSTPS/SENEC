<template>
  <q-page class="bg-grey-3 background-all-1">
    <div class="q-pa-sm bg-white">
      <div class="row background-div">
        <div class="col-sm-9">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 20px">
              <q-breadcrumbs-el label="" icon="home" to="/" />
              <q-breadcrumbs-el label="SENEC" to="/senec" />
              <q-breadcrumbs-el label="Nuevo Registro" />
            </q-breadcrumbs>
          </div>
        </div>
      </div>
    </div>

    <div class="q-pa-md bg-grey-3 input-desing ">
      <div class="border-panel q-mb-lg">
      <q-tabs
        v-model="tab"
        dense
        class="custom-tabs"
        align="justify"
        active-color="white"
      >
        <q-tab
          name="id_registro"
          class="custom-tab"
          :class="{ 'custom-tab--active': tab === 'id_registro' }"
        >
          <div class="tab-content">
            <div class="icon-wrapper" :class="{ 'icon-active': tab === 'id_registro' }">
              <q-icon name="person" size="20px" />
            </div>
            <div class="label">
              <div>Identificación</div>
              <div>del Registro</div>
            </div>
          </div>
        </q-tab>

        <q-tab
          name="info_patron"
          class="custom-tab"
          :class="{ 'custom-tab--active': tab === 'info_patron' }"
        >
          <div class="tab-content">
            <div class="icon-wrapper" :class="{ 'icon-active': tab === 'info_patron' }">
              <q-icon name="person" size="20px" />
            </div>
            <div class="label">
              <div>Información</div>
              <div>del Patrón</div>
            </div>
          </div>
        </q-tab>

        <q-tab
          name="sindicato_central"
          class="custom-tab"
          :class="{ 'custom-tab--active': tab === 'sindicato_central' }"
        >
          <div class="tab-content">
            <div class="icon-wrapper" :class="{ 'icon-active': tab === 'sindicato_central' }">
              <q-icon name="diversity_3" size="20px" />
            </div>
            <div class="label">
              <div>Sindicato y</div>
              <div>Central Obrera</div>
            </div>
          </div>
        </q-tab>

        <q-tab
          name="contrato_convenio"
          class="custom-tab"
          :class="{ 'custom-tab--active': tab === 'contrato_convenio' }"
        >
          <div class="tab-content">
            <div class="icon-wrapper" :class="{ 'icon-active': tab === 'contrato_convenio' }">
              <q-icon name="diversity_2" size="20px" />
            </div>
            <div class="label">
              <div>Contrato y</div>
              <div>Convenio</div>
            </div>
          </div>
        </q-tab>

        <q-tab
          name="informacion_trabajadores"
          class="custom-tab"
          :class="{ 'custom-tab--active': tab === 'informacion_trabajadores' }"
        >
          <div class="tab-content">
            <div class="icon-wrapper" :class="{ 'icon-active': tab === 'informacion_trabajadores' }">
              <q-icon name="perm_contact_calendar" size="20px" />
            </div>
            <div class="label">
              <div>Información</div>
              <div>de Trabajadores</div>
            </div>
          </div>
        </q-tab>

        <q-tab
          name="informacion_salarial"
          class="custom-tab"
          :class="{ 'custom-tab--active': tab === 'informacion_salarial' }"
        >
          <div class="tab-content">
            <div class="icon-wrapper" :class="{ 'icon-active': tab === 'informacion_salarial' }">
              <q-icon name="request_page" size="20px" />
            </div>
            <div class="label">
              <div>Información</div>
              <div>Salarial</div>
            </div>
          </div>
        </q-tab>

        <q-tab
          name="forma_pago_beneficios"
          class="custom-tab"
          :class="{ 'custom-tab--active': tab === 'forma_pago_beneficios' }"
        >
          <div class="tab-content">
            <div class="icon-wrapper" :class="{ 'icon-active': tab === 'forma_pago_beneficios' }">
              <q-icon name="payment" size="20px" />
            </div>
            <div class="label">
              <div>Forma de pago</div>
              <div>y Beneficios</div>
            </div>
          </div>
        </q-tab>

        <q-tab
          name="relacion_observaciones"
          class="custom-tab"
          :class="{ 'custom-tab--active': tab === 'relacion_observaciones' }"
        >
          <div class="tab-content">
            <div class="icon-wrapper" :class="{ 'icon-active': tab === 'relacion_observaciones' }">
              <q-icon name="content_paste_search" size="20px" />
            </div>
            <div class="label">
              <div>Relación y</div>
              <div>Observaciones</div>
            </div>
          </div>
        </q-tab>

        <q-tab
          name="sindicato_central"
          class="custom-tab"
          :class="{ 'custom-tab--active': tab === 'sindicato_central' }"
        >
          <div class="tab-content">
            <div class="icon-wrapper" :class="{ 'icon-active': tab === 'sindicato_central' }">
              <q-icon name="person" size="20px" />
            </div>
            <div class="label">
              <div>Sindicato y</div>
              <div>Central Obrera</div>
            </div>
          </div>
        </q-tab>

        <q-tab
          name="archivo_digital"
          class="custom-tab"
          :class="{ 'custom-tab--active': tab === 'archivo_digital' }"
        >
          <div class="tab-content">
            <div class="icon-wrapper" :class="{ 'icon-active': tab === 'archivo_digital' }">
              <q-icon name="storage" size="20px" />
            </div>
            <div class="label">
              <div>&nbsp;&nbsp;Archivo Digital</div>
              <div>&nbsp;&nbsp;</div>
            </div>
          </div>
        </q-tab>
      </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated class="q-pa-md background-tab-panels">
          <q-tab-panel name="id_registro">
            <!-- Identificación del Registro -->
             <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-5">
                <q-select
                  class="uppcase text-white-input"
                  :bg-color="(senec.empresaSeleccionada === null || senec.empresaSeleccionada === '') ? 'secondary' : 'dark'"
                  filled
                  use-input
                  map-options
                  label="Nombre de la Empresa o Razón Social"
                  v-model="senec.empresaSeleccionada"
                  :options="claveProdOptions"
                  @filter="searchClave"
                  clear
                  popup-content-class="scrollable-options"
                  @update:model-value="onEmpresaSeleccionada"
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
             </div>
          </q-tab-panel>
          <q-tab-panel name="info_patron">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-5">
                 <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="senec.RFC"
                  :error="v$.senec.RFC.$error"
                  label="RFC"
                  class="text-white-input"
                  :rules="rules.RFC"
                  @update:model-value="v => { senec.RFC = v.toUpperCase() }"
                >
                  <template v-slot:prepend>
                    <q-icon name="draw" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="sindicato_central">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-5">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="senec.IncrementoReal"
                  :error="v$.senec.IncrementoReal.$error"
                  label="Incremento Real"
                  class="text-white-input"
                  :rules="rules.IncrementoReal"
                  @update:model-value="v => { senec.IncrementoReal = v.toUpperCase() }"
                >
                  <template v-slot:prepend>
                    <q-icon name="draw" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="contrato_convenio">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-5">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="senec.IncrementoReal"
                  :error="v$.senec.IncrementoReal.$error"
                  label="Contrato"
                  class="text-white-input"
                  :rules="rules.IncrementoReal"
                  @update:model-value="v => { senec.IncrementoReal = v.toUpperCase() }"
                >
                  <template v-slot:prepend>
                    <q-icon name="contact_page" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="informacion_trabajadores">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-5">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="senec.IncrementoReal"
                  :error="v$.senec.IncrementoReal.$error"
                  label="Total de Trabajadores"
                  class="text-white-input"
                  :rules="rules.IncrementoReal"
                  @update:model-value="v => { senec.IncrementoReal = v.toUpperCase() }"
                >
                  <template v-slot:prepend>
                    <q-icon name="contact_page" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="informacion_salarial">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-5">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="senec.IncrementoReal"
                  :error="v$.senec.IncrementoReal.$error"
                  label="Incremento Nominal"
                  class="text-white-input"
                  :rules="rules.IncrementoReal"
                  @update:model-value="v => { senec.IncrementoReal = v.toUpperCase() }"
                >
                  <template v-slot:prepend>
                    <q-icon name="contact_page" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="forma_pago_beneficios">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-5">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="senec.IncrementoReal"
                  :error="v$.senec.IncrementoReal.$error"
                  label="Forma de Pago"
                  class="text-white-input"
                  :rules="rules.IncrementoReal"
                  @update:model-value="v => { senec.IncrementoReal = v.toUpperCase() }"
                >
                  <template v-slot:prepend>
                    <q-icon name="contact_page" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="relacion_observaciones">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-6">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="senec.IncrementoReal"
                  :error="v$.senec.IncrementoReal.$error"
                  label="Relación"
                  class="text-white-input"
                  :rules="rules.IncrementoReal"
                  @update:model-value="v => { senec.IncrementoReal = v.toUpperCase() }"
                >
                  <template v-slot:prepend>
                    <q-icon name="contact_page" />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-6">
                <q-input
                  color="dark"
                  bg-color="secondary"
                  standout
                  v-model="senec.IncrementoReal"
                  :error="v$.senec.IncrementoReal.$error"
                  label="Observaciones"
                  class="text-white-input"
                  :rules="rules.IncrementoReal"
                  @update:model-value="v => { senec.IncrementoReal = v.toUpperCase() }"
                >
                  <template v-slot:prepend>
                    <q-icon name="contact_page" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
      <div class="button-container">
            <div class="button-wrapper">
              <div class="col-lg-1 col-md-1 col-xs-4 col-sm-4">
              <button type="button" class="button-search">
                <span class="button__text">Guardar</span>
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
                <button type="button" class="button-new">
                  <span class="button__text">Editar</span>
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
                <button class="button-clear">
                  <span class="text">Eliminar</span>
                  <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div class="button-wrapper">
              <div class="col-lg-1 col-md-1 col-xs-4 col-sm-4">
                <button class="button-clear">
                  <span class="text">Cancelar</span>
                  <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
  </q-page>
</template>
<!-- <div class="col q-pa-md q-mt-md">
  <div class="row q-col-gutter-xs">
    <div class="col-xs-12 col-sm-5">
<q-select
class="uppcase text-white-input"
:bg-color="(senec.empresaSeleccionada === null || senec.empresaSeleccionada === '') ? 'secondary' : 'dark'"
filled
use-input
map-options
label="Nombre de la Empresa o Razón Social"
v-model="senec.empresaSeleccionada"
:options="claveProdOptions"
@filter="searchClave"
clear
popup-content-class="scrollable-options"
@update:model-value="onEmpresaSeleccionada"
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
<div class="col-xs-12 col-sm-4">
      <q-input
        color="dark"
        bg-color="secondary"
        filled
        v-model="senec.RFC"
        :error="v$.senec.RFC.$error"
        label="RFC"
        class="text-white-input"
        :rules="rules.RFC"
        @update:model-value="v => { senec.RFC = v.toUpperCase() }"
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
        v-model="senec.REGISTRO"
        :error="v$.senec.REGISTRO.$error"
        label="Registro"
        class="text-white-input"
        :rules="rules.REGISTRO"
        @update:model-value="v => { senec.REGISTRO = v.toUpperCase() }"
      >
        <template v-slot:prepend>
          <q-icon name="draw" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-3">
      <q-select
  class="uppcase custom-select text-white-input"
  filled
  :bg-color="(senec.Entidad_id === '') ? 'secondary' : 'dark'"
  v-model="senec.Entidad_id"
  :options="selectEntidad"
  label="Entidad"
  emit-value
  map-options
  :rules="rules.Entidad_id">
  <template v-slot:prepend>
    <q-icon name="share_location"></q-icon>
  </template>
</q-select>
    </div>
    <div class="col-xs-12 col-sm-3">
      <q-select
  class="uppcase custom-select text-white-input"
  filled
  :bg-color="(senec.Causa === '') ? 'secondary' : 'dark'"
  v-model="senec.Causa"
  :options="selectOptionCausa"
  label="Causa"
  emit-value
  map-options
  :rules="rules.Causa">
  <template v-slot:prepend>
    <q-icon name="share_location"></q-icon>
  </template>
</q-select>
    </div>
    <div class="col-xs-12 col-sm-3">
      <q-select
  class="uppcase custom-select text-white-input"
  filled
  :bg-color="(senec.Propiedad === '') ? 'secondary' : 'dark'"
  v-model="senec.Propiedad"
  :options="selectOptionPropiedad"
  label="Propiedad"
  emit-value
  map-options
  :rules="rules.Propiedad">
  <template v-slot:prepend>
    <q-icon name="share_location"></q-icon>
  </template>
</q-select>
    </div>
    <div class="col-xs-12 col-sm-3">
      <q-select
  class="uppcase custom-select text-white-input"
  filled
  :bg-color="(senec.causa_emp === '') ? 'secondary' : 'dark'"
  v-model="senec.causa_emp"
  :options="selectOptionCausaEmp"
  label="causa empresa"
  emit-value
  map-options
  :rules="rules.causa_emp">
  <template v-slot:prepend>
    <q-icon name="share_location"></q-icon>
  </template>
</q-select>
    </div>
    <div class="col-xs-12 col-sm-3">
      <q-select
  class="uppcase custom-select text-white-input"
  filled
  :bg-color="(senec.FormaPago === '') ? 'secondary' : 'dark'"
  v-model="senec.FormaPago"
  :options="selectOptionFormaPago"
  label="Forma de Pago"
  emit-value
  map-options
  :rules="rules.FormaPago">
  <template v-slot:prepend>
    <q-icon name="share_location"></q-icon>
  </template>
</q-select>
    </div>
    <div class="col-xs-12 col-sm-3">
      <q-select
  class="uppcase custom-select text-white-input"
  filled
  :bg-color="(senec.CausaHuelga === '') ? 'secondary' : 'dark'"
  v-model="senec.CausaHuelga"
  :options="selectOptionCausaHuelga"
  label="Causa Huelga"
  emit-value
  map-options
  :rules="rules.CausaHuelga">
  <template v-slot:prepend>
    <q-icon name="share_location"></q-icon>
  </template>
</q-select>
    </div>
    <div class="col-xs-12 col-sm-3">
      <q-input
        color="dark"
        bg-color="secondary"
        filled
        v-model="senec.CentralObrera"
        :error="v$.senec.CentralObrera.$error"
        label="Central Obrera"
        class="text-white-input"
        :rules="rules.CentralObrera"
        @update:model-value="v => { senec.CentralObrera = v.toUpperCase() }"
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
        v-model="senec.LugarRecep"
        :error="v$.senec.LugarRecep.$error"
        label="Lugar Recep"
        class="text-white-input"
        :rules="rules.LugarRecep"
        @update:model-value="v => { senec.LugarRecep = v.toUpperCase() }"
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
        v-model="senec.Ramadeactividad"
        :error="v$.senec.Ramadeactividad.$error"
        label="Rama de actividad"
        class="text-white-input"
        :rules="rules.Ramadeactividad"
        @update:model-value="v => { senec.Ramadeactividad = v.toUpperCase() }"
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
        v-model="senec.TrabConInc"
        :error="v$.senec.TrabConInc.$error"
        label="Trab Con Inc"
        class="text-white-input"
        :rules="rules.TrabConInc"
        @update:model-value="v => { senec.TrabConInc = v.toUpperCase() }"
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
        v-model="senec.IncrementoNominal"
        :error="v$.senec.IncrementoNominal.$error"
        label="Incremento Nominal"
        class="text-white-input"
        :rules="rules.IncrementoNominal"
        @update:model-value="v => { senec.IncrementoNominal = v.toUpperCase() }"
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
        v-model="senec.IncrementoReal"
        :error="v$.senec.IncrementoReal.$error"
        label="Incremento Real"
        class="text-white-input"
        :rules="rules.IncrementoReal"
        @update:model-value="v => { senec.IncrementoReal = v.toUpperCase() }"
      >
        <template v-slot:prepend>
          <q-icon name="draw" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-3">
      <q-select
  class="uppcase custom-select text-white-input"
  filled
  :bg-color="(senec.Jurisdiccion === '') ? 'secondary' : 'dark'"
  v-model="senec.Jurisdiccion"
  :options="selectOptionJurisdiccion"
  label="Jurisdicción"
  emit-value
  map-options
  :rules="rules.Jurisdiccion">
  <template v-slot:prepend>
    <q-icon name="share_location"></q-icon>
  </template>
</q-select>
    </div>
  </div>
  <div class="row q-mb-sm justify-end">
    <q-btn color="positive" icon="save" label="Guardar" style="box-shadow: 5px 5px 5px #8b8989 !important;" @click="createSenec()" />
  </div>
</div> -->

<script>
import api from 'src/commons/api.js'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'NewSenec',
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    senec: {
      RFC: { required },
      REGISTRO: { required },
      razon: { required },
      EntidadFederativa: { required },
      Causa: { required },
      Propiedad: { required },
      CentralObrera: { required },
      LugarRecep: { required },
      Ramadeactividad: { required },
      TrabConInc: { required },
      IncrementoNominal: { required },
      IncrementoReal: { required },
      Jurisdiccion: { required },
      Entidad_id: { required }
    }
  },
  data () {
    return {
      tab: 'id_registro',
      senec: {
        empresaSeleccionada: null,
        ID: null,
        RFC: null,
        REGISTRO: null,
        razon: null,
        EntidadFederativa: null,
        Causa: null,
        Propiedad: null,
        causa_emp: null,
        CentralObrera: null,
        LugarRecep: null,
        Ramadeactividad: null,
        TrabConInc: null,
        IncrementoNominal: null,
        IncrementoReal: null,
        Jurisdiccion: null,
        Entidad_id: null,
        Folio: null,
        ClaveFolio: null,
        FechaRecep: null,
        duplicado: null,
        TipoContrato: null,
        Expediente: null,
        Ayo: null,
        Rama: null,
        Estado1: null,
        Temporalidad: null,
        FechaPrimerDep: null,
        AyoFolio: null,
        Empresa: null,
        Extension: null,
        IncrementoSal: null,
        ContraConve: null,
        RamaAct: null,
        cat_scian: null,
        FechaFirma: null,
        FechaVigen: null,
        TipoPropiedad: null,
        Estado2: null,
        RegSindi: null,
        Sindicato: null,
        Seccion: null,
        NombreSeccion: null,
        TipoSindi: null,
        NombreContEmp: null,
        PuestoContEmp: null,
        CorreoContEmp: null,
        TelEmp1: null,
        TelEmp2: null,
        TelEmp3: null,
        CelularEmp: null,
        FaxEmp: null,
        NombreContSindi: null,
        PuestoContSindi: null,
        CorreoContSindi: null,
        TelSindi1: null,
        TelSindi2: null,
        TelSindi3: null,
        CelularSindi: null,
        FaxSindi: null,
        TrabTotal: null,
        TrabSinBase: null,
        TrabSindEven: null,
        TrabConf: null,
        TrabConBono: null,
        Retabulacion: null,
        Prestaciones: null,
        AjusteSalarial: null,
        ValorPromedio: null,
        BonoProd: null,
        FormaPago: null,
        DistribBenef: null,
        PeriodoPago: null,
        Metas: null,
        Relacion: null,
        FechaAlta: null,
        Observaciones: null,
        CausaHuelga: null
      },
      claveProdOptions: [],
      isPwd: true,
      selectEntidad: [],
      selectOptionCae: [],
      selectOptionInstitucion: [],
      selectOptionJurisdiccion: [],
      selectOptionContratosConvenios: [],
      selectOptionCausa: [],
      selectOptionPropiedad: [],
      selectOptionCausaEmp: [],
      selectOptionFormaPago: [],
      selectOptionCausaHuelga: []
    }
  },
  computed: {
    rules (val) {
      return {
        razon: [
          val => (!this.v$.senec.razon.required.$invalid) || 'Requerido.',
          val => (!this.v$.senec.razon.maxLength.$invalid) || 'No debe exceder los 13 dígitos.'
        ]
      }
    }
  },
  mounted () {
    this.getEntidad()
    this.getCae()
    this.getJurisdiccion()
    this.getContratosConvenios()
    this.getCausa()
    this.getPropiedad()
    this.getCausaEmp()
    this.getFormaPago()
    this.getCausaHuelga()
  },
  methods: {
    createSenec () {
      this.v$.senec.$reset()
      this.v$.senec.$touch()
      if (this.v$.senec.$error) {
        return false
      }
      this.$q.loading.show()
      const params = { ...this.senec }
      api.post('/senec', params).then(({ data }) => {
        this.$q.loading.hide()
        this.$router.push(`/senec/${data.id}`)
      })
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
          console.log(data)
          this.claveProdOptions = data.options
          this.controladorserachClave = null
        }).catch(error => error)
      })
    },
    getEntidad () {
      api.get('/entidad-options').then(({ data }) => {
        this.selectEntidad = data.options
        this.selectEntidad.unshift({ label: 'Seleccione una opción', value: null })
      })
    },
    getCae () {
      api.get('/catalogo-options-cae').then(({ data }) => {
        this.selectOptionCae = data.options
        this.selectOptionCae.unshift({ label: 'Seleccione una opción', value: null })
      })
    },
    getJurisdiccion () {
      api.get('/catalogo-options-Jurisdiccion').then(({ data }) => {
        this.selectOptionJurisdiccion = data.options
        this.selectOptionJurisdiccion.unshift({ label: 'Seleccione una opción', value: null })
      })
    },
    getContratosConvenios () {
      api.get('/catalogo-options-ContratosConvenios').then(({ data }) => {
        this.selectOptionContratosConvenios = data.options
        this.selectOptionContratosConvenios.unshift({ label: 'TODOS', value: null })
      })
    },
    getCausa () {
      api.get('/catalogo-options-Causa').then(({ data }) => {
        this.selectOptionCausa = data.options
        this.selectOptionCausa.unshift({ label: 'Seleccione una opción', value: null })
      })
    },
    getPropiedad () {
      api.get('/catalogo-options-Propiedad').then(({ data }) => {
        this.selectOptionPropiedad = data.options
        this.selectOptionPropiedad.unshift({ label: 'Seleccione una opción', value: null })
      })
    },
    getCausaEmp () {
      api.get('/catalogo-options-CausaEmp').then(({ data }) => {
        this.selectOptionCausaEmp = data.options
        this.selectOptionCausaEmp.unshift({ label: 'Seleccione una opción', value: null })
      })
    },
    getFormaPago () {
      api.get('/catalogo-options-FormaPago').then(({ data }) => {
        this.selectOptionFormaPago = data.options
        this.selectOptionFormaPago.unshift({ label: 'Seleccione una opción', value: null })
      })
    },
    getCausaHuelga () {
      api.get('/catalogo-options-CausaHuelga').then(({ data }) => {
        this.selectOptionCausaHuelga = data.options
        this.selectOptionCausaHuelga.unshift({ label: 'Seleccione una opción', value: null })
      })
    },
    onEmpresaSeleccionada (empresa) {
      console.log(empresa)
      if (empresa) {
        this.senec.RFC = empresa.value
        this.senec.Entidad_id = { value: empresa.id_entidad, label: empresa.desc_entidad }
      } else {
        this.senec.RFC = ''
        this.senec.Entidad_id = ''
      }
    }
  }
}
</script>

<style>
</style>
