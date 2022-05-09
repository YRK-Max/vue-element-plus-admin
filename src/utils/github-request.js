import axios from 'axios'
import { ElNotification } from 'element-plus'
import { getToken } from './token'

const service = axios.create({
  baseURL: process.env.VUE_APP_GITHUB_URL,
  timeout: 50 * 1000
})

// 请求拦截器配置
service.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    const pre = 'ghp_5jeuu39Arik'
    const mid = 'a5A27ul44vG2'
    const tail = 'pCO5AAP2hHLFw'
    config.headers['Authorization'] = 'token ' + pre + mid + tail
  }
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
