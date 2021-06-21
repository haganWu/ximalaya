import axios from 'axios';
import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {goBack} from '@/utils/index';

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
  };
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
    },
  },
};
export default accountModel;
