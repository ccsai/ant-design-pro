import { queryUserList } from '@/services/api';

export default {
  namespace: 'sys',

  state: {
    data: {
      code: 200,
      msg: '',
      total: 3,
      list: [],
    },
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
