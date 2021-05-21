import home from './home';

const models = [home];

/**
 * 保存每个model中state的类型
 */
export type RootState = {
  home: typeof home.state;
};
export default models;
