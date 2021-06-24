import React, {useState} from 'react';
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
import {IProgram} from '@/models/album';
import {IProps} from 'react-native-linear-animated-gradient-transition';

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
  onItemPress: (data: IProgram, index: number) => void;
}

function Tab(props: ITabProps) {
  // const array = useState(state);
  // const _state = array[0];
  // const setState = array[1];
  /**
   * useState(initialState) 参数为state的初始值
   */
  const [routes] = useState([
    {key: 'introduction', title: '简介'},
    {key: 'albums', title: '节目'},
  ]);
  const [index, setIndex] = useState(1);
  const onIndexChange = (index: number) => {
    setIndex(index);
  };
  const renderScene = ({route}: {route: IRoute}) => {
    const {panRef, tapRef, nativeRef, onScrollDrag, onItemPress} = props;
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
            onItemPress={onItemPress}
          />
        );
    }
  };

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: IState},
  ) => {
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
  return (
    <TabView
      navigationState={{routes, index}}
      onIndexChange={onIndexChange}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
    />
  );
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
