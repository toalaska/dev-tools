import request from '@/utils/request'

export function dict(data) {
  return request({
    url: '/data_contrast/queryDataDictionary',
    method: 'post',
    data
  })
}

export function field(data) {
  return request({
    url: '/data_contrast/queryDataItems',
    method: 'post',
    data
  })
}