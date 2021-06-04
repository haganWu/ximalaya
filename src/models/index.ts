import {DvaLoadingState} from 'dva-loading-ts';
import category from './category';
import home from './home';

const models = [home, category];

/**
 * 保存每个model中state的类型
 */
export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  loading: DvaLoadingState;
} & {
  [key: string]: typeof home.state;
};
export default models;
