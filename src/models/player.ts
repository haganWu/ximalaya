import {Effect, EffectsCommandMap, EffectWithType, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RootState} from '.';
import {
  getCurrentTime,
  getDuration,
  init,
  pause,
  play,
  skipProgress,
  stop,
} from '@/config/sound';

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
  previousId: string;
  nextId: string;
  sounds: {id: string; title: string}[];
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
    previoud: Effect;
    next: Effect;
    skip: Effect;
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
  previousId: '',
  nextId: '',
  sounds: [],
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
          id: payload.id /*  data.id */,
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
      try {
        yield call(play);
      } catch (err) {
        console.log('播放音频错误:', err);
      }

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

    *previoud({payload}, {call, put, select}) {
      yield call(stop);
      const {id, sounds}: PlayerModelState = yield select(
        ({player}: RootState) => player,
      );
      const index = sounds.findIndex(item => item.id === id);
      const currentIndex = index - 1;
      const currentItem = sounds[currentIndex];
      const previousItem = sounds[currentIndex - 1];
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
          id: currentItem.id,
          title: currentItem.title,
          previousId: previousItem ? previousItem.id : '',
          nextId: id,
        },
      });
      yield put({
        type: 'fetchPlayer',
        payload: {
          id: currentItem.id,
        },
      });
    },

    *next({payload}, {call, put, select}) {
      yield call(stop);
      const {id, sounds}: PlayerModelState = yield select(
        ({player}: RootState) => player,
      );
      const index = sounds.findIndex(item => item.id === id);
      const currentIndex = index + 1;
      const currentItem = sounds[currentIndex];
      const nextItem = sounds[currentIndex + 1];
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
          id: currentItem.id,
          title: currentItem.title,
          previousId: id,
          nextId: nextItem ? nextItem.id : '',
        },
      });
      yield put({
        type: 'fetchPlayer',
        payload: {
          id: currentItem.id,
        },
      });
    },

    *skip({payload}, {call, put}) {
      try {
        yield call(skipProgress, payload.progress);
      } catch (err) {
        console.log('拖动进度错误:', err);
      }
    },
  },
};
export default playerModel;
