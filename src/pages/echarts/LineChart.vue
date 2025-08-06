<template>
  <div class="q-gutter-lg q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Dashboard de Indicadores
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <!-- Columna izquierda: Tabla -->
          <div class="col-3">
            <q-card flat bordered>
              <q-card-section class="text-h7">
                Indicadores
              </q-card-section>
              <q-card-section>
                <q-table
                  :rows="tableData"
                  :columns="columns"
                  dense
                  flat
                  hide-bottom
                  row-key="name"
                  style="height: 300px; overflow: auto;"
                />
              </q-card-section>
            </q-card>
          </div>

          <!-- Columna derecha: Gráfico superior -->
          <div class="col-2">
            <q-card flat bordered>
              <q-card-section class="text-h7">
                Trabajadores IMSS
              </q-card-section>
              <q-card-section>
                <ECharts ref="indicatorsPie" :option="chartOptions" autoresize style="height: 300px;" />
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="row q-col-gutter-md q-mt-md">
          <!-- Gráficos adicionales (abajo) -->
          <div class="col-6">
            <q-card flat bordered>
              <q-card-section class="text-h7">
                Gráfico Adicional 1
              </q-card-section>
              <q-card-section>
                <ECharts :option="otherChartOptions1" autoresize style="height: 250px;" />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-6">
            <q-card flat bordered>
              <q-card-section class="text-h7">
                Gráfico Adicional 2
              </q-card-section>
              <q-card-section>
                <ECharts :option="otherChartOptions2" autoresize style="height: 250px;" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import ECharts from 'vue-echarts'
import * as echarts from 'echarts/core'
import { PieChart, BarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import api from 'src/commons/api.js'

echarts.use([PieChart, BarChart, TooltipComponent, LegendComponent, CanvasRenderer])

export default defineComponent({
  name: 'DashboardView',
  components: {
    ECharts
  },
  setup () {
    const columns = [
      { name: 'name', required: true, label: 'Indicador', align: 'left', field: row => row.name },
      { name: 'status', required: true, label: 'Estado', align: 'center', field: row => row.status }
    ]

    const tableData = ref([])
    const chartOptions = ref({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Trabajadores',
          type: 'pie',
          radius: '50%',
          data: []
        }
      ]
    })

    const otherChartOptions1 = ref({
      // Opciones de tu gráfico adicional 1 (por ejemplo, barra)
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['A', 'B', 'C'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [120, 200, 150] }]
    })

    const otherChartOptions2 = ref({
      // Opciones de tu gráfico adicional 2
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['X', 'Y', 'Z'] },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: [300, 150, 400] }]
    })

    const fetchData = async () => {
      try {
        const params = { EmisorRFC: 'NWM9709244W4' }
        const response = await api.get('/get-data-graficas', params)
        const rawData = response.data.trabajadores[0]

        // Llenar la tabla con indicadores SI/NO
        const filteredKeys = Object.keys(rawData).filter(key => rawData[key] === 'SI' || rawData[key] === 'NO')
        tableData.value = filteredKeys.map(key => ({
          name: key,
          status: rawData[key] === 'SI' ? '✅' : '❌'
        }))

        // Datos para el gráfico de pastel
        const tpt = response.data.trabajadores[0].tpt
        const tp = response.data.trabajadores[0].te
        chartOptions.value.series[0].data = [
          { value: tpt, name: 'te' },
          { value: tp, name: 'tpt' }
        ]
      } catch (error) {
        console.error('Error obteniendo datos:', error)
      }
    }

    onMounted(fetchData)

    return {
      columns,
      tableData,
      chartOptions,
      otherChartOptions1,
      otherChartOptions2
    }
  }
})
</script>
