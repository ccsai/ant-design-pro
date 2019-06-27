import {treeTable} from '@/services/picture/project';

export default {
  namespace: 'project',

  state: {
    data: {
      total: 0,
      rows: []
    }
  },

  effects: {
    * treeTable({payload}, {call, put}) {
      const response = yield call(treeTable,payload);
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
    }
  },
}
