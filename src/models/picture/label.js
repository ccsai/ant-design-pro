import {findTree,findLabelTreeTable,findLabelDetail,addLabel,modifyLabel} from '@/services/picture/label';

export default {
  namespace: 'label',

  state: {
    data: {
      code: 200,
      msg: '',
      total: 0,
      list: [],
    }
  },

  effects: {
    * findTree({payload,callback}, {call}) {
      const response = yield call(findTree,payload);
      if(callback){
        callback(response);
      }
    },
    * findLabelTreeTable({payload,callback}, {call, put}) {
      const response = yield call(findLabelTreeTable,payload);
      yield put({
        type: 'saveTable',
        payload: response
      })
    },
    * findLabelDetail({payload,callback}, {call, put}) {
      const response = yield call(findLabelDetail,payload);
      if(callback){
        callback(response);
      }
    },
    * addLabel({payload,callback}, {call, put}) {
      const response = yield call(addLabel,payload);
      if(callback){
        callback(response);
      }
    },
    * modifyLabel({payload,callback}, {call, put}) {
      const response = yield call(modifyLabel,payload);
      if(callback){
        callback(response);
      }
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
};
