import axios from 'axios'
import qs from 'qs'
import { Dialog, Loading, Notify, exportFile } from 'quasar'

const CancelToken = axios.CancelToken
let source = CancelToken.source()
axios.defaults.baseURL = process.env.API
axios.interceptors.response.use(function (response) {
  if (response.data.message) {
    Notify.create({
      message: response.data.message,
      position: 'top',
      color: 'positive'
    })
    Loading.hide()
  }
  return response
}, function (error) {
  if (error.response.status === 401) {
    localStorage.removeItem('JWT')
    window.location.reload()
  }
  if (error.response) {
    let messages = ''
    if (error.response.data.errors && Object.keys(error.response.data.errors).length > 1) {
      for (const property in error.response.data.errors) {
        messages = messages + '<li>' + error.response.data.errors[property][0] + '</li>'
      }
      messages = '<ul>' + messages + '</ul>'
      Dialog.create({
        title: 'Error',
        message: messages,
        persistent: true,
        html: true
      })
    } else {
      messages = error.response.data.message
      Notify.create({
        message: messages,
        position: 'top',
        color: 'warning'
      })
    }
    Loading.hide()
  }
  return Promise.reject(error)
})

const toForm = (request) => {
  const formData = new FormData()
  Object.keys(request).forEach(key => {
    formData.append(key, request[key] ?? '')
  })
  return formData
}

const api = {
  request: (config) => axios.request(qs.stringify(config)),
  get: (url, config) => axios.get(`${url}?${qs.stringify(config)}`),
  post: (url, config) => axios.post(url, qs.stringify(config), { cancelToken: source.token }),
  put: (url, config) => axios.put(url, qs.stringify(config)),
  delete: (url, config) => axios.delete(`${url}?${qs.stringify(config)}`),
  file: (url, request) => axios.post(url, toForm(request), {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  putFile: (url, request) => axios.post(`${url}?_method=PUT`, toForm(request), {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  fileDownload: (url, config) => axios.get(`${url}?${qs.stringify(config)}`, {
    responseType: 'arraybuffer'
  }).then(({ data }) => {
    const status = exportFile(
      config.fileName,
      data,
      config.mimeType
    )
    if (status !== true) {
      Notify.create({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning'
      })
    }
    Loading.hide()
  }),
  cancel: () => {
    source.cancel('Operation canceled by the user.')
    source = CancelToken.source()
  }

}

export default api
