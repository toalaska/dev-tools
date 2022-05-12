import fileRequest from '@/utils/fileRequest'
import request from '@/utils/request'

export function parse(data) {
  return request({
    url: '/db/createTableSql',
    method: 'post',
    data
  })
}

