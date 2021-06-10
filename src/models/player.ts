import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RootState} from '.';
import {init, pause, play} from '@/config/sound';

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
    fetchPause: Effect;
  };
}

const initialState: PlayerModelState = {
  id: '',
  title: '',
  description: '',
  thumbnailUrl: '',
  soundUrl: '',
  playState: '',
};

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
      console.log('data:', data);
      yield put({
        type: 'setState',
        payload: data,
        // payload: {
        //   id: data.id,
        //   title: data.title,
        //   description: data.description,
        //   thumbnailUrl: data.thumbnailUrl,
        //   soundUrl: data.soundUrl,
        // },
      });
      console.log('soundUrl:', data.soundUrl);
      yield call(init, data.soundUrl);
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

    *fetchPause({payload}, {call, put}) {
      //存储播放/暂停状态
      yield call(pause);
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
        },
      });
    },



  },
};
export default playerModel;
