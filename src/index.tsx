import Navigator from '@/navigator/index';
import React from 'react';
import {Provider} from 'react-redux';
import store from '@/config/dva';
import {StatusBar} from 'react-native';
import '@/config/http';
import {enableScreens} from 'react-native-screens';

// export default Navigator;

/**
 * 使用原生组件优化性能
 * android:FragmentActivity
 * ios:UIViewController
 */
enableScreens();

//Provider 让其包括的子组件能够获取到传入的store,即在dva.ts文件中导出的store
export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
        {/* 设置状态栏 */}
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </Provider>
    );
  }
}
