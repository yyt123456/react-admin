import service from '../utils/http'
export function InfoList(data) {
  return service.request({
    url: '/login/',
    method: 'post',
    params: data,
    data
  })
}