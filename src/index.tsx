import Navigator from '@/navigator/index';
import React from 'react';
import {Provider} from 'react-redux';
import store from '@/config/dva';

// export default Navigator;

//Provider 让其包括的子组件能够获取到传入的store,即在dva.ts文件中导出的store
export default class extends React.Component {
  render() {
    return (
      <Provider store = {store}>
        <Navigator />
      </Provider>
    );
  }
}
