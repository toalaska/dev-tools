import fileRequest from '@/utils/fileRequest'

export function prototypes(data) {
  return fileRequest({
    url: '/axure/axure',
    method: 'post',
    data,
    responseType: 'json'
  })
}
