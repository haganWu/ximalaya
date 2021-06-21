import axios from 'axios';
import {Effect, Model, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import {goBack} from '@/utils/index';
import storage, {load} from '@/config/storage';
import {call} from 'react-native-reanimated';

const ACCOUNT_URL = '/mock/11/hagan/login';

export interface IAccount {
  name: string;
  avatar: string;
}

export interface AccountModelState {
  account?: IAccount;
}

export interface AccountModel extends Model {
  namespace: 'account';
  state: AccountModelState;
  reducers: {
    setState: Reducer<AccountModelState>;
  };
  effects: {
    login: Effect;
    logout: Effect;
    loadStroage: Effect;
  };

  subscriptions: SubscriptionsMapObject;
}
const initialState: AccountModelState = {
  account: undefined,
};

const accountModel: AccountModel = {
  namespace: 'account',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *login({payload}, {call, put}) {
      const {data, status, msg} = yield call(axios.post, ACCOUNT_URL, payload);
      if (status === 200) {
        yield put({
          type: 'setState',
          payload: {
            account: data,
          },
        });
        storage.save({
          key: 'account',
          data,
        });
        goBack();
      } else {
        console.log(msg);
      }
    },
    *logout(_, {put}) {
      yield put({
        type: 'setState',
        payload: {
          account: undefined,
        },
      });
      storage.save({
        key: 'account',
        data: null,
      });
    },

    *loadStroage(_, {put, call}) {
      try {
        const account = yield call(load, {key: 'account'});
        yield put({
          type: 'setState',
          payload: {
            account: account,
          },
        });
      } catch (error) {
        console.log('保存用户信息错误', error);
      }
    },
  },

  subscriptions: {
    setup({dispatch}) {
      dispatch({
        type: 'loadStroage',
      });
    },
  },
};
export default accountModel;
