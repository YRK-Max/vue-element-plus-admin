import ls from './storage'

export function setToken(token) {
  ls.set('token', token, 1 * 24 * 60 * 60 * 1000)
}

export function getToken() {
  return ls.get('token')
}

export function removeToken() {
  ls.remove('token')
}
