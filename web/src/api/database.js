import fileRequest from '@/utils/fileRequest'

export function databases(data) {
  return fileRequest({
    url: '/db/doc',
    method: 'post',
    data

  })
}
