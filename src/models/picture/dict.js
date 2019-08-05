import {findDictPage} from '@/services/picture/dict';

export default {
  namespace: 'dict',

  state: {
    data: {
      code: 200,
      msg: '',
      total: 0,
      list: [],
    }
  },

  effects: {
    * findDictPage({payload,callback}, {call}) {
      const response = yield call(findDictPage,payload);
      yield put({
        type: 'saveTable',
        payload: response
      });
    },
  },

  reducers: {
    saveTable(state,action){
      return {
        ...state,
        data: action.payload
      }
    }
  },
}
