<template>
    <div class="q-pa-md bg-grey-3">
        <div class="bg-white border-panel">
          <div class="row q-col-gutter-xs">
            <div class="col-xs-6 col-sm-6">
      <apexchart
        width="500"
        type="bar"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div class="col-xs-6 col-sm-6" id="chart">
        <apexchart type="pie" width="380" :options="chartOptionsPie" :series="seriesPie"></apexchart>
      </div>
        </div>
      </div>
</div>
  </template>
<script>
import VueApexCharts from 'vue3-apexcharts'
export default {
  name: 'PageIndex',
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }
      ],
      seriesPie: [44, 55, 13, 43, 22],
      chartOptionsPie: {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
        }]
      }
    }
  }
}
</script>
