import {Effect, EffectsCommandMap, EffectWithType, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RootState} from '.';
import {getCurrentTime, getDuration, init, pause, play} from '@/config/sound';
import {call} from 'react-native-reanimated';
import {getCurrenDate} from '../utils';

/**
 * 节目(播放页面数据)接口
 */
const CATEGORY_URL = '/mock/11/hagan/show';

export interface PlayerModelState {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  soundUrl: string;
  playState: string;
  currentTime: number;
  duration: number;
}

interface PlayerModel extends Model {
  namespace: 'player';
  state: PlayerModelState;
  reducers: {
    setState: Reducer<PlayerModelState>;
  };
  effects: {
    fetchPlayer: Effect;
    play: Effect;
    pause: Effect;
    watcherCurrentTime: EffectWithType; //轮询保存播放时间
  };
}

const initialState: PlayerModelState = {
  id: '',
  title: '',
  description: '',
  thumbnailUrl: '',
  soundUrl: '',
  playState: '',
  currentTime: 0,
  duration: 0,
};

/**
 * 延迟函数
 */
const delay = (timeout: number) =>
  new Promise(resolve => setTimeout(resolve, timeout));

/**
 * 轮询保存播放时间
 * 每秒获取一次音频当前播放时间
 */
function* currentTime({call, put}: EffectsCommandMap) {
  while (true) {
    yield call(delay, 1000);
    // console.log('轮询保存播放时间 ----', getCurrenDate());
    const time: number = yield call(getCurrentTime);
    yield put({
      type: 'setState',
      payload: {
        currentTime: time,
      },
    });
  }
}

const playerModel: PlayerModel = {
  namespace: 'player',
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
    *fetchPlayer({payload}, {call, put}) {
      const {data} = yield call(axios.get, CATEGORY_URL, {
        params: {
          id: payload.id,
        },
      });
      yield call(init, data.soundUrl);
      yield put({
        type: 'setState',
        payload: {
          id: data.id,
          title: data.title,
          description: data.description,
          thumbnailUrl: data.thumbnailUrl,
          soundUrl: data.soundUrl,
          duration: getDuration(),
        },
      });
      yield put({
        type: 'play',
      });
    },

    *play({payload}, {call, put}) {
      //存储播放/暂停状态
      yield put({
        type: 'setState',
        payload: {
          playState: 'playing',
        },
      });
      yield call(play);
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
        },
      });
    },

    *pause({payload}, {call, put}) {
      //存储播放/暂停状态
      yield call(pause);
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
        },
      });
    },

    /**
     * 轮询保存播放时间 (没有地方调用 怎么执行的?)
     */
    watcherCurrentTime: [
      function* (sagaEffects) {
        const {call, take, race} = sagaEffects;
        while (true) {
          yield take('play'); //播放状态下才去轮询
          yield race([call(currentTime, sagaEffects), take('pause')]); //暂停后 call里面的函数将会退出
        }
      },
      {type: 'watcher'},
    ],
  },
};
export default playerModel;
