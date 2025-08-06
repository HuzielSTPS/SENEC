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
      <q-separator></q-separator>
      <!--MENU DE FILTROS-->
        <div class="q-pa-sm bg-white">
          <div class="row q-col-gutter-xs">
            <div class="col-xs-12 col-sm-1">
              <q-select
              class="uppcase"
              filled
              borderless
              v-model="ptu.anio"
              :error="v$.ptu.anio.$error"
              :rules="rules.anio"
              label="Año"
              input-debounce="0"
              :options="anioOptions"
              emit-value
              :bg-color="ptu.anio === null ? 'secondary' : 'dark'"
              map-options>
                <template v-slot:prepend>
                  <q-icon name="apartment" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-1">
              <q-select
              class="uppcase"
              :bg-color="ptu.mes === null ? 'secondary' : 'dark'"
              filled
              borderless
              v-model="ptu.mes"
              :error="v$.ptu.mes.$error"
              :rules="rules.mes"
              label="Mes"
              input-debounce="0"
              :options="mesOptions"
              emit-value
              map-options>
                <template v-slot:prepend>
                  <q-icon name="apartment" />
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
            <div class="col-xs-12 col-sm-3">
              <q-input
                :bg-color="(ptu.rfc === null || ptu.rfc === '') ? 'secondary' : 'dark'"
                filled
                v-model="ptu.rfc"
                label="RFC"
                @update:model-value="v => { ptu.rfc = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-5">
    <q-select
      class="uppcase"
      :bg-color="(ptu.name === null || ptu.name === '') ? 'secondary' : 'dark'"
      borderless
      filled
      use-input
      input-debounce="0"
      emit-value
      map-options
      label="Nombre de la Empresa o Razón Social"
      v-model="ptu.name"
      :options="claveProdOptions"
      @filter="searchClave"
      clear
    >
    <template v-slot:prepend>
      <q-icon name="person" />
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
            <!--<div class="col-xs-12 col-sm-4">
              <q-input
                :bg-color="(ptu.name === null || ptu.name === '') ? 'secondary' : 'dark'"
                filled
                v-model="ptu.name"
                label="Nombre Empresa"
                @update:model-value="v => { ptu.name = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="house" />
                </template>
              </q-input>
            </div>-->
            <div class="col-xs-12 col-sm-2 border-panel">
              <q-input
                :bg-color="( ptu.cve === null || ptu.cve === '') ? 'secondary' : 'dark'"
                filled
                v-model="ptu.cve"
                label="Registro Patronal"
                @update:model-value="v => { ptu.cve = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
          <div class="col-xs-12 col-sm-2">
        <q-select
          class="uppcase"
          borderless
          :bg-color="(Entidad_id === '') ? 'secondary' : 'dark'"
          filled
          v-model="Entidad_id"
          :options="selectEntidad"
          label="Entidad"
          emit-value
          map-options
          :rules="rules.role_id">
          <template v-slot:prepend>
            <q-icon name="badge"></q-icon>
          </template>
        </q-select>
      </div>
      <div class="col-xs-12 col-sm-2">
        <q-select
          class="uppcase"
          borderless
          :bg-color="(DIV_id === '') ? 'secondary' : 'dark'"
          filled
          v-model="DIV_id"
          :options="selectDIV"
          label="División de Actividad Económica"
          @update:model-value="getGPO(DIV_id)"
          emit-value
          map-options>
          <template v-slot:prepend>
            <q-icon name="badge"></q-icon>
          </template>
        </q-select>
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-select
          class="uppcase"
          borderless
          :bg-color="(GPO_id === null || GPO_id === '') ? 'secondary' : 'dark'"
          filled
          v-model="GPO_id"
          :options="selectGPO"
          label="Grupo de Actividad Económica"
          emit-value
          @update:model-value="getActividad(GPO_id)"
          map-options>
          <template v-slot:prepend>
            <q-icon name="badge"></q-icon>
          </template>
        </q-select>
      </div>
          <div class="col-xs-12 col-sm-3">
        <q-select
          class="uppcase"
          borderless
          :bg-color="(Actividad_id === null || Actividad_id === '')  ? 'secondary' : 'dark'"
          filled
          v-model="Actividad_id"
          :options="selectActividad"
          label="Actividad Económica"
          emit-value
          map-options>
          <template v-slot:prepend>
            <q-icon name="badge"></q-icon>
          </template>
        </q-select>
      </div>
      <div class="col-xs-12 col-md-1 col-sm-2">
            <q-btn color="blue" icon="search" label="Buscar" @click="fetchFromServer()" />
          </div>
          <div class="col-xs-12 col-md-1  col-sm-2">
            <q-btn color="red" icon="clear" label="Limpiar" @click="cleamInputs()" />
          </div>
          </div>
        </div>
    <!--RESULTADOS DE LA BUSQUEDA-->
      <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md" v-show ="this.mostrarPrincipal">
          <q-card style="min-width: 100%; min-height: 100% !important;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Resultados de la búsqueda</div>
                </div>
          </q-card-section>
          <div class="col q-pa-md" >
          <div class="row q-col-gutter-xs">
              </div>
            </div>
          <q-card-section>
            <q-table
              flat
              bordered
              :rows="dataEA"
              :columns="columnsEA"
              v-model:pagination="paginationEA"
              :filter="filterEA"
              @request="qTableRequestEA"
              row-key="folio"
              selection="single"
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
                <q-tr :props="props" >
                  <!--<q-td key="actions" :props="props">
                      <q-btn   v-if="props.row.RFC != ''" color="blue" icon="search" flat @click="getData,(props.row.RFC, props.row.CVE_PATRON)">
                        <q-tooltip class="bg-blue">Ver</q-tooltip>
                      </q-btn>
                    </q-td>
                    <q-td  v-if="props.row.RFC != ''" key="RFC" style="text-align: center; cursor: pointer; text-decoration: underline; color: blue;" :props="props" @click="getData(props.row.RFC, props.row.CVE_PATRON)">
                      {{ props.row.RFC }}
                    </q-td>
                    <q-td  v-else style="text-align: center; cursor: pointer; text-decoration: underline;">
                    </q-td>
                    <q-td key="Periodo" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.Periodo) }}</q-td>-->
                  <q-td key="EmisorRFC" style="text-align: center; cursor: pointer; text-decoration: underline; color: blue;"  :props="props" @click="UpdateDatosAgregados(props.row)">
                    {{ props.row.EmisorRFC }}
                  </q-td>
                    <q-td key="Nombre_Empresa" style="text-align: left;" :props="props">{{ props.row.Nombre_Empresa }}</q-td>
                    <q-td key="desc_entidad" style="text-align: left;" :props="props">{{ props.row.desc_entidad === null ? 'No localizada' : props.row.desc_entidad }}</q-td>
                    <q-td key="EmisorRegistroPatronal" style="text-align: left;" :props="props">{{ props.row.EmisorRegistroPatronal }}</q-td>
                    <!--<q-td key="DESC_DIVISION" style="text-align: left;" :props="props">{{ props.row.desc_division }}</q-td>
                    <q-td key="DESC_GPO_ACT" style="text-align: left;" :props="props">{{ props.row.desc_grupo }}</q-td>-->
                    <q-td key="DESC_FRACION" style="text-align: left;" :props="props">{{ props.row.desc_fraccion }}</q-td>
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
            </q-card-section>
            </q-card>
          </div>
      </div>
      <!--INFORMACION NACIONAL-->
      <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md" v-show ="this.mostrarMenuPrincipal">
          <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" :label="msgNacional"
              >
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
      <!--MENU DONDE ESTAN LOS BOTONES-->
      <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md" v-show ="this.mostrarMenuPrincipal">
          <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="Información de la Empresa"
              >
          <q-card style="min-width: 100%; min-height: 100% !important;">
          <div class="col q-pa-md" >
          <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="attach_money" label="PTU" @click="MostrarMenus(1)"/>
              </div>
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="apartment" label="Inf. Estatal" @click="MostrarMenus(3)" />
              </div>
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="person" label="Centros de Trabajo" @click="MostrarMenus(4)" />
              </div>
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="person" label="Riesgos" @click="MostrarMenus(7)" />
              </div>
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="person" label="SIAAT" @click="MostrarMenus(8)" />
              </div>
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="person" label="CFCRL" @click="MostrarMenus(9)" />
              </div>
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="badge" label="REPSE" @click="MostrarMenus(2)" />
              </div>
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="badge" label="ICSOE" @click="MostrarMenus(5)" />
              </div>
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="badge" label="SISUB" @click="MostrarMenus(6)" />
              </div>
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="badge" label="VELAVO" @click="MostrarMenus(10)" />
              </div>
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="badge" label="UTD" @click="MostrarMenus(11)" />
              </div>
              <div class="col-xs-12 col-md-2 col-sm-2">
                <q-btn class="full-width" color="primary" icon="badge" label="SNE" @click="MostrarMenus(12)" />
              </div>
          </div>
            </div>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
      <!--MENU DLE PTU-->
      <div class="row bg-white border-panel bg-grey-3">
          <div class="col q-pa-md q-mt-md" v-show ="this.mostrarMenuPtu">
            <q-card style="min-width: 100%; min-height: 100% !important;" v-show ="this.mostrar === true">
              <q-expansion-item dark default-opened class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" :label="nodataPTU"
              >
            </q-expansion-item>
            </q-card>
            <div class="row bg-grey-3 border-panel" v-show ="this.mostrarTrabajadores === true" >
              <q-expansion-item dark default-opened class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="Información de la Participación de los Trabajadores en las Utilidades o PTU a nivel Nacional"
              >
              <q-card style="min-width: 100%; min-height: 100% !important;">
                <q-card-section>
                  <div class="row q-col-gutter-xs">
                    <div class="col-xs-12 col-sm-2">
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
                    <div class="col-xs-12 col-sm-4">
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
                    <div class="col-xs-12 col-sm-4">
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
                  <div class="col-xs-12 col-sm-4">
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
          <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" :label="msgEstatal"
              >
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
                    <q-icon name="house" />
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
                  label="Número de trabajadores en el CRUCE-SAT"
                >
                <q-tooltip class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                  label="Número de trabajadores en CRUCE-IMSS"
                >
                <q-tooltip class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                <q-tooltip class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="house" />
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
                <q-tooltip class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                  <template v-slot:prepend>
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
                    <q-icon name="house" />
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
        <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md" v-show ="this.MenuCentros">
          <q-expansion-item dark default-opened class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center;" :label="msgCTI"
              >
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
              <div style="width: 90%;"></div>
              <div style="width: 10%;">
                <q-btn v-if="hasRole(['DESCARGA'])"
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
                    <q-td  v-if="props.row.RFC != ''" key="RFC" style="text-align: center; cursor: pointer; text-decoration: underline; color: blue;" :props="props" @click="getData(props.row.RFC, props.row.CVE_PATRON, props.row)">
                      {{ props.row.RFC }}
                    </q-td>
                    <q-td  v-else style="text-align: center; cursor: pointer; text-decoration: underline;">
                    </q-td>
                    <q-td key="CVE_PATRON" style="text-align: left;" :props="props">{{ props.row.CVE_PATRON }}</q-td>
                    <q-td key="NOMBRE" style="text-align: left;" :props="props">{{ props.row.NOMBRE }}</q-td>
                    <q-td key="CVE_ENT_FEDERATIVA" style="text-align: left;" :props="props">{{ props.row.DESC_ENTIDAD }}</q-td>
                    <q-td key="CVE_MUNICIPIO" style="text-align: left;" :props="props">{{ props.row.Desc_Municipio }}</q-td>
                    <q-td key="GIRO" style="text-align: left;" :props="props">{{ props.row.GIRO }}</q-td>
                    <q-td key="CVE_MOD_N" style="text-align: left;" :props="props">{{ props.row.CVE_MOD_N }}</q-td>
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
      <div class="row bg-white border-panel bg-grey-3" v-show ="this.mostrarNominal && this.MenuCentros" >
        <div class="col q-pa-md">
          <q-expansion-item dark default-opened class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center;" label="Detalles del Centro de Trabajo"
              >
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
      <template v-slot:top>
          <div style="width: 100%;">
            <q-input dense debounce="300" v-model="filterPatronal" placeholder="Buscar por Clave Patronal" @update:model-value="v => { filterPatronal = v.toUpperCase() }">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" style="font-size:0.8rem !important; font-weight: normal !important;">
            <q-td key="actions" :props="props">
              <q-btn color="blue" icon="search" flat @click="buscarDatos(props.row.CVE_PATRON)">
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
            <q-td key="num_empresas" style="text-align: center;" :props="props">{{ formatNumberPriceZero(props.row.ID_EMPRESA) }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
    </q-card>
    </q-expansion-item>
      </div>
      </div>
      <!--SECCION RIESGOS-->
      <div class="row bg-white border-panel bg-grey-3">
      <div class="col q-pa-md" v-show ="this.MenuRiesgos">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="Información de Riesgos"
              >
          <q-card style="font-size:0.8rem !important; font-weight: normal !important;">
          <div class="col q-pa-md" >
            <div class="row q-col-gutter-xs">
            <div class="col-xs-12 col-sm-3">
                <q-input
                readonly
                  color="dark"
                  bg-color="secondary"
                  filled
                  v-model="cantRiesgos"
                  label="Total Riesgos de Trabajo"
                >
                  <template v-slot:prepend>
                    <q-icon name="house" />
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
    <div class="row bg-white border-panel bg-grey-3">
      <div class="col q-pa-md" v-show ="this.MenuSiaat">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="Información de Sistema de Avisos de Accidentes de Trabajo(Siaat)"
              >
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
    <!--SECCION CFCRL-->
    <div class="row bg-white border-panel bg-grey-3">
      <div class="col q-pa-md" v-show ="this.Menuccfcrl">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="Información de Centro Federal de Conciliación y Registro Laboral(CFCRL)"
              >
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
    <!--SECCION REPSE-->
      <div class="row bg-white border-panel bg-grey-3">
          <div class="col q-pa-md"  v-show ="this.mostrarMenuREPSE === true">
            <q-card style="min-width: 100%; min-height: 100% !important;" v-show ="this.mostrarREPSE === false">
              <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="No hay Información Disponible del Registro de Prestadoras de Servicios Especializados u Obras Especializadas(REPSE)"
              >
            </q-expansion-item>
            </q-card>
          <div class="row bg-grey-3 border-panel" v-show ="this.mostrarREPSE === true">
            <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="Registro de Prestadoras de Servicios Especializados u Obras Especializadas(REPSE)"
              >
            <q-card style="min-width: 100%; min-height: 100% !important;">
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
    <div class="row bg-white border-panel bg-grey-3">
      <div class="col q-pa-md" v-show ="this.MenuIcsoe">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="Información de Informativa de Contratos de Servicios u Obras Especializados(ICSOE)"
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
            <q-card style="min-width: 100%; min-height: 100% !important;">
              <div class="col q-pa-md" >
                <div class="row q-col-gutter-xs">
                  <div class="col-xs-12 col-sm-3">
                    <q-input
                    readonly
                      color="dark"
                      bg-color="secondary"
                      filled
                      v-model="ICSOE.Folio_Contrato"
                      label="Folio de Contrato"
                    >
                      <template v-slot:prepend>
                        <q-icon name="house" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-xs-12 col-sm-3">
                    <q-input
                    readonly
                      color="dark"
                      bg-color="secondary"
                      filled
                      v-model="ICSOE.Fecha_inicio"
                      label="Fecha de Inicio"
                    >
                      <template v-slot:prepend>
                        <q-icon name="house" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-xs-12 col-sm-3">
                      <q-input
                      readonly
                        color="dark"
                        bg-color="secondary"
                        filled
                        v-model="ICSOE.Fecha_fin"
                        label="Fecha Fin"
                      >
                        <template v-slot:prepend>
                          <q-icon name="house" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-3">
                      <q-input
                      @click="fetchFromServerTrabajadoresICSOE(this.EmisorRFCAux)"
                        readonly
                        color="dark"
                        bg-color="secondary"
                        filled
                        v-model="ICSOE.Num_trabajadores"
                        label="Número de Trabajadores"
                        >
                      <q-tooltip class="bg-blue">Clic para ver Trabajadores</q-tooltip>
                        <template v-slot:prepend>
                        <q-icon name="house" />
                      </template>
                    </q-input>
                      </div>
                  </div>
                </div>
              </q-card>
            </q-expansion-item>
      </div>
    </div>
    <!--SECCION SISUB-->
    <div class="row bg-white border-panel bg-grey-3">
      <div class="col q-pa-md" v-show ="this.MenuSisub">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="Información de Sistema de Información de Subcontratación(SISUB)"
              >
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
    <!--SECCION velavo-->
    <div class="row bg-white border-panel bg-grey-3">
      <div class="col q-pa-md" v-show ="this.MenuVelavo">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="(VELAVO)"
              >
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
    <!--SECCION UTD-->
    <div class="row bg-white border-panel bg-grey-3">
      <div class="col q-pa-md" v-show ="this.MenuUtd">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="(UTD)"
              >
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
    <!--SECCION velavo-->
    <div class="row bg-white border-panel bg-grey-3">
      <div class="col q-pa-md" v-show ="this.MenuSne">
        <q-expansion-item default-opened dark class="bg-primary text-h6" style="min-width: 100%; min-height: 100%; color: white; text-align: center !important;" label="(SNE)"
              >
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
<!--MODALES-->
<q-dialog v-model="modalICSOE" persistent>
        <q-card style="min-width: 100%; min-height: 60% !important;">
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
        row-key="CURP"
        v-model:pagination="paginationICSOE"
        :filter="filterICSOE"
        @request="qTableRequestTrabajadoresICSOE"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Numero_Seguridad_Social" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.Numero_Seguridad_Social) }}</q-td>
            <q-td key="CURP" style="text-align: center;" :props="props">{{ props.row.CURP }}</q-td>
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
        <q-card style="min-width: 100%; min-height: 60% !important;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-10 text-h6" style="color: white; text-align: center !important;">Trabajadores Asegurados Registrados en el IMSS</div>
                <div class="col-sm-2 pull-right" style="text-align: right !important"><q-btn color="white" flat v-on:click="closeModal()" round dense icon="close" /></div>
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
            <q-td key="Periodo" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.Periodo) }}</q-td>
            <q-td key="rfc" style="text-align: center;" :props="props">{{ props.row.rfc }}</q-td>
            <q-td key="nss" style="text-align: center; cursor: pointer; text-decoration: underline; color: blue;"  :props="props" @click="buscarDatosRiesgos(str10(props.row.nss),props.row.registro,props.row.curp)">{{ str10(props.row.nss) }}</q-td>
            <q-td key="curp" style="text-align: center;" :props="props">{{ props.row.curp }}</q-td>
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
        <q-card style="min-width: 100%; min-height: 100% !important;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-10 text-h6" style="color: white;  text-align: center !important;">Detalles del Trabajador</div>
                <div class="col-sm-2 pull-right" style="text-align: right !important"><q-btn color="white" flat v-on:click="closeModalRiegos()" round dense icon="close" /></div>
                </div>
            </q-card-section>
        <q-separator />
        <div class="bg-white border-panel q-mt-lg">
        <q-tabs
          v-model="tab2"
          class="text-primary"
          align="justify"
        >
          <q-tab name="sat" icon="account_balance" label="SAT - CFDI"/>
          <q-tab name="riego" icon="badge" label="RIESGOS - IMSS" v-on:click="fetchFromServerRiegos(this.nssTrabajador, this.cvepatron)"/>
          <q-tab name="siaat" icon="person" label="SIAAT" v-on:click="getSiaat(this.nssTrabajador, this.curpTrabajador)"/>
          <!--<q-tab name="infonavit" icon="real_estate_agent" label="INFONAVIT" />-->
          <q-tab name="cfcrl" icon="real_estate_agent" label="CFCRL" v-on:click="getCfcrl(this.nssTrabajador)"/>
        </q-tabs>
        <q-tab-panels v-model="tab2" animated>
          <q-tab-panel name="riego">
            <slot>
          <div style="font-weight: normal">
            <div class="col q-pa-xs flex-center justify-center">
      <div style="font-weight: normal;text-align: center;"></div>
      <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md" v-show ="this.mostrarPrincipal">
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
        :filter="filterRiegos"
        @request="qTableRequestRiesgos"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id_year_memoria" style="text-align: left;" :props="props">{{ formatNumberZero(props.row.id_year_memoria) }}</q-td>
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
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
            <q-td key="Curp" style="text-align: center;" :props="props">{{ props.row.Curp }}</q-td>
            <q-td key="Rfc" style="text-align: center;" :props="props">{{ props.row.Rfc }}</q-td>
            <q-td key="Nombres" style="text-align: left;" :props="props">{{ props.row.Nombres }}</q-td>
            <q-td key="Apellidos" style="text-align: left;" :props="props">{{ props.row.Apellidos }}</q-td>
            <q-td key="Edad" style="text-align: right;" :props="props">{{ props.row.Edad }}</q-td>
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
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
            <q-td key="Periodo" style="text-align: center;" :props="props">{{ formatNumberZero(props.row.Periodo) }}</q-td>
            <q-td key="ReceptorRFC" style="text-align: center;" :props="props">{{ props.row.ReceptorRFC }}</q-td>
            <q-td key="EmisorRFC" style="text-align: center;" :props="props">{{ props.row.EmisorRFC }}</q-td>
            <q-td key="EmisorRegistroPatronal" style="text-align: center;" :props="props">{{ props.row.EmisorRegistroPatronal }}</q-td>
            <q-td key="ReceptorCurp" style="text-align: center;" :props="props">{{ props.row.ReceptorCurp }}</q-td>
            <q-td key="ReceptorNumSeguridadSocial" style="text-align: center;" :props="props">{{ props.row.ReceptorNumSeguridadSocial }}</q-td>
            <q-td key="NumDiasPagados_sum" style="text-align: right;" :props="props">{{ formatNumberZero(props.row.NumDiasPagados_sum) }}</q-td>
            <q-td key="Descuento_sum" style="text-align: right;" :props="props">{{ formatNumberPrice(props.row.Descuento_sum) }}</q-td>
            <q-td key="Total_sum" style="text-align: right;" :props="props">{{ formatNumberPrice(props.row.Total_sum) }}</q-td>
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
          <q-card style="min-width: 100%; min-height: 100% !important;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white; text-align: center !important;">Centro Federal de Conciliación y Registro Laboral</div>
                <div class="row q-col-gutter-xs">
                </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-xs">
            <div class="col-xs-12 col-sm-3" v-if="dataCfcrl !== null">
              <q-input
              readonly
                color="dark"
                bg-color="secondary"
                filled
                label="Si hay datos disponibles para este trabajador"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-3" v-else>
              <q-input
              readonly
                color="dark"
                bg-color="secondary"
                filled
                label="No hay datos disponibles para este trabajador"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
          </div>
            </q-card-section>
            </q-card>
          </div>
      </div>
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
        <q-card style="min-width: 100%; min-height: 60% !important;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-10 text-h6" style="color: white; text-align: center !important;">Trabajadores Asegurados Registrados</div>
                <div class="col-sm-2 pull-right" style="text-align: right !important"><q-btn color="white" flat v-on:click="closeModalTrabajadores()" round dense icon="close" /></div>
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
          <q-btn v-if="hasRole(['DESCARGA'])"
          color="primary"
          icon-right="archive"
          label="Descarga"
          no-caps
          @click="exportTableDataTrabajadores()"></q-btn>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Bandera" style="text-align: center;" :props="props">{{ props.row.Bandera === '1.0' ? 'CRUCE' : (props.row.Bandera === '2.0'? 'IMSS' : (props.row.Bandera === '3.0'? 'SAT' :  'PENDIENTE' )) }}</q-td>
            <q-td key="ReceptorRFC" style="text-align: center;" :props="props">{{ props.row.ReceptorRFC }}</q-td>
            <q-td key="ReceptorNumSeguridadSocial" style="text-align: center; cursor: pointer; text-decoration: underline; color: blue;"  :props="props" >{{ str10(props.row.ReceptorNumSeguridadSocial) }}</q-td>
            <q-td key="ReceptorCurp" style="text-align: center;" :props="props">{{ props.row.ReceptorCurp }}</q-td>
            <q-td key="cve_patron_8" style="text-align: center;" :props="props">{{ props.row.cve_patron_8 }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
        </slot>
      </q-card>
    </q-dialog>
    </q-page>
  </template>

<script>
// import axios from 'axios'
import api from 'src/commons/api.js'
import useVuelidate from '@vuelidate/core'
import { QSpinnerFacebook } from 'quasar'
import { formatNumberPriceZero, formatNumberPrice, formatNumberZero, str10, hasRole } from 'src/commons/utils'
import { required } from '@vuelidate/validators'

export default {
  name: 'IndexServices',
  setup: () => ({ v$: useVuelidate(), formatNumberPriceZero, formatNumberPrice, formatNumberZero, str10, hasRole }),
  validations: {
    ptu: {
      mes: { required },
      anio: { required },
      subReg: { required }
    }
  },
  data () {
    return {
      claveProdOptions: [],
      selected: [],
      selected2: [],
      EmisorRFC: null,
      EmisorRFCAux: null,
      dondeestaAux: null,
      cvepatronAux: null,
      EmisorRegistroPatronalAux: null,
      id_entidadAux: null,
      empresaAux: null,
      entidadAux: null,
      divAux: null,
      grpAux: null,
      fraccionAux: null,
      idfraccionAux: null,
      modal: false,
      modalRiesgos: false,
      modalTrabajadores: false,
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
        { name: 'RFC', align: 'center', label: 'RFC', field: 'RFC', style: 'width: 20%', sortable: true },
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
        subReg: 1
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
      mostrarNominal: false,
      mostrarREPSE: '',
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
        { name: 'RFC', align: 'center', label: 'RFC', field: 'RFC', style: 'width: 20%', sortable: false },
        { name: 'CVE_MOD_N', align: 'center', label: 'Modalidad', field: 'CVE_MOD_N', style: 'width: 20%', sortable: false },
        { name: 'TA', align: 'center', label: 'T. Asegurados', field: 'TA', style: 'width: 20%', sortable: false },
        { name: 'TP', align: 'center', label: 'T. Permanentes', field: 'TP', style: 'width: 20%', sortable: false },
        { name: 'TEU', align: 'center', label: 'T. Eventuales Urbanos', field: 'TEU', style: 'width: 20%', sortable: false },
        { name: 'TEC', align: 'center', label: 'T. Eventuales del Campo', field: 'TEC', style: 'width: 20%', sortable: false },
        { name: 'CVE_FRACCION', align: 'center', label: 'Clave Fracción', field: 'CVE_FRACCION', style: 'width: 20%', sortable: false },
        { name: 'CURP', align: 'center', label: 'CURP', field: 'CURP', style: 'width: 20%', sortable: false },
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
        { name: 'Periodo', align: 'center', label: 'Periodo', field: 'Periodo', style: 'width: 20%', sortable: false },
        { name: 'rfc', align: 'center', label: 'RFC', field: 'rfc', style: 'width: 20%', sortable: false },
        { name: 'nss', align: 'center', label: 'NSS', field: 'nss', style: 'width: 20%', sortable: false },
        { name: 'curp', align: 'center', label: 'CURP', field: 'curp', style: 'width: 20%', sortable: false },
        { name: 'registro', align: 'center', label: 'Registro', field: 'registro', style: 'width: 20%', sortable: false },
        { name: 'mod', align: 'center', label: 'Mod', field: 'mod', style: 'width: 20%', sortable: false }
        /* { name: 'cve_mun_final', align: 'center', label: 'Municipio', field: 'cve_mun_final', style: 'width: 20%', sortable: false },
        { name: 'cve_ent_final', align: 'center', label: 'Ent Federativa', field: 'cve_ent_final', style: 'width: 20%', sortable: false },
        { name: 'sal_cierre', align: 'center', label: 'Salario Cierre', field: 'sal_cierre', style: 'width: 20%', sortable: false }
        { name: 'Salario_minimo', align: 'center', label: 'Salario Minimo', field: 'Salario_minimo', style: 'width: 20%', sortable: false },
        { name: 'Nuevos_Asegurados', align: 'center', label: 'Nuevos Asegurados', field: 'Nuevos_Asegurados', style: 'width: 20%', sortable: false },
        { name: 'Num_Nominal', align: 'center', label: 'Número Nominal', field: 'Num_Nominal', style: 'width: 20%', sortable: false },
        { name: 'CVE_FRACCION', align: 'center', label: 'Registro Patronal', field: 'CVE_FRACCION', style: 'width: 20%', sortable: false } */
      ],
      paginationICSOE: {
        sortBy: 'CURP',
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
      filterRiegos: '',
      paginationRiesgosbyCvePatron: {
        sortBy: 'nss',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsRiesgosbyCvePatron: [
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
      nss: null,
      curp: null,
      cve_patron: null,
      tab2: 'sat',
      nodataPTU: '',
      nodataCentros: 'NO HAY DATOS DISPONIBLES',
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
      controladorserachClave: null,
      controladorCentro: null,
      controladorNominal: null,
      controladorTrabajadores: null,
      controladorTrabajadoresICSOE: null,
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
        { name: 'Rfc', align: 'center', label: 'RFC', field: 'Rfc', style: 'width: 20%', sortable: false },
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
        { name: 'Periodo', align: 'center', label: 'Periodo', field: 'Periodo', style: 'width: 20%', sortable: false },
        { name: 'ReceptorRFC', align: 'center', label: 'RFC Receptor', field: 'ReceptorRFC', style: 'width: 20%', sortable: false },
        { name: 'EmisorRFC', align: 'center', label: 'RFC Emisor', field: 'EmisorRFC', style: 'width: 20%', sortable: false },
        { name: 'EmisorRegistroPatronal', align: 'center', label: 'Registro Patronal', field: 'EmisorRegistroPatronal', style: 'width: 20%', sortable: false },
        { name: 'ReceptorCurp', align: 'center', label: 'CURP Receptor', field: 'ReceptorCurp', style: 'width: 20%', sortable: false },
        { name: 'ReceptorNumSeguridadSocial', align: 'center', label: 'Número de Seguridad Social', field: 'ReceptorNumSeguridadSocial', style: 'width: 20%', sortable: false },
        { name: 'NumDiasPagados_sum', align: 'center', label: 'Días Pagados', field: 'NumDiasPagados_sum', style: 'width: 20%', sortable: false },
        { name: 'Descuento_sum', align: 'center', label: 'Descuento', field: 'Descuento_sum', style: 'width: 20%', sortable: false },
        { name: 'Total_sum', align: 'center', label: 'Pago', field: 'Total_sum', style: 'width: 20%', sortable: false }
      ],
      filterEA: '',
      dataEA: [],
      paginationEA: {
        sortBy: 'EmisorRFC',
        descending: false,
        rowsPerPage: 3,
        rowsNumber: 0,
        page: 1
      },
      columnsEA: [
        // { name: 'Periodo', align: 'center', label: 'Periodo', field: 'Periodo', style: 'width: 20%', sortable: false },
        { name: 'EmisorRFC', align: 'center', label: 'RFC Emisor', field: 'EmisorRFC', style: 'width: 20%', sortable: false },
        { name: 'Nombre_Empresa', align: 'center', label: 'Nombre Empresa', field: 'Nombre_Empresa', style: 'width: 20%', sortable: false },
        { name: 'desc_entidad', align: 'center', label: 'Entidad', field: 'desc_entidad', style: 'width: 20%', sortable: false },
        { name: 'EmisorRegistroPatronal', align: 'center', label: 'Registro', field: 'EmisorRegistroPatronal', style: 'width: 20%', sortable: false },
        // { name: 'DESC_DIVISION', align: 'center', label: 'División de Actividad Económica', field: 'DESC_DIVISION', style: 'width: 20%', sortable: false },
        // { name: 'DESC_GPO_ACT', align: 'center', label: 'Grupo de Actividad Económica', field: 'DESC_GPO_ACT', style: 'width: 20%', sortable: false },
        { name: 'DESC_FRACION', align: 'center', label: 'Actividad Económica', field: 'DESC_FRACION', style: 'width: 20%', sortable: false }
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
        TA_SOLO_SAT_MENOR: null
      },
      EANacional: {
        Num_Centros_SAT: null,
        TA_SAT: null,
        Num_Centros_IMSS: null,
        TA_IMSS: null,
        total: null,
        descuento: null,
        organismo: null,
        institucion: null
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
        sortBy: 'Bandera',
        descending: false,
        rowsPerPage: 5,
        rowsNumber: 0,
        page: 1
      },
      columnsTrabajadores: [
        { name: 'Bandera', align: 'center', label: 'Cruce', field: 'Bandera', style: 'width: 20%', sortable: true },
        { name: 'ReceptorRFC', align: 'center', label: 'RFC', field: 'ReceptorRFC', style: 'width: 20%', sortable: false },
        { name: 'ReceptorNumSeguridadSocial', align: 'center', label: 'NSS', field: 'ReceptorNumSeguridadSocial', style: 'width: 20%', sortable: false },
        { name: 'ReceptorCurp', align: 'center', label: 'CURP', field: 'ReceptorCurp', style: 'width: 20%', sortable: false },
        { name: 'cve_patron_8', align: 'center', label: 'Registro', field: 'cve_patron_8', style: 'width: 20%', sortable: false }
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
      datarepse: []
    }
  },
  computed: {
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
  },
  mounted () {
    this.getDIV()
    this.getEntidad()
    // this.getJson()
  },
  methods: {
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
    editSelectedRow (id) {
    },
    cleamInputs () {
      this.ptu.rfc = null
      this.ptu.cve = null
      this.ptu.name = null
      this.ptu.anio = null
      this.ptu.mes = null
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
      this.EANacional.TA_IMSS = null
      this.EANacional.TA_SAT = null
      this.EANacional.Num_Centros_IMSS = null
      this.EANacional.Num_Centros_SAT = null
      this.EANacional.total = null
      this.EANacional.descuento = null
      this.EANacional.organismo = null
      this.EANacional.institucion = null
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
      this.EANacional.Num_Centros_SAT = null
      this.EANacional.TA_SAT = null
      this.EANacional.Num_Centros_IMSS = null
      this.EANacional.TA_IMSS = null
      this.EANacional.total = null
      this.EANacional.descuento = null
      this.EANacional.organismo = null
      this.EANacional.institucion = null
      this.dataPatronal = []
      this.pagination.rowsPerPage = 5
      this.paginationPatronal.page = 1
      this.paginationNominal.rowsPerPage = 5
      this.paginationNominal.page = 1
      this.data = []
      this.dataEA = []
      this.mostrar = ''
      this.mostrarNominal = false
      this.mostrarPrincipal = false
      this.mostrarPrincipal2 = false
      this.mostrarREPSE = ''
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
      this.MenuSne = false
      this.MenuVelavo = false
      this.MenuUtd = false
      this.selectGPO = []
      this.selectActividad = []
      this.GPO_id = null
      this.Actividad_id = null
      this.DIV_id = null
      this.Entidad_id = null
    },
    cleamInputsBuscar () {
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
      this.EA.TA_SOLO_SAT = null
      this.EA.TA_SOLO_IMSS = null
      this.EA.TA_SOLO_SAT_MAYOR = null
      this.EA.TA_SOLO_SAT_MENOR = null
      this.EA.total = false
      this.EA.descuento = false
      this.EA.organismo = false
      this.EA.institucion = false
      this.EANacional.Num_Centros_SAT = null
      this.EANacional.TA_SAT = null
      this.EANacional.Num_Centros_IMSS = null
      this.EANacional.TA_IMSS = null
      this.EANacional.total = null
      this.EANacional.descuento = null
      this.EANacional.organismo = null
      this.EANacional.institucion = null
      this.mostrar = ''
      this.mostrarNominal = false
      this.mostrarPrincipal = false
      this.mostrarPrincipal2 = false
      this.mostrarREPSE = ''
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
      this.MenuSne = false
      this.MenuVelavo = false
      this.MenuUtd = false
      this.pagination.sortBy = 'RFC'
      this.pagination.descending = false
      this.pagination.rowsPerPage = 5
      this.pagination.rowsNumber = 0
      this.pagination.page = 1
      this.repse.RFC = null
    },
    async qTableRequest (props) {
      this.msgCTI = 'Centros de trabajo en el IMSS de ' + props.empresa + '(' + props.EmisorRFC + ') ' + props.entidad
      this.v$.ptu.$reset()
      this.v$.ptu.$touch()
      if (this.v$.ptu.$error) {
        return false
      }
      this.$q.loading.show()
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
        this.$q.loading.hide()
        if (data.data) {
          this.data = data.data
          this.mostrarPrincipal = true
          this.pagination.totalRowsNumber = data.total
          this.pagination.rowsNumber = data.total
          this.pagination.page = data.current_page
          this.pagination.rowsPerPage = data.per_page
          this.triggerCustomRegisteredType1()
        } else {
          this.cleamInputsBuscar()
        }
      })
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
      this.$q.loading.show()
      this.qTableRequestPatronal({
        pagination: this.paginationPatronal,
        filter: this.filterPatronal
      })
    },
    editSelectedRowPatronal (id) {
      this.$router.push(`/search-imss/${id}`)
    },
    async qTableRequestPatronal (props) {
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
      this.$q.loading.show()
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
      this.showLoading('Riesgos')
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
    fetchFromServerRiesgosbyCvePatron (CVE_PATRON) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestRiesgosbyCvePatron({
        pagination: this.paginationPatronal,
        filter: this.filterPatronal,
        id2: CVE_PATRON
      })
    },
    async qTableRequestRiesgosbyCvePatron (props) {
      this.paginationRiesgosbyCvePatron = props.pagination
      this.filterRiesgosbyCvePatron = props.filter
      const params = {}
      params.pagination = this.paginationRiegos
      params.filter = this.filterRiesgos
      params.page = this.paginationRiegos.page
      params.nss = this.nss
      params.cve_patron = this.EmisorRegistroPatronalAux
      // console.log('riesgos')
      // console.log(params)
      // this.modalRiesgos = true
      // this.nssTrabajador = this.nss
      // this.showLoading('Riesgos')
      api.get('/riesgosolap-cvepatron', params).then(({ data }) => {
        // console.log(data)
        this.dataRiesgosbyCvePatron = data.data
        this.cantRiesgos = data.data.length
        this.paginationRiesgosbyCvePatron.totalRowsNumber = data.total
        this.paginationRiesgosbyCvePatron.rowsNumber = data.total
        this.paginationRiesgosbyCvePatron.page = data.current_page
        this.paginationRiesgosbyCvePatron.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    async getCfcrl (nss) {
      const params = {}
      params.nss = nss
      this.showLoading('cfcrl')
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
      this.showLoading('siaat')
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
      this.showLoading('sat')
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
        spinnerColor: 'red',
        spinnerSize: 200,
        backgroundColor: 'purple',
        message: ' Espere un momento estamos consultando la información de: ' + $msg,
        messageColor: 'black'
      })
    },
    async qTableRequestEA (props) {
      this.v$.ptu.$reset()
      this.v$.ptu.$touch()
      if (this.v$.ptu.$error) {
        return false
      }
      this.$q.loading.show()
      this.paginationEA = props.pagination
      this.filterEA = props.filter
      const params = {}
      params.pagination = this.paginationEA
      params.filter = this.filterEA
      params.page = this.paginationEA.page
      params.ptu = this.ptu
      params.DIVid = this.DIV_id
      params.GPOid = this.GPO_id
      params.Actividadid = this.Actividad_id
      params.Entidadid = this.Entidad_id
      api.get('/empresas-agregadas', params).then(({ data }) => {
        this.$q.loading.hide()
        if (data.data) {
          this.dataEA = data.data
          this.mostrarPrincipal = true
          this.paginationEA.totalRowsNumber = data.total
          this.paginationEA.rowsNumber = data.total
          this.paginationEA.page = data.current_page
          this.paginationEA.rowsPerPage = data.per_page
        } else {
          // this.cleamInputsBuscar()
        }
      })
    },
    CalcularDatosNacionales (props) {
      const params = {}
      params.EmisorRFC = props.EmisorRFC
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
      })
    },
    CalcularDatosEntidades (props) {
      const params = {}
      params.EmisorRFC = props.EmisorRFC
      params.Entidadid = props.id_entidad
      params.fraccion = props.cve_fraccion
      params.EmisorRegistroPatronal = props.EmisorRegistroPatronal
      api.get('/get-agregadas-entidad-completa', params).then(({ data }) => {
        // console.log(data)
        // this.msgNacional = 'Información General Nacional ' + ' ' + props.Nombre_Empresa + ' (' + props.EmisorRFC + ')'
        // this.EA.Num_Centros_SAT = formatNumberPriceZero(data[0].Num_Centros_SAT)
        this.EA.TA_SAT = formatNumberPriceZero(data[0].cruze_sat)
        // this.EA.Num_Centros_IMSS = formatNumberPriceZero(data[0].Num_Centros_IMSS)
        this.EA.TA_IMSS = formatNumberPriceZero(data[0].cruze_imss)
        this.EA.TA_SOLO_IMSS = formatNumberPriceZero(data[0].IMSS)
        this.EA.TA_SOLO_SAT = formatNumberPriceZero(data[0].SAT)
        this.EA.TA_SOLO_SAT_MAYOR = formatNumberPriceZero(data[0].SAT_MAYOR)
        this.EA.TA_SOLO_SAT_MENOR = formatNumberPriceZero(data[0].SAT_MENOR)
        // this.EA.total = formatNumberPriceZero(data[0].Total)
        // this.EA.descuento = formatNumberPriceZero(data[0].Descuento)
        // this.EA.organismo = data[0].desc_Organismo
        // this.EA.institucion = data[0].desc_tipo_inst_seguridad
      })
      api.get('/get-agregadas-entidad', params).then(({ data }) => {
        console.log(data)
        this.EA.Num_Centros_SAT = formatNumberPriceZero(data[0].Num_Centros_SAT)
        this.EA.Num_Centros_IMSS = formatNumberPriceZero(data[0].Num_Centros_IMSS)
        this.EA.total = formatNumberPriceZero(data[0].Total)
        this.EA.descuento = formatNumberPriceZero(data[0].Descuento)
        this.EA.organismo = data[0].desc_Organismo
        this.EA.institucion = data[0].desc_tipo_inst_seguridad
      })
    },
    UpdateDatosAgregados (props) {
      this.toggleSelectedRow(props)
      this.CalcularDatosNacionales(props)
      this.CalcularDatosEntidades(props)
      this.msgEstatal = 'Información Estatal ' + props.Nombre_Empresa + ' - ' + props.desc_division + ' (' + props.EmisorRFC + ') ' + props.desc_entidad
      this.EmisorRFCAux = props.EmisorRFC
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
      this.mostrarMenuPrincipal = true
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
      this.getdataICSOE(props)
      this.fetchFromServerRiesgosbyCvePatron(props.EmisorRegistroPatronal)
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
          // console.log(data)
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
    fetchFromServerTrabajadores (rfc, d, E) {
      this.dondeestaAux = d
      // this.EmisorRegistroPatronalAux = E
      this.$q.loading.show()
      this.loading = true
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
      console.log(props)
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
      console.log(params)
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
      this.icsoe = []
      this.MenuIcsoe = false
      api.post('/icsoe-getData', params).then(({ data }) => {
        if (!data.icsoe) {
          // console.log(data)
          this.mostrarIcsoe = false
          // this.datarepse = data.repse
          this.nodataPTU = 'No hay datos disponibles de REPSE para la búsqueda por el RFC: ' + id
        } else {
          this.mostrarIcsoe = true
          this.ICSOE = data.icsoe
        }
      })
    },
    fetchFromServerTrabajadoresICSOE (rfc) {
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestTrabajadoresICSOE({
        pagination: this.paginationICSOE,
        filter: this.filterICSOE,
        id: rfc
      })
    },
    async qTableRequestTrabajadoresICSOE (props) {
      console.log(props)
      this.paginationICSOE = props.pagination
      this.filterICSOE = props.filter
      const params = {}
      params.pagination = this.paginationICSOE
      params.filter = this.filterICSOE
      params.page = this.paginationICSOE.page
      params.rfc = this.EmisorRFCAux
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
    MostrarMenus (id) {
      this.$q.notify({
        type: 'my-notif',
        message: 'Dezplazarse para ver la Información',
        icon: 'arrow_downward',
        progress: true,
        color: 'green',
        textColor: 'white',
        classes: 'glossy'
      })
      if (id === 1) {
        this.mostrarMenuPtu = !this.mostrarMenuPtu
      } else if (id === 2) {
        this.mostrarMenuREPSE = !this.mostrarMenuREPSE
      } else if (id === 3) {
        this.MenuEstatal = !this.MenuEstatal
      } else if (id === 4) {
        this.MenuCentros = !this.MenuCentros
      } else if (id === 5) {
        this.MenuIcsoe = !this.MenuIcsoe
      } else if (id === 6) {
        this.MenuSisub = !this.MenuSisub
      } else if (id === 7) {
        this.MenuRiesgos = !this.MenuRiesgos
      } else if (id === 8) {
        this.MenuSiaat = !this.MenuSiaat
      } else if (id === 9) {
        this.Menuccfcrl = !this.Menuccfcrl
      } else if (id === 10) {
        this.MenuVelavo = !this.MenuVelavo
      } else if (id === 11) {
        this.MenuUtd = !this.MenuUtd
      } else if (id === 12) {
        this.MenuSne = !this.MenuSne
      } else {
        console.log('Estamos trabajando')
      }
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
</style>
