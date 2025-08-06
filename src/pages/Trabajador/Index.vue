<template>
    <q-page class="bg-grey-3 background-all">
      <div class="q-pa-sm">
        <div class="row background-div">
          <div class="col-sm-8">
            <div class="q-pa-md q-gutter-sm">
              <q-breadcrumbs align="left" style="font-size: 20px">
                <q-breadcrumbs-el label="" icon="home" to="/" />
                <q-breadcrumbs-el label="Trabajador" />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <q-card-section>
      <div class="q-pa-sm input-desing" style="border-radius: 10px">
        <div class="row q-col-gutter-xs">
          <div class="col-xs-12 col-sm-3">
              <q-input
              dense
                :bg-color="(trabajador.rfc === null || trabajador.rfc === '') ? 'secondary' : 'dark'"
                filled
                v-model="trabajador.rfc"
                label="RFC del trabajador"
                @update:model-value="v => { trabajador.rfc = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="assignment" />
                </template>
              </q-input>
            </div>
      <div class="col-xs-12 col-sm-3">
    <q-input
      class="uppcase"
      :bg-color="(trabajador.curp === null || trabajador.curp === '') ? 'secondary' : 'dark'"
      borderless
      filled
      dense
      map-options
      label="CURP del trabajador"
      v-model="trabajador.curp"
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
    </q-input>
  </div>
            <div class="col-xs-12 col-sm-3 border-panel">
              <q-input
                :bg-color="( trabajador.nss === null || trabajador.nss === '') ? 'secondary' : 'dark'"
                filled
                dense
                v-model="trabajador.nss"
                label="Número de Seguridad Social"
                @update:model-value="v => { trabajador.nss = v.toUpperCase() }"
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
      <div class="q-pa-md bg-grey-3 background-table">
        <div class="row border-panel">
          <div class="col q-pa-md" style="background: transparent;">
            <q-table
              flat
              bordered
              :rows="data"
              :columns="columns"
              row-key="ReceptorCurp"
              v-model:pagination="pagination"
              :filter="filter"
              @request="qTableRequest"
              class="background-table-1"
            >
            <template v-slot:top>
                <div style="width: 100%;">
                  <q-input dense debounce="300" v-model="filter" placeholder="Buscar por RFC" @input="v => { filter = v.toUpperCase() }">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="ReceptorRFC" style="text-align: center;" :props="props">{{ props.row.ReceptorRFC }}</q-td>
                    <q-td key="ReceptorCurp" style="text-align: center;cursor: pointer; text-decoration: underline; color: blue;" :props="props" @click="consultarCurp(props.row.ReceptorCurp)">{{ props.row.ReceptorCurp }}</q-td>
                    <q-td key="ReceptorNumSeguridadSocial"  style="text-align: center;cursor: pointer; text-decoration: underline; color: blue;" :props="props" @click="buscarDatosRiesgos(str10(props.row.ReceptorNumSeguridadSocial),props.row.cve_patron_8,props.row.ReceptorCurp)">{{ props.row.ReceptorNumSeguridadSocial }}</q-td>
                    <q-td key="EmisorRFC" style="text-align: center;cursor: pointer; text-decoration: underline; color: blue;"  :props="props" @click="editSelectedRow(props.row)">{{ props.row.EmisorRFC }}</q-td>
                    <q-td key="Nombre_Empresa" style="text-align: center;" :props="props">{{ props.row.Nombre_Empresa }}</q-td>
                    <q-td key="cve_patron_8" style="text-align: center;" :props="props">{{ props.row.cve_patron_8 }}</q-td>
                    <q-td key="Sum_Descuento" style="text-align: center;" :props="props">${{ formatNumberPrice(props.row.Sum_Descuento) }}</q-td>
                    <q-td key="SUM_Total" style="text-align: center;" :props="props">${{ formatNumberPrice(props.row.SUM_Total) }}</q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </div>
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
            <div style="font-weight: normal;text-align: center;"></div>
            <div class="row justify-center" style="padding-top: 5%;">
              <div class="panel panel-default">
                    <div class="panel-heading clearfix">
                      <h4 style="margin-bottom: 8px;">Información del Trabajador</h4>
                    </div>
                    <div class="panel-body">
                      <div v-if="this.dataRenapo.statusOper ==='NO EXITOSO'" class="panel-heading clearfix">
                      <h4 style="margin-bottom: 8px;">No se Encontro el CURP</h4>
                    </div>
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
                            Entidad de nacimiento:
                          </td>
                          <td style="text-transform: uppercase;">{{ statusEntidad(this.dataRenapo.numEntidadReg) }}</td>
                        </tr>
                        <!-- tr style="border-bottom: 1px solid #ececec;">
                          <td style="font-weight: 700; width: 60%; padding-top: 8px; padding-bottom: 8px;">Estatus CURP:</td>
                          <td>{{status-curp curp.statusCurp}}</td>
                        </tr -->
                      </table>
                    </div>
                  </div>
        </div>
          </div>
          </div>
        </slot>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalRiesgos" persistent>
        <q-card style="min-width: 100%; min-height: 100% !important;">
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
          class="text-primary"
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
            <q-td key="Curp" style="text-align: center;cursor: pointer; text-decoration: underline; color: blue;" :props="props" @click="consultarCurp(props.row.Curp)">{{ props.row.Curp }}</q-td>
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
            <q-td key="ReceptorRFC" style="text-align: center;" :props="props">{{ props.row.ReceptorRFC }}</q-td>
            <q-td key="EmisorRFC" style="text-align: center;" :props="props">{{ props.row.EmisorRFC }}</q-td>
            <q-td key="EmisorRegistroPatronal" style="text-align: center;" :props="props">{{ props.row.EmisorRegistroPatronal }}</q-td>
            <q-td key="ReceptorCurp" style="text-align: center;cursor: pointer; text-decoration: underline; color: blue;" :props="props" @click="consultarCurp(props.row.ReceptorCurp)">{{ props.row.ReceptorCurp }}</q-td>
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
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
            <q-td key="curp_bt" style="text-align: center;cursor: pointer; text-decoration: underline; color: blue;" :props="props" @click="consultarCurp(props.row.curp_bt)">{{ props.row.curp_bt }}</q-td>
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
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
            <q-td key="curp" style="text-align: center;cursor: pointer; text-decoration: underline; color: blue;" :props="props" @click="consultarCurp(props.row.curp)">{{ props.row.curp }}</q-td>
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
          <q-card style="min-width: 100%; min-height: 100% !important;">
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
  </q-page>
  </template>

<script>
import api from 'src/commons/api.js'
import { QSpinnerFacebook } from 'quasar'
import { formatNumberPrice, statusEntidad, str10, formatNumberZero } from 'src/commons/utils'

export default {
  name: 'IndexTrabajador',
  setup: () => ({ formatNumberPrice, statusEntidad, str10, formatNumberZero }),
  data () {
    return {
      mostrarPrincipal: false,
      mostrarPrincipal2: false,
      tab2: 'sat',
      trabajador: {
        rfc: null,
        curp: null,
        nss: null
      },
      pagination: {
        sortBy: 'ReceptorCurp',
        descending: false,
        rowsPerPage: 15,
        rowsNumber: 0
      },
      columns: [
        { name: 'ReceptorRFC', align: 'center', label: 'RFC', field: 'ReceptorRFC', style: 'width: 20%', sortable: true },
        { name: 'ReceptorCurp', align: 'center', label: 'CURP', field: 'ReceptorCurp', style: 'width: 20%', sortable: true },
        { name: 'ReceptorNumSeguridadSocial', align: 'center', label: 'NSS', field: 'ReceptorNumSeguridadSocial', style: 'width: 20%', sortable: true },
        { name: 'EmisorRFC', align: 'center', label: 'RFC Empresa', field: 'EmisorRFC', style: 'width: 20%', sortable: true },
        { name: 'Nombre_Empresa', align: 'center', label: 'Nombre Empresa', field: 'Nombre_Empresa', style: 'width: 20%', sortable: true },
        { name: 'cve_patron_8', align: 'center', label: 'Registro Patronal', field: 'cve_patron_8', style: 'width: 20%', sortable: true },
        { name: 'Sum_Descuento', align: 'center', label: 'Descuento', field: 'Sum_Descuento', style: 'width: 20%', sortable: true },
        { name: 'SUM_Total', align: 'center', label: 'Total Factura', field: 'SUM_Total', style: 'width: 20%', sortable: true }
      ],
      data: [],
      filter: '',
      modalCurpRenapo: false,
      dataRenapo: [],
      rawDataRenapo: {},
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
      filterSat: '',
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
      curpTrabajador: null,
      nssTrabajador: null,
      cvepatron: null,
      modalRiesgos: false
    }
  },
  created () {
    // this.fetchFromServer()
  },
  methods: {
    closeModalRiegos () {
      this.modalRiesgos = false
      this.dataCfcrl = null
      this.dataRiegos = []
      this.dataSat = []
      this.dataSiaat = []
      this.tab2 = 'sat'
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
    cleamInputs () {
      this.trabajador.rfc = null
      this.trabajador.curp = null
      this.trabajador.nss = null
    },
    fetchFromServer () {
      this.$q.loading.show()
      this.qTableRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    async qTableRequest (props) {
      this.pagination = props.pagination
      this.filter = props.filter
      const params = {}
      params.pagination = this.pagination
      params.filter = this.filter
      params.page = this.pagination.page
      params.rfc = this.trabajador.rfc
      params.curp = this.trabajador.curp
      params.nss = this.trabajador.nss
      api.get('/all-trabajadores', params).then(({ data }) => {
        this.mostrarPrincipal = true
        console.log(data)
        this.$q.loading.hide()
        this.data = data.data
        this.pagination.rowsNumber = data.total
        this.pagination.page = data.current_page
        this.pagination.rowsPerPage = data.per_page
      })
    },
    consultarCurp (curpTrabajador) {
      this.$q.loading.show()
      this.dataRenapo = []
      const params = {}
      params.curpTrabajador = curpTrabajador
      api.post('/consultar-curp', params).then(({ data }) => {
        this.dataRenapo = data.data.consultarPorCurpOResult
        this.modalCurpRenapo = true
        // console.log(data)
        this.$q.loading.hide()
      }).catch(error => error)
    },
    closemodalCurpRenapo () {
      this.modalCurpRenapo = false
      this.dataRenapo = ''
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
    fetchFromServerRiegos (NSS, CVE_PATRON) {
      this.nss = NSS
      this.cvepatron = CVE_PATRON
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestRiesgos({
        pagination: this.paginationRiegos,
        filter: this.filterRiesgos,
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
    fetchFromServerSNE (curp) {
      this.curp = curp
      this.$q.loading.show()
      this.loading = true
      this.qTableRequestSNE({
        pagination: this.paginationSNE,
        filter: this.filterSNE,
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
      // console.log('SiSub')
      // console.log(params)
      // this.modalSiSub = true
      // this.nssTrabajador = this.nss
      this.showLoading(' (CFCRl)')
      api.get('/cfcrl-persona', params).then(({ data }) => {
        // console.log(data.data)
        this.dataCfcrlPersona = data.data
        this.paginationCfcrlPersona.totalRowsNumber = data.total
        this.paginationCfcrlPersona.rowsNumber = data.total
        this.paginationCfcrlPersona.page = data.current_page
        this.paginationCfcrlPersona.rowsPerPage = data.per_page
        this.$q.loading.hide()
      })
      // this.closeLoading()
    },
    fetchFromServerRenapoPersona (curpTrabajador) {
      this.$q.loading.show()
      this.dataRenapo = []
      const params = {}
      params.curpTrabajador = curpTrabajador
      api.post('/consultar-curp', params).then(({ data }) => {
        this.dataRenapo = data.data.consultarPorCurpOResult
        // console.log(data)
        this.rawDataRenapo = data
        this.processDataRenapo(data)
        this.$q.loading.hide()
      }).catch(error => error)
      this.$q.loading.hide()
    },
    processDataRenapo (data) {
      // Extraer y transformar datos
      const result = data?.data?.consultarPorCurpOResult
      this.dataRenapo = result ? [result] : []
    },
    /* editSelectedRow (props) {
      this.$router.push(`/home/${props.EmisorRFC}/${props.cve_patron_8}`)
    } */
    editSelectedRow (props) {
      const url = `/home/${props.EmisorRFC}/${props.cve_patron_8}`
      window.open(url, '_blank') // Abre la URL en una nueva pestaña o ventana
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
  background-color: #ddc9a3; /* color de fondo para la fila seleccionada */
}
@media (max-width: 1930px) and (min-width: 1601px) {
  .responsive-card {
    height: 76vh;
  }
}
@media (max-width: 1600px) and (min-width: 950px) {
  .responsive-card {
    height: 75vh !important;
  }
  .responsive-card2 {
    height: 40vh;
  }
  .responsive-btn {
    height: 5.5vh;
}
  .responsive-btn span {
  font-size: 10px;
}
}
@media (max-width: 1070px) and (min-width: 1001px) {
.responsive-btn {
  width: 99%;
  height: 3vh;
}
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
  color: #000
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
</style>
