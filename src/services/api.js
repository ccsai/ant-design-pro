import request from '@/utils/request';

export async function queryUserList() {
  return request('/api/userList');
}

export async function addUser(params) {
  return request('/api/userAdd', {
    method: 'post',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function detail(params) {
  return request('/api/detail', {
    method: 'post',
    data: {
      ...params,
      method: 'post',
    },
  });
}
