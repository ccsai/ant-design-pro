import request from '@/utils/request';


export async function treeTable(params) {
  return request(`/project/treeTable`,
    {
      method: 'post',
      data: params
    });
}
