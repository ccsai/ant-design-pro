import request from '@/utils/request';


export async function findTree(params) {
  return request(`/project/labelTree`,
    {
      method: 'post',
      data: params
    });
}

export async function findLabelTreeTable(params){
  return request('/project/labelTreeTable',{
    method: 'post',
    data: {
      ...params,
      method: 'post',
    }
  })
}

export async function findLabelDetail(params) {
  return request('/label/findLabelDetail', {
    method: 'post',
    data: {
      ...params,
    }
  })
}
export async function addLabel(params) {
  return request('/label/addLabel', {
    method: 'post',
    data: {
      ...params,
      method: 'post',
    }
  })
}

export async function modifyLabel(params) {
  return request('/label/modifyLabel', {
    method: 'post',
    data: {
      ...params,
    }
  })
}
