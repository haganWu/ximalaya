import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Touchable from '@/components/Touchable';

interface Iprops extends MaterialTopTabBarProps {}

class TopTabBarWrapper extends React.Component<Iprops> {
  render() {
    const {props} = this;
    return (
      <View style={styles.topTabBarContainer}>
        <View style={styles.topTabBarView}>
          <MaterialTopTabBar {...props} style={styles.tabBar} />

          <Touchable style={styles.categoryBtn}>
            <Text>分类</Text>
          </Touchable>
        </View>

        <View style={styles.searchContainer}>
          <Touchable style={styles.searchBtn}>
            <Text style={styles.searchText}>搜索</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text>历史记录</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topTabBarContainer: {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight(),
  },
  topTabBarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBar: {
    elevation: 0,
    flex: 1,
    overflow:'hidden',
    backgroundColor:'transparent',
  },
  categoryBtn: {
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBtn: {
    marginLeft: 16,
    marginVertical: 8,
    paddingVertical: 8,
    backgroundColor: '#efefef',
    borderRadius: 8,
    flex: 1,
    paddingLeft: 12,
    justifyContent:'center',
  },
  searchText: {
    fontSize: 14,
    color: '#ccc',
  },

  historyBtn: {
    marginHorizontal: 16,
    fontSize: 14,
  },
});

export default TopTabBarWrapper;
