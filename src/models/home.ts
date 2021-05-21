import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';

/**
 * 当前homeModel状态,保存所有数据
 */
export interface HomeState {
  num: number;
}

interface HomeModel extends Model {
  namespace: 'home'; //唯一标识不可改变
  state: HomeState; //HomeModel,保存所有数据
  reducers: {
    //action处理器,处理同步动作,用来计算一个最新的state
    add: Reducer<HomeState>;
    multiply:Reducer<HomeState>;
    backZero: Reducer<HomeState>;
  };
  effects: {
    //同reducers,action处理器,处理异步动作
    asyncAdd: Effect;
    asyncMultiply: Effect;
  };
}

const initialState = {
  num: 1,
};

const initialMultiplyState = {
  num: 2,
};

function delay(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    add(state = initialState, {payload}) {
      return {
        ...state,
        num: state.num + payload.num,
      };
    },
    multiply(state = initialMultiplyState, {payload}){
      return {
        ...state,
        num: state.num * payload.num,
      };
    },
    backZero(state = initialState, {payload}){
      return {
        ...state,
        num: 0,
      };
    },

  },
  effects: {
    *asyncAdd({payload}, {call, put}) {
      yield call(delay,3000);
      yield put({
        type:'add',
        payload,
      });
    },
    *asyncMultiply({payload}, {call, put}){
      yield call(delay,5000);
      yield put({
        type:'multiply',
        payload,
      });
    },
  },
};

export default homeModel;
