import fileRequest from '@/utils/fileRequest'

export function parse(data) {
  return fileRequest({
    url: '/postman/report',
    method: 'post',
    data
  })
}

