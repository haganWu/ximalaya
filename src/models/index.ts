import {DvaLoadingState} from 'dva-loading-ts';
import album from './album';
import category from './category';
import home from './home';
import player from './player';
import found from './found';

const models = [home, category, album, player, found];

/**
 * 保存每个model中state的类型
 */
export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  album: typeof album.state;
  player: typeof player.state;
  loading: DvaLoadingState;
} & {
  [key: string]: typeof home.state;
};
export default models;
