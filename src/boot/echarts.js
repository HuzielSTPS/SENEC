import { boot } from 'quasar/wrappers'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, GaugeChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GaugeChart,
  GridComponent,
  TitleComponent,
  TooltipComponent
])

export default boot(({ app }) => {
  // Código adicional si es necesario
})
