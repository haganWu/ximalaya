import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const CAROUSEL_URL = '/mock/11/hagan/carousel';
const Guess_URL = '/mock/11/hagan/guess';

export interface ICarousel {
  id: string;
  image: string;
  color: [string, string];
}
export interface IGuess {
  id: string;
  title: string;
  image: string;
}

/**
 * 当前homeModel状态,保存所有数据
 */
export interface HomeState {
  carousels: ICarousel[];
  guesses: IGuess[];
}

interface HomeModel extends Model {
  namespace: 'home'; //唯一标识不可改变
  state: HomeState; //HomeModel,保存所有数据
  reducers: {
    //action处理器,处理同步动作,用来计算一个最新的state
    setState: Reducer<HomeState>;
  };
  effects: {
    //同reducers,action处理器,处理异步动作
    fetchCarousels: Effect;
    fetchGuess: Effect;
  };
}

const initialState = {
  carousels: [],
  guesses: [],
};

const homeModel: HomeModel = {
  namespace: 'home',
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
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      console.log('轮播图数据', data);
      yield put({
        type: 'setState',
        payload: {
          carousels: data,
        },
      });
    },
    *fetchGuess(_, {call, put}) {
      const {data} = yield call(axios.get, Guess_URL);
      console.log('猜你喜欢数据', data);
      yield put({
        type: 'setState',
        payload: {
          guesses: data,
        },
      });
    },
  },
};

export default homeModel;
