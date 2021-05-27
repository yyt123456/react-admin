const adminToken = 'adminToken'
export function setToken(val) {
  sessionStorage.setItem(adminToken, val)
}
export function getToken() {
  return sessionStorage.getItem(adminToken)
}