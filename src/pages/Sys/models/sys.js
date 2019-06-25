import {queryUserList, addUser, detail} from '@/services/api';

export default {
  namespace: 'sys',

  state: {
    data: {
      code: 200,
      msg: '',
      total: 0,
      list: [],
    }
  },

  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(queryUserList);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * add({payload, callback}, {call, put}) {
      const response = yield call(addUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * detail({payload, callback}, {call, put}) {
      const response = yield call(detail, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      console.log(callback)
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      // console.log(action.payload, state);
      return {
        ...state,
        data: action.payload,
      };
    }
  },
};
