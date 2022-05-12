import fileRequest from '@/utils/fileRequest'

export function gen(data) {
  return fileRequest({
    url: '/apigen/gen',
    method: 'post',
    data
  })
}

