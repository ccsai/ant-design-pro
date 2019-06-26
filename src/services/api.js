import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryUserList(params) {
  return request(`/api/userList?${stringify(params)}`);
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
      // method: 'post',
    },
  });
}

export async function update(params) {
  return request('/api/update', {
    method: 'post',
    data: {
      ...params,
      // method: 'post',
    },
  });
}
