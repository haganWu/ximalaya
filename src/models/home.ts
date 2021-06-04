import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RootState} from '.';

/**
 * 轮播图
 */
const CAROUSEL_URL = '/mock/11/hagan/carousel';
/**
 * 猜你喜欢
 */
const GUESS_URL = '/mock/11/hagan/guess';
/**
 * 首页列表
 */
const CHANNEL_URL = '/mock/11/hagan/channel';

export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string];
}
export interface IGuess {
  id: string;
  title: string;
  image: string;
}
export interface IChannel {
  id: string;
  image: string;
  title: string;
  played: number;
  playing: number;
  remark: string;
}

export interface IPagination {
  current: number;
  total: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * 当前homeModel状态,保存所有数据
 */
export interface HomeState {
  carousels: ICarousel[];
  activeCarouselIndex: number; //当前轮播图下标
  gradientVisible: boolean;
  guesses: IGuess[];
  channels: IChannel[];
  pagination: IPagination;
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
    fetchChannels: Effect;
  };
}

const initialState = {
  carousels: [],
  activeCarouselIndex: 0,
  gradientVisible: true,
  guesses: [],
  channels: [],
  pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
    hasMore: true,
  },
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
      yield put({
        type: 'setState',
        payload: {
          carousels: data,
        },
      });
    },
    *fetchGuess(_, {call, put}) {
      const {data} = yield call(axios.get, GUESS_URL);
      console.log('home Guess data:',data)
      yield put({
        type: 'setState',
        payload: {
          guesses: data,
        },
      });
    },
    *fetchChannels({callback, payload}, {call, put, select}) {
      // console.log('payload.category:', payload.category);
      //获取历史数据
      let {channels, pagination} = yield select(
        (state: RootState) => state.home,
      );
      let page = pagination.current;
      if (payload) {
        if (payload.loadMore) {
          page++;
        } else if (payload.refreshing) {
          page = 1;
        }
      }

      //请求到的新数据
      const {data} = yield call(axios.get, CHANNEL_URL, {
        params: {
          page,
          // category: payload.category,
        },
      });
      let newChannels = data.results;
      if (payload && payload.loadMore) {
        newChannels = channels.concat(newChannels);
      }
      yield put({
        type: 'setState',
        payload: {
          channels: newChannels,
          pagination: {
            current: data.pagination.current,
            total: data.pagination.total,
            pageSize: data.pagination.pageSize,
            hasMore: newChannels.length < data.pagination.total,
          },
        },
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
  },
};

export default homeModel;
