import request from '@/utils/request';

export async function findDictPage(params) {
  return request(`/dict/findDictPage`,
    {
      method: 'post',
      data: params
    });
}
