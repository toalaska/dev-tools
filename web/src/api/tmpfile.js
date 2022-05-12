import request from '@/utils/request'

export function uploadStr(data) {
  return request({
    
    url: 'http://172.16.18.112:1025/file/uploadStr',
    method: 'post',
    data
  })
}