import {queryUserList, addUser, detail,update} from '@/services/api';

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
    * fetch({payload}, {call, put}) {
      const response = yield call(queryUserList,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * fetchUserList({payload,callback}, {call, put}) {
      const response = yield call(queryUserList,payload);
      if (callback) callback(response);
    },
    * add({payload, callbcallbackack}, {call, put}) {
      const response = yield call(addUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * detail({payload, callback}, {call, put}) {
      const response = yield call(detail, payload);
      if (callback) callback(response);
    },
    * update({payload, callback}, {call, put}) {
      const response = yield call(update, payload);
      if (callback) callback(response);
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
