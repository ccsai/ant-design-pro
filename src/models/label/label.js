import {findTree} from '@/services/picture/label';

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
    * findTree({payload,callback}, {call, put}) {
      const response = yield call(findTree,payload);
      if(callback){
        callback(response);
      }
    },
  },

  reducers: {

  },
};
