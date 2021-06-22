/**
 * @format
 * 入口
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './src';
import {name as appName} from './app.json';

if (!__DEV__) {
  //非开发环境 清空日志打印
  const emptyFunc = () => {};
  global.console.info = emptyFunc;
  global.console.log = emptyFunc;
  global.console.warn = emptyFunc;
  global.console.error = emptyFunc;
}

AppRegistry.registerComponent(appName, () => App);
