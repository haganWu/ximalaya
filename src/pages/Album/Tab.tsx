import React from 'react';
import {SceneRendererProps, TabBar, TabView} from 'react-native-tab-view';
import Introduction from './Introduction';
import List from '@/pages/Album/List/index';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

interface IRoute {
  key: string;
  title: string;
}

interface IState {
  routes: IRoute[];
  index: number;
}

export interface ITabProps {
  panRef: React.RefObject<PanGestureHandler>;
  tapRef: React.RefObject<TapGestureHandler>;
  nativeRef: React.RefObject<NativeViewGestureHandler>;
  onScrollDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

class Tab extends React.Component<ITabProps, IState> {
  state = {
    routes: [
      {key: 'introduction', title: '简介'},
      {key: 'albums', title: '节目'},
    ],
    index: 1,
  };
  onIndexChange = (index: number) => {
    this.setState({
      index,
    });
  };
  renderScene = ({route}: {route: IRoute}) => {
    const {panRef, tapRef, nativeRef, onScrollDrag} = this.props;
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return (
          <List
            panRef={panRef}
            tapRef={tapRef}
            nativeRef={nativeRef}
            onScrollDrag={onScrollDrag}
          />
        );
    }
  };

  renderTabBar = (props: SceneRendererProps & {navigationState: IState}) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        tabStyle={styles.tabStyle}
        labelStyle={styles.label}
        style={styles.tabBar}
        indicatorStyle={styles.indicator}
        activeColor={'#f86442'}
        inactiveColor={'#333'}
      />
    );
  };
  render() {
    return (
      <TabView
        navigationState={this.state}
        onIndexChange={this.onIndexChange}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
  tabStyle: {
    width: 80,
  },
  label: {},
  indicator: {
    backgroundColor: '#f86442',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
});
export default Tab;
