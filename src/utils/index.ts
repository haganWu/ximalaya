import {
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import React from 'react';
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
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  const result = `${year}年${month}月${day}日 ${
    hour < 10 ? '0' + hour : hour
  }:${minute < 10 ? '0' + minute : minute}:${
    second < 10 ? '0' + second : second
  }`;
  return result;
}

/**
 * 格式化时间戳
 * @param date
 * @returns
 */
function formateDate(timestamp: number) {
  var date = new Date(timestamp);
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 1).toString();
  var day = date.getDate().toString();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  
  const result = `${year}年${month}月${day}日 ${
    hour < 10 ? '0' + hour : hour
  }:${minute < 10 ? '0' + minute : minute}:${
    second < 10 ? '0' + second : second
  }`;
  return result;
}

function formatTime(seconds: number) {
  const m = parseInt((seconds % (60 * 60)) / 60 + ',10');
  const s = parseInt((seconds % 60) + ',10');
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

/**
 * 获取随机数
 */
function randomIndex(length: number) {
  return Math.floor(Math.random() * length);
}

/**
 * navigation/index  NavigationContainer Ref属性
 */
const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(name: string, params?: any) {
  //navigationRef.current -> NavigationContainer实例
  navigationRef.current?.navigate(name, params);
}

export {
  viewportWidth,
  viewportHeight,
  wp,
  hp,
  getActiveRouteName,
  getCurrenDate,
  formatTime,
  randomIndex,
  navigationRef,
  navigate,
  formateDate,
};
