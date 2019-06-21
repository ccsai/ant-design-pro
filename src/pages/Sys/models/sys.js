import { queryUserList } from '@/services/api';

export default {
  namespace: 'sys',

  state: {
    list: [],
    a: 0,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUserList);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
