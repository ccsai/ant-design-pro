import request from '@/utils/request';

export async function queryUserList() {
  return request('/api/userList');
}
