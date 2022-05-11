import axios from 'axios'
import { ElNotification } from 'element-plus'

const service = axios.create({
  baseURL: '/third',
  timeout: 50 * 1000
})

// 请求拦截器配置
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// 响应拦截器配置
service.interceptors.response.use(response => {
  const data = response.data

  if (response.status !== 200) {
    ElNotification({
      title: Error,
      message: response['msg'] || 'UnKown Error.',
      type: 'error'
    })
    return Promise.reject(new Error(response['msg'] || 'Error'))
  } else {
    return data
  }
})

export default service
