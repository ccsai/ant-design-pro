import request from '@/utils/request';


export async function findTree(params) {
  return request(`/project/labelTree`,
    {
      method: 'post',
      data: params
    });
}
