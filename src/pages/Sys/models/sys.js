import { queryUserList, addUser } from '@/services/api';

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
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
