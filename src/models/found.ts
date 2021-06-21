import {Model, Effect} from 'dva-core-ts';
import axios from 'axios';

const ALBUM_URL = '/mock/11/hagan/found/list';

interface IUser {
  id: string;
  name: string;
  avatar: string;
}

export interface IFound {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  forward: number;
  comment: number;
  like: number;
  backgroundColor: string;
  user: IUser;
}

interface FoundModel extends Model {
  namespace: 'found';
  effects: {
    fetchList: Effect;
  };
}

const foundModel: FoundModel = {
  namespace: 'found',
  state: {},
  effects: {
    *fetchList({callback}, {call}) {
      const {data} = yield call(axios.get, ALBUM_URL);
      if (typeof callback === 'function') {
        callback(data);
      }
    },
  },
};

export default foundModel;
