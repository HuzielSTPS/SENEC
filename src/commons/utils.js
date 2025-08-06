import { useUserStore } from 'src/stores/user'

const hasRole = (roles) => {
  const user = useUserStore()
  for (let i = 0; i < roles.length; i++) {
    if (user.roles.includes(roles[i])) {
      return true
    }
  }
  return false
}

const formatDate = (date) => {
  let info = null
  if (date !== null) {
    info = date.split('/').reverse().join('/')
  }
  return info
}

const formatDateDMY = (date) => {
  let info = null
  if (date !== null) {
    info = date.split('-').reverse().join('/')
  }
  return info
}

const formatDateDMYHIS = (date) => {
  let info = null
  if (date !== null) {
    info = date.split(' ')
    info[0] = info[0].split('-').reverse().join('/')
    info = info.join(' ')
  }
  return info
}

const formatDateYMD = (date) => {
  let info = null
  if (date !== null) {
    info = date.split('/').reverse().join('-')
  }
  return info
}

const formatDateYMDHIS = (date) => {
  let info = null
  if (date !== null) {
    info = date.split(' ')
    info[0] = info[0].split('/').reverse().join('-')
    info = info.join(' ')
  }
  return info
}

const str10 = (cadena) => {
  let info = null
  if (cadena !== null) {
    info = cadena.substring(0, 10)
  }
  return info
}

const formatNumberPrice = (value) => {
  const val = (value / 1).toFixed(2).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const formatNumberPriceZero = (value) => {
  const val = (value / 1).toFixed(0).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const formatNumberZero = (value) => {
  const val = (value / 1).toFixed(0).replace(',', '.')
  return val.toString()
}

const statusColor = (status) => {
  const colors = {
    NUEVO: 'blue-6',
    EJECUTADO: 'positive',
    CANCELADO: 'negative',
    PROCESANDO: 'warning',
    DESCARGANDO: 'light-green-5',
    FINALIZADO: 'positive',
    ERROR: 'negative',
    REMISIONADO: 'green',
    ACTIVA: 'positive',
    BLOQUEADA: 'negative',
    COTIZADO: 'warning',
    PEDIDO: 'orange',
    CERRADO: 'red',
    RECIBIDO: 'positive',
    PARCIAL: 'red-4',
    ABONADO: 'orange',
    PAGADO: 'positive',
    PENDIENTE: 'blue-6',
    VENCIDO: 'negative',
    'VENCIDO ABONADO': 'warning',
    ACTIVO: 'green',
    INACTIVO: 'red'
  }
  return colors[status]
}

const statusEntidad = (status) => {
  const colors = {
    '01': 'Aguascalientes',
    '02': 'Baja California',
    '03': 'Baja California Sur',
    '04': 'Campeche',
    '05': 'Coahuila',
    '06': 'Colima',
    '07': 'Chiapas',
    '08': 'Chihuahua',
    '09': 'Ciudad de México',
    10: 'Durango',
    11: 'Guanajuato',
    12: 'Guerrero',
    13: 'Hidalgo',
    14: 'Jalisco',
    20: 'Oaxaca',
    15: 'Mexico',
    16: 'Michoacan',
    17: 'Morelos',
    18: 'Nayarit',
    19: 'Nuevo Leon',
    21: 'Puebla',
    22: 'Queretaro',
    23: 'Quintana Roo',
    24: 'San Luis Potosi',
    25: 'Sinaloa',
    26: 'Sonora',
    27: 'Tabasco',
    28: 'Tamaulipas',
    29: 'Tlaxcala',
    30: 'Veracruz',
    31: 'Yucatan',
    32: 'Zacatecas'
  }
  return colors[status]
}

const myLocale = {
  days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
  daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
  firstDayOfWeek: 1
}

export {
  hasRole,
  formatDate,
  formatDateDMY,
  formatDateYMD,
  statusColor,
  statusEntidad,
  myLocale,
  formatNumberPrice,
  formatNumberPriceZero,
  formatNumberZero,
  formatDateYMDHIS,
  formatDateDMYHIS,
  str10
}
