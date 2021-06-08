import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const ALBUM_URL = '/mock/11/hagan/album/list';

/**
 * 节目Bean
 */
 export interface IProgram {
  id: string;
  title: string;
  playVolume: number;
  duration: number;
  date: string;
  serial: number;
}

/**
 * 作者
 */
interface IAuthor {
  id: string;
  name: string;
  attention: string;
  avatar: string;
}

/**
 * 频道(data层数据)
 */
export interface IAlbumModelState {
  id: string;
  thumbnailUrl: string;
  title: string;
  summary: string;
  introduction: string;
  author: IAuthor;
  list: IProgram[];
}

export interface AlbumModel extends Model {
  namespace: 'album';
  state: IAlbumModelState;
  effects: {
    fetchAlbum: Effect;
  };
  reducers: {
    setState: Reducer<IAlbumModelState>;
  };
}

const initialState: IAlbumModelState = {
  id: '',
  thumbnailUrl: '',
  title: '',
  summary: '',
  introduction: '',
  author: {
    id: '',
    name: '',
    attention: '',
    avatar: '',
  },
  list: [],
};

const albumModel: AlbumModel = {
  namespace: 'album',
  state: initialState,
  effects: {
    *fetchAlbum({payload}, {call, put}) {
      console.log('payload.id,:', payload.id);
      const {data} = yield call(axios.get, ALBUM_URL, {
        params: {
          id: payload.id,
        },
      });
      yield put({
        type: 'setState',
        payload: data,
      });
    },
  },
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default albumModel;
