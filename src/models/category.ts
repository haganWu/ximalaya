import {Effect, Model, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {RootState} from '.';

/**
 * 轮播图
 */
const CATEGORY_URL = '/mock/11/hagan/category';

export interface ICategory {
  id: string;
  name: string;
  classify?: string;
}

export interface CategoryModelState {
  isEdit: boolean;
  myCategories: ICategory[];
  categories: ICategory[];
}

interface CategoryModel extends Model {
  namespace: 'category'; //唯一标识不可改变
  state: CategoryModelState; //CategoryState,保存所有数据
  reducers: {
    //action处理器,处理同步动作,用来计算一个最新的state
    setState: Reducer<CategoryModelState>;
  };
  effects: {
    //同reducers,action处理器,处理异步动作
    loadData: Effect;
    //用于切换编辑状态,需在toogle中将数据保存在storage里面
    toogle: Effect;
  };
  subscriptions: SubscriptionsMapObject;
}

const initialState = {
  isEdit: false,
  myCategories: [
    {id: 'recommend', name: '推荐'},
    {id: 'vip', name: 'Vip'},
  ],
  categories: [],
};

const categoryModel: CategoryModel = {
  namespace: 'category',
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
    *loadData(_, {call, put}) {
      //从storage中获取数据
      const myCategories = yield call(load, {key: 'myCategories'});
      const categories = yield call(load, {key: 'categories'});
      //发起action,将数据保存到state
      if (myCategories) {
        yield put({
          type: 'setState',
          payload: {
            myCategories,
            categories,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            categories,
          },
        });
      }
    },
    *toogle({payload}, {put, select}) {
      const category = yield select(({category}: RootState) => category);
      yield put({
        type: 'setState',
        payload: {
          isEdit: !category.isEdit,
        },
      });
    },
  },

  subscriptions: {
    //setup函数名随便写
    setup({dispatch}) {
      dispatch({type: 'loadData'});
    },
    asyncStorage() {
      storage.sync.categories = async () => {
        const {data} = await axios.get(CATEGORY_URL);
        console.log('data:', data);
        return data;
      };
      storage.sync.myCategories = async () => {
        return null;
      };
    },
  },
};

export default categoryModel;
