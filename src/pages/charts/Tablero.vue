<template>
    <q-page class="bg-grey-3">
      <div class="q-pa-sm bg-white">
        <div class="row">
          <div class="col-sm-8">
            <div class="q-pa-md q-gutter-sm">
              <q-breadcrumbs align="left" style="font-size: 20px">
                <q-breadcrumbs-el label="" icon="home" to="/" />
                <q-breadcrumbs-el label="Gráficas" />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
        <div class="row bg-white border-panel bg-grey-3">
        <div class="col q-pa-md">
            <div class="row q-col-gutter-xs">
            <div class="col-xs-6 col-sm-6">
          <q-card style="min-width: 100%; min-height: 100%; !important;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-12 text-h6" style="color: white; text-align: center !important;">Empresas</div>
                </div>
          </q-card-section>
          <q-card-section>
            <div class="col-xs-6 col-sm-6" id="chart">
        <apexchart type="pie" width="500" :options="chartOptionsPie" :series="seriesPie"></apexchart>
      </div>
            </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-6 col-sm-6">
          <q-card style="min-width: 100%; min-height: 100%; !important;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-12 text-h6" style="color: white; text-align: center !important;">RFC´S en SAT de la Administración Pública</div>
                </div>
          </q-card-section>
          <q-card-section>
            <div class="col-xs-6 col-sm-6" id="chart">
                <apexchart type="donut" width="480" :options="chartOptionsPieR" :series="seriesPieR"></apexchart>
      </div>
            </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-6 col-sm-6">
          <q-card style="min-width: 100%; min-height: 100%; !important;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-12 text-h6" style="color: white; text-align: center !important;">Puestos de Trabajo SAT</div>
                </div>
          </q-card-section>
          <q-card-section>
            <div class="col-xs-6 col-sm-6" id="chart">
                <apexchart type="donut" width="500" :options="chartOptionsDonut" :series="seriesDonut"></apexchart>
      </div>
            </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-6 col-sm-6">
          <q-card style="min-width: 100%; min-height: 100%; !important;">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-12 text-h6" style="color: white; text-align: center !important;">Trabajadores en SAT encontrados en el IMSS</div>
                </div>
          </q-card-section>
          <q-card-section>
            <div id="chart">
        <apexchart type="donut" width="500" :options="chartOptionsDonutR" :series="seriesDonutR"></apexchart>
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
import VueApexCharts from 'vue3-apexcharts'
import { formatNumberPrice } from 'src/commons/utils'
export default {
  name: 'PageIndex',
  setup: () => ({ formatNumberPrice }),
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
      seriesPie: [97, 335266, 4240, 41050, 1523, 637427],
      chartOptionsPie: {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: ['Gobierno solo IMSS', 'Iniciativa Privada solo IMSS', 'Gobierno solo SAT', 'Iniciativa Privada solo SAT', 'Gobierno IMSS_SAT', 'Iniciativa Privada IMSS_SAT'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        xaxis: {
          type: 'numeric'
        }
      },
      seriesPieR: [695, 1, 403, 69, 684, 4],
      chartOptionsPieR: {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: ['Organismo del Municipio', 'Estatal', 'Municipal', 'Federal', 'Organismo de la Entidad', 'Partido Político'],
        theme: {
          monochrome: {
            enabled: true
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5
            }
          }
        },
        dataLabels: {
          formatter (val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }
        },
        legend: {
          show: true
        }
      },
      seriesDonut: [1213, 27, 1444, 356, 1585, 19],
      chartOptionsDonut: {
        chart: {
          width: 380,
          type: 'donut'
        },
        labels: ['Organismo del Municipio', 'Estatal', 'Municipal', 'Federal', 'Organismo de la Entidad', 'Partido Político'],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 230
        },
        responsive: [{
          breakpoint: 380,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: false
            }
          }
        }]
      },
      seriesDonutR: [876, 15, 1232, 235, 1473, 21],
      chartOptionsDonutR: {
        chart: {
          width: 380,
          type: 'donut'
        },
        labels: ['Organismo del Municipio', 'Estatal', 'Municipal', 'Federal', 'Organismo de la Entidad', 'Partido Político'],
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: 'gradient'
        },
        legend: {
          formatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex]
          }
        },
        responsive: [{
          breakpoint: 380,
          options: {
            chart: {
              width: 380
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    }
  }
}
</script>
