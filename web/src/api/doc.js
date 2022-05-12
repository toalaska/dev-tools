import request from '@/utils/request'

export function save(data) {
  return request({
    
    url: 'http://18.1.129.11/ims/web/ext/devData/saveData',
    method: 'post',
    data
  })
}
export function rollback(data) {
  return request({
    url: 'http://10.70.198.30/ims/web/ext/devData/restoreData',
    method: 'post',
    data
  })
}

export function query(data) {
  return request({
    url: 'http://10.70.198.30/ims/web/ext/devData/queryData',
    method: 'post',
    data
  })
}