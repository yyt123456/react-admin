import service from '../utils/http'

export function Login(data) {
  return service.request({
    url: '/login/',
    method: 'post',
    params: data,
    data
  })
}
export function GetCode(data) {
  return service.request({
    url: '/getSms/',
    method: 'post',
    params: data,
    data
  })
}