<template>
  <q-page class="q-pa-sm background-all">
    <div class="row q-col-gutter-lg">
      <div class="col-lg-2 col-md-2 col-xs-12 col-sm-12">
        <q-card class="no-shadow responsive-card"  style="background: #621132;  border-radius: 10px; box-shadow: 5px 5px 5px #8b8989 !important;">
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
            <!--<div class="col-xs-12 col-sm-2">
              <q-select
              class="uppcase"
              :bg-color="ptu.subReg === null ? 'primary' : 'blue-grey-3'"
              filled
              borderless
              v-model="ptu.subReg"
              :error="v$.ptu.subReg.$error"
              :rules="rules.subReg"
              label="Sub-Registro"
              input-debounce="0"
              :options="subRegOptions"
              emit-value
              map-options>
                <template v-slot:prepend>
                  <q-icon name="apartment" />
                </template>
              </q-select>
            </div> -->
            <!--<div class="col-xs-12 col-sm-2">
              <q-select
              class="uppcase"
              filled
              borderless
              v-model="ptu.donde_esta"
              label="Institución"
              input-debounce="0"
              :options="donde_estaOptions"
              :error="v$.ptu.donde_esta.$error"
              :rules="rules.donde_esta"
              emit-value
              :bg-color="ptu.donde_esta === null ? 'secondary' : 'dark'"
              map-options>
                <template v-slot:prepend>
                  <q-icon name="apartment" />
                </template>
              </q-select>
            </div>-->
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
            <!--<div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <q-select
              filled
              dense
              borderless
              v-model="ptu.OtrosFiltros"
              label="Más Filtros"
              input-debounce="0"
              :options="OtrosFiltrosOptions"
              emit-value
              :bg-color="ptu.OtrosFiltros === null ? 'secondary' : 'dark'"
              map-options
              >
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-select>
            </div>-->
            <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-select
          class="uppcase custom-select"
          filled
          borderless
          dense
          :bg-color="(ptu.tipo_inst_seguridad === '') ? 'secondary' : 'dark'"
          v-model="ptu.tipo_inst_seguridad"
          :options="selectOptionInstitucion"
          label="Organismo"
          emit-value
          map-options>
          <template v-slot:prepend>
            <q-icon name="location_city"></q-icon>
          </template>
        </q-select>
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-select
          class="uppcase custom-select"
          filled
          borderless
          dense
          :bg-color="(ptu.tamanio === '') ? 'secondary' : 'dark'"
          v-model="ptu.tamanio"
          :options="selectOptionTamanio"
          label="Tamaño"
          emit-value
          map-options>
          <template v-slot:prepend>
            <q-icon name="aspect_ratio"></q-icon>
          </template>
        </q-select>
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-select
          class="uppcase custom-select"
          filled
          borderless
          dense
          :bg-color="(ptu.num_extranjeros === '') ? 'secondary' : 'dark'"
          v-model="ptu.num_extranjeros"
          :options="selectOptionExtranjero"
          label="Extranjeros"
          emit-value
          map-options>
          <template v-slot:prepend>
            <q-icon name="person"></q-icon>
          </template>
        </q-select>
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-select
          class="uppcase custom-select"
          filled
          borderless
          dense
          :bg-color="(ptu.rango_sat === '') ? 'secondary' : 'dark'"
          v-model="ptu.rango_sat"
          :options="selectOptionSoloSat"
          label="Rango TA solo SAT"
          emit-value
          map-options>
          <template v-slot:prepend>
            <q-icon name="dialpad"></q-icon>
          </template>
        </q-select>
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-select
          class="uppcase custom-select"
          filled
          borderless
          dense
          :bg-color="(ptu.rango_imss === '') ? 'secondary' : 'dark'"
          v-model="ptu.rango_imss"
          :options="selectOptionSoloImss"
          label="Rango TA solo IMSS"
          emit-value
          map-options>
          <template v-slot:prepend>
            <q-icon name="dialpad"></q-icon>
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
          <!-- Asegúrate de que el q-toggle esté correctamente vinculado al estado seleccionado -->
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
        <q-card class="no-shadow" style="background: #621132; border-radius: 10px">
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
      <div class="col-xs-12 col-sm-6">
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
            <div class="col-lg-1 col-md-1 col-xs-6 col-sm-6 text-right">
            <q-btn class="responsive-btn" color="primary" icon="search" label="Buscar" @click="fetchFromServer()" />
          </div>
          <div class="col-lg-1 col-md-1 col-xs-6 col-sm-6">
            <q-btn class="responsive-btn" color="red" icon="search_off" label="Limpiar" style="box-shadow: 5px 5px 5px #8b8989 !important;" @click="cleamInputs()" />
          </div>
          </div>
        </div>
    </q-card-section>
  </q-card>
  <!--Agregaremos la tabla y dos q-card uno para el q-table el otro para los botones
  -->
  <div class="row q-col-gutter-xs">
    <div :class="colClass">
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
            class="responsive-card2"
              flat
              bordered
              :rows="dataEA"
              :columns="columnsEA"
              v-model:pagination="paginationEA"
              :filter="filterEA"
              @request="qTableRequestEA"
              row-key="EmisorRegistroPatronal"
              selection="single"
              @row-click="seleccionarFila"
            >
            <template v-slot:top>
              <div style="width: 90%;"></div>
              <div style="width: 10%;">
                <q-btn v-if="hasRole(['DESCARGA'])"
          color="primary"
          icon-right="archive"
          label="Descarga"
          no-caps
          @click="exportTable()">
        </q-btn>
              </div>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props" :class="{ 'fila-seleccionada': props.rowIndex === filaSeleccionada,'fila-no-seleccionada': props.rowIndex !== filaSeleccionada && filaSeleccionada !== null
                }"
                >
                  <!--<q-td key="actions" :props="props">
                      <q-btn   v-if="props.row.RFC != ''" color="blue" icon="search" flat @click="getData,(props.row.RFC, props.row.CVE_PATRON)">
                        <q-tooltip class="bg-blue">Ver</q-tooltip>
                      </q-btn>
                    </q-td>
                    <q-td  v-if="props.row.RFC != ''" key="RFC" style="text-align: center; cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="getData(props.row.RFC, props.row.CVE_PATRON)">
                      {{ props.row.RFC }}
                    </q-td>
                    <q-td  v-else style="text-align: center; cursor: pointer; text-decoration: underline;">
                    </q-td>
                    <q-td key="Periodo" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.Periodo) }}</q-td>-->
                  <q-td key="EmisorRFC" style="text-align: center; cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="UpdateDatosAgregados(props.row,props.rowIndex)">
                    {{ props.row.EmisorRFC === '' ? 'RFC no localizado' : props.row.EmisorRFC }}
                  </q-td>
                    <q-td key="Nombre_Empresa" style="text-align: center;" :props="props">{{ (props.row.Nombre_Empresa === null) ? 'Nombre no localizado' : props.row.Nombre_Empresa }}</q-td>
                    <q-td key="desc_entidad" style="text-align: center;" :props="props">{{ props.row.desc_entidad === null ? 'Entidad no localizada' : props.row.desc_entidad }}</q-td>
                    <q-td key="EmisorRegistroPatronal" style="text-align: center;" :props="props">{{ props.row.EmisorRegistroPatronal }}</q-td>
                    <q-td key="Trabajadores_solo_SAT" style="text-align: center;" :props="props">{{ formatNumberPriceZero(props.row.Trabajadores_solo_SAT) }}</q-td>
                    <q-td key="Trabajadores_solo_IMSS" style="text-align: center;" :props="props">{{ formatNumberPriceZero(props.row.Trabajadores_solo_IMSS) }}</q-td>
                    <q-td key="Cruce_Trabajadores" style="text-align: center;" :props="props">{{ formatNumberPriceZero(props.row.Cruce_Trabajadores) }}</q-td>
                    <!--<q-td key="DESC_DIVISION" style="text-align: left;" :props="props">{{ props.row.desc_division }}</q-td>
                    <q-td key="DESC_GPO_ACT" style="text-align: left;" :props="props">{{ props.row.desc_grupo }}</q-td>-->
                    <!--<q-td key="DESC_FRACION" style="text-align: left;" :props="props">{{ props.row.desc_fraccion }}</q-td>-->
                    <!--<q-td key="REPSE" style="text-align: center; width: 20%; margin-left: 10%">
                      <q-btn color="blue" icon="search" flat @click="dataREPSE(props.row)">
                        <q-tooltip class="bg-blue">Ver Repse</q-tooltip>
                      </q-btn>
                    </q-td>
                    <q-td key="Total_Nomina" style="text-align: right;" :props="props">{{ formatNumberPrice(props.row.Total) }}</q-td>
                    <q-td key="Descuento_Total" style="text-align: right;" :props="props">{{ formatNumberPrice(props.row.Descuento) }}</q-td>
                    <q-td key="Num_Centros_SAT" style="text-align: right;" :props="props">{{ formatNumberPriceZero(props.row.Num_Centros_SAT) }}</q-td>
                    <q-td key="TA_SAT" style="text-align: right;" :props="props">{{ formatNumberPriceZero(props.row.TA_SAT) }}</q-td>
                    <q-td key="Num_Centros_IMSS" style="text-align: right;" :props="props">{{ formatNumberPriceZero(props.row.Num_Centros_IMSS) }}</q-td>
                    <q-td key="TA_IMSS" style="text-align: right;" :props="props">{{ formatNumberPriceZero(props.row.TA_IMSS) }}</q-td>
                    <q-td key="Id_Organismo" style="text-align: right;" :props="props">{{ props.row.Id_Organismo }}</q-td>-->
                </q-tr>
              </template>
            </q-table>
            <div class="col q-pa-md">
        <div class="row q-col-gutter-xs">
      <div v-if="ptu.OtrosFiltros.includes('1')" class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
        Empresas con PTU: {{  formatNumberPriceZero(this.cubos.ptu) }}
      </div>
      <div v-if="ptu.OtrosFiltros.includes('4')" class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
        Empresas con REPSE: {{  formatNumberPriceZero(this.cubos.repse) }}
      </div>
      <div v-if="ptu.OtrosFiltros.includes('7')" class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
        Empresas con Inspecciones: {{  formatNumberPriceZero(this.cubos.inspecciones) }}
      </div>
      <div v-if="ptu.OtrosFiltros.includes('8')" class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
        Empresas con VELAVO: {{  formatNumberPriceZero(this.cubos.velavo) }}
      </div>
      <div v-if="ptu.OtrosFiltros.includes('9')" class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
        Empresas con INM: {{  formatNumberPriceZero(this.cubos.inm) }}
      </div>
      <div v-if="ptu.OtrosFiltros.includes('12')" class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
        Empresas con SIDIL: {{  formatNumberPriceZero(this.cubos.sidil) }}
      </div>
      <div v-if="ptu.OtrosFiltros.includes('13')" class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
        Empresas con INFONACOT: {{  formatNumberPriceZero(this.cubos.infonacot) }}
      </div>
      <div v-if="ptu.num_extranjeros === 1" class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
        Extranjeros: {{  formatNumberPriceZero(this.cubos.extranjeros) }}
      </div>
        </div>
        </div>
            </q-card-section>
            </q-card>
            </q-expansion-item>
          </div>
      </div>
    </q-card-section>
    <q-card-section>
            <div class="row bg-white border-panel bg-grey-3 my-card">
        <div class="col q-pa-md" v-show ="this.MenuPrincipalBotones">
          <q-card style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;" class="background-card">
          <div class="col q-pa-md" >
          <div class="row q-col-gutter-xs">
          <div class="col-xs-12 col-sm-4 rfc-hover" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;" @click="MostrarPowerRFC(this.fila.EmisorRFC)">
            <b style="text-align: center; cursor: pointer; text-decoration: underline;"> RFC: {{ this.fila.EmisorRFC }}</b>
              </div>
          <div class="col-xs-12 col-sm-5" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;">
           <b>Nombre:</b> {{ this.fila.Nombre_Empresa }}
              </div>
            <div class="col-xs-12 col-sm-3 rfc-hover" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;" @click="MostrarPowerRegistro(this.fila.EmisorRegistroPatronal)">
              <b style="text-align: center; cursor: pointer; text-decoration: underline;"> Registro: {{ this.fila.EmisorRegistroPatronal }}</b>
              </div>
              <div class="col-xs-12 col-sm-4" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;">
              <b>Entidad:</b> {{ (this.fila.desc_entidad === null || this.fila.desc_entidad === '' || this.fila.desc_entidad === '0') ? 'N/D':this.fila.desc_entidad }}
              </div>
              <div class="col-xs-12 col-sm-5" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;">
              <b>Municipio:</b> {{ (this.fila.desc_municipio === null || this.fila.desc_municipio === '' || this.fila.desc_municipio === '0') ? 'N/D':this.fila.desc_municipio }}
              </div>
              <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;">
              <b>Organismo:</b> {{ this.fila.desc_Organismo }}
              </div>
              <div class="col-xs-12 col-sm-12" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;">
              <b>Actividad:</b> {{ (this.fila.desc_fraccion === null || this.fila.desc_fraccion === '' || this.fila.desc_fraccion === '0') ? 'N/D':this.fila.desc_fraccion }}
              </div>
              <div class="col-xs-12 col-sm-4" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;">
              <b>Tamaño de la Empresa:</b> {{ this.fila.tamaño_empresa }}
              </div>
              <div class="col-xs-12 col-sm-6" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;">
              <b>Salario promedio en el Centro:</b> ${{ formatNumberPrice(this.fila.salario_promedio) }}
              </div>
              <div class="col-xs-12 col-sm-4" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;">
              <b>Domicilio:</b> {{ (this.fila.DOMICILIO === null || this.fila.DOMICILIO === '' || this.fila.DOMICILIO === '0') ? 'N/D': this.fila.DOMICILIO }}
              </div>
              <div class="col-xs-12 col-sm-5" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;">
              <b>Localidad:</b> {{ (this.fila.LOCALIDAD === null || this.fila.LOCALIDAD === '' || this.fila.LOCALIDAD === '0') ? 'N/D': this.fila.LOCALIDAD }}
              </div>
              <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:0.9rem; font-weight: normal !important;">
              <b>Código Postal:</b> {{ (this.fila.COD_POS === null || this.fila.COD_POS === '' || this.fila.COD_POS === '0') ? 'N/D': this.fila.COD_POS}}
              </div>
          </div>
        </div>
      </q-card>
    </div>
  </div>
    </q-card-section>
  </q-card>
    </div>
    <!--Botones-->
<div class="col-lg-5 col-md-5 col-xs-12 col-sm-12">
      <q-card class="no-shadow background-card-1" style="height: 100%; background-color: transparent; border-radius: 0 0 10px 10px;">
    <q-card-section>
            <!--MENU DONDE ESTAN LOS BOTONES-->
            <div class="row bg-white border-panel bg-grey-3 my-card" style="border-radius: 10px;">
        <div class="col q-pa-md" v-show ="this.MenuPrincipalBotones">
          <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important; border-radius: 10px;" label="Consulta de Información"
              >
          <q-card style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;" class="background-card-1">
          <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn :disable="buttonStatesDisable.MPImss" :color="buttonStates.MPImss === false ? 'primary' : 'info'" class="full-width responsive-btn " icon="apartment" label="IMSS" @click="MostrarMenusSecundarios(1)">
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                  Instituto Mexicano del Seguro Social
              </q-tooltip>
            <q-menu anchor="bottom middle" self="top left" transition-show="flip-right" transition-hide="flip-left">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="selectOption(3,'MPImss')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(3, 'MPImss')" :class="[{ 'bg-grey-6': selectedOption === 3 }, selectedOption === 3 ? 'text-white' : 'text-black']" class="button-padding">
                Inf. Centro
              </q-item-section>
              <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Información del Centro registrado en el IMSS
              </q-tooltip>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(4, 'MPImss')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(4, 'MPImss')" :class="[{ 'bg-grey-6': selectedOption === 4 }, selectedOption === 4 ? 'text-white' : 'text-black']" class="button-padding">
                Trabajadores
              </q-item-section>
              <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Trabajadores registrados en el IMSS
              </q-tooltip>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(0,'MPImss')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(0, 'MPImss')" :class="[{ 'bg-grey-6': selectedOption === 0 }, selectedOption === 0 ? 'text-white' : 'text-black']" class="button-padding">
                Inf. Empresa
              </q-item-section>
              <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Información de la Empresa registrada en el IMSS
              </q-tooltip>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(7,'MPImss')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(7,'MPImss')" :class="[{ 'bg-grey-6': selectedOption === 7 }, selectedOption === 7 ? 'text-white' : 'text-black']" class="button-padding">
                Riesgos
              </q-item-section>
              <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Información de Riesgos registrados en el IMSS
              </q-tooltip>
            </q-item>
          </q-list>
        </q-menu>
        <q-icon
    name="info"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="mostrarMensajeInfo('En este apartado encontrará información del IMSS, tanto de la Empresa, del Registro patronal o Centro de Trabajo, de sus trabajadores y de los Riegos de trabajo. ')"
  >
  </q-icon>
  <!--<q-icon
    name="insights"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="MostrarGrafica(1)"
  >
  </q-icon>-->
                </q-btn>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn :disable="buttonStatesDisable.MPSat" :color="buttonStates.MPSat === false ? 'primary' : 'info'" class="full-width responsive-btn " icon="domain" label="SAT" @click="MostrarMenusSecundarios(0)">
                  <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                    Servicio de Administración Tributaria
                  </q-tooltip>
                  <q-menu anchor="bottom middle" self="top left" transition-show="flip-right" transition-hide="flip-left">
                    <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="selectOption(1,'MPSat')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(1,'MPImss')" :class="[{ 'bg-grey-6': selectedOption === 1 }, selectedOption === 1 ? 'text-white' : 'text-black']" class="button-padding">
                PTU
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Información de la Participación de los Trabajadores en las Utilidades o PTU a nivel Nacional
              </q-tooltip>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        <q-icon
    name="info"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="mostrarMensajeInfo('En este encontrará Información de la Participación de los Trabajadores en las Utilidades o PTU a nivel Nacional')"
  >
  </q-icon>
        </q-btn>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn :disable="buttonStatesDisable.MPUtd" :color="buttonStates.MPUtd === false ? 'primary' : 'info'" class="full-width responsive-btn " icon="engineering" label="UTD" @click="MostrarMenusSecundarios(2)">
                  <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                    Unidad de Trabajo Digno
                  </q-tooltip>
                                    <q-menu anchor="bottom middle" self="top left" transition-show="flip-right" transition-hide="flip-left">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="selectOption(2,'MPUtd')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(2)" :class="[{ 'bg-grey-6': selectedOption === 2 }, selectedOption === 2 ? 'text-white' : 'text-black']" class="button-padding">
                REPSE
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Registro de Prestadoras de Servicios Especializados u Obras Especializadas
              </q-tooltip>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(5,'MPUtd')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(5,'MPUtd')" :class="[{ 'bg-grey-6': selectedOption === 5 }, selectedOption === 5 ? 'text-white' : 'text-black']" class="button-padding">
                ICSOE
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Informativa de Contratos de Servicios u Obras Especializados
              </q-tooltip>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(6,'MPUtd')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(6,'MPUtd')" :class="[{ 'bg-grey-6': selectedOption === 6 }, selectedOption === 6 ? 'text-white' : 'text-black']" class="button-padding">
                SISUB
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Sistema de Información de Subcontratación
              </q-tooltip>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(10,'MPUtd')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(10,'MPUtd')" :class="[{ 'bg-grey-6': selectedOption === 10 }, selectedOption === 10 ? 'text-white' : 'text-black']" class="button-padding">
                VELAVO
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Programa de Verificación Voluntaria
              </q-tooltip>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(21, 'MPUtd')">
              <q-item-section @click="MostrarMenus(21, 'MPUtd')" :class="[{ 'bg-grey-6': selectedOption === 21 }, selectedOption === 21 ? 'text-white' : 'text-black']" class="button-padding">
                Inspecciones
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        <q-icon
    name="info"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="mostrarMensajeInfo('En este apartado encontrará información de la Unidad de Trabajo Digno (REPSE, ICSOE, SISUB, VELAVO, e Inspecciones)')"
  >
  </q-icon>
        </q-btn>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn :disable="buttonStatesDisable.MenuSiaat" :color="buttonStates.MenuSiaat === false ? 'primary' : 'info'" class="full-width responsive-btn " icon="healing" label="SIAAT" @click="MostrarMenus(8,'MenuSiaat')">
                  <q-icon
    name="info"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="mostrarMensajeInfo('En este apartado encontrará información de los Avisos de Accidentes de Trabajo  reportados a la STPS ')"
  >
  </q-icon>
  <!--<q-icon
    name="insights"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="MostrarGrafica(2)"
  >
  </q-icon>-->
                </q-btn>
              <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                    Sistema de Avisos de Accidentes de Trabajo
                  </q-tooltip>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn :disable="buttonStatesDisable.Menuccfcrl" :color="buttonStates.Menuccfcrl === false ? 'primary' : 'info'" class="full-width responsive-btn " icon="business_center" label="CFCRL" @click="MostrarMenus(9,'Menuccfcrl')">
                  <q-icon
    name="info"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="mostrarMensajeInfo('En este módulo encontrará información del Centro Federal de Conciliación y Registro Laboral (CFCRL)')"
  >
  </q-icon>

                </q-btn>
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                    Centro Federal de Conciliación y Registro Laboral
                  </q-tooltip>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn :disable="buttonStatesDisable.MenuSIDIL" :color="buttonStates.MenuSIDIL === false ? 'primary' : 'info'" class="full-width responsive-btn " icon="dialpad" label="SIDIL" @click="MostrarMenus(22,'MenuSIDIL')">
                  <q-icon
    name="info"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="mostrarMensajeInfo('En este módulo encontrará información del Sistema de Inteligencia de Datos para la Inspección Laboral')"
  >
  </q-icon>
                </q-btn>
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                  Sistema de Inteligencia de Datos para la Inspección Laboral
                  </q-tooltip>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn :disable="buttonStatesDisable.MenuINM" :color="buttonStates.MenuINM === false ? 'primary' : 'info'" class="full-width responsive-btn " icon="person_search" label="INM" @click="MostrarMenus(23,'MenuINM')">
                  <q-icon
    name="info"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="mostrarMensajeInfo('En este apartado encontrará información del Instituto Nacional de Migración (Empresas con perimiso para contratar extranjeros)')"
  >
  </q-icon>
                </q-btn>
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                  Instituto Nacional de Migración
                  </q-tooltip>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn :disable="buttonStatesDisable.MenuSne" :color="buttonStates.MenuSne === false ? 'primary' : 'info'" class="full-width responsive-btn " icon="person_search" label="SNE" @click="MostrarMenus(12,'MenuSne')">
                  <q-icon
    name="info"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="mostrarMensajeInfo('En este módulo encontrará información del Servicio Nacional de Empleo (Bolsa, Ferias y Portal del Empleo)')"
  >
  </q-icon>
                </q-btn>
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                  Servicio Nacional de Empleo
                  </q-tooltip>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn :disable="buttonStatesDisable.MenuInfonacot" :color="buttonStates.MenuInfonacot === false ? 'primary' : 'info'" class="full-width responsive-btn " icon="paid" label="INFONACOT" @click="MostrarMenus(13, 'MenuInfonacot')" >
                  <q-icon
    name="info"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="mostrarMensajeInfo('En este módulo encontrará información de los créditos y saldos en el Instituto del Fondo Nacional para el Consumo de los Trabajadores')"
  >
  </q-icon>
                </q-btn>
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                  El Instituto de Seguridad y Servicios Sociales de los Trabajadores del Estado (ISSSTE)
                  </q-tooltip>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn :disable="buttonStatesDisable.MPIssste" :color="buttonStates.MPIssste === false ? 'primary' : 'info'" class="full-width responsive-btn " icon="apartment" label="ISSSTE" @click="MostrarMenusSecundarios(5)">
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                  El Instituto de Seguridad y Servicios Sociales de los Trabajadores del Estado (ISSSTE)
              </q-tooltip>
            <q-menu anchor="bottom middle" self="top left" transition-show="flip-right" transition-hide="flip-left">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="selectOption(14,'MPIssste')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(14, 'MPIssste')" :class="[{ 'bg-grey-6': selectedOption === 14 }, selectedOption === 14 ? 'text-white' : 'text-black']" class="button-padding">
                Derechohabientes
              </q-item-section>
              <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Información del Centro registrado en el ISSSTE
              </q-tooltip>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(17, 'MPIssste')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(17, 'MPIssste')" :class="[{ 'bg-grey-6': selectedOption === 17 }, selectedOption === 17 ? 'text-white' : 'text-black']" class="button-padding">
                Décimo Transitorio
              </q-item-section>
              <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Trabajadores registrados en el ISSSTE (Décimo Transitorio)
              </q-tooltip>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(15, 'MPIssste')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(15, 'MPIssste')" :class="[{ 'bg-grey-6': selectedOption === 15 }, selectedOption === 15 ? 'text-white' : 'text-black']" class="button-padding">
                Cuentas Individuales
              </q-item-section>
              <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Trabajadores registrados en el ISSSTE
              </q-tooltip>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(16, 'MPIssste')" class="submenu-hover">
              <q-item-section @click="MostrarMenus(16, 'MPIssste')" :class="[{ 'bg-grey-6': selectedOption === 16 }, selectedOption === 16 ? 'text-white' : 'text-black']" class="button-padding">
                Pensionados
              </q-item-section>
              <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                Trabajadores pensionados en el ISSSTE
              </q-tooltip>
            </q-item>
          </q-list>
        </q-menu>
        <q-icon
    name="info"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="mostrarMensajeInfo('ISSSTE')"
  >
  </q-icon>
  <!--<q-icon
    name="insights"
    size="20px"
    class="q-ml-sm clickable"
    @click.stop="MostrarGrafica(1)"
  >
  </q-icon>-->
                </q-btn>
                <q-tooltip anchor="bottom middle" self="top middle" class="custom-tooltip">
                El Instituto de Seguridad y Servicios Sociales de los Trabajadores del Estado (ISSSTE)
                  </q-tooltip>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn disable  :text-color="this.MenuInfonavit === false ? 'white' : 'black'" :color="this.MenuInfonavit === false ? 'primary' : 'secondary'" class="full-width responsive-btn " icon="supervised_user_circle" label="JCF" @click="MostrarMenus(14)" />
              </div>
              <!--<div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn disable :color="this.MenuSep === false ? 'primary' : 'secondary'" class="full-width responsive-btn " icon="badge" label="SEP" @click="MostrarMenus(15)" />
              </div>-->
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn disable  :text-color="this.MenuConsar === false ? 'white' : 'black'" :color="this.MenuConsar === false ? 'primary' : 'secondary'" class="full-width responsive-btn " icon="local_atm" label="CONSAR" @click="MostrarMenus(16)" />
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn disable  :text-color="this.MenuInfonavit === false ? 'white' : 'black'" :color="this.MenuInfonavit === false ? 'primary' : 'secondary'" class="full-width responsive-btn " icon="add_card" label="INFONAVIT" @click="MostrarMenus(17)" />
              </div>
              <!--<div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn disable  :color="this.MenuInfonavit === false ? 'primary' : 'secondary'" class="full-width responsive-btn " icon="badge" label="SENER" @click="MostrarMenus(18)" />
              </div>-->
              <!--<div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn disable  :color="this.MenuInfonavit === false ? 'primary' : 'secondary'" class="full-width responsive-btn " icon="badge" label="SE" @click="MostrarMenus(19)" />
              </div>-->
              <div class="col-xs-12 col-md-4 col-sm-4">
                <q-btn disable :text-color="this.MenuInfonavit === false ? 'white' : 'black'"  :color="this.MenuInfonavit === false ? 'primary' : 'secondary'" class="full-width responsive-btn " icon="badge" label="PROFEDET" @click="MostrarMenus(20)" />
              </div>
              <div  v-if="isInfoVisible" class="col-xs-12 col-md-12 col-sm-12" style="color: black;">
                {{ this.infoMensahe }}
              </div>
              <!--<div class="col-xs-12 col-md-3 col-sm-3">
                <q-btn :color="this.MPOtros === false ? 'primary' : 'info'" class="full-width responsive-btn " icon="apartment" label="OTROS" @click="MostrarMenusSecundarios(4)">
                                    <q-menu anchor="bottom middle" self="top left" transition-show="flip-right" transition-hide="flip-left">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="selectOption(12)">
              <q-item-section  :class="{ 'bg-grey-4': selectedOption === 12 }">
                SNE
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(13)">
              <q-item-section  :class="{ 'bg-grey-4': selectedOption === 13 }">
                INFONACOT
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(14)">
              <q-item-section :class="{ 'bg-grey-4': selectedOption === 14}">
                JCF
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(16)">
              <q-item-section :class="{ 'bg-grey-4': selectedOption === 16}">
                CONSAR
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(17)">
              <q-item-section :class="{ 'bg-grey-4': selectedOption === 17}">
                INFONAVIT
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="selectOption(20)">
              <q-item-section :class="{ 'bg-grey-4': selectedOption === 20}">
                PROFEDET
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        </q-btn>
              </div>-->
            </div>
            </div>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </q-card-section>
    <!--aqui iba las notas-->
    <!--fin de aqui iba las notas-->
  </q-card>
</div>
<div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
  <q-card class="no-shadow background-card-1" style="margin-top: 10px; background-color: transparent; border-radius: 0 0 10px 10px;">
    <q-card-section>
      <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md q-mt-md" v-show ="this.mostrarMenuPrincipal">
          <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important; border-radius: 10px" :label="msgNacional"
              >
          <q-card style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px" class="background-card-1">
          <div class="col q-pa-md">
          <div class="row q-col-gutter-xs">
            <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  :bg-color="(EANacional.Num_Centros_SAT < EANacional.Num_Centros_IMSS) ? 'red-12' : 'secondary'"
                  filled
                  v-model="EANacional.Num_Centros_SAT"
                  label="Número de Centros de trabajo en el SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="domain_add" />
                  </template>
                </q-input>
              </div>
            <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  :bg-color="(EANacional.TA_SAT < EANacional.TA_IMSS) ? 'orange-12' : 'secondary'"
                  filled
                  v-model="EANacional.TA_SAT"
                  label="Número de trabajadores en el SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="groups" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  :bg-color="(EANacional.Num_Centros_IMSS < EANacional.Num_Centros_SAT) ? 'red-12' : 'secondary'"
                  filled
                  v-model="EANacional.Num_Centros_IMSS"
                  label="Número de Centros de trabajo en IMSS"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  :bg-color="(EANacional.TA_IMSS < EANacional.TA_SAT) ? 'orange-12' : 'secondary'"
                  filled
                  v-model="EANacional.TA_IMSS"
                  label="Número de trabajadores en IMSS"
                >
                  <template v-slot:prepend>
                    <q-icon name="supervisor_account" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EANacional.TA_Hombres_SAT"
                  label="Número de trabajadores hombres en SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EANacional.TA_Mujeres_SAT"
                  label="Número de trabajadores mujeres en SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EANacional.TA_Hombres_IMSS"
                  label="Número de trabajadores hombres en IMSS"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EANacional.TA_Mujeres_IMSS"
                  label="Número de trabajadores Mujeres en IMSS"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EANacional.total"
                  label="Total Nomina Pagado"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EANacional.descuento"
                  label="Total de Descuento"
                >
                  <template v-slot:prepend>
                    <q-icon name="sell" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EANacional.organismo"
                  label="Organismo"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_balance" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EANacional.institucion"
                  label="Institución de seguridad pública"
                >
                  <template v-slot:prepend>
                    <q-icon name="domain" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;">
                <q-icon name="square" color="red-12" size="1rem"></q-icon>
                Diferencia entre Número de centros SAT - IMSS
              </div>
              <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:0.8rem; font-weight: normal  !important;">
                <q-icon name="square" color="orange-12" size="1rem"></q-icon>
                Diferencia entre Número de trabajadores SAT - IMSS
              </div>
              <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:0.8rem; font-weight: normal  !important;">
                <q-icon name="square" color="dark" size="1rem"></q-icon>
                Cifras similares (centros, trabajadores) SAT - IMSS
              </div>
              </div>
            </div>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
      <div class="row bg-white border-panel bg-grey-3" style="border-radius: 10px; ">
          <div class="col q-pa-md q-mt-md" v-show ="this.mostrarMenuPtu">
            <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;" v-show ="this.mostrar === true">
              <q-expansion-item dark default-opened class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important; border-radius: 10px;" :label="nodataPTU"
              >
            </q-expansion-item>
            </q-card>
            <div class="row bg-grey-3 border-panel" v-show ="this.mostrarTrabajadores === true" >
              <q-expansion-item  expand-icon-class="text-white" dark default-opened class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; border-radius: 10px; text-align: center !important;" label="Información de la Participación de los Trabajadores en las Utilidades o PTU a nivel Nacional"
              >
              <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
                <q-card-section>
                  <div class="row q-col-gutter-xs">
                    <div class="col-xs-12 col-sm-1">
              <q-select
              class="uppcase"
              filled
              borderless
              v-model="year"
              label="Año del PTU"
              input-debounce="0"
              :options="anioOptions"
              emit-value
              map-options
              @update:model-value="getPtu(this.rfcptu, this.year)">
                <template v-slot:prepend>
                  <q-icon name="apartment" />
                </template>
              </q-select>
            </div>
           <div class="col-xs-12 col-sm-2">
              <q-select
              class="uppcase"
              filled
              borderless
              v-model="factptu.Jurisdicción"
              label="Jurisdicción"
              input-debounce="0"
              :options="jurisdiccionOption"
              emit-value
              map-options
              @update:model-value="getPtuJurisdiccion(this.rfcptu, this.year, factptu.Jurisdicción)">
                <template v-slot:prepend>
                  <q-icon name="apartment" />
                </template>
              </q-select>
            </div>
                 <!--    <div class="col-xs-12 col-sm-4">
                      <q-input
                        readonly
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
                      readonly
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
                      readonly
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
                    <div class="col-xs-12 col-sm-4">
                      <q-input
                      readonly
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
                      readonly
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
                      readonly
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
                      readonly
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
                      readonly
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
                      readonly
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
                      readonly
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
                      readonly
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
                    </div>-->
                    <div class="col-xs-12 col-sm-3">
                      <q-input
                      readonly
                        dark
                        color="dark"
                        bg-color="accent"
                        filled
                        v-model="factptu.UtilidadFiscal"
                        label="Utilidad Fiscal"
                      >
                        <template v-slot:prepend>
                          <q-icon name="attach_money" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-3">
                      <q-input
                        readonly
                        dark
                        color="dark"
                        bg-color="accent"
                        filled
                        v-model="factptu.PTUGeneradaenelEjercicio"
                        label="PTU Generada en el Ejercicio"
                      >
                        <template v-slot:prepend>
                          <q-icon name="attach_money" />
                        </template>
                      </q-input>
                    </div>
                  <div class="col-xs-12 col-sm-3">
                    <q-input
                      readonly
                        dark
                        color="dark"
                        bg-color="accent"
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
              </q-card-section>
            </q-card>
          </q-expansion-item>
                </div>
                </div>
      </div>
      <!--MENU INFORMACION ESTATAL-->
      <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md" v-show ="this.MenuEstatal">
          <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important; border-radius: 10px" :label="msgEstatal"
              >
          <q-card style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px" class="background-card-1">
          <div class="col q-pa-md" >
          <div class="row q-col-gutter-xs">
            <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  :bg-color="(EA.Num_Centros_SAT < EA.Num_Centros_IMSS) ? 'red-12' : (EA.Num_Centros_SAT === EA.Num_Centros_IMSS) ? 'dark' : 'red-12'"
                  filled
                  v-model="EA.Num_Centros_SAT"
                  label="Número de Centros de trabajo en el SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="domain_add" />
                  </template>
                </q-input>
              </div>
            <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 1, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  :bg-color="(EA.TA_SAT < EA.TA_IMSS) ? 'orange-12' : (EA.TA_SAT === EA.TA_IMSS) ? 'dark' : 'orange-12'"
                  filled
                  v-model="EA.TA_SAT"
                  label="Número de trabajadores en el SAT"
                >
                <q-tooltip :delay="500" transition-hide="fade" class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="groups" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  :bg-color="(EA.Num_Centros_IMSS < EA.Num_Centros_SAT) ? 'red-12' : (EA.Num_Centros_IMSS === EA.Num_Centros_SAT) ? 'dark' : 'red-12'"
                  filled
                  v-model="EA.Num_Centros_IMSS"
                  label="Número de Centros de trabajo en IMSS"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 2, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  :bg-color="(EA.TA_IMSS < EA.TA_SAT) ? 'orange-12' : (EA.TA_IMSS === EA.TA_SAT) ? 'dark' : 'orange-12'"
                  filled
                  v-model="EA.TA_IMSS"
                  label="Número de trabajadores en el IMSS"
                >
                <q-tooltip :delay="500" transition-hide="fade" class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="supervisor_account" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.TA_Hombres_SAT"
                  label="Número de trabajadores hombres en SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.TA_Mujeres_SAT"
                  label="Número de trabajadores mujeres en SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.TA_Hombres_IMSS"
                  label="Número de trabajadores hombres en IMSS"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.TA_Mujeres_IMSS"
                  label="Número de trabajadores mujeres en IMSS"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 7, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="(this.fila.num_extranjeros_empresa)"
                  label="Trabajadores Extranjeros de la Empresa"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 8, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="(this.fila.num_extranjeros_empresa_centro)"
                  label="Trabajadores Extranjeros del Centro"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 9, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.sin_curp_sat"
                  label="Sin CURP SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 10, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.sin_curp_imss"
                  label="Sin CURP IMSS"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 3, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  filled
                  v-model="EA.TA_SOLO_SAT"
                  label="Número de trabajadores solo SAT"
                >
                <q-tooltip :delay="500" transition-hide="fade" class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="group" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 4, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  filled
                  v-model="EA.TA_SOLO_IMSS"
                  label="Número de trabajadores solo IMSS"
                >
                <q-tooltip :delay="500" transition-hide="fade" class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="people_alt" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 6, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  filled
                  v-model="EA.TA_SOLO_SAT_MENOR"
                  label="Solo SAT menor 6 meses"
                >
                <q-tooltip :delay="500" transition-hide="fade" class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="person_remove" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 5, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  filled
                  v-model="EA.TA_SOLO_SAT_MAYOR"
                  label="Solo SAT mayor 6 meses"
                >
                <q-tooltip :delay="500" transition-hide="fade" class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="person_add" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.total"
                  label="Total Nomina Pagado"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.descuento"
                  label="Total de Descuento"
                >
                  <template v-slot:prepend>
                    <q-icon name="sell" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.organismo"
                  label="Organismo"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_balance" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.institucion"
                  label="Institución de seguridad pública"
                >
                  <template v-slot:prepend>
                    <q-icon name="domain" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3" style="color: black; text-align: left;font-size:0.8rem; font-weight: normal !important;">
                <q-icon name="square" color="red-12" size="1rem"></q-icon>
                Diferencia entre Número de centros SAT - IMSS
              </div>
              <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;">
                <q-icon name="square" color="orange-12" size="1rem"></q-icon>
                Diferencia entre Número de trabajadores SAT - IMSS
              </div>
              <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;">
                <q-icon name="square" color="dark" size="1rem"></q-icon>
                Cifras similares (centros, trabajadores) SAT - IMSS
              </div>
              </div>
            </div>
          <q-card-section>
            </q-card-section>
            </q-card>
          </q-expansion-item>
          </div>
      </div>
    <!--SECCION DE LOS CENTRO-->
        <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
        <!--<div class="col q-pa-md" v-show ="this.MenuCentros">-->
          <div class="col q-pa-md" v-show =false>
          <q-expansion-item dark default-opened class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center;" :label="msgCTI"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
          <!--<q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">{{ msgCTI }}</div>
                </div>
          </q-card-section>-->
          <q-card-section>
            <q-table
              style="font-size:0.8rem !important; font-weight: normal !important;"
              flat
              bordered
              :rows="data"
              :columns="columns"
              v-model:pagination="pagination"
              :filter="filter"
              @request="qTableRequest"
              row-key="folio"
              v-model:selected="selected2"
            >
            <!--<template v-slot:top>
                <div style="width: 100%;">
                  <q-input dense debounce="300" v-model="filter" placeholder="Buscar por RFC PTU" @input="v => { filter = v.toUpperCase() }">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </template>-->
              <template v-slot:top>
              <div style="width: 85%;"></div>
              <div style="width: 15%;">
                <q-btn class="full-width responsive-btn" v-if="hasRole(['DESCARGA'])"
          color="primary"
          icon-right="archive"
          label="Descarga"
          no-caps
          @click="exportTableBusqueda()"></q-btn>
              </div>
            </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="actions" :props="props">
                      <q-btn  color="blue" icon="search" flat @click="getData,(props.row.RFC, props.row.CVE_PATRON, props.row)">
                        <q-tooltip class="bg-blue">Ver</q-tooltip>
                      </q-btn>
                    </q-td>
                    <q-td  v-if="props.row.RFC != ''" key="RFC" style="text-align: center; cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="getData(props.row.RFC, props.row.CVE_PATRON, props.row)">
                      {{ props.row.RFC }}
                    </q-td>
                    <q-td  v-else style="text-align: center; cursor: pointer; text-decoration: underline;">
                    </q-td>
                    <q-td key="CVE_PATRON" style="text-align: center;" :props="props">{{ props.row.CVE_PATRON }}</q-td>
                    <q-td key="NOMBRE" style="text-align: center;" :props="props">{{ props.row.NOMBRE }}</q-td>
                    <q-td key="CVE_ENT_FEDERATIVA" style="text-align: center;" :props="props">{{ props.row.DESC_ENTIDAD }}</q-td>
                    <q-td key="CVE_MUNICIPIO" style="text-align: center;" :props="props">{{ props.row.Desc_Municipio }}</q-td>
                    <q-td key="GIRO" style="text-align: center;" :props="props">{{ props.row.GIRO }}</q-td>
                    <q-td key="CVE_MOD_N" style="text-align: center;" :props="props">{{ props.row.CVE_MOD_N }}</q-td>
                    <q-td key="DOMICILIO" style="text-align: center;" :props="props">{{ props.row.DOMICILIO }}</q-td>
                    <q-td key="LOCALIDAD" style="text-align: center;" :props="props">{{ props.row.LOCALIDAD }}</q-td>
                    <q-td key="DESC_DIVISION" style="text-align: center;" :props="props">{{ props.row.DESC_DIVISION }}</q-td>
                    <q-td key="DESC_GPO_ACT" style="text-align: center;" :props="props">{{ props.row.DESC_GPO_ACT }}</q-td>
                    <q-td key="DESC_FRACION" style="text-align: center;" :props="props">{{ props.row.DESC_FRACION }}</q-td>
                </q-tr>
              </template>
            </q-table>
            </q-card-section>
            </q-card>
          </q-expansion-item>
          </div>
      </div>
<!--DETALLES DE LOS CENTROS-->
      <div class="row bg-white border-panel bg-grey-3" v-show ="this.mostrarNominal && this.MenuCentros"  style="border-radius: 10px; ">
        <div class="col q-pa-md">
          <q-expansion-item dark default-opened class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center;" label="Detalles del Centro de Trabajo"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
          <q-card-section>
      <q-table style="font-size:0.8rem !important; font-weight: normal !important;"
        flat
        bordered
        :rows="dataPatronal"
        :columns="columnsPatronal"
        row-key="RFC"
        v-model:pagination="paginationPatronal"
        :filter="filterPatronal"
        @request="qTableRequestPatronal">
      <!--<template v-slot:top>
          <div style="width: 100%;">
            <q-input dense debounce="300" v-model="filterPatronal" placeholder="Buscar por Clave Patronal" @update:model-value="v => { filterPatronal = v.toUpperCase() }">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>-->
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.8rem !important; font-weight: normal !important;">
            <q-td key="actions" :props="props">
              <q-btn color="blue" icon="search" flat @click="buscarDatos(props.row.CVE_PATRON)">
                <q-tooltip class="bg-blue">Ver</q-tooltip>
              </q-btn>
            </q-td>
            <q-td key="CVE_PATRON" style="text-align: center; cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color"  :props="props" @click="buscarDatos(props.row.CVE_PATRON)">{{ props.row.CVE_PATRON }}</q-td>
            <q-td key="NOMBRE" style="text-align: center" :props="props">{{ props.row.NOMBRE }}</q-td>
            <q-td key="RFC" style="text-align: center" :props="props">{{ props.row.RFC }}</q-td>
            <q-td key="CVE_MOD_N" style="text-align: center" :props="props">{{ props.row.CVE_MOD_N }}</q-td>
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
            <q-td key="DOMICILIO" style="text-align: center" :props="props">{{ props.row.DOMICILIO }}</q-td>
            <q-td key="LOCALIDAD" style="text-align: center" :props="props">{{ props.row.LOCALIDAD }}</q-td>
            <q-td key="RL_NOMBRE" style="text-align: center" :props="props">{{ props.row.RL_NOMBRE }}</q-td>
            <q-td key="COD_POS" style="text-align: center;" :props="props">{{ props.row.COD_POS }}</q-td>
            <q-td key="EMAIL_RL" style="text-align: center" :props="props">{{ props.row.EMAIL_RL }}</q-td>
            <q-td key="TELEFONO" style="text-align: center;" :props="props">{{ props.row.TELEFONO }}</q-td>
            <q-td key="GIRO" style="text-align: center" :props="props">{{ props.row.GIRO }}</q-td>
            <q-td key="num_empresas" style="text-align: center;" :props="props">{{ formatNumberPriceZero(props.row.num_empresas) }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
    </q-card>
    </q-expansion-item>
      </div>
      </div>
      <!--SECCION RIESGOS-->
      <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.MenuRiesgos">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; border-radius: 10px; min-height: 100%; color: white; text-align: center !important;" label="Información de Riesgos"
              >
          <q-card class="background-card-1" style="font-size:0.8rem !important; font-weight: normal !important; border-radius: 0 0 10px 10px;">
          <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5">
              </div>
            <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantRiesgos"
                  label="Total de Riesgos"
                  style="text-align: center !important; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="healing" />
                  </template>
                </q-input>
              </div>
              </div>
              <q-table
        flat
        bordered
        :rows="dataRiesgosbyCvePatron"
        :columns="columnsRiesgosbyCvePatron"
        row-key="name"
        v-model:pagination="paginationRiesgosbyCvePatron"
        :filter="filterRiesgosbyCvePatron"
        @request="qTableRequestRiesgosbyCvePatron"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.8rem !important; font-weight: normal !important;">
            <q-td key="NSS" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="buscarDatosRiesgos(str10(props.row.NSS),this.cvepatronAux,props.row.curp)">{{ (props.row.NSS) }}</q-td>
            <q-td key="curp" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="consultarCurp(props.row.curp)">{{ (props.row.curp) }}</q-td>
            <q-td key="id_year_memoria" style="text-align: left;" :props="props">{{ formatNumberZero(props.row.id_year_memoria) }}</q-td>
            <q-td key="fecha_accidente" style="text-align: left;" :props="props">{{ formatNumberZero(props.row.fecha_accidente) }}</q-td>
            <q-td key="fecha_alta" style="text-align: left;" :props="props">{{ formatNumberZero(props.row.fecha_alta) }}</q-td>
            <q-td key="Id_tipo_riesgo" style="text-align: left;" :props="props">{{ props.row.desc_tiporiesgo }}</q-td>
            <q-td key="id_riesgo_fisico" style="text-align: left;" :props="props">{{ props.row.desc_riesgo_fisico  }}</q-td>
            <q-td key="id_fraccion" style="text-align: center;" :props="props">{{ props.row.desc_fraccion }}</q-td>
            <q-td key="id_sexo" style="text-align: left;" :props="props">{{ props.row.sexo }}</q-td>
            <q-td key="id_ocupacion_SINCO" style="text-align: left;" :props="props">{{ props.row.desc_ocupacion_SINCO }}</q-td>
            <q-td key="id_consecuencia" style="text-align: left;" :props="props">{{ props.row.desc_consecuencia }}</q-td>
            <q-td key="id_acto_inseguro" style="text-align: left;" :props="props">{{ props.row.desc_acto_inseguro  }}</q-td>
            <q-td key="id_dias_incapacidad" style="text-align: left;" :props="props">{{ props.row.desc_dias_incapacidad }}</q-td>
            <q-td key="id_entidad" style="text-align: left;" :props="props">{{ props.row.desc_entidad }}</q-td>
            <q-td key="id_causa_externa" style="text-align: left;" :props="props">{{ props.row.desc_causa_externa }}</q-td>
            <q-td key="id_natlesion" style="text-align: left;" :props="props">{{ props.row.desc_natlesion }}</q-td>
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--SECCION SIAAT-->
    <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.MenuSiaat">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="Información de Sistema de Avisos de Accidentes de Trabajo (SIAAT)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5"></div>
            <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                label-width="12"
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantSiaat"
                  label="Total de Avisos"
                  style="text-align: left; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="taxi_alert" />
                  </template>
                </q-input>
              </div>
              </div>
              <q-table style="font-size:0.8rem !important; font-weight: normal !important;"
        flat
        bordered
        :rows="dataSiaatbyCvePatron"
        :columns="columnsSiaatbyCvePatron2"
        row-key="name"
        v-model:pagination="paginationSiaatbyCvePatron"
        :filter="filterSiaatbyCvePatron"
        @request="qTableRequestSiaatbyCvePatron"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <q-td key="nss" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="buscarDatosRiesgos(str10(props.row.nss),props.row.Registro,props.row.Curp)">{{ props.row.nss }}</q-td>
            <q-td key="Curp" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="consultarCurp(props.row.Curp)">{{ (props.row.Curp) }}</q-td>
            <q-td key="Rfc" style="text-align: center;" :props="props">{{ (props.row.Rfc) }}</q-td>
            <q-td key="Nombres" style="text-align: center;" :props="props">{{ (props.row.Nombres) }}</q-td>
            <q-td key="Apellidos" style="text-align: center;" :props="props">{{ props.row.Apellidos }}</q-td>
            <q-td key="Edad" style="text-align: center;" :props="props">{{ props.row.Edad }}</q-td>
            <q-td key="FechaOcurrencia" style="text-align: center;" :props="props">{{ props.row.FechaOcurrencia }}</q-td>
            <q-td key="Registro" style="text-align: center;" :props="props">{{ props.row.Registro }}</q-td>
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--SECCION CFCRL-->
    <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.Menuccfcrl">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="Información de Centro Federal de Conciliación y Registro Laboral (CFCRL)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
            <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantCfcrl"
                  label="Total de Trabajadores"
                  style="text-align: center; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="engineering" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantsindicalizado"
                  label="Sindicalizados"
                  style="text-align: center; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="engineering" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantcontratocolectivo"
                  label="Contratos Colectivos"
                  style="text-align: center; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="engineering" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantconciliado"
                  label="Conciliados"
                  style="text-align: center; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="engineering" />
                  </template>
                </q-input>
              </div>
              </div>
              <q-table style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;"
        flat
        bordered
        :rows="dataCfcrlbyCvePatron"
        :columns="columnsCfcrlbyCvePatron"
        row-key="name"
        v-model:pagination="paginationCfcrlbyCvePatron"
        :filter="filterCfcrlbyCvePatron"
        @request="qTableRequestCfcrlbyCvePatron"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <q-td key="curp" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="consultarCurp(props.row.curp)">{{ props.row.curp }}</q-td>
            <q-td key="nss" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="buscarDatosRiesgos(str10(props.row.nss),props.row.registro,props.row.curp)">{{ props.row.nss }}</q-td>
            <q-td key="mod" style="text-align: center;" :props="props">{{ props.row.mod }}</q-td>
            <q-td key="sindicalizado" style="text-align: center;" :props="props">{{ props.row.sindicalizado >= 1 ? 'SI': 'NO' }}</q-td>
            <q-td key="contrato_colectivo" style="text-align: center;" :props="props">{{ props.row.contrato_colectivo >= 1 ? 'SI': 'NO' }}</q-td>
            <q-td key="conciliado" style="text-align: center;" :props="props">{{ props.row.conciliado >= 1 ? 'SI': 'NO' }}</q-td>
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--SECCION REPSE-->
      <div class="row bg-white border-panel bg-grey-3" v>
          <div class="col q-pa-md"  v-show ="this.mostrarMenuREPSE === true">
            <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;" v-show ="this.mostrarREPSE === false">
              <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; border-radius: 10px; min-height: 100%; color: white; text-align: center !important;" label="No hay Información Disponible del Registro de Prestadoras de Servicios Especializados u Obras Especializadas(REPSE)"
              >
            </q-expansion-item>
            </q-card>
          <div class="row bg-grey-3 border-panel" v-show ="this.mostrarREPSE === true">
            <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; border-radius: 10px; min-height: 100%; color: white; text-align: center !important;" label="Registro de Prestadoras de Servicios Especializados u Obras Especializadas (REPSE)"
              >
            <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
          <q-card-section>
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.RFC"
                  label="RFC"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Razon_social"
                  label="Razón Social"
                >
                  <template v-slot:prepend>
                    <q-icon name="business" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Estado"
                  label="Estado"
                >
                  <template v-slot:prepend>
                    <q-icon name="place" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Municipio"
                  label="Municipio"
                >
                  <template v-slot:prepend>
                    <q-icon name="location_pin" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Zona"
                  label="Zona"
                >
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Representante"
                  label="Representante"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Tipo_de_emision"
                  label="Tipo de Emisión"
                >
                  <template v-slot:prepend>
                    <q-icon name="article" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Categoria_REPSE"
                  label="Categoría REPSE"
                >
                  <template v-slot:prepend>
                    <q-icon name="category" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Sector"
                  label="Sector"
                >
                  <template v-slot:prepend>
                    <q-icon name="corporate_fare" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.No_Empleados"
                  label="Número de Empleados"
                >
                  <template v-slot:prepend>
                    <q-icon name="groups" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Empleados"
                  label="Empleados"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Telefono"
                  label="Teléfono"
                  mask="##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Telefono_de_apoyo"
                  label="Teléfono de Apoyo"
                >
                  <template v-slot:prepend>
                    <q-icon name="smartphone" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Fecha_emision_1er_Aviso"
                  label="Fecha de Emisión Primer Aviso"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Fecha_Emision_2do_Aviso"
                  label="Fecha de Emisión Segundo Aviso"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Fecha_Emision_3er_Aviso"
                  label="Fecha de Emisión Tercero Aviso"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Fecha_emision_ultima_actualizacion"
                  label="Fecha Emisión de Ultima Actualización"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Correo_empresa"
                  label="Correo Empresa"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.N_de_acuerdo"
                  label="Número de Acuerdo"
                >
                  <template v-slot:prepend>
                    <q-icon name="tag" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Registro_REPSE_Vigente"
                  label="Registro REPSE Vigente"
                >
                  <template v-slot:prepend>
                    <q-icon name="edit_note" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Fecha_de_Cancelacion"
                  label="Fecha de Cancelación"
                >
                  <template v-slot:prepend>
                    <q-icon name="calendar_month" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Persona_Fisica_o_Moral"
                  label="Persona Física o Moral"
                >
                  <template v-slot:prepend>
                    <q-icon name="people" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Latitud"
                  label="Latitud"
                >
                  <template v-slot:prepend>
                    <q-icon name="language" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Longitud"
                  label="Longitud"
                >
                  <template v-slot:prepend>
                    <q-icon name="room" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="repse.Correo_de_Apoyo"
                  label="Correo de Apoyo"
                >
                  <template v-slot:prepend>
                    <q-icon name="alternate_email" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
          </q-card>
        </q-expansion-item>
        </div>
      </div>
    </div>
    <!--SECCION ICSOE-->
    <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.MenuIcsoe">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="Informativa de Contratos de Servicios u Obras Especializados (ICSOE)"
              >
          <!-- <q-card style="min-width: 100%; min-height: 100% !important;">
          <div class="col q-pa-md" >
            <div style="font-weight: normal">
            <div class="col q-pa-xs flex-center justify-center">
            <div style="font-weight: normal;text-align: center;"></div>
            <div class="row justify-center" style="padding-top: 5%;">
          <img src="../../assets/trabajandoenello.jpg"  width="450" >
        </div>
          </div>
          </div>
            </div>
            </q-card> -->
            <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5"></div>
            <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantIcsoe"
                  label="Total de Contratos"
                  style="text-align: center; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="assignment" />
                  </template>
                </q-input>
              </div>
              </div>
              <q-table style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;"
        flat
        bordered
        :rows="dataIcsoebyCvePatron"
        :columns="columnsIcsoebyCvePatron"
        row-key="name"
        v-model:pagination="paginationIcsoebyCvePatron"
        :filter="filterIcsoebyCvePatron"
        @request="qTableRequestIcsoebyCvePatron"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <q-td key="RFC" style="text-align: center;" :props="props">{{ (props.row.RFC) }}</q-td>
            <q-td key="Folio_Contrato" style="text-align: center;" :props="props">{{ props.row.Folio_Contrato }}</q-td>
            <q-td key="Fecha_inicio" style="text-align: center;" :props="props">{{ props.row.Fecha_inicio }}</q-td>
            <q-td key="Fecha_fin" style="text-align: center;" :props="props">{{ props.row.Fecha_fin }}</q-td>
            <q-td key="Num_trabajadores" style="text-align: center; cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color"  :props="props"   @click="fetchFromServerTrabajadoresICSOE(this.EmisorRFCAux, props.row.Folio_Contrato)">{{ formatNumberZero(props.row.Num_trabajadores) }}</q-td>
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--SECCION SISUB-->
    <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.MenuSisub">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="Sistema de Información de Subcontratación (SISUB)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5"></div>
            <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantSiSub"
                  label="Total de Contratos"
                  style="text-align: center; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="assignment" />
                  </template>
                </q-input>
              </div>
              </div>
              <q-table style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;"
        flat
        bordered
        :rows="dataSiSubbyCvePatron"
        :columns="columnsSiSubbyCvePatron"
        row-key="name"
        v-model:pagination="paginationSiSubbyCvePatron"
        :filter="filterSiSubbyCvePatron"
        @request="qTableRequestSiSubbyCvePatron"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <q-td key="RFC" style="text-align: center;" :props="props">{{ (props.row.rfc) }}</q-td>
            <q-td key="Registro" style="text-align: center;" :props="props">{{ (props.row.Registro) }}</q-td>
            <q-td key="nss" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="buscarDatosRiesgos(str10(props.row.nss),this.EmisorRegistroPatronalAux,'')">{{ formatNumberZero(props.row.nss) }}</q-td>
            <q-td key="municipio_centro" style="text-align: center;" :props="props">{{ props.row.municipio_centro }}</q-td>
            <q-td key="entidad_centro" style="text-align: center;" :props="props">{{ props.row.entidad_centro }}</q-td>
            <q-td key="Folio_SISUB" style="text-align: center;" :props="props">{{ props.row.Folio_SISUB }}</q-td>
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--SECCION velavo-->
    <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.MenuVelavo">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="Programa de Verificación Voluntaria (VELAVO)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5"></div>
            <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantVelavo"
                  label="Total de Verificaciones"
                  style="text-align: center; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="check_circle" />
                  </template>
                </q-input>
              </div>
              </div>
              <q-table style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;"
        flat
        bordered
        :rows="dataVelavobyCvePatron"
        :columns="columnsVelavobyCvePatron"
        row-key="name"
        v-model:pagination="paginationVelavobyCvePatron"
        :filter="filterVelavobyCvePatron"
        @request="qTableRequestVelavobyCvePatron"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <q-td key="RFC" style="text-align: center;" :props="props">{{ (props.row.RFC) }}</q-td>
            <q-td key="Folio_VELAVO" style="text-align: center;" :props="props">{{ (props.row.Folio_VELAVO) }}</q-td>
            <q-td key="Fecha_envio" style="text-align: center;" :props="props">{{ (props.row.Fecha_envio) }}</q-td>
            <q-td key="Trabajdores_en_CT" style="text-align: center;" :props="props">{{ formatNumberPriceZero(props.row.Trabajdores_en_CT) }}</q-td>
            <q-td key="Materia" style="text-align: center;" :props="props">{{ props.row.Materia }}</q-td>
            <q-td key="Validacion_IMSS" style="text-align: center;" :props="props">{{ props.row.Validacion_IMSS }}</q-td>
            <q-td key="Ambito" style="text-align: center;" :props="props">{{ props.row.Ambito }}</q-td>
            <q-td key="Estatus" style="text-align: center;" :props="props">{{ props.row.Estatus }}</q-td>
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--SECCION UTD-->
    <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.MenuUtd">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="(UTD)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
          <div class="col q-pa-md" >
            <div style="font-weight: normal">
            <div class="col q-pa-xs flex-center justify-center">
            <div style="font-weight: normal;text-align: center;"></div>
            <div class="row justify-center" style="padding-top: 5%;">
          <img src="../../assets/trabajandoenello.jpg"  width="450" >
        </div>
          </div>
          </div>
            </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <q-td key="Rfc" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.Rfc) }}</q-td>
            <q-td key="Folio_VELAVO" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.Folio_VELAVO) }}</q-td>
            <q-td key="Trabajdores_en_CT" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.Trabajdores_en_CT) }}</q-td>
            <q-td key="Materia" style="text-align: center;" :props="props">{{ props.row.Materia }}</q-td>
            <q-td key="Validacion_IMSS" style="text-align: center;" :props="props">{{ props.row.Validacion_IMSS }}</q-td>
            <q-td key="Ambito" style="text-align: center;" :props="props">{{ props.row.Ambito }}</q-td>
            <q-td key="Estatus" style="text-align: center;" :props="props">{{ props.row.Estatus }}</q-td>
          </q-tr>
        </template>
    <!--SECCION sne-->
    <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.MenuSne">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="Servicio Nacional de Empleo (SNE)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important;">
          <div class="col q-pa-md background-card-1" style="border-radius: 0 0 10px 10px;">
            <div class="col q-pa-xs">
              <q-tabs
        v-model="tabSne"
        inline-label
        :breakpoint="0"
        align="justify"
        style="background-color: #546460;"
        class="text-white shadow-2"
        active-color="primary"
        :active-class="'highlight-active-tab'"
      >
        <q-tab name="Bolsa de trabajo" label="Bolsa de trabajo" />
        <q-tab name="Ferias de Empleo" label="Ferias de Empleo" />
        <q-tab name="Portal del Empleo" label="Portal de Empleo" />
      </q-tabs>
          </div>
            </div>
            </q-card>
            <q-tab-panels v-model="tabSne" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up" style="border-radius: 0 0 10px 10px;" class="background-card-1">
          <q-tab-panel name="Bolsa de trabajo">
            <!-- q-table compartida -->
            <q-table
            style="font-size:0.8rem !important; font-weight: normal !important;"
              :rows="filteredDataBolsa"
              :columns="columnsSneRFC"
              @update:pagination="val => paginationSneBolsa = val"
              :rows-per-page-options="[5, 10, 20]"
              row-key="origen"
              :filter="filterSneBolsa"
            >
            <template v-slot:body-cell-folio_ofertaempleo="props">
    <q-td :props="props">
      <q-btn
        flat
        @click="fetchFromServerTrabajadoresSNE(props.row.origen, props.row.folio_ofertaempleo)"
        style="text-align: center; cursor: pointer; text-decoration: underline; color: blue !important; font-weight: normal !important"
      >
        {{ formatNumberZero(props.row.folio_ofertaempleo) }}
      </q-btn>
    </q-td>
  </template>
            </q-table>
          </q-tab-panel>
          <q-tab-panel name="Ferias de Empleo">
            <!-- q-table compartida -->
            <q-table
            style="font-size:0.8rem !important; font-weight: normal !important;"
              :rows="filteredDataFeria"
              :columns="columnsSneRFC"
              @update:pagination="val => paginationSneFeria = val"
              :rows-per-page-options="[5, 10, 20]"
              row-key="origen"
              :filter="filterSneFeria"
            >
            <template v-slot:body-cell-folio_ofertaempleo="props">
    <q-td :props="props">
      <q-btn
        flat
        @click="fetchFromServerTrabajadoresSNE(props.row.origen, props.row.folio_ofertaempleo)"
        style="text-align: center; cursor: pointer; text-decoration: underline; color: blue !important; font-weight: normal !important"
      >
        {{ formatNumberZero(props.row.folio_ofertaempleo) }}
      </q-btn>
    </q-td>
  </template>
          </q-table>
          </q-tab-panel>
          <q-tab-panel name="Portal del Empleo">
            <!-- q-table compartida -->
            <q-table
            style="font-size:0.8rem !important; font-weight: normal !important;"
              :rows="filteredDataPortal"
              :columns="columnsSneRFC"
              @update:pagination="val => paginationSnePortal = val"
              :rows-per-page-options="[5, 10, 20]"
              row-key="origen"
              :filter="filterSnePortal"
            >
            <template v-slot:body-cell-folio_ofertaempleo="props">
    <q-td :props="props">
      <q-btn
        flat
        @click="fetchFromServerTrabajadoresSNE(props.row.origen, props.row.folio_ofertaempleo)"
        style="text-align: center; cursor: pointer; text-decoration: underline; color: blue !important; font-weight: normal !important"
      >
        {{ formatNumberZero(props.row.folio_ofertaempleo) }}
      </q-btn>
    </q-td>
  </template>
          </q-table>
          </q-tab-panel>
        </q-tab-panels>
            </q-expansion-item>
      </div>
    </div>
     <!--SECCION DNE-->
     <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.MenuDNE">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="Inspecciones"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5"></div>
            <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantDNE"
                  label="Total de Inspecciones"
                  style="text-align: center; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              </div>
              <q-table style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;"
        flat
        bordered
        :rows="dataDNEbyCvePatron"
        :columns="columnsDNEbyCvePatron"
        row-key="ct_num_trabajadores"
        v-model:pagination="paginationDNEbyCvePatron"
        :filter="filterDNEbyCvePatron"
        @request="qTableRequestDNEbyCvePatron"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <q-td key="ct_num_trabajadores" style="text-align: center;" :props="props">{{ props.row.ct_num_trabajadores === 'NA' ? 0 : props.row.ct_num_trabajadores }}</q-td>
            <q-td key="ct_prima_riesgo" style="text-align: center;" :props="props">{{ props.row.ct_prima_riesgo === 'NA' ? 0 : props.row.ct_prima_riesgo }}</q-td>
            <q-td key="ct_tiene_sindicato" style="text-align: center;" :props="props">{{ props.row.ct_tiene_sindicato === 'NA' ? 'NO' : (props.row.ct_tiene_sindicato === '1' ? 'SI' : 'NO') }}</q-td>
            <q-td key="ct_fec_ultima_inspeccion" style="text-align: center;" :props="props">{{ props.row.ct_fec_ultima_inspeccion === 'NA' ? '-' : props.row.ct_fec_ultima_inspeccion }}</q-td>
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--fIN SECCION DNE SIDIL-->
    <!--SECCION DNE-->
    <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.buttonStates.MenuSIDIL">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="Sistema de Inteligencia de Datos para la Inspección Laboral (SIDIL)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5"></div>
            <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantSIDIL"
                  label="Total de Indicadores"
                  style="text-align: center; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="alt_route" />
                  </template>
                </q-input>
              </div>
              </div>
              <q-table style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;"
        flat
        bordered
        :rows="dataSIDILbyCvePatron"
        :columns="columnsSIDILbyCvePatron"
        row-key="riesgo"
        v-model:pagination="paginationSIDILbyCvePatron"
        :filter="filterSIDILbyCvePatron"
        @request="qTableRequestSIDILbyCvePatron"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <!--<q-td key="ct_num_trabajadores" style="text-align: center;" :props="props">{{ props.row.ct_num_trabajadores === 'NA' ? 0 : props.row.ct_num_trabajadores }}</q-td>-->
            <q-td key="ind_presta_soc" style="text-align: center;" :props="props">{{ props.row.ind_presta_soc === 'NA' ? 0 : props.row.ind_presta_soc }}</q-td>
            <q-td key="ind_seg_soc" style="text-align: center;" :props="props">{{ props.row.ind_seg_soc === 'NA' ? 0 : props.row.ind_seg_soc }}</q-td>
            <q-td key="ind_brecha_gen" style="text-align: center;" :props="props">{{ props.row.ind_brecha_gen === 'NA' ? 0 : props.row.ind_brecha_gen }}</q-td>
            <q-td key="ind_subcontrat" style="text-align: center;" :props="props">{{ props.row.ind_subcontrat === 'NA' ? 0 : props.row.ind_subcontrat }}</q-td>
            <q-td key="riesgo" style="text-align: center;" :props="props">{{ props.row.riesgo === 'NA' ? 0 : props.row.riesgo }}</q-td>
            <!--<q-td key="ct_tiene_sindicato" style="text-align: center;" :props="props">{{ props.row.ct_tiene_sindicato === 'NA' ? 'NO' : (props.row.ct_tiene_sindicato === '1' ? 'SI' : 'NO') }}</q-td>
            <q-td key="ct_fec_ultima_inspeccion" style="text-align: center;" :props="props">{{ props.row.ct_fec_ultima_inspeccion === 'NA' ? '-' : props.row.ct_fec_ultima_inspeccion }}</q-td>-->
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--fIN SECCION DNE SIDIL-->
    <!--SECCION INM-->
    <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.buttonStates.MenuINM">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; border-radius: 10px; text-align: center !important;" label="Patrones con Permiso para Emplear Extranjeros (INM)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5"></div>
            <div class="col-xs-12 col-sm-2">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantINM"
                  label="Total de Patrones"
                  style="text-align: center; margin-bottom: 15px; border-radius: 10px; "
                >
                  <template v-slot:prepend>
                    <q-icon name="corporate_fare" />
                  </template>
                </q-input>
              </div>
              </div>
              <q-table style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;"
        flat
        bordered
        :rows="dataINMbyCvePatron"
        :columns="columnsINMbyCvePatron"
        row-key="ct_num_trabajadores"
        v-model:pagination="paginationINMbyCvePatron"
        :filter="filterINMbyCvePatron"
        @request="qTableRequestINMbyCvePatron"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <!--<q-td key="ct_num_trabajadores" style="text-align: center;" :props="props">{{ props.row.ct_num_trabajadores === 'NA' ? 0 : props.row.ct_num_trabajadores }}</q-td>-->
            <!--<q-td key="ESTADO" style="text-align: center;" :props="props">{{ props.row.ESTADO === 'NA' ? 0 : props.row.ESTADO }}</q-td>-->
            <q-td key="AREA" style="text-align: center;" :props="props">{{ props.row.AREA === 'NA' ? 0 : props.row.AREA }}</q-td>
            <q-td key="TIPO" style="text-align: center;" :props="props">{{ props.row.TIPO === 'NA' ? 0 : props.row.TIPO }}</q-td>
            <q-td key="FECHA_CREACION" style="text-align: center;" :props="props">{{ props.row.FECHA_CREACION === 'NA' ? 0 : props.row.FECHA_CREACION }}</q-td>
            <q-td key="TIPO_RESOLUCION" style="text-align: center;" :props="props">{{ props.row.TIPO_RESOLUCION === 'NA' ? 0 : props.row.TIPO_RESOLUCION }}</q-td>
            <!--<q-td key="NUT" style="text-align: center;" :props="props">{{ props.row.NUT === 'NA' ? 0 : props.row.NUT }}</q-td>-->
            <q-td key="NOMBRE" style="text-align: center;" :props="props">{{ props.row.NOMBRE === 'NA' ? 0 : props.row.NOMBRE }}</q-td>
            <q-td key="GIRO_EMPRESARIAL" style="text-align: center;" :props="props">{{ props.row.GIRO_EMPRESARIAL === 'NA' ? 0 : props.row.GIRO_EMPRESARIAL }}</q-td>
            <!--<q-td key="CIE" style="text-align: center;" :props="props">{{ props.row.CIE === 'NA' ? 0 : props.row.CIE }}</q-td>-->
            <q-td key="CORREO_NOTIFICACION" style="text-align: center;" :props="props">{{ props.row.CORREO_NOTIFICACION === 'NA' ? 0 : props.row.CORREO_NOTIFICACION }}</q-td>
            <!--<q-td key="ct_tiene_sindicato" style="text-align: center;" :props="props">{{ props.row.ct_tiene_sindicato === 'NA' ? 'NO' : (props.row.ct_tiene_sindicato === '1' ? 'SI' : 'NO') }}</q-td>
            <q-td key="ct_fec_ultima_inspeccion" style="text-align: center;" :props="props">{{ props.row.ct_fec_ultima_inspeccion === 'NA' ? '-' : props.row.ct_fec_ultima_inspeccion }}</q-td>-->
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--fIN SECCION INM-->
        <!--SECCION INFONACOT-->
        <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.buttonStates.MenuInfonacot">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; border-radius: 10px; text-align: center !important;" label="Instituto del Fondo Nacional para el Consumo de los Trabajadores (INFONACOT)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5">
              </div>
              </div>
              <q-table style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;"
        flat
        bordered
        :rows="dataInfonacotbyCvePatron"
        :columns="columnsInfonacotbyCvePatron"
        row-key="RFC"
        v-model:pagination="paginationInfonacotbyCvePatron"
        :filter="filterInfonacotbyCvePatron"
        @request="qTableRequestInfonacotbyCvePatron"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <q-td key="RFC" style="text-align: center;" :props="props">{{ props.row.RFC }}</q-td>
            <q-td key="cve_patron_8" style="text-align: center;" :props="props">{{ props.row.cve_patron_8 }}</q-td>
            <q-td key="Estatus" style="text-align: center;" :props="props">{{ props.row.Estatus }}</q-td>
            <!--<q-td key="RAZON_SOCIAL" style="text-align: center;" :props="props">{{ props.row.RAZON_SOCIAL }}</q-td>-->
            <q-td key="NUM_CREDITO" style="text-align: center;" :props="props">{{ formatNumberPriceZero(props.row.NUM_CREDITO) }}</q-td>
            <q-td key="SALDO" style="text-align: center;" :props="props">${{ formatNumberPrice(props.row.SALDO) }}</q-td>
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--fIN SECCION INFONACOT-->
    <!--Sección de ISSSTE-->
    <div class="row bg-white border-panel bg-grey-3" style="border-radius: 10px; ">
        <div class="col q-pa-md q-mt-md" v-show ="this.MenuIssste">
          <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" :label="msgNacional"
              >
              <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
          <div class="col q-pa-md" >
          <div class="row q-col-gutter-xs">
            <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  :bg-color="(EA.Num_Centros_SAT < EA.Num_Centros_IMSS) ? 'red-12' : (EA.Num_Centros_SAT === EA.Num_Centros_IMSS) ? 'dark' : 'red-12'"
                  filled
                  v-model="EA.Num_Centros_SAT"
                  label="Número de Centros de trabajo en el SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="domain_add" />
                  </template>
                </q-input>
              </div>
            <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 1, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  :bg-color="(EA.TA_SAT < EA.TA_IMSS) ? 'orange-12' : (EA.TA_SAT === EA.TA_IMSS) ? 'dark' : 'orange-12'"
                  filled
                  v-model="EA.TA_SAT"
                  label="Número de trabajadores en el SAT"
                >
                <q-tooltip class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="groups" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  :bg-color="(EA.Num_Centros_IMSS < EA.Num_Centros_SAT) ? 'red-12' : (EA.Num_Centros_IMSS === EA.Num_Centros_SAT) ? 'dark' : 'red-12'"
                  filled
                  v-model="EA.Num_Centros_IMSS"
                  label="Número de Centros de trabajo en ISSSTE"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="openModalTrabajadoresIssste()"
                readonly
                  color="dark"
                  :bg-color="(EA.TA_IMSS < EA.TA_SAT) ? 'orange-12' : (EA.TA_IMSS === EA.TA_SAT) ? 'dark' : 'orange-12'"
                  filled
                  v-model="cantISSTEDerechohabientes"
                  label="Número de trabajadores en el ISSSTE"
                >
                <q-tooltip class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="supervisor_account" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.TA_Hombres_SAT"
                  label="Número de trabajadores hombres en SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.TA_Mujeres_SAT"
                  label="Número de trabajadores mujeres en SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <!--<div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.TA_Hombres_IMSS"
                  label="Número de trabajadores hombres en IMSS"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.TA_Mujeres_IMSS"
                  label="Número de trabajadores mujeres en IMSS"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>-->
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 7, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="(this.fila.num_extranjeros_empresa)"
                  label="Trabajadores Extranjeros de la Empresa"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 8, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="(this.fila.num_extranjeros_empresa_centro)"
                  label="Trabajadores Extranjeros del Centro"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 9, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.sin_curp_sat"
                  label="Sin CURP SAT"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 10, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.sin_curp_sat"
                  label="Sin CURP ISSSTE"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 3, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  filled
                  v-model="EA.TA_SOLO_SAT"
                  label="Número de trabajadores solo SAT"
                >
                <q-tooltip class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="group" />
                  </template>
                </q-input>
              </div>
              <!--<div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 4, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  filled
                  v-model="EA.TA_SOLO_IMSS"
                  label="Número de trabajadores solo IMSS"
                >
                <q-tooltip class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="people_alt" />
                  </template>
                </q-input>
              </div>-->
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 6, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  filled
                  v-model="EA.TA_SOLO_SAT_MENOR"
                  label="Solo SAT menor 6 meses"
                >
                <q-tooltip class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="person_remove" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                @click="fetchFromServerTrabajadores(this.EmisorRFCAux, 5, this.EmisorRegistroPatronalAux)"
                readonly
                  color="dark"
                  filled
                  v-model="EA.TA_SOLO_SAT_MAYOR"
                  label="Solo SAT mayor 6 meses"
                >
                <q-tooltip class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="person_add" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.total"
                  label="Total Nomina Pagado"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.descuento"
                  label="Total de Descuento"
                >
                  <template v-slot:prepend>
                    <q-icon name="sell" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.organismo"
                  label="Organismo"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_balance" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="EA.institucion"
                  label="Institución de seguridad pública"
                >
                  <template v-slot:prepend>
                    <q-icon name="domain" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-3" style="color: black; text-align: left;font-size:0.8rem; font-weight: normal !important;">
                <q-icon name="square" color="red-12" size="1rem"></q-icon>
                Diferencia entre Número de centros SAT - ISSSTE
              </div>
              <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;">
                <q-icon name="square" color="orange-12" size="1rem"></q-icon>
                Diferencia entre Número de trabajadores SAT - ISSSTE
              </div>
              <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;">
                <q-icon name="square" color="dark" size="1rem"></q-icon>
                Cifras similares (centros, trabajadores) SAT - ISSSTE
              </div>
              </div>
            </div>
          <q-card-section>
            </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
                    <!--SECCION ISSSTE CUENTAS-->
                    <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.MenuIsssteCuentas">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="Cuentas Individuales (ISSSTE)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5">
              </div>
              </div>
              <div style="width: 100%;">
            <q-input dense debounce="300" v-model="filterISSTECuentas" placeholder="Nombre" @update:model-value="v => { filterISSTECuentas = v.toUpperCase() }">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
              <q-table style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;"
        flat
        bordered
        :rows="dataISSTECuentas"
        :columns="columnsISSTECuentas"
        row-key="nombre_completo"
        v-model:pagination="paginationISSTECuentas"
        :filter="filterISSTECuentas"
        @request="qTableRequestISSTECuentas"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <q-td key="nombre_completo" style="text-align: left;" :props="props">{{ props.row.nombre_completo }}</q-td>
            <q-td key="edad" style="text-align: center;" :props="props">{{ props.row.edad }}</q-td>
            <q-td key="sexo" style="text-align: center;" :props="props">{{ props.row.sexo }}</q-td>
            <q-td key="sueldo_issste" style="text-align: center;" :props="props">{{ formatNumberPrice(props.row.sueldo_issste) }}</q-td>
            <q-td key="anios_antiguedad" style="text-align: center;" :props="props">{{ props.row.anios_antiguedad }}</q-td>
            <q-td key="tipo_registro" style="text-align: center;" :props="props">{{ props.row.tipo_registro }}</q-td>
            <q-td key="bono" style="text-align: center;" :props="props">{{ formatNumberPrice(props.row.bono) }}</q-td>
            <q-td key="anio_envio_bono" style="text-align: center;" :props="props">{{ props.row.anio_envio_bono }}</q-td>
            <q-td key="anio_vencimiento_bono" style="text-align: center;" :props="props">{{ props.row.anio_vencimiento_bono }}</q-td>
            <q-td key="fecha_alta" style="text-align: center;" :props="props">{{ props.row.fecha_alta }}</q-td>
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--fIN SECCION ISSSTE CUENTAS-->
                        <!--SECCION ISSSTE CUENTAS-->
                        <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.MenuIsssteDecimo">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="Décimo Transitorio (ISSSTE)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5">
              </div>
              </div>
              <div style="width: 100%;">
            <q-input dense debounce="300" v-model="filterISSTEDecimo" placeholder="Nombre" @update:model-value="v => { filterISSTEDecimo = v.toUpperCase() }">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
              <q-table style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;"
        flat
        bordered
        :rows="dataISSTEDecimo"
        :columns="columnsISSTEDecimo"
        row-key="nombre_completo"
        v-model:pagination="paginationISSTEDecimo"
        :filter="filterISSTEDecimo"
        @request="qTableRequestISSTEDecimo"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <q-td key="nombre_completo" style="text-align: left;" :props="props">{{ props.row.nombre_completo }}</q-td>
            <q-td key="edad" style="text-align: center;" :props="props">{{ props.row.edad }}</q-td>
            <q-td key="sexo" style="text-align: center;" :props="props">{{ props.row.sexo }}</q-td>
            <q-td key="sueldo_issste" style="text-align: center;" :props="props">{{ formatNumberPrice(props.row.sueldo_issste) }}</q-td>
            <q-td key="anios_antiguedad" style="text-align: center;" :props="props">{{ props.row.anios_antiguedad }}</q-td>
            <q-td key="fecha_alta" style="text-align: center;" :props="props">{{ props.row.fecha_alta }}</q-td>
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--fIN SECCION ISSSTE CUENTAS-->
    <!--SECCION ISSSTE Pensionados-->
                    <div class="row bg-white border-panel bg-grey-3"  style="border-radius: 10px; ">
      <div class="col q-pa-md" v-show ="this.MenuIssstePensionados">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; border-radius: 10px; color: white; text-align: center !important;" label="Pensionados (ISSSTE)"
              >
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-sm-5">
              </div>
              </div>
              <div style="width: 100%;">
            <q-input dense debounce="300" v-model="filterISSTEPensionados" placeholder="Nombre" @update:model-value="v => { filterISSTEPensionados = v.toUpperCase() }">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
              <q-table style="color: black; text-align: left; font-size:0.8rem; font-weight: normal !important;"
        flat
        bordered
        :rows="dataISSTEPensionados"
        :columns="columnsISSTEPensionados"
        row-key="nombre_completo"
        v-model:pagination="paginationISSTEPensionados"
        :filter="filterISSTEPensionados"
        @request="qTableRequestISSTEPensionados"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.5rem !important; font-weight: normal !important;">
            <q-td key="nombre_completo" style="text-align: left;" :props="props">{{ props.row.nombre_completo }}</q-td>
            <q-td key="sexo" style="text-align: center;" :props="props">{{ props.row.sexo }}</q-td>
            <q-td key="primera_fecha" style="text-align: center;" :props="props">{{ props.row.primera_fecha }}</q-td>
            <q-td key="tiempo_serv" style="text-align: center;" :props="props">{{ formatNumberPriceZero(props.row.tiempo_serv) }}</q-td>
            <q-td key="tip_pen_org_des" style="text-align: center;" :props="props">{{ props.row.tip_pen_org_des }}</q-td>
            <q-td key="porcentaje" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.porcentaje) }}</q-td>
            <q-td key="importe_pen" style="text-align: center;" :props="props">{{ formatNumberPrice(props.row.importe_pen) }}</q-td>
            <q-td key="neto_pagar" style="text-align: center;" :props="props">{{ formatNumberPrice(props.row.neto_pagar) }}</q-td>
          </q-tr>
        </template>
      </q-table>
          <!--<img src="../../assets/trabajandoenello.jpg"  width="450" >-->
        </div>
            </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--fIN SECCION ISSSTE Pensionados-->
<!--MODALES-->
<q-dialog v-model="modalICSOE" persistent>
        <q-card class="background-card-1" style="min-width: 100%; min-height: 60% !important; border-radius: 0 0 10px 10px;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Información de Trabajadores</div>
                <div class="col-sm-1 pull-right" style="text-align: right !important"><q-btn color="white" flat v-on:click="closeModalICSOE()" round dense icon="close" />
                </div>
                </div>
            </q-card-section>
        <q-separator />
        <slot>
          <div style="font-weight: normal">
    <div class="col q-pa-xs flex-center justify-center">
      <div style="font-weight: normal;text-align: center;"></div>
      <q-table
        flat
        bordered
        :rows="dataICSOE"
        :columns="columnsICSOE"
        row-key="Folio_Contrato"
        v-model:pagination="paginationICSOE"
        :filter="filterICSOE"
        @request="qTableRequestTrabajadoresICSOE"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Numero_Seguridad_Social" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="buscarDatosRiesgos(str10(props.row.Numero_Seguridad_Social),this.EmisorRegistroPatronalAux,props.row.CURP)">{{ formatNumberZero(props.row.Numero_Seguridad_Social) }}</q-td>
            <q-td key="CURP" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="consultarCurp(props.row.CURP)">{{ props.row.CURP }}</q-td>
            <q-td key="Nombre_RENAPO" style="text-align: center;" :props="props">{{ props.row.Nombre_RENAPO }} </q-td>
            <q-td key="Primer_Apellido_RENAPO" style="text-align: center;" :props="props">{{ props.row.Primer_Apellido_RENAPO }}</q-td>
            <q-td key="Segundo_Apellido_RENAPO" style="text-align: center;" :props="props">{{ props.row.Segundo_Apellido_RENAPO }}</q-td>
            <q-td key="Fecha_Inicio_Servicio" style="text-align: center;" :props="props">{{ props.row.Fecha_Inicio_Servicio }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
        </slot>
      </q-card>
    </q-dialog>
<!--MODAL-->
      <q-dialog v-model="modal" persistent>
        <q-card class="background-card-1" style="min-width: 100%; min-height: 60% !important; border-radius: 0 0 10px 10px;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Trabajadores Asegurados Registrados en el IMSS</div>
                <div class="col-sm-1 pull-right" style="text-align: right !important"><q-btn color="white" flat v-on:click="closeModal()" round dense icon="close" /></div>
                </div>
            </q-card-section>
        <q-separator />
        <slot>
          <div style="font-weight: normal">
    <div class="col q-pa-xs flex-center justify-center">
      <div style="font-weight: normal;text-align: center;"></div>
      <q-table
        flat
        bordered
        :rows="dataNominal"
        :columns="columnsNominal"
        row-key="name"
        v-model:pagination="paginationNominal"
        :filter="filterNominal"
        @request="qTableRequestNominal"
      >
      <template v-slot:top>
          <div style="width: 90%;">
            <q-input dense debounce="300" v-model="filterNominal" placeholder="Buscar por NSS Ó CURP" @update:model-value="v => { filterNominal = v.toUpperCase() }">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div style="width: 10%;">
                <q-btn v-if="hasRole(['DESCARGA'])"
          color="primary"
          icon-right="archive"
          label="Descarga"
          no-caps
          @click="exportTableDataNominal()"></q-btn>
              </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="rfc" style="text-align: center;" :props="props">{{ props.row.rfc }}</q-td>
            <q-td key="nss" style="text-align: center; cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color"  :props="props" @click="buscarDatosRiesgos(str10(props.row.nss),props.row.registro,props.row.curp)">{{ str10(props.row.nss) }}</q-td>
            <q-td key="curp" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="consultarCurp(props.row.curp)">{{ props.row.curp }}</q-td>
            <q-td key="sindicalizado" style="text-align: center;" :props="props">{{ props.row.sindicalizado === '1' ? 'SI' : 'NO' }}</q-td>
            <q-td key="contrato_colectivo" style="text-align: center;" :props="props">{{ props.row.contrato_colectivo === '1' ? 'SI' : 'NO' }}</q-td>
            <q-td key="conciliado" style="text-align: center;" :props="props">{{ props.row.conciliado === '1' ? 'SI' : 'NO' }}</q-td>
            <q-td key="sal_cierre" style="text-align: center;" :props="props">${{ formatNumberPrice(props.row.sal_cierre) }}</q-td>
            <q-td key="salario_mensual" style="text-align: center;" :props="props">${{ formatNumberPrice(props.row.salario_mensual) }}</q-td>
            <q-td key="registro" style="text-align: center;" :props="props">{{ props.row.registro }}</q-td>
            <q-td key="mod" style="text-align: center;" :props="props">{{ props.row.mod }}</q-td>
            <!--<q-td key="cve_mun_final" style="text-align: left;" :props="props">{{ props.row.descripcionMunicipio }}</q-td>
            <q-td key="cve_ent_final" style="text-align: left;" :props="props">{{ props.row.descripcionEntidad }}</q-td>
            <q-td key="sal_cierre" style="text-align: left;" :props="props">{{ formatNumberPrice(props.row.sal_cierre) }}</q-td>-->
            <!--<q-td key="Salario_minimo" style="text-align: left;" :props="props">{{ formatNumberPrice(props.row.Salario_minimo) }}</q-td>
            <q-td key="Nuevos_Asegurados" style="text-align: left;" :props="props">{{ props.row.Nuevos_Asegurados }}</q-td>
            <q-td key="Num_Nominal" style="text-align: left;" :props="props">{{ formatNumberZero(props.row.Num_Nominal) }}</q-td>
            <q-td key="CVE_FRACCION" style="text-align: left;" :props="props">{{ formatNumberZero(props.row.CVE_FRACCION) }}</q-td>-->
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
        </slot>
      </q-card>
    </q-dialog>
<!--MODAL-->
    <q-dialog v-model="modalRiesgos" persistent>
        <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 10px;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white;  text-align: center !important;">Detalles del Trabajador</div>
                <div class="col-sm-1 pull-right" style="text-align: right !important"><q-btn color="white" flat v-on:click="closeModalRiegos()" round dense icon="close" /></div>
                </div>
            </q-card-section>
        <q-separator />
        <div class="bg-white border-panel q-mt-lg">
        <q-tabs
          v-model="tab2"
          class="text-primary background-card-1 q-tab-desing"
          align="justify"
        >
          <q-tab name="sat" icon="account_balance" label="SAT - CFDI"/>
          <q-tab name="riego" icon="badge" label="RIESGOS - IMSS" v-on:click="fetchFromServerRiegos(this.nssTrabajador, this.cvepatron)"/>
          <q-tab name="siaat" icon="person" label="SIAAT" v-on:click="getSiaat(this.nssTrabajador, this.curpTrabajador)"/>
          <!--<q-tab name="infonavit" icon="real_estate_agent" label="INFONAVIT" />-->
          <q-tab name="sne" icon="real_estate_agent" label="SNE" v-on:click="fetchFromServerSNE(this.curpTrabajador)"/>
          <q-tab name="cfcrl" icon="real_estate_agent" v-on:click="fetchFromServerCfcrlPersona(this.nssTrabajador)" label="CFCRL" />
          <q-tab name="renapo" icon="real_estate_agent" v-on:click="fetchFromServerRenapoPersona(this.curpTrabajador)" label="RENAPO" />
        </q-tabs>
        <q-tab-panels v-model="tab2" animated class="background-card-1">
          <q-tab-panel name="riego">
            <slot>
          <div style="font-weight: normal">
            <div class="col q-pa-xs flex-center justify-center">
      <div style="font-weight: normal;text-align: center;"></div>
      <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md" v-show ="this.mostrarPrincipal">
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 10px;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Riesgos</div>
                </div>
          </q-card-section>
          <q-card-section>
            </q-card-section>
            <q-table
        flat
        bordered
        :rows="dataRiegos"
        :columns="columnsRiegos"
        row-key="name"
        v-model:pagination="paginationRiegos"
        :filter="filterRiesgos"
        @request="qTableRequestRiesgos"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id_year_memoria" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.id_year_memoria) }}</q-td>
            <q-td key="Id_tipo_riesgo" style="text-align: center;" :props="props">{{ props.row.desc_tiporiesgo }}</q-td>
            <q-td key="id_riesgo_fisico" style="text-align: center;" :props="props">{{ props.row.desc_riesgo_fisico  }}</q-td>
            <q-td key="id_fraccion" style="text-align: center;" :props="props">{{ props.row.desc_fraccion }}</q-td>
            <q-td key="id_sexo" style="text-align: center;" :props="props">{{ props.row.sexo }}</q-td>
            <q-td key="id_ocupacion_SINCO" style="text-align: center;" :props="props">{{ props.row.desc_ocupacion_SINCO }}</q-td>
            <q-td key="id_consecuencia" style="text-align: center;" :props="props">{{ props.row.desc_consecuencia }}</q-td>
            <q-td key="id_acto_inseguro" style="text-align: center;" :props="props">{{ props.row.desc_acto_inseguro  }}</q-td>
            <q-td key="id_dias_incapacidad" style="text-align: center;" :props="props">{{ props.row.desc_dias_incapacidad }}</q-td>
            <q-td key="id_entidad" style="text-align: center;" :props="props">{{ props.row.desc_entidad }}</q-td>
            <q-td key="id_causa_externa" style="text-align: center;" :props="props">{{ props.row.desc_causa_externa }}</q-td>
            <q-td key="id_natlesion" style="text-align: center;" :props="props">{{ props.row.desc_natlesion }}</q-td>
          </q-tr>
        </template>
      </q-table>
            </q-card>
          </div>
      </div>
    </div>
  </div>
        </slot>
          </q-tab-panel>
          <q-tab-panel name="siaat">
            <slot>
          <div style="font-weight: normal">
            <div class="col q-pa-xs flex-center justify-center">
      <div style="font-weight: normal;text-align: center;"></div>
      <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md" v-show ="this.mostrarPrincipal">
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 10px;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Información del SIAAT</div>
                </div>
          </q-card-section>
          <q-card-section>
            </q-card-section>
          <q-table
        flat
        bordered
        :rows="dataSiaat"
        :columns="columnsSiaat"
        row-key="name"
        v-model:pagination="paginationSiaat"
        :filter="filterSiaat"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Curp" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="consultarCurp(props.row.Curp)">{{ props.row.Curp }}</q-td>
            <q-td key="Rfc" style="text-align: center;" :props="props">{{ props.row.Rfc }}</q-td>
            <q-td key="Nombres" style="text-align: center;" :props="props">{{ props.row.Nombres }}</q-td>
            <q-td key="Apellidos" style="text-align: center;" :props="props">{{ props.row.Apellidos }}</q-td>
            <q-td key="Edad" style="text-align: center;" :props="props">{{ props.row.Edad }}</q-td>
          </q-tr>
        </template>
      </q-table>
      </q-card>
      </div>
        </div>
          </div>
          </div>
        </slot>
          </q-tab-panel>
          <q-tab-panel name="sat">
            <slot>
          <div style="font-weight: normal">
            <div class="col q-pa-xs flex-center justify-center">
      <div style="font-weight: normal;text-align: center;"></div>
      <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md" v-show ="this.mostrarPrincipal">
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 10px;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Información del SAT - CFDI</div>
                </div>
          </q-card-section>
          <q-card-section>
            </q-card-section>
          <q-table
        flat
        bordered
        :rows="dataSat"
        :columns="columnsSat"
        row-key="name"
        v-model:pagination="paginationSat"
        :filter="filterSat"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="ReceptorRFC" style="text-align: center;" :props="props">{{ props.row.ReceptorRFC }}</q-td>
            <q-td key="EmisorRFC" style="text-align: center;" :props="props">{{ props.row.EmisorRFC }}</q-td>
            <q-td key="EmisorRegistroPatronal" style="text-align: center;" :props="props">{{ props.row.EmisorRegistroPatronal }}</q-td>
            <q-td key="ReceptorCurp" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="consultarCurp(props.row.ReceptorCurp)">{{ props.row.ReceptorCurp }}</q-td>
            <q-td key="ReceptorNumSeguridadSocial" style="text-align: center;" :props="props">{{ props.row.ReceptorNumSeguridadSocial }}</q-td>
            <q-td key="NumDiasPagados_sum" style="text-align: right;" :props="props">{{ formatNumberZero(props.row.SUM_DIAS) }}</q-td>
            <q-td key="Descuento_sum" style="text-align: right;" :props="props">${{ formatNumberPrice(props.row.Sum_Descuento) }}</q-td>
            <q-td key="Total_sum" style="text-align: right;" :props="props">${{ formatNumberPrice(props.row.SUM_Total) }}</q-td>
          </q-tr>
        </template>
      </q-table>
      </q-card>
      </div>
        </div>
          </div>
          </div>
        </slot>
          </q-tab-panel>
          <q-tab-panel name="sne">
            <slot>
          <div style="font-weight: normal">
            <div class="col q-pa-xs flex-center justify-center">
      <div style="font-weight: normal;text-align: center;"></div>
      <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md" v-show ="this.mostrarPrincipal">
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Servicio Nacional de Empleo</div>
                </div>
          </q-card-section>
          <q-card-section>
            </q-card-section>
          <q-table
        flat
        bordered
        :rows="dataSNE"
        :columns="columnsSNE"
        row-key="name"
        v-model:pagination="paginationSNE"
        :filter="filterSNE"
        @request="qTableRequestSNE"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="origen" style="text-align: center;" :props="props">{{ props.row.origen }}</q-td>
            <q-td key="curp_bt" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="consultarCurp(props.row.curp_bt)">{{ props.row.curp_bt }}</q-td>
            <q-td key="nombre_bt" style="text-align: center;" :props="props">{{ props.row.nombre_bt + ' ' + props.row.apellidopat_bt + ' ' + props.row.apellidomat_bt }}</q-td>
            <q-td key="edad_bt" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.edad_bt) }}</q-td>
            <q-td key="discapacidad_bt" style="text-align: center;" :props="props">{{ props.row.discapacidad_bt }}</q-td>
            <q-td key="nivelestudio_bt" style="text-align: center;" :props="props">{{ props.row.nivelestudio_bt }}</q-td>
            <q-td key="titulo_ofertaempleo" style="text-align: center;" :props="props">{{ props.row.titulo_ofertaempleo }}</q-td>
            <q-td key="salario_ofertaempleo" style="text-align: center;" :props="props">{{ '$' + formatNumberPrice(props.row.salario_ofertaempleo) }}</q-td>
          </q-tr>
        </template>
      </q-table>
      </q-card>
      </div>
        </div>
          </div>
          </div>
        </slot>
          </q-tab-panel>
          <q-tab-panel name="infonavit">
            <slot>
          <div style="font-weight: normal">
            <div class="col q-pa-xs flex-center justify-center">
            <div style="font-weight: normal;text-align: center;"></div>
            <div class="row justify-center" style="padding-top: 5%;">
          <img src="../../assets/trabajandoenello.jpg"  width="450" >
        </div>
          </div>
          </div>
        </slot>
          </q-tab-panel>
          <q-tab-panel name="cfcrl">
            <slot>
          <div style="font-weight: normal">
            <div class="col q-pa-xs flex-center justify-center">
            <div style="font-weight: normal;text-align: center;"></div>
            <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md" v-show ="this.mostrarPrincipal">
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Centro Federal de Conciliación y Registro Laboral</div>
                <div class="row q-col-gutter-xs">
                </div>
            </div>
          </q-card-section>
          <q-card-section>
              <q-table
        flat
        bordered
        :rows="dataCfcrlPersona"
        :columns="columnsCfcrlPersona"
        row-key="name"
        v-model:pagination="paginationCfcrlPersona"
        :filter="filterCfcrlPersona"
        @request="qTableRequestCfcrlPersona"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="rfc" style="text-align: center;" :props="props">{{ props.row.rfc }}</q-td>
            <q-td key="curp" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="consultarCurp(props.row.curp)">{{ props.row.curp }}</q-td>
            <q-td key="nss" style="text-align: center; " :props="props">{{ str10(props.row.nss) }}</q-td>
            <q-td key="sindicalizado" style="text-align: center;" :props="props">{{ props.row.sindicalizado === '1' ? 'SI' : 'NO'}}</q-td>
            <q-td key="contrato_colectivo" style="text-align: center;" :props="props">{{ props.row.contrato_colectivo === '1' ? 'SI' : 'NO' }}</q-td>
            <q-td key="conciliado" style="text-align: center;" :props="props">{{ props.row.conciliado === '1' ? 'SI' : 'NO' }}</q-td>
          </q-tr>
        </template>
      </q-table>
            </q-card-section>
            </q-card>
          </div>
      </div>
          </div>
          </div>
        </slot>
          </q-tab-panel>
          <q-tab-panel name="renapo">
            <slot>
          <div style="font-weight: normal">
            <div class="col q-pa-xs flex-center justify-center">
            <div style="font-weight: normal;text-align: center;"></div>
            <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md">
          <q-card class="background-card-1" style="min-width: 100%; min-height: 100% !important; border-radius: 0 0 10px 10px;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Información del Trabajador</div>
                </div>
          </q-card-section>
          <q-card-section>
            </q-card-section>
          <q-table
        flat
        bordered
        :rows="dataRenapo"
        :columns="columnsRENAPO"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="CURP" style="text-align: center;" :props="props">{{ props.row.CURP}}</q-td>
            <q-td key="nombres" style="text-align: center;" :props="props">{{ props.row.nombres }}</q-td>
            <q-td key="apellido1" style="text-align: center;" :props="props">{{ props.row.apellido1 }}</q-td>
            <q-td key="apellido2" style="text-align: center;" :props="props">{{ props.row.apellido2 }}</q-td>
            <q-td key="sexo" style="text-align: center;" :props="props">{{ props.row.sexo }}</q-td>
            <q-td key="fechNac" style="text-align: center;" :props="props">{{ props.row.fechNac }}</q-td>
            <q-td key="nacionalidad" style="text-align: center;" :props="props">{{ props.row.nacionalidad }}</q-td>
            <q-td key="numEntidadReg" style="text-align: center;" :props="props">{{ statusEntidad(props.row.numEntidadReg) }}</q-td>
          </q-tr>
        </template>
      </q-table>
      </q-card>
      </div>
        </div>
            <!-- <div class="row justify-center" style="padding-top: 5%;">
              <div class="panel panel-default">
                    <div class="panel-heading clearfix">
                      <h4 style="margin-bottom: 8px;">Datos Personales del Trabajador</h4>
                    </div>
                    <div class="panel-body" style="padding: 24px;">
                      <table style="width: 100%;">
                        <tr style="border-bottom: 1px solid #ececec;">
                          <td style="font-weight: 700; width: 60%; padding-bottom: 8px;">CURP:</td>
                          <td style="text-transform: uppercase;">{{  this.dataRenapo.CURP }}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ececec;">
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-right: 8px; padding-bottom: 8px;">
                            Nombre(s):
                          </td>
                          <td style="text-transform: uppercase;">{{ this.dataRenapo.nombres }}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ececec;">
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Primer apellido:
                          </td>
                          <td style="text-transform: uppercase;">{{ this.dataRenapo.apellido1 }}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ececec;">
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Segundo apellido:
                          </td>
                          <td style="text-transform: uppercase;">{{ this.dataRenapo.apellido2 }}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ececec;">
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Sexo:
                          </td>
                            <td style="text-transform: uppercase;">{{ this.dataRenapo.sexo }}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ececec;">
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Fecha de nacimiento: <span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="top" title="" data-original-title="Formato fecha: DD/MM/AAAA"></span>
                          </td>
                          <td style="text-transform: uppercase;">{{ this.dataRenapo.fechNac }}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ececec;">
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Nacionalidad:
                          </td>
                          <td style="text-transform: uppercase;">{{ this.dataRenapo.nacionalidad }}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ececec;">
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Entidad:
                          </td>
                          <td style="text-transform: uppercase;">{{ statusEntidad(this.dataRenapo.numEntidadReg)}}</td>
                        </tr> -->
                        <!-- tr style="border-bottom: 1px solid #ececec;">
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px;">Estatus CURP:</td>
                          <td>{{status-curp curp.statusCurp}}</td>
                        </tr -->
                      <!-- </table>
                    </div>
                  </div> -->
        <!-- </div> -->
          </div>
          </div>
        </slot>
          </q-tab-panel>
        </q-tab-panels>
      </div>
      </q-card>
    </q-dialog>
<!--MODAL-->
    <q-dialog v-model="modalTrabajadores" persistent>
        <q-card class="background-card-1" style="min-width: 100%; min-height: 60% !important; border-radius: 0 0 10px 10px; z-index: 5;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Trabajadores Asegurados Registrados</div>
                <div class="col-sm-1 pull-right" style="text-align: right !important"><q-btn color="white" flat v-on:click="closeModalTrabajadores()" round dense icon="close" /></div>
                </div>
            </q-card-section>
        <q-separator />
        <slot>
          <div style="font-weight: normal">
    <div class="col q-pa-xs flex-center justify-center">
      <div style="font-weight: normal;text-align: center;"></div>
      <q-table
        flat
        bordered
        :rows="dataTrabajadores"
        :columns="columnsTrabajadores"
        row-key="Bandera"
        v-model:pagination="paginationTrabajadores"
        :filter="filterTrabajadores"
        @request="qTableRequestTrabajadores"
      >
      <template v-slot:top>
          <div style="width: 90%;">
            <q-input dense debounce="300" v-model="filterTrabajadores" placeholder="Buscar por NSS Ó CURP" @update:model-value="v => { filterTrabajadores = v.toUpperCase() }">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <q-btn v-if="[7, 8, 9, 10].indexOf(this.dondeestaAux) === -1"
          color="primary"
          icon-right="archive"
          label="Descarga"
          no-caps
          @click="exportTableDataTrabajadores()"></q-btn>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="donde_esta" style="text-align: center;" :props="props">{{ props.row.donde_esta === '1.0' ? 'Sin Subregistro' : (props.row.donde_esta === '2.0'? 'Subregistro Fiscal' : (props.row.donde_esta === '3.0'? 'Subregistro S. Social' :  'PENDIENTE' )) }}</q-td>
            <q-td key="ReceptorRFC" style="text-align: center;" :props="props">{{ props.row.ReceptorRFC }}</q-td>
            <q-td key="ReceptorNumSeguridadSocial" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="buscarDatosRiesgos(str10(props.row.ReceptorNumSeguridadSocial),props.row.cve_patron_8,props.row.ReceptorCurp)">{{ formatNumberZero(props.row.ReceptorNumSeguridadSocial) }}</q-td>
            <q-td key="ReceptorCurp" style="text-align: center;cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="consultarCurp(props.row.ReceptorCurp)">{{ props.row.ReceptorCurp }}</q-td>
            <q-td key="cve_patron_8" style="text-align: center;" :props="props">{{ props.row.cve_patron_8 }}</q-td>
            <q-td key="SUM_DIAS" style="text-align: center;" :props="props">{{ formatNumberPriceZero(props.row.SUM_DIAS) }}</q-td>
            <q-td key="SUM_Total" style="text-align: center;" :props="props">${{ formatNumberPrice(props.row.SUM_Total) }}</q-td>
            <q-td key="Sum_Descuento" style="text-align: center;" :props="props">${{ formatNumberPrice(props.row.Sum_Descuento) }}</q-td>
            <q-td key="ReceptorSalarioDiarioIntegrado" style="text-align: center;" :props="props">${{ formatNumberPrice(props.row.ReceptorSalarioDiarioIntegrado) }}</q-td>
            <!--<q-td key="salario_mensual_sat" style="text-align: center;" :props="props">${{ formatNumberPrice(props.row.salario_mensual_sat) }}</q-td>-->
            <q-td key="sal_cierre" style="text-align: center;" :props="props">${{ formatNumberPrice(props.row.sal_cierre) }}</q-td>
            <!--<q-td key="salario_mensual" style="text-align: center;" :props="props">${{ formatNumberPrice(props.row.salario_mensual) }}</q-td>-->
          </q-tr>
        </template>
      </q-table>
      <div class="col q-pa-md">
        <div class="row q-col-gutter-xs">
      <div v-show="tipo_inst_seguridadAux != '2.0'" class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
      <q-icon name="square" color="positive" size="1rem"></q-icon>
        Sin Subregistro: Cruce de SAT - IMSS
      </div>
      <div v-show="tipo_inst_seguridadAux != '2.0'" class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
      <q-icon name="square" color="positive" size="1rem"></q-icon>
        Subregistro Fiscal: Solo en IMSS
      </div>
      <div v-show="tipo_inst_seguridadAux != '2.0'" class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
      <q-icon name="square" color="positive" size="1rem"></q-icon>
       Subregistro S. Social: Solo en SAT
      </div>
        </div>
        </div>
    </div>
  </div>
        </slot>
      </q-card>
    </q-dialog>
    <!--MODAL SNE-->
    <!--MODAL-->
    <q-dialog v-model="modalTrabajadoresIssste" persistent>
        <q-card class="background-card-1" style="min-width: 100%; min-height: 60% !important; border-radius: 0 0 10px 10px; z-index: 5;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Trabajadores Asegurados Registrados</div>
                <div class="col-sm-1 pull-right" style="text-align: right !important"><q-btn color="white" flat v-on:click="closeModalTrabajadoresIssste()" round dense icon="close" /></div>
                </div>
            </q-card-section>
        <q-separator />
        <slot>
          <div style="font-weight: normal">
    <div class="col q-pa-xs flex-center justify-center">
      <div style="font-weight: normal;text-align: center;"></div>
      <div style="width: 100%;">
            <q-input dense debounce="300" v-model="filterISSTEDerechohabientes" placeholder="Nombre" @update:model-value="v => { filterISSTEDerechohabientes = v.toUpperCase() }">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
      <q-table
        flat
        bordered
        :rows="dataISSTEDerechohabientes"
        :columns="columnsISSTEDerechohabientes"
        row-key="nombre_completo"
        v-model:pagination="paginationISSTEDerechohabientes"
        :filter="filterISSTEDerechohabientes"
        @sort-method="handleSortChange"
        @request="qTableRequestISSTEDerechohabientes"
      >
      <template v-slot:top>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="nombre_completo" style="text-align: left;" :props="props">{{ props.row.nombre_completo }}</q-td>
            <q-td key="sexo" style="text-align: center;" :props="props">{{ props.row.sexo }}</q-td>
            <q-td key="sueldo_issste" style="text-align: center;" :props="props">{{ formatNumberPrice(props.row.sueldo_issste) }}</q-td>
            <q-td key="antig" style="text-align: center;" :props="props">{{ formatNumberPriceZero(props.row.antig) }}</q-td>
            <q-td key="nombramiento" style="text-align: center;" :props="props">{{ props.row.nombramiento }}</q-td>
            <q-td key="fecha_alta" style="text-align: center;" :props="props">{{ props.row.fecha_alta }}</q-td>
            <q-td key="fecha_ingreso" style="text-align: center;" :props="props">{{ props.row.fecha_ingreso }}</q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="col q-pa-md">
        <div class="row q-col-gutter-xs">
      <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
      <q-icon name="square" color="positive" size="1rem"></q-icon>
        Sin Subregistro: Cruce de SAT - ISSSTE
      </div>
      <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
      <q-icon name="square" color="positive" size="1rem"></q-icon>
        Subregistro Fiscal: Solo en ISSSTE
      </div>
      <div class="col-xs-12 col-sm-3" style="color: black; text-align: left; font-size:1rem; font-weight: normal !important;">
      <q-icon name="square" color="positive" size="1rem"></q-icon>
       Subregistro S. Social: Solo en SAT
      </div>
        </div>
        </div>
    </div>
  </div>
        </slot>
      </q-card>
    </q-dialog>
    <!--MODAL issste fin-->
    <q-dialog v-model="modalTrabajadoresSNE" persistent>
        <q-card class="background-card-1" style="min-width: 100%; min-height: 60% !important; border-radius: 0 0 10px 10px;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Trabajadores Colocados</div>
                <div class="col-sm-1 pull-right" style="text-align: right !important"><q-btn color="white" flat v-on:click="closeModalTrabajadoresSNE()" round dense icon="close" /></div>
                </div>
            </q-card-section>
        <q-separator />
        <slot>
          <div style="font-weight: normal">
    <div class="col q-pa-xs flex-center justify-center">
      <div style="font-weight: normal;text-align: center;"></div>
      <q-table
        flat
        bordered
        :rows="dataTrabajadoresSNE"
        :columns="columnsTrabajadoresSNE"
        row-key="donde_esta"
        v-model:pagination="paginationTrabajadoresSNE"
        :filter="filterTrabajadoresSNE"
        @request="qTableRequestTrabajadoresSNE"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="origen" style="text-align: center;" :props="props">{{ props.row.origen }}</q-td>
            <q-td key="curp_bt" style="text-align: center; cursor: pointer; text-decoration: underline; color: #a10606; font-weight: 700;" class="enlace-color" :props="props" @click="buscarDatosRiesgos(null,null,props.row.curp_bt)">{{ props.row.curp_bt }}</q-td>
            <q-td key="nombre_bt" style="text-align: center;" :props="props">{{ props.row.nombre_bt + ' ' + props.row.apellidopat_bt + ' ' + props.row.apellidomat_bt }}</q-td>
            <q-td key="edad_bt" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.edad_bt) }}</q-td>
            <q-td key="discapacidad_bt" style="text-align: center;" :props="props">{{ props.row.discapacidad_bt }}</q-td>
            <q-td key="nivelestudio_bt" style="text-align: center;" :props="props">{{ props.row.nivelestudio_bt }}</q-td>
            <q-td key="titulo_ofertaempleo" style="text-align: center;" :props="props">{{ props.row.titulo_ofertaempleo }}</q-td>
            <q-td key="salario_ofertaempleo" style="text-align: center;" :props="props">{{ '$' + formatNumberPrice(props.row.salario_ofertaempleo) }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
        </slot>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalCurpRenapo" persistent>
        <q-card>
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;"></div>
                <div class="col-sm-1 pull-right" style="text-align: right !important"><q-btn color="white" flat v-on:click="closemodalCurpRenapo()" round dense icon="close" /></div>
                </div>
            </q-card-section>
        <q-separator />
        <slot>
          <div style="font-weight: normal">
            <div class="col q-pa-xs flex-center justify-center">
            <div style="font-weight: normal;text-align: center; background-color: #ececec;"></div>
            <div class="row justify-center table-desing">
              <div class="panel panel-default">
                    <div class="panel-heading clearfix">
                      <h4>Información del Trabajador</h4>
                    </div>
                    <div class="panel-body">
                      <div v-if="this.dataRenapo.statusOper ==='NO EXITOSO'" class="panel-heading clearfix">
                      <h4 style="margin-bottom: 8px;">No se Encontro el CURP</h4>
                    </div>
                      <table style="width: 100%;">
                        <tr>
                          <td style="font-weight: 700; width: 60%; padding-bottom: 8px;">CURP:</td>
                          <td style="text-transform: uppercase;">{{  this.dataRenapo.CURP }}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-right: 8px; padding-bottom: 8px;">
                            Nombre(s):
                          </td>
                          <td style="text-transform: uppercase;">{{ this.dataRenapo.nombres }}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Primer apellido:
                          </td>
                          <td style="text-transform: uppercase;">{{ this.dataRenapo.apellido1 }}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Segundo apellido:
                          </td>
                          <td style="text-transform: uppercase;">{{ this.dataRenapo.apellido2 }}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Sexo:
                          </td>
                            <td style="text-transform: uppercase;">{{ this.dataRenapo.sexo }}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Fecha de nacimiento: <span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="top" title="" data-original-title="Formato fecha: DD/MM/AAAA"></span>
                          </td>
                          <td style="text-transform: uppercase;">{{ this.dataRenapo.fechNac }}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Nacionalidad:
                          </td>
                          <td style="text-transform: uppercase;">{{ this.dataRenapo.nacionalidad }}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px; padding-right: 8px;">
                            Entidad de nacimiento:
                          </td>
                          <td style="text-transform: uppercase;">{{ statusEntidad(this.dataRenapo.numEntidadReg) }}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
        </div>
          </div>
          </div>
        </slot>
      </q-card>
    </q-dialog>
    </q-card-section>
  </q-card>
</div>
</div>
  </div>
      </div>
      <q-dialog v-model="showModalGra">
      <q-card class="background-card-1" style="min-width: 550px !important; min-height: 400px !important ; border-radius: 0 0 10px 10px;">
        <q-card-section>
          <ECharts
            ref="modalChart"
            :option="chartOptions"
            autoresize
            style="height: 300px;"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat dense color="primary" @click="downloadChart">
          Descargar gráfico
        </q-btn>
          <q-btn flat dense color="primary" @click="showModalGra = false">
            Cerrar
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--cammbiar a-->
  </q-page>
    <!--<q-page class="bg-grey-3">
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
      </div>-->
      <q-separator></q-separator>
      <!--MENU DE FILTROS-->
      <!--INFORMACION NACIONAL-->
      <!--MENU DLE PTU
    </q-page>-->
    <!--<q-input v-model="curp" label="Ingrese CURP" outlined />
      <q-btn label="Consultar CURP" @click="consultarCurp('VAHZ931023HOCSRR04')" color="primary" />-->
  </template>
<script>
// import axios from 'axios'
import api from 'src/commons/api.js'
import useVuelidate from '@vuelidate/core'
import { QSpinnerFacebook } from 'quasar'
import { formatNumberPriceZero, formatNumberPrice, formatNumberZero, str10, hasRole, statusEntidad } from 'src/commons/utils'
import { required } from '@vuelidate/validators'
// import { ref } from 'vue'
import ECharts from 'vue-echarts'
import * as echarts from 'echarts/core'
import { PieChart, BarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([PieChart, BarChart, TooltipComponent, LegendComponent, CanvasRenderer])
// import { defineAsyncComponent } from 'vue'
export default {
  name: 'IndexServices',
  components: {
    ECharts
    // CardItem: defineAsyncComponent(() => import('components/cards/CardItem.vue')),
    // CardCafe: defineAsyncComponent(() => import('components/cards/CardCafe.vue')),
    // CardCompany: defineAsyncComponent(() => import('components/cards/CardCompany.vue')),
    // CardProfileDark: defineAsyncComponent(() => import('components/cards/CardProfileDark.vue')),
    // CardProfile: defineAsyncComponent(() => import('components/cards/CardProfile.vue')),
    // BasicCard: defineAsyncComponent(() => import('components/cards/CardBasic.vue'))
  },
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
      chartOptions2: {
        grid: {
          top: '10%',
          bottom: '20%' // Añade espacio en la parte inferior
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '10%',
          left: 'center'
        },
        series: [
          {
            name: 'Trabajadores',
            type: 'pie',
            radius: '40%',
            data: []
          }
        ],
        emphasis: {
          focus: 'self'
        }
      },
      chartOptions: {
        grid: {
          top: '35%',
          bottom: '15%' // Añade espacio en la parte inferior
        },
        title: {
          text: '',
          left: 'center'
        },
        label: {
          show: true,
          position: 'outside' // Coloca las etiquetas fuera del gráfico
        },
        labelLine: {
          show: true, // Muestra las líneas que conectan las etiquetas al gráfico
          length: 10, // Longitud de las líneas iniciales
          length2: 15 // Longitud de las líneas finales
        },
        tooltip: {
          trigger: 'item',
          position: function (point, params, dom, rect, size) {
            return [point[0], point[1] + 20]
          }
        },
        legend: {
          top: '10%',
          left: 'centes'
        },
        series: [{
          top: '25%',
          name: '',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10
          },
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      rawDataRenapo: {},
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
      tabSne: 'Bolsa de trabajo',
      isRowClicked: false,
      mostrarResultados: false,
      text: null,
      profile_card_data: {
        name: 'Pratik Patel',
        des: 'Solutions Developer',
        avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
      },
      buttonStates: {
        MPImss: false,
        MPSat: false,
        MPUtd: false,
        MenuSiaat: false,
        Menuccfcrl: false,
        MenuVelavo: false,
        MenuUtd: false,
        MenuSne: false,
        MenuDNE: false,
        MenuSIDIL: false,
        MenuINM: false,
        MenuInfonacot: false,
        MenuIssste: false,
        MPIssste: false,
        MenuIsssteCuentas: false,
        MenuIsssteDecimo: false
        // Agrega más estados para otros botones según sea necesario
      },
      buttonStatesDisable: {
        MPImss: false,
        MPSat: false,
        MPUtd: false,
        MenuSiaat: false,
        Menuccfcrl: false,
        MenuVelavo: false,
        MenuUtd: false,
        MenuSne: false,
        MenuDNE: false,
        MenuSIDIL: false,
        MenuINM: false,
        MenuInfonacot: false,
        MenuIssste: false,
        MPIssste: false,
        MenuIsssteCuentas: false,
        MenuIsssteDecimo: false
      },
      selectedOption: null,
      MostrarRB: true,
      fila: [],
      filaSeleccionada: null,
      claveProdOptions: [],
      selected: [],
      selected2: [],
      EmisorRFC: null,
      EmisorRFCAux: null,
      tipo_inst_seguridadAux: null,
      NombreAux: null,
      dondeestaAux: null,
      OrigenAux: null,
      FolioAux: null,
      cvepatronAux: null,
      EmisorRegistroPatronalAux: null,
      id_entidadAux: null,
      empresaAux: null,
      entidadAux: null,
      divAux: null,
      grpAux: null,
      fraccionAux: null,
      idfraccionAux: null,
      tipoinstseguridadAux: null,
      modal: false,
      modalRiesgos: false,
      modalTrabajadores: false,
      modalTrabajadoresSNE: false,
      modalTrabajadoresIssste: false,
      modalCurpRenapo: false,
      modalICSOE: false,
      loading: true,
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
      data: [],
      filter: '',
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
      subRegOptions: [
        { label: 'AMBOS', value: 1 },
        { label: 'IMSS', value: 2 },
        { label: 'SAT', value: 3 }],
      year: null, // anio en que se cargara el ptu
      rfcptu: null, // rfc e que cargara el ptu
      jurisdiccionPTU: null, // jurisdiccion del ptu
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
      repse: {
        Razon_social: null,
        Estado: null,
        Municipio: null,
        Zona: null,
        Representante: null,
        Tipo_de_emision: null,
        Categoria_REPSE: null,
        Sector: null,
        No_Empleados: null,
        Empleados: null,
        Telefono: null,
        Telefono_de_apoyo: null,
        Fecha_emision_1er_Aviso: null,
        Fecha_Emision_2do_Aviso: null,
        Fecha_Emision_3er_Aviso: null,
        Fecha_emision_ultima_actualizacion: null,
        N_de_acuerdo: null,
        Registro_REPSE_Vigente: null,
        Fecha_de_Cancelacion: null,
        Persona_Fisica_o_Moral: null,
        Latitud: null,
        Longitud: null,
        Correo_de_Apoyo: null,
        check: ''
      },
      isPwd: true,
      tab: 'ptu',
      mostrar: '',
      MenuPrincipalBotones: false,
      mostrarMenuPrincipal: false,
      mostrarPrincipal: false,
      mostrarPrincipal2: false,
      MenuNacional: false,
      MenuEstatal: false,
      MenuCentros: false,
      MenuRiesgos: false,
      MenuSiaat: false,
      Menuccfcrl: false,
      MenuIcsoe: false,
      MenuSisub: false,
      MenuVelavo: false,
      MenuUtd: false,
      MenuSne: false,
      MenuSep: false,
      MenuConsar: false,
      MenuInfonavit: false,
      MenuSidil: false,
      MenuDNE: false,
      MenuInfonacot: false,
      MenuIssste: false,
      MenuIsssteCuentas: false,
      MenuIsssteDecimo: false,
      mostrarNominal: false,
      mostrarREPSE: false,
      mostrarTrabajadores: false,
      mostrarMenuPtu: false,
      mostrarMenuREPSE: false,
      paginationPatronal: {
        sortBy: 'CVE_PATRON',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsPatronal: [
        { name: 'actions', align: 'center', label: 'Acciones', field: 'actions', style: 'width: 10%', sortable: false },
        { name: 'CVE_PATRON', align: 'center', label: 'Registro Patronal', field: 'CVE_PATRON', style: 'width: 20%', sortable: false },
        { name: 'NOMBRE', align: 'center', label: 'Nombre', field: 'NOMBRE', style: 'width: 20%', sortable: false },
        { name: 'RFC', align: 'center', label: 'RFC Empresa', field: 'RFC', style: 'width: 20%', sortable: false },
        { name: 'CVE_MOD_N', align: 'center', label: 'Modalidad', field: 'CVE_MOD_N', style: 'width: 20%', sortable: false },
        { name: 'TA', align: 'center', label: 'T. Asegurados', field: 'TA', style: 'width: 20%', sortable: false },
        { name: 'TP', align: 'center', label: 'T. Permanentes', field: 'TP', style: 'width: 20%', sortable: false },
        { name: 'TEU', align: 'center', label: 'T. Eventuales Urbanos', field: 'TEU', style: 'width: 20%', sortable: false },
        { name: 'TEC', align: 'center', label: 'T. Eventuales del Campo', field: 'TEC', style: 'width: 20%', sortable: false },
        { name: 'CVE_FRACCION', align: 'center', label: 'Clave Fracción', field: 'CVE_FRACCION', style: 'width: 20%', sortable: false },
        { name: 'DOMICILIO', align: 'center', label: 'Domicilio', field: 'DOMICILIO', style: 'width: 20%', sortable: false },
        { name: 'LOCALIDAD', align: 'center', label: 'Localidad', field: 'LOCALIDAD', style: 'width: 20%', sortable: false },
        { name: 'RL_NOMBRE', align: 'center', label: 'Nombre', field: 'RL_NOMBRE', style: 'width: 20%', sortable: false },
        { name: 'COD_POS', align: 'center', label: 'Código Postal', field: 'COD_POS', style: 'width: 20%', sortable: false },
        { name: 'EMAIL_RL', align: 'center', label: 'Correo', field: 'EMAIL_RL', style: 'width: 20%', sortable: false },
        { name: 'TELEFONO', align: 'center', label: 'Telefono', field: 'TELEFONO', style: 'width: 20%', sortable: false },
        { name: 'GIRO', align: 'center', label: 'Giro', field: 'Giro', style: 'width: 20%', sortable: false },
        { name: 'num_empresas', align: 'center', label: 'Número de empresas', field: 'num_empresas', style: 'width: 20%', sortable: false }
      ],
      dataPatronal: [],
      filterPatronal: '',
      paginationNominal: {
        sortBy: 'curp',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsNominal: [
        { name: 'rfc', align: 'center', label: 'RFC Empresa', field: 'rfc', style: 'width: 20%', sortable: false },
        { name: 'nss', align: 'center', label: 'NSS', field: 'nss', style: 'width: 20%', sortable: false },
        { name: 'curp', align: 'center', label: 'CURP', field: 'curp', style: 'width: 20%', sortable: false },
        { name: 'sindicalizado', align: 'center', label: 'Sindicalizado', field: 'sindicalizado', style: 'width: 20%', sortable: false },
        { name: 'contrato_colectivo', align: 'center', label: 'Contrato Colectivo', field: 'contrato_colectivo', style: 'width: 20%', sortable: false },
        { name: 'conciliado', align: 'center', label: 'Conciliado', field: 'conciliado', style: 'width: 20%', sortable: false },
        { name: 'sal_cierre', align: 'center', label: 'Salario Diario', field: 'sal_cierre', style: 'width: 20%', sortable: false },
        { name: 'salario_mensual', align: 'center', label: 'Salario Mensual', field: 'salario_mensual', style: 'width: 20%', sortable: false },
        { name: 'registro', align: 'center', label: 'Registro', field: 'registro', style: 'width: 20%', sortable: false },
        { name: 'mod', align: 'center', label: 'Modalidad', field: 'mod', style: 'width: 20%', sortable: false }
        /* { name: 'cve_mun_final', align: 'center', label: 'Municipio', field: 'cve_mun_final', style: 'width: 20%', sortable: false },
        { name: 'cve_ent_final', align: 'center', label: 'Ent Federativa', field: 'cve_ent_final', style: 'width: 20%', sortable: false },
        { name: 'sal_cierre', align: 'center', label: 'Salario Cierre', field: 'sal_cierre', style: 'width: 20%', sortable: false }
        { name: 'Salario_minimo', align: 'center', label: 'Salario Minimo', field: 'Salario_minimo', style: 'width: 20%', sortable: false },
        { name: 'Nuevos_Asegurados', align: 'center', label: 'Nuevos Asegurados', field: 'Nuevos_Asegurados', style: 'width: 20%', sortable: false },
        { name: 'Num_Nominal', align: 'center', label: 'Número Nominal', field: 'Num_Nominal', style: 'width: 20%', sortable: false },
        { name: 'CVE_FRACCION', align: 'center', label: 'Registro Patronal', field: 'CVE_FRACCION', style: 'width: 20%', sortable: false } */
      ],
      filterSat: '',
      paginationICSOE: {
        sortBy: 'Folio_Contrato',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsICSOE: [
        { name: 'Numero_Seguridad_Social', align: 'center', label: 'Numero de Seguridad Social', field: 'Numero_Seguridad_Social', style: 'width: 20%', sortable: false },
        { name: 'CURP', align: 'center', label: 'CURP', field: 'CURP', style: 'width: 20%', sortable: false },
        { name: 'Nombre_RENAPO', align: 'center', label: 'Nombre', field: 'Nombre_RENAPO', style: 'width: 20%', sortable: false },
        { name: 'Primer_Apellido_RENAPO', align: 'center', label: 'Primer Apellido', field: 'Primer_Apellido_RENAPO', style: 'width: 20%', sortable: false },
        { name: 'Segundo_Apellido_RENAPO', align: 'center', label: 'Segundo Apellido', field: 'Segundo_Apellido_RENAPO', style: 'width: 20%', sortable: false },
        { name: 'Fecha_Inicio_Servicio', align: 'center', label: 'Fecha de Inicio Servicio', field: 'Fecha_Inicio_Servicio', style: 'width: 20%', sortable: false }
      ],
      dataNominal: [],
      filterNominal: '',
      dataICSOE: [],
      filterICSOE: '',
      idrfc: null,
      cve: null,
      paginationSNE: {
        sortBy: 'origen',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsSNE: [
        { name: 'origen', align: 'center', label: 'Origen', field: 'origen', style: 'width: 20%', sortable: true },
        { name: 'curp_bt', align: 'center', label: 'CURP', field: 'curp_bt', style: 'width: 20%', sortable: true },
        { name: 'nombre_bt', align: 'center', label: 'Nombre', field: 'nombre_bt', style: 'width: 20%', sortable: false },
        { name: 'edad_bt', align: 'center', label: 'Edad', field: 'edad_bt', style: 'width: 20%', sortable: false },
        { name: 'discapacidad_bt', align: 'center', label: 'Discapacidad', field: 'discapacidad_bt', style: 'width: 20%', sortable: false },
        { name: 'nivelestudio_bt', align: 'center', label: 'Estudio', field: 'nivelestudio_bt', style: 'width: 20%', sortable: false },
        { name: 'titulo_ofertaempleo', align: 'center', label: 'Oferta', field: 'titulo_ofertaempleo', style: 'width: 20%', sortable: false },
        { name: 'salario_ofertaempleo', align: 'center', label: 'Salario de la Oferta', field: 'salario_ofertaempleo', style: 'width: 20%', sortable: false }
      ],
      dataSNE: [],
      filterSNE: '',
      paginationRiegos: {
        sortBy: 'nss',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsRiegos: [
        { name: 'id_year_memoria', align: 'center', label: 'Año', field: 'id_year_memoria', style: 'width: 20%', sortable: false },
        { name: 'Id_tipo_riesgo', align: 'center', label: 'Tipo Riesgo', field: 'Id_tipo_riesgo', style: 'width: 20%', sortable: false },
        { name: 'id_riesgo_fisico', align: 'center', label: 'Riesgo Fisico', field: 'id_riesgo_fisico', style: 'width: 20%', sortable: false },
        { name: 'id_fraccion', align: 'center', label: 'Fracción', field: 'id_fraccion', style: 'width: 20%', sortable: false },
        { name: 'id_sexo', align: 'center', label: 'Sexo', field: 'id_sexo', style: 'width: 20%', sortable: false },
        { name: 'id_ocupacion_SINCO', align: 'center', label: 'Ocupación SINCO', field: 'id_ocupacion_SINCO', style: 'width: 20%', sortable: false },
        { name: 'id_consecuencia', align: 'center', label: 'Consecuencia', field: 'id_consecuencia', style: 'width: 20%', sortable: false },
        { name: 'id_acto_inseguro', align: 'center', label: 'Acto Inseguro', field: 'id_acto_inseguro', style: 'width: 20%', sortable: false },
        { name: 'id_dias_incapacidad', align: 'center', label: 'Dias de Incapacidad', field: 'id_dias_incapacidad', style: 'width: 20%', sortable: false },
        { name: 'id_entidad', align: 'center', label: 'Entidad', field: 'id_entidad', style: 'width: 20%', sortable: false },
        { name: 'id_causa_externa', align: 'center', label: 'Causa Externa', field: 'id_causa_externa', style: 'width: 20%', sortable: false },
        { name: 'id_natlesion', align: 'center', label: 'Naturaleza de la lesion', field: 'id_natlesion', style: 'width: 20%', sortable: false }
      ],
      dataRiegos: [],
      filterRiesgos: '',
      paginationRiesgosbyCvePatron: {
        sortBy: 'nss',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsRiesgosbyCvePatron: [
        { name: 'NSS', align: 'center', label: 'NSS', field: 'NSS', style: 'width: 20%', sortable: false },
        { name: 'curp', align: 'center', label: 'CURP', field: 'curp', style: 'width: 20%', sortable: false },
        { name: 'id_year_memoria', align: 'center', label: 'Año', field: 'id_year_memoria', style: 'width: 20%', sortable: false },
        { name: 'fecha_accidente', align: 'center', label: 'Fecha Accidente', field: 'fecha_accidente', style: 'width: 20%', sortable: false },
        { name: 'fecha_alta', align: 'center', label: 'Fecha Alta', field: 'fecha_alta', style: 'width: 20%', sortable: false },
        { name: 'Id_tipo_riesgo', align: 'center', label: 'Tipo Riesgo', field: 'Id_tipo_riesgo', style: 'width: 20%', sortable: false },
        { name: 'id_riesgo_fisico', align: 'center', label: 'Riesgo Fisico', field: 'id_riesgo_fisico', style: 'width: 20%', sortable: false },
        { name: 'id_fraccion', align: 'center', label: 'Fracción', field: 'id_fraccion', style: 'width: 20%', sortable: false },
        { name: 'id_sexo', align: 'center', label: 'Sexo', field: 'id_sexo', style: 'width: 20%', sortable: false },
        { name: 'id_ocupacion_SINCO', align: 'center', label: 'Ocupación SINCO', field: 'id_ocupacion_SINCO', style: 'width: 20%', sortable: false },
        { name: 'id_consecuencia', align: 'center', label: 'Consecuencia', field: 'id_consecuencia', style: 'width: 20%', sortable: false },
        { name: 'id_acto_inseguro', align: 'center', label: 'Acto Inseguro', field: 'id_acto_inseguro', style: 'width: 20%', sortable: false },
        { name: 'id_dias_incapacidad', align: 'center', label: 'Dias de Incapacidad', field: 'id_dias_incapacidad', style: 'width: 20%', sortable: false },
        { name: 'id_entidad', align: 'center', label: 'Entidad', field: 'id_entidad', style: 'width: 20%', sortable: false },
        { name: 'id_causa_externa', align: 'center', label: 'Causa Externa', field: 'id_causa_externa', style: 'width: 20%', sortable: false },
        { name: 'id_natlesion', align: 'center', label: 'Naturaleza de la lesion', field: 'id_natlesion', style: 'width: 20%', sortable: false }
      ],
      cantRiesgos: 0,
      dataRiesgosbyCvePatron: [],
      filterRiesgosbyCvePatron: '',
      paginationCfcrlbyCvePatron: {
        sortBy: 'nss',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsCfcrlbyCvePatron: [
        { name: 'curp', align: 'center', label: 'curp', field: 'curp', style: 'width: 20%', sortable: false },
        { name: 'nss', align: 'center', label: 'NSS', field: 'nss', style: 'width: 20%', sortable: false },
        { name: 'mod', align: 'center', label: 'Modalidad', field: 'mod', style: 'width: 20%', sortable: false },
        { name: 'sindicalizado', align: 'center', label: 'Sindicalizado', field: 'sindicalizado', style: 'width: 20%', sortable: false },
        { name: 'contrato_colectivo', align: 'center', label: 'Contrato Colectivo', field: 'contrato_colectivo', style: 'width: 20%', sortable: false },
        { name: 'conciliado', align: 'center', label: 'Conciliado', field: 'conciliado', style: 'width: 20%', sortable: false }
      ],
      cantCfcrl: 0,
      cantconciliado: 0,
      cantcontratocolectivo: 0,
      cantsindicalizado: 0,
      dataCfcrlbyCvePatron: [],
      filterCfcrlbyCvePatron: '',
      paginationSiaatbyCvePatron: {
        sortBy: 'nss',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsSiaatbyCvePatron2: [
        { name: 'nss', align: 'center', label: 'NSS', field: 'nss', style: 'width: 20%', sortable: false },
        { name: 'Curp', align: 'center', label: 'CURP', field: 'Curp', style: 'width: 20%', sortable: false },
        { name: 'Rfc', align: 'center', label: 'RFC Trabajador', field: 'Rfc', style: 'width: 20%', sortable: false },
        { name: 'Nombres', align: 'center', label: 'Nombres', field: 'Nombres', style: 'width: 20%', sortable: false },
        { name: 'Apellidos', align: 'center', label: 'Apellidos', field: 'Apellidos', style: 'width: 20%', sortable: false },
        { name: 'Edad', align: 'center', label: 'Edad', field: 'Edad', style: 'width: 20%', sortable: false },
        { name: 'FechaOcurrencia', align: 'center', label: 'FechaOcurrencia', field: 'FechaOcurrencia', style: 'width: 20%', sortable: false },
        { name: 'Registro', align: 'center', label: 'Registro', field: 'Registro', style: 'width: 20%', sortable: false }
      ],
      cantSiaat: 0,
      dataSiaatbyCvePatron: [],
      filterSiaatbyCvePatron: '',
      paginationVelavobyCvePatron: {
        sortBy: 'nss',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsVelavobyCvePatron: [
        { name: 'RFC', align: 'center', label: 'RFC Empresa', field: 'RFC', style: 'width: 20%', sortable: false },
        { name: 'Folio_VELAVO', align: 'center', label: 'Folio', field: 'Folio_VELAVO', style: 'width: 20%', sortable: false },
        { name: 'Fecha_envio', align: 'center', label: 'Fecha envio', field: 'Fecha_envio', style: 'width: 20%', sortable: false },
        { name: 'Trabajdores_en_CT', align: 'center', label: 'Trabajdores', field: 'Trabajdores_en_CT', style: 'width: 20%', sortable: false },
        { name: 'Materia', align: 'center', label: 'Materia', field: 'Materia', style: 'width: 20%', sortable: false },
        { name: 'Validacion_IMSS', align: 'center', label: 'Validación IMSS', field: 'Validacion_IMSS', style: 'width: 20%', sortable: false },
        { name: 'Ambito', align: 'center', label: 'Ambito', field: 'Ambito', style: 'width: 20%', sortable: false },
        { name: 'Estatus', align: 'center', label: 'Estatus', field: 'Estatus', style: 'width: 20%', sortable: false }
      ],
      cantVelavo: 0,
      dataVelavobyCvePatron: [],
      filterVelavobyCvePatron: '',
      paginationSiSubbyCvePatron: {
        sortBy: 'nss',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsSiSubbyCvePatron: [
        { name: 'RFC', align: 'center', label: 'RFC Empresa', field: 'RFC', style: 'width: 20%', sortable: false },
        { name: 'Registro', align: 'center', label: 'Registro', field: 'Registro', style: 'width: 20%', sortable: false },
        { name: 'nss', align: 'center', label: 'NSS', field: 'nss', style: 'width: 20%', sortable: false },
        { name: 'municipio_centro', align: 'center', label: 'Municipio', field: 'municipio_centro', style: 'width: 20%', sortable: false },
        { name: 'entidad_centro', align: 'center', label: 'Entidad', field: 'entidad_centro', style: 'width: 20%', sortable: false },
        { name: 'Folio_SISUB', align: 'center', label: 'Folio', field: 'Folio_SISUB', style: 'width: 20%', sortable: false }
      ],
      cantSiSub: 0,
      dataSiSubbyCvePatron: [],
      filterSiSubbyCvePatron: '',
      paginationIcsoebyCvePatron: {
        sortBy: 'Folio_Contrato',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsIcsoebyCvePatron: [
        { name: 'RFC', align: 'center', label: 'RFC Empresa', field: 'RFC', style: 'width: 20%', sortable: false },
        { name: 'Folio_Contrato', align: 'center', label: 'Folio', field: 'Folio_Contrato', style: 'width: 20%', sortable: false },
        { name: 'Fecha_inicio', align: 'center', label: 'Inicio', field: 'Fecha_inicio', style: 'width: 20%', sortable: false },
        { name: 'Fecha_fin', align: 'center', label: 'fin', field: 'Fecha_fin', style: 'width: 20%', sortable: false },
        { name: 'Num_trabajadores', align: 'center', label: 'Trabajadores', field: 'Num_trabajadores', style: 'width: 20%', sortable: false }
      ],
      FolioContratoAux: null,
      cantIcsoe: 0,
      dataIcsoebyCvePatron: [],
      filterIcsoebyCvePatron: '',
      paginationCfcrlPersona: {
        sortBy: 'nss',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsCfcrlPersona: [
        { name: 'rfc', align: 'center', label: 'RFC Empresa', field: 'rfc', style: 'width: 20%', sortable: false },
        { name: 'curp', align: 'center', label: 'CURP', field: 'curp', style: 'width: 20%', sortable: false },
        { name: 'nss', align: 'center', label: 'NSS', field: 'nss', style: 'width: 20%', sortable: false },
        { name: 'sindicalizado', align: 'center', label: 'Sindicalizado', field: 'sindicalizado', style: 'width: 20%', sortable: false },
        { name: 'contrato_colectivo', align: 'center', label: 'Contrato Colectivo', field: 'contrato_colectivo', style: 'width: 20%', sortable: false },
        { name: 'conciliado', align: 'center', label: 'Conciliado', field: 'conciliado', style: 'width: 20%', sortable: false }
      ],
      dataCfcrlPersona: [],
      filterCfcrlPersona: '',
      paginationDNEbyCvePatron: {
        sortBy: 'ct_num_trabajadores',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsDNEbyCvePatron: [
        { name: 'ct_num_trabajadores', align: 'center', label: 'Trabajadores', field: 'ct_num_trabajadores', style: 'width: 20%', sortable: false },
        { name: 'ct_prima_riesgo', align: 'center', label: 'Prima de Riesgo', field: 'ct_prima_riesgo', style: 'width: 20%', sortable: false },
        { name: 'ct_tiene_sindicato', align: 'center', label: 'Sindicato', field: 'ct_tiene_sindicato', style: 'width: 20%', sortable: false },
        { name: 'ct_fec_ultima_inspeccion', align: 'center', label: 'Última inspección', field: 'ct_fec_ultima_inspeccion', style: 'width: 20%', sortable: false }
      ],
      cantDNE: 0,
      dataDNEbyCvePatron: [],
      filterDNEbyCvePatron: '',
      paginationSIDILbyCvePatron: {
        sortBy: 'ct_num_trabajadores',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsSIDILbyCvePatron: [
        // { name: 'ct_num_trabajadores', align: 'center', label: 'Trabajadores', field: 'ct_num_trabajadores', style: 'width: 20%', sortable: false },
        { name: 'ind_presta_soc', align: 'center', label: 'Indicador Prestación', field: 'ind_presta_soc', style: 'width: 20%', sortable: false },
        { name: 'ind_seg_soc', align: 'center', label: 'Indicador Seguridad Social', field: 'ind_seg_soc', style: 'width: 20%', sortable: false },
        { name: 'ind_brecha_gen', align: 'center', label: 'Indicador Brecha de Genero', field: 'ind_brecha_gen', style: 'width: 20%', sortable: false },
        { name: 'ind_subcontrat', align: 'center', label: 'Indicador Subcontratación', field: 'ind_subcontrat', style: 'width: 20%', sortable: false },
        { name: 'riesgo', align: 'center', label: 'Factor de Riesgo', field: 'riesgo', style: 'width: 20%', sortable: false }
      ],
      cantSIDIL: 0,
      dataSIDILbyCvePatron: [],
      filterSIDILbyCvePatron: '',
      paginationINMbyCvePatron: {
        sortBy: 'ct_num_trabajadores',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsINMbyCvePatron: [
        // { name: 'ct_num_trabajadores', align: 'center', label: 'Trabajadores', field: 'ct_num_trabajadores', style: 'width: 20%', sortable: false },
        // { name: 'ESTADO', align: 'center', label: 'Estado', field: 'ESTADO', style: 'width: 20%', sortable: false },
        { name: 'AREA', align: 'center', label: 'Área', field: 'AREA', style: 'width: 20%', sortable: false },
        { name: 'TIPO', align: 'center', label: 'Tipo', field: 'TIPO', style: 'width: 20%', sortable: false },
        { name: 'FECHA_CREACION', align: 'center', label: 'Fecha Creación', field: 'FECHA_CREACION', style: 'width: 20%', sortable: false },
        { name: 'TIPO_RESOLUCION', align: 'center', label: 'Tipo Resolución', field: 'TIPO_RESOLUCION', style: 'width: 20%', sortable: false },
        // { name: 'NUT', align: 'center', label: 'Nut', field: 'NUT', style: 'width: 20%', sortable: false },
        { name: 'NOMBRE', align: 'center', label: 'Nombre', field: 'NOMBRE', style: 'width: 20%', sortable: false },
        { name: 'GIRO_EMPRESARIAL', align: 'center', label: 'Giro Empresarial', field: 'GIRO_EMPRESARIAL', style: 'width: 20%', sortable: false },
        // { name: 'CIE', align: 'center', label: 'Cie', field: 'CIE', style: 'width: 20%', sortable: false },
        { name: 'CORREO_NOTIFICACION', align: 'center', label: 'Correo notificación', field: 'CORREO_NOTIFICACION', style: 'width: 20%', sortable: false }
      ],
      cantINM: 0,
      dataINMbyCvePatron: [],
      filterINMbyCvePatron: '',
      paginationISSTECuentas: {
        sortBy: 'nombre_completo',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsISSTECuentas: [
        { name: 'nombre_completo', align: 'center', label: 'Nombre', field: 'nombre_completo', style: 'width: 20%', sortable: true },
        { name: 'edad', align: 'center', label: 'Edad', field: 'edad', style: 'width: 20%', sortable: false },
        { name: 'sexo', align: 'center', label: 'Sexo', field: 'sexo', style: 'width: 20%', sortable: false },
        { name: 'sueldo_issste', align: 'center', label: 'Sueldo ISSSTE', field: 'sueldo_issste', style: 'width: 20%', sortable: true },
        { name: 'anios_antiguedad', align: 'center', label: 'Antiguedad', field: 'anios_antiguedad', style: 'width: 20%', sortable: false },
        { name: 'tipo_registro', align: 'center', label: 'Tipo de registro', field: 'tipo_registro', style: 'width: 20%', sortable: false },
        { name: 'bono', align: 'center', label: 'Bono', field: 'bono', style: 'width: 20%', sortable: false },
        { name: 'anio_envio_bono', align: 'center', label: 'Año de bono', field: 'anio_envio_bono', style: 'width: 20%', sortable: false },
        { name: 'anio_vencimiento_bono', align: 'center', label: 'Vencimiento de bono', field: 'anio_vencimiento_bono', style: 'width: 20%', sortable: false },
        { name: 'fecha_alta', align: 'center', label: 'Fecha de Alta', field: 'fecha_alta', style: 'width: 20%', sortable: false }
      ],
      cantISSTECuentas: 0,
      dataISSTECuentas: [],
      filterISSTECuentas: '',
      paginationISSTEDecimo: {
        sortBy: 'nombre_completo',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsISSTEDecimo: [
        { name: 'nombre_completo', align: 'center', label: 'Nombre', field: 'nombre_completo', style: 'width: 20%', sortable: true },
        { name: 'edad', align: 'center', label: 'Edad', field: 'edad', style: 'width: 20%', sortable: false },
        { name: 'sexo', align: 'center', label: 'Sexo', field: 'sexo', style: 'width: 20%', sortable: false },
        { name: 'sueldo_issste', align: 'center', label: 'Sueldo ISSSTE', field: 'sueldo_issste', style: 'width: 20%', sortable: true },
        { name: 'anios_antiguedad', align: 'center', label: 'Antiguedad', field: 'anios_antiguedad', style: 'width: 20%', sortable: false },
        { name: 'fecha_alta', align: 'center', label: 'Fecha de Alta', field: 'fecha_alta', style: 'width: 20%', sortable: false }
      ],
      cantISSTEDecimo: 0,
      dataISSTEDecimo: [],
      filterISSTEDecimo: '',
      paginationISSTEDerechohabientes: {
        sortBy: 'nombre_completo',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsISSTEDerechohabientes: [
        { name: 'nombre_completo', align: 'center', label: 'Nombre', field: 'nombre_completo', style: 'width: 20%', sortable: true },
        { name: 'sexo', align: 'center', label: 'Sexo', field: 'sexo', style: 'width: 20%', sortable: false },
        { name: 'sueldo_issste', align: 'center', label: 'Sueldo ISSSTE', field: 'sueldo_issste', style: 'width: 20%', sortable: true },
        { name: 'antig', align: 'center', label: 'Antiguedad', field: 'antig', style: 'width: 20%', sortable: false },
        { name: 'nombramiento', align: 'center', label: 'Nombramiento', field: 'nombramiento', style: 'width: 20%', sortable: false },
        { name: 'fecha_alta', align: 'center', label: 'Fecha Alta', field: 'fecha_alta', style: 'width: 20%', sortable: false },
        { name: 'fecha_ingreso', align: 'center', label: 'Fecha Ingreso', field: 'fecha_ingreso', style: 'width: 20%', sortable: false }
      ],
      cantISSTEDerechohabientes: 0,
      dataISSTEDerechohabientes: [],
      filterISSTEDerechohabientes: '',
      paginationISSTEPensionados: {
        sortBy: 'nombre_completo',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsISSTEPensionados: [
        { name: 'nombre_completo', align: 'center', label: 'Nombre', field: 'nombre_completo', style: 'width: 20%', sortable: true },
        { name: 'sexo', align: 'center', label: 'Sexo', field: 'sexo', style: 'width: 20%', sortable: false },
        { name: 'primera_fecha', align: 'center', label: 'Primera Fecha', field: 'primera_fecha', style: 'width: 20%', sortable: false },
        { name: 'tiempo_serv', align: 'center', label: 'Antiguedad', field: 'tiempo_serv', style: 'width: 20%', sortable: false },
        { name: 'tip_pen_org_des', align: 'center', label: 'Tipo', field: 'tip_pen_org_des', style: 'width: 20%', sortable: false },
        { name: 'porcentaje', align: 'center', label: 'Porcentaje', field: 'porcentaje', style: 'width: 20%', sortable: false },
        { name: 'importe_pen', align: 'center', label: 'Importe', field: 'importe_pen', style: 'width: 20%', sortable: true },
        { name: 'neto_pagar', align: 'center', label: 'Neto a pagar', field: 'neto_pagar', style: 'width: 20%', sortable: true }
      ],
      cantISSTEPensionados: 0,
      dataISSTEPensionados: [],
      filterISSTEPensionados: '',
      paginationSneRFC: {
        sortBy: 'ct_num_trabajadores',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsSneRFC: [
        { name: 'origen', align: 'center', label: 'Origen', field: 'origen', style: 'width: 20%', sortable: false },
        { name: 'folio_ofertaempleo', align: 'center', label: 'Folio Oferta', field: 'folio_ofertaempleo', style: 'width: 20%', sortable: false, format: val => formatNumberZero(val) },
        { name: 'plazasregistradas_oe', align: 'center', label: 'Plazas Registradas', field: 'plazasregistradas_oe', style: 'width: 20%', sortable: false, format: val => formatNumberZero(val) },
        { name: 'salario_ofertaempleo', align: 'center', label: 'Salario Oferta', field: 'salario_ofertaempleo', style: 'width: 20%', sortable: false, format: val => `$${formatNumberPrice(val)}` },
        { name: 'finvigencia_oe', align: 'center', label: 'Fin Vigencia', field: 'finvigencia_oe', style: 'width: 20%', sortable: false }
      ],
      dataSneRFC: [],
      filterSneRFC: '',
      paginationSneBolsa: {
        sortBy: 'folio_ofertaempleo',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      paginationSneFeria: {
        sortBy: 'folio_ofertaempleo',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      paginationSnePortal: {
        sortBy: 'folio_ofertaempleo',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      filterSneBolsa: '', // Filtro de búsqueda para la tab de bolsa
      filterSneFeria: '', // Filtro de búsqueda para la tab de feria
      filterSnePortal: '', // Filtro de búsqueda para la tab de portal
      paginationInfonacotbyCvePatron: {
        sortBy: 'RFC',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsInfonacotbyCvePatron: [
        { name: 'RFC', align: 'center', label: 'RFC', field: 'RFC', style: 'width: 20%', sortable: false },
        { name: 'cve_patron_8', align: 'center', label: 'Registro Patronal', field: 'cve_patron_8', style: 'width: 20%', sortable: false },
        { name: 'Estatus', align: 'center', label: 'Estatus', field: 'Estatus', style: 'width: 20%', sortable: false },
        // { name: 'RAZON_SOCIAL', align: 'center', label: 'Razón social', field: 'RAZON_SOCIAL', style: 'width: 20%', sortable: false },
        { name: 'NUM_CREDITO', align: 'center', label: 'Número de Creditos', field: 'NUM_CREDITO', style: 'width: 20%', sortable: false },
        { name: 'SALDO', align: 'center', label: 'Saldo', field: 'SALDO', style: 'width: 20%', sortable: false }
      ],
      cantInfonacot: 0,
      dataInfonacotbyCvePatron: [],
      filterInfonacotbyCvePatron: '',
      nss: null,
      curp: null,
      cve_patron: null,
      tab2: 'sat',
      nodataPTU: '',
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
      ],
      controladorserachClave: null,
      controladorCentro: null,
      controladorNominal: null,
      controladorTrabajadores: null,
      controladorTrabajadoresICSOE: null,
      controladorTrabajadoresSubregistro: null,
      controladorTrabajadoresSNE: null,
      banderaRiesgos: null,
      banderaSiaat: null,
      banderaSat: null,
      banderaInfonavit: null,
      banderaCfcrl: null,
      nssTrabajador: null,
      curpTrabajador: null,
      dataCfcrl: null,
      dataSiaat: [],
      paginationSiaat: {
        sortBy: 'curp',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsSiaat: [
        { name: 'Curp', align: 'center', label: 'CURP', field: 'Curp', style: 'width: 20%', sortable: false },
        { name: 'Rfc', align: 'center', label: 'RFC Trabajador', field: 'Rfc', style: 'width: 20%', sortable: false },
        { name: 'Nombres', align: 'center', label: 'Nombres', field: 'Nombres', style: 'width: 20%', sortable: false },
        { name: 'Apellidos', align: 'center', label: 'Apellidos', field: 'Apellidos', style: 'width: 20%', sortable: false },
        { name: 'Edad', align: 'center', label: 'Edad', field: 'Edad', style: 'width: 20%', sortable: false }
      ],
      filterSiaat: '',
      dataSat: [],
      paginationSat: {
        sortBy: 'ReceptorCurp',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsSat: [
        { name: 'ReceptorRFC', align: 'center', label: 'RFC Trabajador', field: 'ReceptorRFC', style: 'width: 20%', sortable: false },
        { name: 'EmisorRFC', align: 'center', label: 'RFC Empresa', field: 'EmisorRFC', style: 'width: 20%', sortable: false },
        { name: 'EmisorRegistroPatronal', align: 'center', label: 'Registro Patronal', field: 'EmisorRegistroPatronal', style: 'width: 20%', sortable: false },
        { name: 'ReceptorCurp', align: 'center', label: 'CURP', field: 'ReceptorCurp', style: 'width: 20%', sortable: false },
        { name: 'ReceptorNumSeguridadSocial', align: 'center', label: 'NSS', field: 'ReceptorNumSeguridadSocial', style: 'width: 20%', sortable: false },
        { name: 'NumDiasPagados_sum', align: 'center', label: 'Días Pagados', field: 'NumDiasPagados_sum', style: 'width: 20%', sortable: false },
        { name: 'Descuento_sum', align: 'center', label: 'Descuento', field: 'Descuento_sum', style: 'width: 20%', sortable: false },
        { name: 'Total_sum', align: 'center', label: 'Pago', field: 'Total_sum', style: 'width: 20%', sortable: false }
      ],
      filterEA: '',
      dataEA: [],
      paginationEA: {
        sortBy: 'Cruce_Trabajadores',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsEA: [
        // { name: 'Periodo', align: 'center', label: 'Periodo', field: 'Periodo', style: 'width: 20%', sortable: false },
        { name: 'EmisorRFC', align: 'center', label: 'RFC Empresa', field: 'EmisorRFC', style: 'width: 20%', sortable: false },
        { name: 'Nombre_Empresa', align: 'center', label: 'Nombre Empresa', field: 'Nombre_Empresa', style: 'width: 20%', sortable: true },
        { name: 'desc_entidad', align: 'center', label: 'Entidad', field: 'desc_entidad', style: 'width: 20%', sortable: false },
        { name: 'EmisorRegistroPatronal', align: 'center', label: 'Registro Patronal', field: 'EmisorRegistroPatronal', style: 'width: 20%', sortable: false },
        { name: 'Trabajadores_solo_SAT', align: 'center', label: 'Trabajadores solo SAT', field: 'Trabajadores_solo_SAT', style: 'width: 20%', sortable: true },
        { name: 'Trabajadores_solo_IMSS', align: 'center', label: 'Trabajadores solo IMSS', field: 'Trabajadores_solo_IMSS', style: 'width: 20%', sortable: true },
        { name: 'Cruce_Trabajadores', align: 'center', label: 'Cruce Trabajadores', field: 'Cruce_Trabajadores', style: 'width: 20%', sortable: true }
        // { name: 'DESC_DIVISION', align: 'center', label: 'División de Actividad Económica', field: 'DESC_DIVISION', style: 'width: 20%', sortable: false },
        // { name: 'DESC_GPO_ACT', align: 'center', label: 'Grupo de Actividad Económica', field: 'DESC_GPO_ACT', style: 'width: 20%', sortable: false },
        // { name: 'DESC_FRACION', align: 'center', label: 'Actividad Económica', field: 'DESC_FRACION', style: 'width: 20%', sortable: false }
        // { name: 'REPSE', align: 'center', label: 'REPSE', field: 'REPSE', style: 'width: 20%, margin-left: 10%', sortable: false }
        // { name: 'Total_Nomina', align: 'center', label: 'Total', field: 'Total_Nomina', style: 'width: 20%', sortable: false },
        // { name: 'Descuento_Total', align: 'center', label: 'Descuento', field: 'Descuento_Total', style: 'width: 20%', sortable: false },
        // { name: 'Num_Centros_SAT', align: 'center', label: 'N°. Centros SAT', field: 'Num_Centros_SAT', style: 'width: 20%', sortable: false },
        // { name: 'TA_SAT', align: 'center', label: 'TA SAT', field: 'TA SAT', style: 'width: 20%', sortable: false },
        // { name: 'Num_Centros_IMSS', align: 'center', label: 'N°. Centros IMSS', field: 'Num_Centros_IMSS', style: 'width: 20%', sortable: false },
        // { name: 'TA_IMSS', align: 'center', label: 'TA IMSS', field: 'TA_IMSS', style: 'width: 20%', sortable: false },
        // { name: 'Id_Organismo', align: 'center', label: 'Organismo', field: 'Id_Organismo', style: 'width: 20%', sortable: false }
      ],
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
      EANacional: {
        Num_Centros_SAT: null,
        TA_SAT: null,
        Num_Centros_IMSS: null,
        TA_IMSS: null,
        total: null,
        descuento: null,
        organismo: null,
        institucion: null,
        TA_Hombres_IMSS: null,
        TA_Mujeres_IMSS: null,
        TA_Hombres_SAT: null,
        TA_Mujeres_SAT: null
      },
      selectActividad: [],
      Actividad_id: '',
      selectEntidad: [],
      Entidad_id: null,
      selectGPO: [],
      GPO_id: '',
      selectDIV: [],
      DIV_id: null,
      msgEstatal: '',
      msgNacional: '',
      msgCTI: '',
      paginationTrabajadores: {
        sortBy: 'sal_cierre',
        descending: true,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsTrabajadores: [
        { name: 'donde_esta', align: 'center', label: 'Subregistro', field: 'donde_esta', style: 'width: 20%', sortable: true },
        { name: 'ReceptorRFC', align: 'center', label: 'RFC Trabajador', field: 'ReceptorRFC', style: 'width: 20%', sortable: false },
        { name: 'ReceptorNumSeguridadSocial', align: 'center', label: 'NSS', field: 'ReceptorNumSeguridadSocial', style: 'width: 20%', sortable: false },
        { name: 'ReceptorCurp', align: 'center', label: 'CURP', field: 'ReceptorCurp', style: 'width: 20%', sortable: true },
        { name: 'cve_patron_8', align: 'center', label: 'Registro', field: 'cve_patron_8', style: 'width: 20%', sortable: false },
        { name: 'SUM_DIAS', align: 'center', label: 'Días Pagados', field: 'SUM_DIAS', style: 'width: 20%', sortable: false },
        { name: 'SUM_Total', align: 'center', label: 'Total', field: 'SUM_Total', style: 'width: 20%', sortable: true },
        { name: 'Sum_Descuento', align: 'center', label: 'Descuento', field: 'Sum_Descuento', style: 'width: 20%', sortable: true },
        { name: 'ReceptorSalarioDiarioIntegrado', align: 'center', label: 'Salario Diario SAT', field: 'ReceptorSalarioDiarioIntegrado', style: 'width: 20%', sortable: true },
        // { name: 'salario_mensual_sat', align: 'center', label: 'Salario Mensual SAT', field: 'salario_mensual_sat', style: 'width: 20%', sortable: false },
        { name: 'sal_cierre', align: 'center', label: 'Salario Diario IMSS', field: 'sal_cierre', style: 'width: 20%', sortable: true }
        // { name: 'salario_mensual', align: 'center', label: 'Salario Mensual IMSS', field: 'salario_mensual', style: 'width: 20%', sortable: false }
      ],
      ICSOE: {
        Folio_Contrato: null,
        Fecha_inicio: null,
        Fecha_fin: null,
        Num_trabajadores: null
      },
      dataTrabajadores: [],
      filterTrabajadores: '',
      infoApi: null,
      datarepse: [],
      MPImss: false,
      MPIssste: false,
      MPSat: false,
      MPSiaat: false,
      MPUtd: false,
      MPOtros: false,
      paginationTrabajadoresSNE: {
        sortBy: 'Bandera',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsTrabajadoresSNE: [
        { name: 'origen', align: 'center', label: 'Origen', field: 'origen', style: 'width: 20%', sortable: true },
        { name: 'curp_bt', align: 'center', label: 'CURP', field: 'curp_bt', style: 'width: 20%', sortable: true },
        { name: 'nombre_bt', align: 'center', label: 'Nombre', field: 'nombre_bt', style: 'width: 20%', sortable: false },
        { name: 'edad_bt', align: 'center', label: 'Edad', field: 'edad_bt', style: 'width: 20%', sortable: false },
        { name: 'discapacidad_bt', align: 'center', label: 'Discapacidad', field: 'discapacidad_bt', style: 'width: 20%', sortable: false },
        { name: 'nivelestudio_bt', align: 'center', label: 'Estudio', field: 'nivelestudio_bt', style: 'width: 20%', sortable: false },
        { name: 'titulo_ofertaempleo', align: 'center', label: 'Oferta', field: 'titulo_ofertaempleo', style: 'width: 20%', sortable: false },
        { name: 'salario_ofertaempleo', align: 'center', label: 'Salario de la Oferta', field: 'salario_ofertaempleo', style: 'width: 20%', sortable: false }
      ],
      dataTrabajadoresSNE: [],
      filterTrabajadoresSNE: '',
      dataRenapo: [],
      columnsRENAPO: [
        { name: 'CURP', align: 'center', label: 'CURP', field: 'CURP', style: 'width: 20%', sortable: false },
        { name: 'nombres', align: 'center', label: 'Nombre(s)', field: 'nombres', style: 'width: 20%', sortable: false },
        { name: 'apellido1', align: 'center', label: 'Primer apellido', field: 'apellido1', style: 'width: 20%', sortable: false },
        { name: 'apellido2', align: 'center', label: 'Segundo Apellido', field: 'apellido2', style: 'width: 20%', sortable: false },
        { name: 'sexo', align: 'center', label: 'Sexo', field: 'sexo', style: 'width: 20%', sortable: false },
        { name: 'fechNac', align: 'center', label: 'Fecha de nacimiento', field: 'fechNac', style: 'width: 20%', sortable: false },
        { name: 'nacionalidad', align: 'center', label: 'Nacionalidad', field: 'nacionalidad', style: 'width: 20%', sortable: false },
        { name: 'numEntidadReg', align: 'center', label: 'Entidad de nacimiento', field: 'numEntidadReg', style: 'width: 20%', sortable: false }
      ],
      infoTimeout: null,
      infoMensahe: '',
      isInfoVisible: false,
      response: [],
      showModalGra: false
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
    totalSumINM () {
      // Convertir los valores de INM_cubo de string a número antes de sumar
      return this.dataEA
        .filter(row => !isNaN(parseFloat(row.INM_cubo))) // Filtrar solo valores que se puedan convertir a número
        .reduce((acc, row) => {
          const value = parseFloat(row.INM_cubo) // Convertir string a número
          return acc + value
        }, 0)
    },
    filteredDataBolsa () {
      return this.dataSneRFC.filter(row => row.origen === 'Bolsa de trabajo')
    },
    filteredDataFeria () {
      return this.dataSneRFC.filter(row => row.origen === 'Ferias de Empleo')
    },
    filteredDataPortal () {
      return this.dataSneRFC.filter(row => row.origen === 'Portal del Empleo')
    },
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
    handleSortChange ({ prop, order }) {
      if (!prop) {
        this.paginationISSTEDerechohabientes.sortBy = 'nombre_completo'
      } else {
        this.paginationISSTEDerechohabientes.sortBy = prop
      }
      this.paginationISSTEDerechohabientes.descending = order === 'desc'
      // this.fetchFromServerISSTEDerechohabientes(this.EmisorRFCAux, this.NombreAux)
    },
    MostrarGrafica (num) {
      this.showLoading('')
      const params = {}
      params.EmisorRFC = this.EmisorRFCAux
      this.response = api.get('/get-data-graficas', params).then(({ data }) => {
        this.showModalGra = true
        if (num === 1) {
          const tpt = this.response = data.trabajadores[0].tpt
          const tp = this.response = data.trabajadores[0].te
          this.chartOptions.series[0].data = [
            { value: tpt, name: 'Trabajadores Permanentes' },
            { value: tp, name: 'Trabajadores Eventuales' }
          ]
          this.chartOptions.series[0].name = 'Número'
          this.chartOptions.title.text = 'Trabajadores Asegurados'
        }
        if (num === 2) {
          const Hombres = this.response = data.trabajadores[0].SIAAT_Hombres
          const Mujeres = this.response = data.trabajadores[0].SIAAT_Mujeres
          this.chartOptions.series[0].data = [
            { value: Hombres, name: 'Hombres' },
            { value: Mujeres, name: 'Mujeres' }
          ]
          this.chartOptions.series[0].name = 'Número'
          this.chartOptions.title.text = 'Avisos de Accidentes SIAAT'
        }
        this.$q.loading.hide()
      }).catch(error => error)
    },
    downloadChart () {
      const chart = this.$refs.modalChart.chart
      if (chart) {
        const dataURL = chart.getDataURL({
          type: 'png',
          backgroundColor: '#fff'
        })
        const link = document.createElement('a')
        link.href = dataURL
        link.download = 'grafico_trabajadores.png'
        link.click()
      }
    },
    mostrarMensajeInfo (mensaje) {
      if (this.infoTimeout) {
        clearTimeout(this.infoTimeout)
      }
      this.infoMensahe = ''
      this.infoMensahe = mensaje
      this.isInfoVisible = true
      this.infoTimeout = setTimeout(() => {
        this.isInfoVisible = false
      }, 7000)
    },
    processDataRenapo (data) {
      // Extraer y transformar datos
      const result = data?.data?.consultarPorCurpOResult
      this.dataRenapo = result ? [result] : []
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
        this.controladorserachClave = api.get('/empresas-searchClave', params).then(({ data }) => {
          this.claveProdOptions = data.options
          this.controladorserachClave = null
        }).catch(error => error)
      })
    },
    /* wrapCsvValue (val, formatFn, row) {
      let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val
      formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)
      formatted = formatted.split('"').join('""')
      return `"${formatted}"`
    }, */
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
    /* exportTable (columns, data, name) {
      // naive encoding to csv format
      const content = [columns.map(col => this.wrapCsvValue(col.label))].concat(
        data.map(row => columns.map(col => this.wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format,
          row
        )).join(','))
      ).join('\r\n')
      const status = exportFile(
        name,
        content,
        'text/csv'
      )
      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }, */
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
    fetchFromServerNuevo () {
      // this.isRowClicked = false
      // this.filaSeleccionada = null
      this.MostrarRB = true
      // this.cleamInputsBuscar()
      /* this.qTableRequest({
        pagination: this.pagination,
        filter: this.filter
      }) */
      this.qTableRequestEA2({
        pagination: this.paginationEA,
        filter: this.filterEA
      })
    },
    editSelectedRow (id) {
    },
    cleamInputs () {
      this.ptu.OtrosFiltros = []
      this.ptu.tipo_inst_seguridad = null
      this.MenuPrincipalBotones = false
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
      this.EANacional.TA_IMSS = null
      this.EANacional.TA_SAT = null
      this.EANacional.Num_Centros_IMSS = null
      this.EANacional.Num_Centros_SAT = null
      this.EANacional.total = null
      this.EANacional.descuento = null
      this.EANacional.organismo = null
      this.EANacional.institucion = null
      this.EANacional.TA_Hombres_IMSS = null
      this.EANacional.TA_Mujeres_IMSS = null
      this.EANacional.TA_Hombres_SAT = null
      this.EANacional.TA_Mujeres_SAT = null
      this.factptu.Jurisdicción = null
      this.factptu.TipodePersona = null
      this.factptu.NombredelCentrodetrabajo = null
      this.factptu.RFC = null
      this.factptu.NombredeCalle = null
      this.factptu.NúmeroExterior = null
      this.factptu.NúmeroInterior = null
      this.factptu.Colonia = null
      this.factptu.Municipio = null
      this.factptu.CódigoPostal = null
      this.factptu.Estado = null
      this.factptu.ClavedelaActividadEconómica = null
      this.factptu.UtilidadFiscal = null
      this.factptu.PTUGeneradaenelEjercicio = null
      this.factptu.PTUPagadaenelEjercicio = null
      this.repse.Razon_social = false
      this.repse.Estado = false
      this.repse.Municipio = false
      this.repse.Zona = false
      this.repse.Representante = false
      this.repse.Tipo_de_emision = false
      this.repse.Categoria_REPSE = false
      this.repse.Sector = false
      this.repse.No_Empleados = false
      this.repse.Empleados = false
      this.repse.Telefono = false
      this.repse.Telefono_de_apoyo = false
      this.repse.Fecha_emision_1er_Aviso = false
      this.repse.Fecha_Emision_2do_Aviso = false
      this.repse.Fecha_Emision_3er_Aviso = false
      this.repse.Fecha_emision_ultima_actualizacion = false
      this.repse.N_de_acuerdo = false
      this.repse.Registro_REPSE_Vigente = false
      this.repse.Fecha_de_Cancelacion = false
      this.repse.Persona_Fisica_o_Moral = false
      this.repse.Latitud = false
      this.repse.Longitud = false
      this.repse.Correo_de_Apoyo = false
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
      this.EANacional.Num_Centros_SAT = null
      this.EANacional.TA_SAT = null
      this.EANacional.Num_Centros_IMSS = null
      this.EANacional.TA_IMSS = null
      this.EANacional.total = null
      this.EANacional.descuento = null
      this.EANacional.organismo = null
      this.EANacional.institucion = null
      this.EANacional.TA_Hombres_IMSS = null
      this.EANacional.TA_Mujeres_IMSS = null
      this.EANacional.TA_Hombres_SAT = null
      this.EANacional.TA_Mujeres_SAT = null
      this.dataPatronal = []
      this.pagination.rowsPerPage = 5
      this.paginationPatronal.page = 1
      this.paginationNominal.rowsPerPage = 5
      this.paginationNominal.page = 1
      this.data = []
      this.dataEA = []
      this.cubos.inm = null
      this.cubos.ptu = null
      this.cubos.repse = null
      this.cubos.velavo = null
      this.cubos.sidil = null
      this.cubos.inspecciones = null
      this.cubos.infonacot = null
      this.cubos.extranjeros = null
      this.mostrar = ''
      this.mostrarNominal = false
      this.mostrarPrincipal = false
      this.mostrarPrincipal2 = false
      this.mostrarREPSE = false
      this.mostrarTrabajadores = false
      this.mostrarMenuPrincipal = false
      this.mostrarMenuPtu = false
      this.mostrarMenuREPSE = false
      this.MenuCentros = false
      this.MenuEstatal = false
      this.MenuIcsoe = false
      this.MenuRiesgos = false
      this.MenuSiaat = false
      this.MenuSisub = false
      this.Menuccfcrl = false
      this.MenuDNE = false
      this.MenuSne = false
      this.MenuVelavo = false
      this.MenuUtd = false
      this.selectGPO = []
      this.selectActividad = []
      this.GPO_id = null
      this.Actividad_id = null
      this.DIV_id = null
      this.Entidad_id = null
      this.buttonStates.MenuINM = false
      this.buttonStates.MenuSIDIL = false
      this.buttonStates.MenuInfonacot = false
      this.buttonStates.MenuIssste = false
      this.buttonStates.MenuIsssteCuentas = false
      this.buttonStates.MenuIsssteDecimo = false
      this.MenuIssste = false
      this.MenuIsssteCuentas = false
      this.MenuIsssteDecimo = false
      this.MenuIssstePensionados = false
      this.isRowClicked = false
      this.ptu.tamanio = null
      this.ptu.num_extranjeros = null
      this.ptu.rango_imss = null
      this.ptu.rango_sat = null
    },
    cleamInputsBuscar () {
      this.MenuPrincipalBotones = null
      this.factptu.Jurisdicción = null
      this.factptu.TipodePersona = null
      this.factptu.NombredelCentrodetrabajo = null
      this.factptu.RFC = null
      this.factptu.NombredeCalle = null
      this.factptu.NúmeroExterior = null
      this.factptu.NúmeroInterior = null
      this.factptu.Colonia = null
      this.factptu.Municipio = null
      this.factptu.CódigoPostal = null
      this.factptu.Estado = null
      this.factptu.ClavedelaActividadEconómica = null
      this.factptu.UtilidadFiscal = null
      this.factptu.PTUGeneradaenelEjercicio = null
      this.factptu.PTUPagadaenelEjercicio = null
      this.dataPatronal = []
      this.pagination.rowsPerPage = 5
      this.paginationPatronal.page = 1
      this.paginationNominal.rowsPerPage = 5
      this.paginationNominal.page = 1
      this.data = []
      this.cubos.inm = null
      this.cubos.ptu = null
      this.cubos.repse = null
      this.cubos.velavo = null
      this.cubos.sidil = null
      this.cubos.inspecciones = null
      this.cubos.infonacot = null
      this.cubos.extranjeros = null
      this.repse.Estado = false
      this.repse.Municipio = false
      this.repse.Zona = false
      this.repse.Representante = false
      this.repse.Tipo_de_emision = false
      this.repse.Categoria_REPSE = false
      this.repse.Sector = false
      this.repse.No_Empleados = false
      this.repse.Empleados = false
      this.repse.Telefono = false
      this.repse.Telefono_de_apoyo = false
      this.repse.Fecha_emision_1er_Aviso = false
      this.repse.Fecha_Emision_2do_Aviso = false
      this.repse.Fecha_Emision_3er_Aviso = false
      this.repse.Fecha_emision_ultima_actualizacion = false
      this.repse.N_de_acuerdo = false
      this.repse.Registro_REPSE_Vigente = false
      this.repse.Fecha_de_Cancelacion = false
      this.repse.Persona_Fisica_o_Moral = false
      this.repse.Latitud = false
      this.repse.Longitud = false
      this.repse.Correo_de_Apoyo = false
      this.EA.Num_Centros_SAT = false
      this.EA.TA_SAT = false
      this.EA.Num_Centros_IMSS = false
      this.EA.TA_IMSS = false
      this.EA.TA_SOLO_SAT = null
      this.EA.TA_SOLO_IMSS = null
      this.EA.TA_SOLO_SAT_MAYOR = null
      this.EA.TA_SOLO_SAT_MENOR = null
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
      this.EANacional.Num_Centros_SAT = null
      this.EANacional.TA_SAT = null
      this.EANacional.Num_Centros_IMSS = null
      this.EANacional.TA_IMSS = null
      this.EANacional.total = null
      this.EANacional.descuento = null
      this.EANacional.organismo = null
      this.EANacional.institucion = null
      this.EANacional.TA_Hombres_IMSS = null
      this.EANacional.TA_Mujeres_IMSS = null
      this.EANacional.TA_Hombres_SAT = null
      this.EANacional.TA_Mujeres_SAT = null
      this.mostrar = ''
      this.mostrarNominal = false
      this.mostrarPrincipal = false
      this.mostrarPrincipal2 = false
      this.mostrarREPSE = false
      this.mostrarTrabajadores = false
      this.mostrarMenuPrincipal = false
      this.mostrarMenuPtu = false
      this.mostrarMenuREPSE = false
      this.MenuCentros = false
      this.MenuEstatal = false
      this.MenuIcsoe = false
      this.MenuRiesgos = false
      this.MenuSiaat = false
      this.MenuSisub = false
      this.Menuccfcrl = false
      this.MenuDNE = false
      this.MenuSne = false
      this.MenuVelavo = false
      this.MenuUtd = false
      this.pagination.sortBy = 'RFC'
      this.pagination.descending = false
      this.pagination.rowsPerPage = 5
      this.pagination.rowsNumber = 0
      this.pagination.page = 1
      this.repse.RFC = null
      this.buttonStates.MenuINM = false
      this.buttonStates.MenuSIDIL = false
      this.buttonStates.MenuInfonacot = false
      this.buttonStates.MenuIssste = false
      this.buttonStates.MenuIsssteCuentas = false
      this.buttonStates.MenuIsssteDecimo = false
      this.MenuIssstePensionados = false
      this.MenuIsssteCuentas = false
      this.MenuIsssteDecimo = false
      this.MenuIssste = false
    },
    async qTableRequest (props) {
      this.msgCTI = 'Centros de trabajo en el IMSS de ' + props.empresa + '(' + props.EmisorRFC + ') ' + props.entidad
      this.v$.ptu.$reset()
      this.v$.ptu.$touch()
      if (this.v$.ptu.$error) {
        return false
      }
      // this.$q.loading.show()
      // this.showLoading('Sobre la Empresa Seleccionada rfc: ' + this.EmisorRFCAux + ' Registro: ' + this.EmisorRegistroPatronalAux)
      this.pagination = props.pagination
      this.filter = props.filter
      this.EmisorRFC = this.EmisorRFCAux
      this.id_entidad = this.id_entidadAux
      this.entidad = this.entidadAux
      this.empresa = this.empresaAux
      const params = {}
      params.pagination = this.pagination
      params.filter = this.filter
      params.page = this.pagination.page
      params.ptu = this.ptu
      params.limpiar = this.limpiar
      params.rfc = this.EmisorRFC
      params.DIVid = this.divAux
      params.GPOid = this.grpAux
      params.Actividadid = this.fraccionAux
      params.Entidadid = this.id_entidadAux
      params.EmisorRegistroPatronal = this.EmisorRegistroPatronalAux
      api.get('/busqueda', params).then(({ data }) => {
        // this.$q.loading.hide()
        if (data.data) {
          this.data = data.data
          this.mostrarPrincipal = true
          this.pagination.totalRowsNumber = data.total
          this.pagination.rowsNumber = data.total
          this.pagination.page = data.current_page
          this.pagination.rowsPerPage = data.per_page
          // this.triggerCustomRegisteredType1()
        } else {
          this.cleamInputsBuscar()
        }
      })
      this.fetchFromServerPatronal(this.EmisorRegistroPatronalAux)
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
      /* const id = idrfc
      api.get(`/busqueda/getData/${id}`).then(({ data }) => {
        if (!data.factptu) {
          this.mostrar = false
          this.nodataPTU = 'No hay datos disponibles del PTU para la búsqueda por el RFC: ' + idrfc
        } else {
          this.mostrar = true
          this.factptu = data.factptu
          this.factptu.PTUGeneradaenelEjercicio = formatNumberPrice(data.factptu.PTUGeneradaenelEjercicio)
          this.factptu.UtilidadFiscal = formatNumberPrice(data.factptu.UtilidadFiscal)
          this.factptu.PTUPagadaenelEjercicio = formatNumberPrice(data.factptu.PTUPagadaenelEjercicio)
        }
      }) */
      this.fetchFromServerPatronal(idcvepatron)
    },
    fetchFromServerPatronal (idrfc) {
      this.idrfc = idrfc
      // this.$q.loading.show()
      this.qTableRequestPatronal({
        pagination: this.paginationPatronal,
        filter: this.filterPatronal
      })
    },
    editSelectedRowPatronal (id) {
      this.$router.push(`/search-imss/${id}`)
    },
    async qTableRequestPatronal (props) {
      this.showLoading(' sobre la Empresa seleccionada')
      this.paginationPatronal = props.pagination
      this.filterPatronal = props.filter
      const params = {}
      params.pagination = this.paginationPatronal
      params.filter = this.filterPatronal
      params.page = this.paginationPatronal.page
      params.id = this.idrfc
      params.ptu = this.ptu
      if (this.controladorCentro) {
        api.cancel()
      }
      this.controladorCentro = api.get('/imsspatronal', params).then(({ data }) => {
        this.mostrarNominal = true
        this.$q.loading.hide()
        this.dataPatronal = data.data
        this.paginationPatronal.totalRowsNumber = data.total
        this.paginationPatronal.rowsNumber = data.total
        this.paginationPatronal.page = data.current_page
        this.paginationPatronal.rowsPerPage = data.per_page
        this.controladorCentro = null
      }).catch(error => error)
    },
    buscarDatos (cve) {
      this.fetchFromServerNominal(cve)
    },
    buscarDatosRiesgos (nss, registro, curp) {
      this.curpTrabajador = curp
      this.nssTrabajador = nss
      this.cvepatron = registro
      this.getSat(nss, curp)
      // this.fetchFromServerRiegos(nss, registro)
      // this.getSiaat(nss, curp)
      // this.getCfcrl(nss)
    },
    fetchFromServerNominal  (cve) {
      this.cve = cve
      // this.$q.loading.show()
      this.showLoading('')
      this.loading = true
      this.qTableRequestNominal({
        pagination: this.paginationNominal,
        filter: this.filterNominal,
        id: cve
      })
    },
    closeModal () {
      this.modal = false
      this.filterNominal = ''
    },
    closeModalTrabajadores () {
      this.modalTrabajadores = false
      this.filterTrabajadores = ''
    },
    closeModalTrabajadoresIssste () {
      this.modalTrabajadoresIssste = false
      this.filterTrabajadoresIssste = ''
      this.filterISSTEDerechohabientes = ''
    },
    closeModalTrabajadoresSNE () {
      this.modalTrabajadoresSNE = false
      this.filterTrabajadoresSNE = ''
    },
    closemodalCurpRenapo () {
      this.modalCurpRenapo = false
      this.dataRenapo = ''
    },
    closeModalRiegos () {
      this.modalRiesgos = false
      this.dataCfcrl = null
      this.dataRiegos = []
      this.dataSat = []
      this.dataSiaat = []
      this.tab2 = 'sat'
    },
    closeModalICSOE () {
      this.modalICSOE = false
      this.filterICSOE = ''
    },
    exportTableDataNominal () {
      const params = {}
      params.id = this.cve
      api.get('/imssnominal-excel', params).then(({ data }) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'Trabajadores.csv'
        link.click()
        URL.revokeObjectURL(link.href)
      })
    },
    async qTableRequestNominal (props) {
      this.paginationNominal = props.pagination
      this.filterNominal = props.filter
      const params = {}
      params.pagination = this.paginationNominal
      params.filter = this.filterNominal
      params.page = this.paginationNominal.page
      params.id = this.cve
      this.modal = true
      if (this.controladorNominal) {
        api.cancel()
      }
      this.controladorNominal = api.get('/imssnominal', params).then(({ data }) => {
        this.$q.loading.hide()
        this.dataNominal = data.data
        this.paginationNominal.totalRowsNumber = data.total
        this.paginationNominal.rowsNumber = data.total
        this.paginationNominal.page = data.current_page
        this.paginationNominal.rowsPerPage = data.per_page
        this.controladorNominal = null
      }).catch(error => error)
    },
    fetchFromServerRiegos (NSS, CVE_PATRON) {
      this.nss = NSS
      this.cvepatron = CVE_PATRON
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestRiesgos({
        pagination: this.paginationPatronal,
        filter: this.filterPatronal,
        id1: this.nss,
        id2: this.cvepatron
      })
    },
    async qTableRequestRiesgos (props) {
      this.paginationRiegos = props.pagination
      this.filterRiegos = props.filter
      const params = {}
      params.pagination = this.paginationRiegos
      params.filter = this.filterRiesgos
      params.page = this.paginationRiegos.page
      params.nss = this.nss
      params.cve_patron = this.cvepatron
      this.modalRiesgos = true
      this.nssTrabajador = this.nss
      this.showLoading(' (Riesgos)')
      api.get('/riesgosolap', params).then(({ data }) => {
        this.dataRiegos = data.data
        this.paginationRiegos.totalRowsNumber = data.total
        this.paginationRiegos.rowsNumber = data.total
        this.paginationRiegos.page = data.current_page
        this.paginationRiegos.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    // INICIO TRABAJADORES SNE COLOCADOS
    fetchFromServerSNE (curp) {
      this.curp = curp
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestSNE({
        pagination: this.paginationPatronal,
        filter: this.filterPatronal,
        id1: this.nss,
        id2: this.curp
      })
    },
    async qTableRequestSNE (props) {
      this.paginationSNE = props.pagination
      this.filterSNE = props.filter
      const params = {}
      params.pagination = this.paginationSNE
      params.filter = this.filterSNE
      params.page = this.paginationSNE.page
      params.nss = this.nss
      params.rfc = this.EmisorRFCAux
      params.curp = this.curp
      this.modalSNE = true
      this.nssTrabajador = this.nss
      this.showLoading(' (SNE)')
      api.get('/get-trabajadores-sne-nss', params).then(({ data }) => {
        this.dataSNE = data.data
        this.paginationSNE.totalRowsNumber = data.total
        this.paginationSNE.rowsNumber = data.total
        this.paginationSNE.page = data.current_page
        this.paginationSNE.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    // FIN TRABAJADORES SNE COLOCADOS
    fetchFromServerRiesgosbyCvePatron (CVE_PATRON) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestRiesgosbyCvePatron({
        pagination: this.paginationRiesgosbyCvePatron,
        filter: this.filterRiesgos,
        id2: CVE_PATRON
      })
    },
    async qTableRequestRiesgosbyCvePatron (props) {
      this.paginationRiesgosbyCvePatron = props.pagination
      this.filterRiesgosbyCvePatron = props.filter
      const params = {}
      params.pagination = this.paginationRiesgosbyCvePatron
      params.filter = this.filterRiesgosbyCvePatron
      params.page = this.paginationRiesgosbyCvePatron.page
      params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAux
      // this.modalRiesgos = true
      // this.nssTrabajador = this.nss
      this.showLoading(' (Riesgos)')
      api.get('/riesgosolap-cvepatron', params).then(({ data }) => {
        this.dataRiesgosbyCvePatron = data.data
        this.cantRiesgos = data.total
        this.paginationRiesgosbyCvePatron.totalRowsNumber = data.total
        this.paginationRiesgosbyCvePatron.rowsNumber = data.total
        this.paginationRiesgosbyCvePatron.page = data.current_page
        this.paginationRiesgosbyCvePatron.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerCfcrlbyCvePatron (CVE_PATRON) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestCfcrlbyCvePatron({
        pagination: this.paginationCfcrlbyCvePatron,
        filter: this.filterCfcrlbyCvePatron,
        id2: CVE_PATRON
      })
    },
    async qTableRequestCfcrlbyCvePatron (props) {
      this.paginationCfcrlbyCvePatron = props.pagination
      this.filterCfcrlbyCvePatron = props.filter
      const params = {}
      params.pagination = this.paginationCfcrlbyCvePatron
      params.filter = this.filterCfcrlbyCvePatron
      params.page = this.paginationCfcrlbyCvePatron.page
      params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAux
      params.rfc = this.EmisorRFCAux

      // this.modalCfcrl = true
      // this.nssTrabajador = this.nss
      this.showLoading('(CFCRL)')
      api.get('/cfcrl-cvepatron', params).then(({ data }) => {
        this.dataCfcrlbyCvePatron = data.data
        this.cantCfcrl = formatNumberPriceZero(data.total)
        this.paginationCfcrlbyCvePatron.totalRowsNumber = data.total
        this.paginationCfcrlbyCvePatron.rowsNumber = data.total
        this.paginationCfcrlbyCvePatron.page = data.current_page
        this.paginationCfcrlbyCvePatron.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      api.get('/cfcrl-totales', params).then(({ data }) => {
        this.cantsindicalizado = formatNumberPriceZero(data.totales[0].sindicalizado)
        this.cantcontratocolectivo = formatNumberPriceZero(data.totales[0].contrato_colectivo)
        this.cantconciliado = formatNumberPriceZero(data.totales[0].conciliado)
      })
      // this.closeLoading()
    },
    fetchFromServerSiaatbyCvePatron (CVE_PATRON) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestSiaatbyCvePatron({
        pagination: this.paginationSiaatbyCvePatron,
        filter: this.filterSiaatbyCvePatron,
        id2: CVE_PATRON
      })
    },
    async qTableRequestSiaatbyCvePatron (props) {
      this.paginationSiaatbyCvePatron = props.pagination
      this.filterSiaatbyCvePatron = props.filter
      const params = {}
      params.pagination = this.paginationSiaatbyCvePatron
      params.filter = this.filterSiaatbyCvePatron
      params.page = this.paginationSiaatbyCvePatron.page
      params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAux
      params.rfc = this.EmisorRFCAux
      // this.modalSiaat = true
      // this.nssTrabajador = this.nss
      this.showLoading(' (SIAAT)')
      api.get('/siaat-cvepatron', params).then(({ data }) => {
        this.dataSiaatbyCvePatron = data.data
        this.cantSiaat = data.total
        this.paginationSiaatbyCvePatron.totalRowsNumber = data.total
        this.paginationSiaatbyCvePatron.rowsNumber = data.total
        this.paginationSiaatbyCvePatron.page = data.current_page
        this.paginationSiaatbyCvePatron.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerVelavobyCvePatron (CVE_PATRON) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestVelavobyCvePatron({
        pagination: this.paginationPatronal,
        filter: this.filterPatronal,
        id2: CVE_PATRON
      })
    },
    async qTableRequestVelavobyCvePatron (props) {
      this.paginationVelavobyCvePatron = props.pagination
      this.filterVelavobyCvePatron = props.filter
      const params = {}
      params.pagination = this.paginationVelavobyCvePatron
      params.filter = this.filterVelavobyCvePatron
      params.page = this.paginationVelavobyCvePatron.page
      params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAux
      params.rfc = this.EmisorRFCAux
      // this.modalVelavo = true
      // this.nssTrabajador = this.nss
      this.showLoading(' (Velavo)')
      api.get('/velavo-cvepatron', params).then(({ data }) => {
        this.dataVelavobyCvePatron = data.data
        this.cantVelavo = data.total
        this.paginationVelavobyCvePatron.totalRowsNumber = data.total
        this.paginationVelavobyCvePatron.rowsNumber = data.total
        this.paginationVelavobyCvePatron.page = data.current_page
        this.paginationVelavobyCvePatron.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerSiSubbyCvePatron (CVE_PATRON) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestSiSubbyCvePatron({
        pagination: this.paginationSiSubbyCvePatron,
        filter: this.filterSiSubbyCvePatron,
        id2: CVE_PATRON
      })
    },
    async qTableRequestSiSubbyCvePatron (props) {
      this.paginationSiSubbyCvePatron = props.pagination
      this.filterSiSubbyCvePatron = props.filter
      const params = {}
      params.pagination = this.paginationSiSubbyCvePatron
      params.filter = this.filterSiSubbyCvePatron
      params.page = this.paginationSiSubbyCvePatron.page
      params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAux
      params.rfc = this.EmisorRFCAux
      // this.modalSiSub = true
      // this.nssTrabajador = this.nss
      this.showLoading(' (SiSub)')
      api.get('/get-trabajadores-sisub', params).then(({ data }) => {
        this.dataSiSubbyCvePatron = data.data
        this.cantSiSub = data.total
        this.paginationSiSubbyCvePatron.totalRowsNumber = data.total
        this.paginationSiSubbyCvePatron.rowsNumber = data.total
        this.paginationSiSubbyCvePatron.page = data.current_page
        this.paginationSiSubbyCvePatron.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerIcsoebyCvePatron (rfc) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestIcsoebyCvePatron({
        pagination: this.paginationIcsoebyCvePatron,
        filter: this.filterIcsoebyCvePatron,
        id2: rfc,
        Folio_Contrato: this.FolioContratoAux
      })
    },
    async qTableRequestIcsoebyCvePatron (props) {
      this.paginationIcsoebyCvePatron = props.pagination
      this.filterIcsoebyCvePatron = props.filter
      const params = {}
      params.pagination = this.paginationIcsoebyCvePatron
      params.filter = this.filterIcsoebyCvePatron
      params.page = this.paginationIcsoebyCvePatron.page
      // params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAuxcd
      params.rfc = this.EmisorRFCAux
      // this.modalIcsoe = true
      // this.nssTrabajador = this.nss
      this.showLoading('(Icsoe)')
      api.get('/icsoe-getData', params).then(({ data }) => {
        this.dataIcsoebyCvePatron = data.data
        this.cantIcsoe = data.total
        this.paginationIcsoebyCvePatron.totalRowsNumber = data.total
        this.paginationIcsoebyCvePatron.rowsNumber = data.total
        this.paginationIcsoebyCvePatron.page = data.current_page
        this.paginationIcsoebyCvePatron.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerCfcrlPersona (nss) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestCfcrlPersona({
        pagination: this.paginationCfcrlPersona,
        filter: this.filterCfcrlPersona,
        id2: nss
      })
    },
    async qTableRequestCfcrlPersona (props) {
      this.paginationCfcrlPersona = props.pagination
      this.filterCfcrlPersona = props.filter
      const params = {}
      params.pagination = this.paginationCfcrlPersona
      params.filter = this.filterCfcrlPersona
      params.page = this.paginationCfcrlPersona.page
      params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAux
      params.rfc = this.EmisorRFCAux
      // this.modalSiSub = true
      // this.nssTrabajador = this.nss
      this.showLoading(' (CFCRl)')
      api.get('/cfcrl-persona', params).then(({ data }) => {
        this.dataCfcrlPersona = data.data
        this.paginationCfcrlPersona.totalRowsNumber = data.total
        this.paginationCfcrlPersona.rowsNumber = data.total
        this.paginationCfcrlPersona.page = data.current_page
        this.paginationCfcrlPersona.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    async getCfcrl (nss) {
      const params = {}
      params.nss = nss
      this.showLoading(' (cfcrl)')
      api.get('/cfcrl', params).then(({ data }) => {
        if (data.length > 0) {
          this.dataCfcrl = data.cfcrl
        }
        this.$q.loading.hide()
      }).catch(error => error)
    },
    async getSiaat (nss, curp) {
      this.nss = nss
      this.curp = curp
      this.qTableRequestSiaat({
        pagination: this.paginationSiaat,
        filter: this.filterSiaat,
        id1: nss,
        id2: curp
      })
    },
    async qTableRequestSiaat (props) {
      this.paginationSiaat = props.pagination
      this.filterSiaat = props.filter
      const params = {}
      params.pagination = this.paginationSiaat
      params.filter = this.filterSiaat
      params.page = this.paginationSiaat.page
      params.nss = this.nss
      params.curp = this.curp
      this.modalRiesgos = true
      this.nssTrabajador = this.nss
      this.showLoading(' (SIAAT)')
      api.get('/siaat', params).then(({ data }) => {
        this.dataSiaat = data.data
        this.paginationSiaat.totalRowsNumber = data.total
        this.paginationSiaat.rowsNumber = data.total
        this.paginationSiaat.page = data.current_page
        this.paginationSiaat.rowsPerPage = data.per_page
        this.$q.loading.hide()
      }).catch(error => error)
    },
    async getSat (nss, curp) {
      this.nss = nss
      this.curp = curp
      this.qTableRequestSat({
        pagination: this.paginationSat,
        filter: this.filterSat,
        id1: nss,
        id2: curp
      })
      /* api.get('/sat', params).then(({ data }) => {
        if (data) {
          this.dataSat = data.sat
        }
      }) */
    },
    async qTableRequestSat (props) {
      this.paginationSat = props.pagination
      this.filterSat = props.filter
      const params = {}
      params.pagination = this.paginationSat
      params.filter = this.filterSat
      params.page = this.paginationSat.page
      params.nss = this.nss
      params.curp = this.curp
      this.modalRiesgos = true
      this.nssTrabajador = this.nss
      this.showLoading(' (SAT)')
      api.get('/sat', params).then(({ data }) => {
        this.dataSat = data.data
        this.paginationSat.totalRowsNumber = data.total
        this.paginationSat.rowsNumber = data.total
        this.paginationSat.page = data.current_page
        this.paginationSat.rowsPerPage = data.per_page
        this.$q.loading.hide()
      }).catch(error => error)
    },
    closeLoading () {
      this.$q.loading.hide()
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
      api.get('/empresas-agregadas', params).then(({ data }) => {
        if (data.data) {
          this.dataEA = data.data
          this.mostrarPrincipal = true
          this.paginationEA.totalRowsNumber = data.total
          this.paginationEA.rowsNumber = data.total
          this.paginationEA.page = data.current_page
          this.paginationEA.rowsPerPage = data.per_page
          this.cubos.inm = data.data[0].total_INM
          this.cubos.ptu = data.data[0].total_PTU
          this.cubos.repse = data.data[0].total_REPSE
          this.cubos.velavo = data.data[0].total_VELAVO
          this.cubos.sidil = data.data[0].total_SIDIL
          this.cubos.inspecciones = data.data[0].total_INSPECCIONES
          this.cubos.infonacot = data.data[0].total_INFONACOT
          this.cubos.extranjeros = data.data[0].num_extranjeros
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
    async qTableRequestEA2 (props) {
      this.ptu.rfc = this.$route.params.id
      this.ptu.cve = this.$route.params.id2
      this.showLoading('')
      // this.$q.loading.show()
      this.paginationEA = props.pagination
      this.filterEA = props.filter
      const params = {}
      params.pagination = this.paginationEA
      params.filter = this.filterEA
      params.page = this.paginationEA.page
      params.ptu = this.ptu
      // params.rfc = this.$route.params.id
      params.DIVid = this.DIV_id
      params.GPOid = this.GPO_id
      params.Actividadid = this.Actividad_id
      params.Entidadid = this.Entidad_id
      api.get('/empresas-agregadas', params).then(({ data }) => {
        if (data.data) {
          this.dataEA = data.data
          this.mostrarPrincipal = true
          this.paginationEA.totalRowsNumber = data.total
          this.paginationEA.rowsNumber = data.total
          this.paginationEA.page = data.current_page
          this.paginationEA.rowsPerPage = data.per_page
          this.cubos.inm = data.data[0].total_INM
          this.cubos.ptu = data.data[0].total_PTU
          this.cubos.repse = data.data[0].total_REPSE
          this.cubos.velavo = data.data[0].total_VELAVO
          this.cubos.sidil = data.data[0].total_SIDIL
          this.cubos.inspecciones = data.data[0].total_INSPECCIONES
          this.cubos.infonacot = data.data[0].total_INFONACOT
          this.cubos.extranjeros = data.data[0].num_extranjeros
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
    CalcularDatosNacionales (props) {
      const params = {}
      params.EmisorRFC = props.EmisorRFC
      params.Nombre_Empresa = props.Nombre_Empresa
      api.get('/empresas-agregadas-getAgregados', params).then(({ data }) => {
        this.msgNacional = 'Información Nacional ' + ' ' + props.Nombre_Empresa + ' (' + props.EmisorRFC + ')'
        this.EANacional.Num_Centros_SAT = formatNumberPriceZero(data[0].Num_Centros_SAT)
        this.EANacional.TA_SAT = formatNumberPriceZero(data[0].TA_SAT)
        this.EANacional.Num_Centros_IMSS = formatNumberPriceZero(data[0].Num_Centros_IMSS)
        this.EANacional.TA_IMSS = formatNumberPriceZero(data[0].TA_IMSS)
        this.EANacional.total = formatNumberPriceZero(data[0].Total)
        this.EANacional.descuento = formatNumberPriceZero(data[0].Descuento)
        this.EANacional.organismo = data[0].desc_Organismo
        this.EANacional.institucion = data[0].desc_tipo_inst_seguridad
        this.EANacional.TA_Hombres_IMSS = formatNumberPriceZero(data[0].TA_Hombres_IMSS)
        this.EANacional.TA_Mujeres_IMSS = formatNumberPriceZero(data[0].TA_Mujeres_IMSS)
        this.EANacional.TA_Hombres_SAT = formatNumberPriceZero(data[0].TA_Hombres_SAT)
        this.EANacional.TA_Mujeres_SAT = formatNumberPriceZero(data[0].TA_Mujeres_SAT)
        this.fila.num_extranjeros_empresa = formatNumberPriceZero(data[0].num_extranjeros_empresa)
      })
    },
    CalcularDatosEntidades (props) {
      const params = {}
      params.EmisorRFC = props.EmisorRFC
      params.Entidadid = props.id_entidad
      params.fraccion = props.cve_fraccion
      params.EmisorRegistroPatronal = props.EmisorRegistroPatronal
      params.Nombre_Empresa = props.Nombre_Empresa
      api.get('/get-agregadas-entidad-completa', params).then(({ data }) => {
        // this.msgNacional = 'Información General Nacional ' + ' ' + props.Nombre_Empresa + ' (' + props.EmisorRFC + ')'
        // this.EA.Num_Centros_SAT = formatNumberPriceZero(data[0].Num_Centros_SAT)
        this.EA.TA_SAT = formatNumberPriceZero(data[0].cruze_sat)
        // this.EA.Num_Centros_IMSS = formatNumberPriceZero(data[0].Num_Centros_IMSS)
        this.EA.TA_IMSS = formatNumberPriceZero(data[0].cruze_imss)
        this.EA.TA_SOLO_IMSS = formatNumberPriceZero(data[0].IMSS)
        this.EA.TA_SOLO_SAT = formatNumberPriceZero(data[0].SAT)
        this.EA.TA_SOLO_SAT_MAYOR = formatNumberPriceZero(data[0].SAT_MAYOR)
        this.EA.TA_SOLO_SAT_MENOR = formatNumberPriceZero(data[0].SAT_MENOR)
        this.EA.TA_Hombres_IMSS = formatNumberPriceZero(data[0].TA_Hombres_IMSS)
        this.EA.TA_Mujeres_IMSS = formatNumberPriceZero(data[0].TA_Mujeres_IMSS)
        this.EA.TA_Hombres_SAT = formatNumberPriceZero(data[0].TA_Hombres_SAT)
        this.EA.TA_Mujeres_SAT = formatNumberPriceZero(data[0].TA_Mujeres_SAT)
        this.EA.sin_curp_sat = formatNumberPriceZero(data[0].sin_curp_sat)
        this.EA.sin_curp_imss = formatNumberPriceZero(data[0].sin_curp_imss)
        // this.EA.total = formatNumberPriceZero(data[0].Total)
        // this.EA.descuento = formatNumberPriceZero(data[0].Descuento)
        // this.EA.organismo = data[0].desc_Organismo
        // this.EA.institucion = data[0].desc_tipo_inst_seguridad
      })
      api.get('/get-agregadas-entidad', params).then(({ data }) => {
        this.EA.Num_Centros_SAT = formatNumberPriceZero(data[0].Num_Centros_SAT)
        this.EA.Num_Centros_IMSS = formatNumberPriceZero(data[0].Num_Centros_IMSS)
        this.EA.total = formatNumberPriceZero(data[0].Total)
        this.EA.descuento = formatNumberPriceZero(data[0].Descuento)
        this.EA.organismo = data[0].desc_Organismo
        this.EA.institucion = data[0].desc_tipo_inst_seguridad
      })
    },
    UpdateDatosAgregados (props, index) {
      this.RestorebuttonStatesDisable()
      this.isRowClicked = true
      this.MostrarRB = false
      this.mostrarResultados = true
      this.closeMenus()
      this.closeMenusSecundarios()
      this.seleccionarFila(index)
      this.fila = props
      this.fila.num_extranjeros_empresa = formatNumberZero(props.num_extranjeros_empresa)
      this.fila.num_extranjeros_empresa_centro = formatNumberZero(props.num_extranjeros_empresa_centro)
      // this.toggleSelectedRow(props)
      this.CalcularDatosNacionales(props)
      this.CalcularDatosEntidades(props)
      this.msgEstatal = 'Información Estatal ' + props.Nombre_Empresa + ' - ' + props.desc_division + ' (' + props.EmisorRFC + ') ' + props.desc_entidad
      this.EmisorRFCAux = props.EmisorRFC
      this.tipo_inst_seguridadAux = props.tipo_inst_seguridad
      this.NombreAux = props.Nombre_Empresa
      this.cvepatronAux = props.EmisorRFC
      this.EmisorRegistroPatronalAux = props.EmisorRegistroPatronal
      this.id_entidadAux = props.id_entidad
      this.entidadAux = props.desc_entidad
      this.empresaAux = props.Nombre_Empresa
      this.divAux = props.desc_division
      this.grpAux = props.desc_grupo
      this.fraccionAux = props.desc_fraccion
      this.idfraccionAux = props.cve_fraccion
      this.year = this.ptu.anio
      this.rfcptu = props.EmisorRFC
      this.tipoinstseguridadAux = props.tipo_inst_seguridad
      this.qTableRequest({
        pagination: this.pagination,
        filter: this.filter,
        EmisorRFC: this.EmisorRFCAux,
        id_entidad: this.id_entidadAux,
        entidad: this.entidadAux,
        empresa: this.empresaAux,
        div: this.divAux,
        gpo: this.grpAux,
        fraccion: this.fraccionAux,
        EmisorRegistroPatronal: this.EmisorRegistroPatronalAux
      })
      // this.mostrarPrincipal2 = true
      // this.mostrarMenuPrincipal = true
      // this.MenuCentros = true
      this.MenuPrincipalBotones = true
      if (props.tipo_inst_seguridad !== '2.0') {
        this.MenuEstatal = true
        this.MPImss = true
        this.selectOption(3, 'MPImss')
        this.buttonStatesDisable.MPIssste = true
      } else {
        // this.MPIssste = true
        this.MenuIssste = true
        this.selectOption(14, 'MPIssste')
        this.buttonStatesDisable.MPImss = true
        this.buttonStatesDisable.MPSat = true
        this.buttonStatesDisable.MPUtd = true
        this.buttonStatesDisable.Menuccfcrl = true
        this.buttonStatesDisable.MenuVelavo = true
        this.buttonStatesDisable.MenuSIDIL = true
        this.buttonStatesDisable.MenuSne = true
        this.fetchFromServerISSTEDerechohabientes(this.EmisorRFCAux, this.empresaAux)
      }
      const id = props.EmisorRFC
      const year = this.ptu.anio
      api.get(`/busqueda/getData/${id}/${year}`).then(({ data }) => {
        if (!data.factptu) {
          this.mostrar = true
          this.nodataPTU = 'No hay datos disponibles del PTU para la búsqueda por el RFC: ' + id
        } else {
          this.mostrarTrabajadores = true
          this.factptu = data.factptu
          this.factptu.PTUGeneradaenelEjercicio = formatNumberPrice(data.factptu.PTUGeneradaenelEjercicio)
          this.factptu.UtilidadFiscal = formatNumberPrice(data.factptu.UtilidadFiscal)
          this.factptu.PTUPagadaenelEjercicio = formatNumberPrice(data.factptu.PTUPagadaenelEjercicio)
        }
      })
      this.dataREPSE(props)
      // this.getdataICSOE(props)
    },
    RestorebuttonStatesDisable () {
      this.buttonStatesDisable.MPImss = false
      this.buttonStatesDisable.MPSat = false
      this.buttonStatesDisable.MPUtd = false
      this.buttonStatesDisable.MenuSiaat = false
      this.buttonStatesDisable.Menuccfcrl = false
      this.buttonStatesDisable.MenuVelavo = false
      this.buttonStatesDisable.MenuUtd = false
      this.buttonStatesDisable.MenuSne = false
      this.buttonStatesDisable.MenuDNE = false
      this.buttonStatesDisable.MenuSIDIL = false
      this.buttonStatesDisable.MenuINM = false
      this.buttonStatesDisable.MenuInfonacot = false
      this.buttonStatesDisable.MenuIssste = false
      this.buttonStatesDisable.MPIssste = false
    },
    dataREPSE (props) {
      // this.mostrar = true
      const id = props.EmisorRFC
      const params = {}
      params.rfc = props.EmisorRFC
      this.repse = []
      this.mostrarMenuREPSE = false
      api.post('/repse-getData', params).then(({ data }) => {
        if (!data.repse) {
          this.mostrarREPSE = false
          // this.datarepse = data.repse
          this.nodataPTU = 'No hay datos disponibles de REPSE para la búsqueda por el RFC: ' + id
        } else {
          this.mostrarREPSE = true
          this.repse = data.repse
          this.repse.Empleados = formatNumberZero(data.repse.Empleados)
        }
      })
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
    /* getJson () {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => {
          this.infoApi = response.data.bpi
        })
        .catch(error => {
          console.error(error)
          this.errored = true
        })
    }, */
    openModalICSOE () {
      this.modalICSOE = true
    },
    openModalTrabajadores () {
      this.modalTrabajadores = true
    },
    openModalTrabajadoresIssste () {
      this.modalTrabajadoresIssste = true
      this.fetchFromServerISSTEDerechohabientes(this.EmisorRFCAux, this.NombreAux)
    },
    fetchFromServerTrabajadores (rfc, d, E) {
      this.dondeestaAux = d
      // this.EmisorRegistroPatronalAux = E
      // this.$q.loading.show()
      this.showLoading('')
      // this.loading = true
      this.qTableRequestTrabajadores({
        pagination: this.paginationTrabajadores,
        filter: this.filterTrabajadores,
        id: rfc,
        dondeesta: d, // donde esta
        EmisorRegistroPatronal: this.EmisorRegistroPatronalAux // Registro patronal
      })
    },
    exportTableDataTrabajadores () {
      const params = {}
      params.rfc = this.EmisorRFCAux
      params.Entidadid = this.id_entidadAux
      params.fraccion = this.idfraccionAux
      params.EmisorRegistroPatronal = this.EmisorRegistroPatronalAux
      params.dondeesta = this.dondeestaAux
      api.get('/get-trabajadores-excel', params).then(({ data }) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'Lista_Trabajadores.csv'
        link.click()
        URL.revokeObjectURL(link.href)
      })
    },
    async qTableRequestTrabajadores (props) {
      this.paginationTrabajadores = props.pagination
      this.filterTrabajadores = props.filter
      const params = {}
      params.pagination = this.paginationTrabajadores
      params.filter = this.filterTrabajadores
      params.page = this.paginationTrabajadores.page
      params.rfc = this.EmisorRFCAux
      params.Entidadid = this.id_entidadAux
      params.fraccion = this.idfraccionAux
      params.cvepatron = this.cvepatronAux
      params.dondeesta = this.dondeestaAux
      params.EmisorRegistroPatronal = this.EmisorRegistroPatronalAux
      this.modalTrabajadores = true
      if (this.controladorTrabajadores) {
        api.cancel()
      }
      this.controladorTrabajadores = api.get('/get-trabajadores', params).then(({ data }) => {
        this.$q.loading.hide()
        this.dataTrabajadores = data.data
        this.paginationTrabajadores.totalRowsNumber = data.total
        this.paginationTrabajadores.rowsNumber = data.total
        this.paginationTrabajadores.page = data.current_page
        this.paginationTrabajadores.rowsPerPage = data.per_page
        this.controladorTrabajadores = null
      }).catch(error => error)
    },
    toggleSelectedRow (row) {
      this.selected = []
      this.selected.push(row)
    },
    toggleSelectedRow2 (row) {
      this.selected2 = []
      this.selected2.push(row)
    },
    triggerCustomRegisteredType1 () {
      this.$q.notify({
        type: 'my-notif',
        message: 'Más Información disponible abajo',
        icon: 'arrow_downward',
        progress: true,
        color: 'green',
        textColor: 'white',
        classes: 'glossy'
      })
    },
    getPtu (id, year) {
      api.get(`/busqueda/getData/${id}/${year}`).then(({ data }) => {
        if (data.factptu) {
          this.factptu = data.factptu
          this.factptu.PTUGeneradaenelEjercicio = formatNumberPrice(data.factptu.PTUGeneradaenelEjercicio)
          this.factptu.UtilidadFiscal = formatNumberPrice(data.factptu.UtilidadFiscal)
          this.factptu.PTUPagadaenelEjercicio = formatNumberPrice(data.factptu.PTUPagadaenelEjercicio)
        } else {
          this.factptu.Jurisdicción = null
          this.factptu.TipodePersona = null
          this.factptu.NombredelCentrodetrabajo = null
          this.factptu.RFC = null
          this.factptu.NombredeCalle = null
          this.factptu.NúmeroExterior = null
          this.factptu.NúmeroInterior = null
          this.factptu.Colonia = null
          this.factptu.Municipio = null
          this.factptu.CódigoPostal = null
          this.factptu.Estado = null
          this.factptu.ClavedelaActividadEconómica = null
          this.factptu.UtilidadFiscal = null
          this.factptu.PTUGeneradaenelEjercicio = null
          this.factptu.PTUPagadaenelEjercicio = null
        }
      })
    },
    getPtuJurisdiccion (id, year, jurisdiccion) {
      api.get(`/busqueda/getDataPTU/${id}/${year}/${jurisdiccion}`).then(({ data }) => {
        if (data.factptu) {
          this.factptu = data.factptu
          this.factptu.PTUGeneradaenelEjercicio = formatNumberPrice(data.factptu.PTUGeneradaenelEjercicio)
          this.factptu.UtilidadFiscal = formatNumberPrice(data.factptu.UtilidadFiscal)
          this.factptu.PTUPagadaenelEjercicio = formatNumberPrice(data.factptu.PTUPagadaenelEjercicio)
        } else {
          // this.factptu.Jurisdicción = null
          this.factptu.TipodePersona = null
          this.factptu.NombredelCentrodetrabajo = null
          this.factptu.RFC = null
          this.factptu.NombredeCalle = null
          this.factptu.NúmeroExterior = null
          this.factptu.NúmeroInterior = null
          this.factptu.Colonia = null
          this.factptu.Municipio = null
          this.factptu.CódigoPostal = null
          this.factptu.Estado = null
          this.factptu.ClavedelaActividadEconómica = null
          this.factptu.UtilidadFiscal = null
          this.factptu.PTUGeneradaenelEjercicio = null
          this.factptu.PTUPagadaenelEjercicio = null
        }
      })
    },
    getdataICSOE (props) {
      // this.mostrar = true
      const id = props.EmisorRFC
      const params = {}
      params.rfc = props.EmisorRFC
      params.Folio_Contrato = props.Folio_Contrato
      this.icsoe = []
      this.MenuIcsoe = false
      api.post('/icsoe-getData', params).then(({ data }) => {
        if (!data.icsoe) {
          this.mostrarIcsoe = false
          // this.datarepse = data.repse
          this.nodataPTU = 'No hay datos disponibles de REPSE para la búsqueda por el RFC: ' + id
        } else {
          this.mostrarIcsoe = true
          this.ICSOE = data.icsoe
        }
      })
    },
    fetchFromServerTrabajadoresICSOE (rfc, folio) {
      this.FolioContratoAux = folio
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestTrabajadoresICSOE({
        pagination: this.paginationICSOE,
        filter: this.filterICSOE,
        id: rfc,
        Folio_Contrato: folio
      })
    },
    async qTableRequestTrabajadoresICSOE (props) {
      this.paginationICSOE = props.pagination
      this.filterICSOE = props.filter
      const params = {}
      params.pagination = this.paginationICSOE
      params.filter = this.filterICSOE
      params.page = this.paginationICSOE.page
      params.rfc = this.EmisorRFCAux
      params.Folio_Contrato = this.FolioContratoAux
      this.modalICSOE = true
      if (this.controladorTrabajadoresICSOE) {
        api.cancel()
      }
      this.controladorTrabajadoresICSOE = api.get('/get-trabajadores-icsoe', params).then(({ data }) => {
        this.$q.loading.hide()
        this.dataICSOE = data.data
        this.paginationICSOE.totalRowsNumber = data.total
        this.paginationICSOE.rowsNumber = data.total
        this.paginationICSOE.page = data.current_page
        this.paginationICSOE.rowsPerPage = data.per_page
        this.controladorTrabajadoresICSOE = null
      }).catch(error => error)
    },
    // funciones del dne
    fetchFromServerDNEbyCvePatron (CVE_PATRON) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestDNEbyCvePatron({
        pagination: this.paginationDNEbyCvePatron,
        filter: this.filterDNEbyCvePatron,
        id2: CVE_PATRON
      })
    },
    async qTableRequestDNEbyCvePatron (props) {
      this.paginationDNEbyCvePatron = props.pagination
      this.filterDNEbyCvePatron = props.filter
      const params = {}
      params.pagination = this.paginationDNEbyCvePatron
      params.filter = this.filterDNEbyCvePatron
      params.page = this.paginationDNEbyCvePatron.page
      params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAux
      params.rfc = this.EmisorRFCAux
      // this.modalDNE = true
      // this.nssTrabajador = this.nss
      this.showLoading(' (Inspecciones)')
      api.get('/dne-cvepatron', params).then(({ data }) => {
        this.dataDNEbyCvePatron = data.data
        this.cantDNE = data.total
        this.paginationDNEbyCvePatron.totalRowsNumber = data.total
        this.paginationDNEbyCvePatron.rowsNumber = data.total
        this.paginationDNEbyCvePatron.page = data.current_page
        this.paginationDNEbyCvePatron.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    // fin funcion del dne
    // funciones del dne
    fetchFromServerSIDILbyCvePatron (CVE_PATRON) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestSIDILbyCvePatron({
        pagination: this.paginationSIDILbyCvePatron,
        filter: this.filterSIDILbyCvePatron,
        id2: CVE_PATRON
      })
    },
    async qTableRequestSIDILbyCvePatron (props) {
      this.paginationSIDILbyCvePatron = props.pagination
      this.filterSIDILbyCvePatron = props.filter
      const params = {}
      params.pagination = this.paginationSIDILbyCvePatron
      params.filter = this.filterSIDILbyCvePatron
      params.page = this.paginationSIDILbyCvePatron.page
      params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAux
      params.rfc = this.EmisorRFCAux
      // this.modalSIDIL = true
      // this.nssTrabajador = this.nss
      this.showLoading(' (SIDIL)')
      api.get('dne-sidil-cvepatron', params).then(({ data }) => {
        this.dataSIDILbyCvePatron = data.data
        this.cantSIDIL = data.total
        this.paginationSIDILbyCvePatron.totalRowsNumber = data.total
        this.paginationSIDILbyCvePatron.rowsNumber = data.total
        this.paginationSIDILbyCvePatron.page = data.current_page
        this.paginationSIDILbyCvePatron.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerINMbyCvePatron (CVE_PATRON) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestINMbyCvePatron({
        pagination: this.paginationINMbyCvePatron,
        filter: this.filterINMbyCvePatron,
        id2: CVE_PATRON
      })
    },
    async qTableRequestINMbyCvePatron (props) {
      this.paginationINMbyCvePatron = props.pagination
      this.filterINMbyCvePatron = props.filter
      const params = {}
      params.pagination = this.paginationINMbyCvePatron
      params.filter = this.filterINMbyCvePatron
      params.page = this.paginationINMbyCvePatron.page
      params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAux
      params.rfc = this.EmisorRFCAux
      // this.modalINM = true
      // this.nssTrabajador = this.nss
      this.showLoading(' (INM)')
      api.get('inm-cvepatron', params).then(({ data }) => {
        this.dataINMbyCvePatron = data.data
        this.cantINM = data.total
        this.paginationINMbyCvePatron.totalRowsNumber = data.total
        this.paginationINMbyCvePatron.rowsNumber = data.total
        this.paginationINMbyCvePatron.page = data.current_page
        this.paginationINMbyCvePatron.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    // fin funcion del dne
    fetchFromServerSneRFC (CVE_PATRON) {
      // this.$q.loading.show()
      this.loading = true
      this.qTableRequestSneRFC({
        pagination: this.paginationSneRFC,
        filter: this.filterSneRFC,
        id2: CVE_PATRON
      })
    },
    async qTableRequestSneRFC (props) {
      this.paginationSneRFC = props.pagination
      this.filterSneRFC = props.filter
      const params = {}
      params.pagination = this.paginationSneRFC
      params.filter = this.filterSneRFC
      params.page = this.paginationSneRFC.page
      params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAux
      params.rfc = this.EmisorRFCAux
      this.showLoading(' (SNE)')
      api.get('sne-rfc', params).then(({ data }) => {
        this.dataSneRFC = data.data
        const bolsaData = this.dataSneRFC.filter(row => row.origen === 'Bolsa de trabajo')
        const feriaData = this.dataSneRFC.filter(row => row.origen === 'Ferias de Empleo')
        const portalData = this.dataSneRFC.filter(row => row.origen === 'Portal del Empleo')
        this.paginationSneBolsa.rowsNumber = bolsaData.length
        this.paginationSneFeria.rowsNumber = feriaData.length
        this.paginationSnePortal.rowsNumber = portalData.length
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerTrabajadoresSNE (o, f) {
      this.OrigenAux = o
      this.FolioAux = f
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestTrabajadoresSNE({
        pagination: this.paginationTrabajadoresSNE,
        filter: this.filterTrabajadoresSNE,
        id: this.EmisorRFCAux,
        origen: o,
        folio: f
      })
    },
    async qTableRequestTrabajadoresSNE (props) {
      this.paginationTrabajadoresSNE = props.pagination
      this.filterTrabajadoresSNE = props.filter
      const params = {}
      params.pagination = this.paginationTrabajadoresSNE
      params.filter = this.filterTrabajadoresSNE
      params.page = this.paginationTrabajadoresSNE.page
      // params.rowsPerPage = this.paginationTrabajadoresSNE.rowsPerPage
      params.rfc = this.EmisorRFCAux
      params.origen = this.OrigenAux
      params.folio = this.FolioAux
      this.modalTrabajadoresSNE = true
      if (this.controladorTrabajadoresSNE) {
        api.cancel()
      }
      this.controladorTrabajadoresSNE = api.get('/get-trabajadores-sne', params).then(({ data }) => {
        this.$q.loading.hide()
        this.dataTrabajadoresSNE = data.data
        this.paginationTrabajadoresSNE.totalRowsNumber = data.total
        this.paginationTrabajadoresSNE.rowsNumber = data.total
        this.paginationTrabajadoresSNE.page = data.current_page
        this.paginationTrabajadoresSNE.rowsPerPage = data.per_page
        this.controladorTrabajadoresSNE = null
      }).catch(error => error)
    },
    // fin funcion del dne
    // infonacot
    fetchFromServerInfonacotbyCvePatron (RFC, CVE_PATRON) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestInfonacotbyCvePatron({
        pagination: this.paginationInfonacotbyCvePatron,
        filter: this.filterInfonacotbyCvePatron,
        id: RFC,
        id2: CVE_PATRON
      })
    },
    async qTableRequestInfonacotbyCvePatron (props) {
      this.paginationInfonacotbyCvePatron = props.pagination
      this.filterInfonacotbyCvePatron = props.filter
      const params = {}
      params.pagination = this.paginationInfonacotbyCvePatron
      params.filter = this.filterInfonacotbyCvePatron
      params.page = this.paginationInfonacotbyCvePatron.page
      params.EmisorRegistroPatronal = this.EmisorRegistroPatronalAux
      params.rfc = this.EmisorRFCAux
      this.showLoading(' (INFONACOT)')
      api.get('infonacot-rfc-registro', params).then(({ data }) => {
        this.dataInfonacotbyCvePatron = data.data
        this.paginationInfonacotbyCvePatron.totalRowsNumber = data.total
        this.paginationInfonacotbyCvePatron.rowsNumber = data.total
        this.paginationInfonacotbyCvePatron.page = data.current_page
        this.paginationInfonacotbyCvePatron.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerISSTECuentas (RFC, nombre) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestISSTECuentas({
        pagination: this.paginationISSTECuentas,
        filter: this.filterISSTECuentas,
        id: RFC,
        id2: nombre
      })
    },
    async qTableRequestISSTECuentas (props) {
      this.filterISSTEDerechohabientes = ''
      this.filterISSTEPensionados = ''
      this.filterISSTEDecimo = ''
      this.paginationISSTECuentas = props.pagination
      this.filterISSTECuentas = props.filter
      console.log(this.paginationISSTECuentas)
      const params = {}
      params.pagination = this.paginationISSTECuentas
      params.filter = this.filterISSTECuentas
      params.page = this.paginationISSTECuentas.page
      params.nombre = this.NombreAux
      params.rfc = this.EmisorRFCAux
      this.showLoading(' (ISSSTE)')
      api.get('issste-cuentasindividuales', params).then(({ data }) => {
        this.dataISSTECuentas = data.data
        this.paginationISSTECuentas.totalRowsNumber = data.total
        this.paginationISSTECuentas.rowsNumber = data.total
        this.paginationISSTECuentas.page = data.current_page
        this.paginationISSTECuentas.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerISSTEDecimo (RFC, nombre) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestISSTEDecimo({
        pagination: this.paginationISSTEDecimo,
        filter: this.filterISSTEDecimo,
        id: RFC,
        id2: nombre
      })
    },
    async qTableRequestISSTEDecimo (props) {
      this.filterISSTEDerechohabientes = ''
      this.filterISSTEPensionados = ''
      this.filterISSTECuentas = ''
      this.paginationISSTEDecimo = props.pagination
      this.filterISSTEDecimo = props.filter
      console.log(this.paginationISSTEDecimo)
      const params = {}
      params.pagination = this.paginationISSTEDecimo
      params.filter = this.filterISSTEDecimo
      params.page = this.paginationISSTEDecimo.page
      params.nombre = this.NombreAux
      params.rfc = this.EmisorRFCAux
      this.showLoading(' (ISSSTE)')
      api.get('issste-decimo', params).then(({ data }) => {
        this.dataISSTEDecimo = data.data
        this.paginationISSTEDecimo.totalRowsNumber = data.total
        this.paginationISSTEDecimo.rowsNumber = data.total
        this.paginationISSTEDecimo.page = data.current_page
        this.paginationISSTEDecimo.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerISSTEPensionados (RFC, nombre) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestISSTEPensionados({
        pagination: this.paginationISSTEPensionados,
        filter: this.filterISSTEPensionados,
        id: RFC,
        id2: nombre
      })
    },
    async qTableRequestISSTEPensionados (props) {
      this.filterISSTEDerechohabientes = ''
      this.filterISSTECuentas = ''
      this.filterISSTEDecimo = ''
      this.paginationISSTEPensionados = props.pagination
      this.filterISSTEPensionados = props.filter
      const params = {}
      params.pagination = this.paginationISSTEPensionados
      params.filter = this.filterISSTEPensionados
      params.page = this.paginationISSTEPensionados.page
      params.nombre = this.NombreAux
      params.rfc = this.EmisorRFCAux
      this.showLoading(' (ISSSTE)')
      api.get('issste-pensionados', params).then(({ data }) => {
        this.dataISSTEPensionados = data.data
        this.paginationISSTEPensionados.totalRowsNumber = data.total
        this.paginationISSTEPensionados.rowsNumber = data.total
        this.paginationISSTEPensionados.page = data.current_page
        this.paginationISSTEPensionados.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerISSTEDerechohabientes (RFC, nombre) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestISSTEDerechohabientes({
        pagination: this.paginationISSTEDerechohabientes,
        filter: this.filterISSTEDerechohabientes,
        id: RFC,
        id2: nombre
      })
    },
    async qTableRequestISSTEDerechohabientes (props) {
      this.filterISSTECuentas = ''
      this.filterISSTEPensionados = ''
      this.filterISSTEDecimo = ''
      this.paginationISSTEDerechohabientes = props.pagination
      this.filterISSTEDerechohabientes = props.filter
      const params = {}
      params.pagination = this.paginationISSTEDerechohabientes
      params.filter = this.filterISSTEDerechohabientes
      params.page = this.paginationISSTEDerechohabientes.page
      params.nombre = this.NombreAux
      params.rfc = this.EmisorRFCAux
      this.showLoading(' (ISSSTE)')
      api.get('issste-derechohabientes', params).then(({ data }) => {
        this.cantISSTEDerechohabientes = data.total_calculado[0].total
        this.dataISSTEDerechohabientes = data.data
        this.paginationISSTEDerechohabientes.totalRowsNumber = data.total
        this.paginationISSTEDerechohabientes.rowsNumber = data.total
        this.paginationISSTEDerechohabientes.page = data.current_page
        this.paginationISSTEDerechohabientes.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    // infonacot
    MostrarMenus (id, key) {
      this.selectOption(id, key)
      this.closeMenus()
      if (id === 0) {
        this.mostrarMenuPrincipal = !this.mostrarMenuPrincipal
      } else if (id === 1) {
        this.mostrarMenuPtu = !this.mostrarMenuPtu
      } else if (id === 2) {
        this.mostrarMenuREPSE = !this.mostrarMenuREPSE
      } else if (id === 3) {
        this.MenuEstatal = !this.MenuEstatal
      } else if (id === 4) {
        this.MenuCentros = !this.MenuCentros
      } else if (id === 5) {
        this.MenuIcsoe = !this.MenuIcsoe
        this.fetchFromServerIcsoebyCvePatron(this.EmisorRFCAux)
      } else if (id === 6) {
        this.MenuSisub = !this.MenuSisub
        this.fetchFromServerSiSubbyCvePatron(this.EmisorRegistroPatronalAux)
      } else if (id === 7) {
        this.MenuRiesgos = !this.MenuRiesgos
        this.fetchFromServerRiesgosbyCvePatron(this.EmisorRegistroPatronalAux)
      } else if (id === 8) {
        this.MenuSiaat = !this.MenuSiaat
        this.fetchFromServerSiaatbyCvePatron(this.EmisorRegistroPatronalAux)
      } else if (id === 9) {
        this.Menuccfcrl = !this.Menuccfcrl
        this.fetchFromServerCfcrlbyCvePatron(this.EmisorRegistroPatronalAux)
      } else if (id === 10) {
        this.MenuVelavo = !this.MenuVelavo
        this.fetchFromServerVelavobyCvePatron(this.EmisorRegistroPatronalAux)
      } else if (id === 11) {
        this.MenuUtd = !this.MenuUtd
      } else if (id === 12) {
        this.fetchFromServerSneRFC(this.EmisorRFCAux)
        this.MenuSne = !this.MenuSne
      } else if (id === 13) {
        this.fetchFromServerInfonacotbyCvePatron(this.EmisorRFCAux, this.EmisorRegistroPatronalAux)
        this.MenuInfonacot = !this.MenuInfonacot
      } else if (id === 13) {
        this.fetchFromServerInfonacotbyCvePatron(this.EmisorRFCAux, this.EmisorRegistroPatronalAux)
        this.MenuInfonacot = !this.MenuInfonacot
      } else if (id === 14) {
        this.MenuIssste = !this.MenuIssste
        this.filterISSTECuentas = ''
        this.filterISSTEDerechohabientes = ''
        this.filterISSTEPensionados = ''
        this.filterISSTEDecimo = ''
        // this.MenuIssste = !this.MenuIssste
        // this.MPIssste = !this.MPIssste
      } else if (id === 15) {
        this.fetchFromServerISSTECuentas(this.EmisorRFCAux, this.NombreAux)
        this.MenuIsssteCuentas = !this.MenuIsssteCuentas
        // this.MenuIssste = !this.MenuIssste
      } else if (id === 16) {
        this.fetchFromServerISSTEPensionados(this.EmisorRFCAux, this.NombreAux)
        this.MenuIssstePensionados = !this.MenuIssstePensionados
        // this.MenuIssste = !this.MenuIssste
      } else if (id === 17) {
        this.fetchFromServerISSTEDecimo(this.EmisorRFCAux, this.NombreAux)
        this.MenuIsssteDecimo = !this.MenuIsssteDecimo
        // this.MenuIssste = !this.MenuIssste
      } else if (id === 21) {
        this.MenuDNE = !this.MenuDNE
        this.fetchFromServerDNEbyCvePatron(this.EmisorRegistroPatronalAux)
      } else if (id === 22) {
        this.MenuSidil = !this.MenuSidil
        this.fetchFromServerSIDILbyCvePatron(this.EmisorRegistroPatronalAux)
      } else if (id === 23) {
        this.fetchFromServerINMbyCvePatron(this.EmisorRFCAux)
      } else {
        console.log('Estamos trabajando')
      }
    },
    MostrarMenusSecundarios (id) {
      this.closeMenusSecundarios()
      if (id === 0) {
        this.MPSat = true
      } else if (id === 1) {
        this.MPImss = true
      } else if (id === 2) {
        this.MPUtd = true
      } else if (id === 3) {
        this.MPSiaat = true
      } else if (id === 4) {
        this.MPOtros = true
      } else if (id === 5) {
        // this.MPIssste = true
      } else {
        console.log('Estamos trabajando')
      }
    },
    closeMenusSecundarios () {
      this.MPImss = false
      this.MPSat = false
      this.MPSiaat = false
      this.MPUtd = false
      this.MPOtros = false
      this.MPIssste = false
      // this.closeMenus()
    },
    closeMenus () {
      this.mostrarMenuPrincipal = false
      this.mostrarMenuPtu = false
      this.mostrarMenuREPSE = false
      this.MenuEstatal = false
      this.MenuCentros = false
      this.MenuIcsoe = false
      this.MenuSisub = false
      this.MenuRiesgos = false
      this.MenuSiaat = false
      this.Menuccfcrl = false
      this.MenuVelavo = false
      this.MenuUtd = false
      this.MenuSne = false
      this.MenuDNE = false
      this.MenuInfonacot = false
      this.MenuIssste = false
      this.MenuIsssteCuentas = false
      this.MenuIssstePensionados = false
      this.MenuIsssteDecimo = false
      // this.buttonStates.MenuSIDIL = false
    },
    closeMenuOpcion (id) {
      if (id === 0) {
        this.mostrarMenuPrincipal = false
      } else if (id === 1) {
        this.mostrarMenuPtu = false
      } else if (id === 2) {
        this.mostrarMenuREPSE = false
      } else if (id === 3) {
        this.MenuEstatal = false
      } else if (id === 4) {
        this.MenuCentros = false
      } else if (id === 5) {
        this.MenuIcsoe = false
      } else if (id === 6) {
        this.MenuSisub = false
      } else if (id === 7) {
        this.MenuRiesgos = false
      } else if (id === 8) {
        this.MenuSiaat = false
      } else if (id === 9) {
        this.Menuccfcrl = false
      } else if (id === 10) {
        this.MenuVelavo = false
      } else if (id === 11) {
        this.MenuUtd = false
      } else if (id === 12) {
        this.MenuSne = false
      } else if (id === 13) {
        this.MenuInfonacot = false
      } else if (id === 14) {
        this.MenuIssste = false
      } else if (id === 15) {
        this.MenuIsssteCuentas = false
      } else if (id === 16) {
        this.MenuIssstePensionados = false
      } else if (id === 17) {
        this.MenuIsssteCuentas = false
      } else if (id === 21) {
        this.MenuDNE = false
      } else {
        console.log('Estamos trabajando')
      }
    },
    seleccionarFila (index) {
      this.filaSeleccionada = index
    },
    /* selectOption (option) {
      this.selectedOption = option
    } */
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
    fetchFromServerRenapoPersona (curpTrabajador) {
      this.$q.loading.show()
      this.dataRenapo = []
      const params = {}
      params.curpTrabajador = curpTrabajador
      api.post('/consultar-curp', params).then(({ data }) => {
        this.dataRenapo = data.data.consultarPorCurpOResult
        this.rawDataRenapo = data
        this.processDataRenapo(data)
        this.$q.loading.hide()
      }).catch(error => error)
    },
    consultarCurp (curpTrabajador) {
      this.$q.loading.show()
      this.dataRenapo = []
      const params = {}
      params.curpTrabajador = curpTrabajador
      api.post('/consultar-curp', params).then(({ data }) => {
        this.dataRenapo = data.data.consultarPorCurpOResult
        this.modalCurpRenapo = true
        this.$q.loading.hide()
      }).catch(error => error)
    },
    MostrarPowerRFC (rfc) {
      const urlpower = `https://app.powerbi.com/reportEmbed?reportId=1c5ba006-ec69-45bb-a7fa-dace2b35c321&autoAuth=true&ctid=08f4aa98-07d7-4d31-b5c2-1dda252fe23e&filter=CATALOGO_EMPRESAS/EmisorRFC%20eq%20%27${rfc}%27`
      // const url = `/home/${props.EmisorRFC}/${props.cve_patron_8}`
      window.open(urlpower, '_blank') // Abre la URL en una nueva pestaña o ventana
    },
    MostrarPowerRegistro (registro) {
      const urlpower = `https://app.powerbi.com/reportEmbed?reportId=98f6ccda-fc59-448a-abde-edf7a00ff587&autoAuth=true&ctid=08f4aa98-07d7-4d31-b5c2-1dda252fe23e&filter=CATALOGO_EMPRESAS/EmisorRegistroPatronal%20eq%20%27${registro}%27`
      // const url = `/home/${props.EmisorRFC}/${props.cve_patron_8}`
      window.open(urlpower, '_blank') // Abre la URL en una nueva pestaña o ventana
    }
    /* handleSelection ({ rows, added, evt }) {
      if (rows.length !== 1 || evt === void 0) {
        return
      }
      const oldSelectedRow = storedSelectedRow
      const [newSelectedRow] = rows
      const { ctrlKey, shiftKey } = evt
      if (shiftKey !== true) {
        storedSelectedRow = newSelectedRow
      }
      nextTick(() => {
        if (shiftKey === true) {
          const tableRows = tableRef.value.filteredSortedRows
          let firstIndex = tableRows.indexOf(oldSelectedRow)
          let lastIndex = tableRows.indexOf(newSelectedRow)
          if (firstIndex < 0) {
            firstIndex = 0
          }
          if (firstIndex > lastIndex) {
            [ firstIndex, lastIndex ] = [ lastIndex, firstIndex ]
          }
          const rangeRows = tableRows.slice(firstIndex, lastIndex + 1)
          const selectedRows = selected.value.map(toRaw)
          selected.value = added === true
            ? selectedRows.concat(rangeRows.filter(row => selectedRows.includes(row) === false))
            : selectedRows.filter(row => rangeRows.includes(row) === false)
        }
        else if (ctrlKey !== true && added === true) {
          selected.value = [newSelectedRow]
        }
      })
    } */
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
  background: #470101;
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
