import {NavigationState} from '@react-navigation/native';
import {Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

/**
 * 根据百分比获取宽度
 */
function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

/**
 * 根据百分比获取高度
 */
function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

function getActiveRouteName(state: NavigationState) {
  let route;
  route = state.routes[state.index];
  while (route.state && route.state.index) {
    route = route.state.routes[route.state.index];
  }
  return route.name;
}

function getCurrenDate() {
  var date = new Date();
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 1).toString();
  var day = date.getDate().toString();
  var hour = date.getHours().toString();
  var minute = date.getMinutes().toString();
  var second = date.getSeconds().toString();

  const result = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
  return result;
}

function formatTime(seconds: number) {
  const m = parseInt((seconds % (60 * 60)) / 60 + ',10');
  const s = parseInt((seconds % 60) + ',10');
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

export {
  viewportWidth,
  viewportHeight,
  wp,
  hp,
  getActiveRouteName,
  getCurrenDate,
  formatTime,
};
