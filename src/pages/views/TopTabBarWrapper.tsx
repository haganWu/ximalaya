import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Touchable from '@/components/Touchable';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {getActiveRouteName} from '@/utils/index';

const mapStateToProps = (state: RootState, props: MaterialTopTabBarProps) => {
  const routeName = getActiveRouteName(props.state);
  const modelState = state[routeName];
  return {
    gradientVisible: modelState.gradientVisible,
    linearColors: modelState.carousels
      ? modelState.carousels.length > 0
        ? modelState.carousels[modelState.activeCarouselIndex].colors
        : undefined
      : undefined,
  };
};
const connector = connect(mapStateToProps);
type MadelState = ConnectedProps<typeof connector>;

type Iprops = MaterialTopTabBarProps & MadelState;

class TopTabBarWrapper extends React.Component<Iprops> {
  goCategory = () => {
    const {navigation} = this.props;
    navigation.navigate('Category');
  };

  get linearGradient() {
    const {gradientVisible, linearColors = ['#ccc', '#e2e2e2']} = this.props;
    if (gradientVisible) {
      return (
        <LinearAnimatedGradientTransition
          colors={linearColors}
          style={styles.gradient}
        />
      );
    }
    return null;
  }

  render() {
    let {gradientVisible, indicatorStyle, ...restProp} = this.props;
    let textStyle = styles.text;
    let activeTintColor = '#333';
    let inactiveTintColor = '#ccc';
    if (gradientVisible) {
      textStyle = styles.whiteText;
      activeTintColor = '#f86442';
      inactiveTintColor = '#fff';
      if (indicatorStyle) {
        indicatorStyle = StyleSheet.compose(
          indicatorStyle,
          styles.themeBackgroundColor,
        );
      }
    } else {
      if (indicatorStyle) {
        indicatorStyle = StyleSheet.compose(
          indicatorStyle,
          styles.blackBackgroundColor,
        );
      }
    }
    return (
      <View style={styles.topTabBarContainer}>
        {this.linearGradient}
        <View style={styles.topTabBarView}>
          <MaterialTopTabBar
            {...restProp}
            indicatorStyle={indicatorStyle}
            activeTintColor={activeTintColor}
            inactiveTintColor={inactiveTintColor}
            style={styles.tabBar}
          />

          <Touchable style={styles.categoryBtn} onPress={this.goCategory}>
            <Text style={textStyle}>分类</Text>
          </Touchable>
        </View>

        <View style={styles.searchContainer}>
          <Touchable style={styles.searchBtn}>
            <Text style={textStyle}>搜索</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text style={textStyle}>历史记录</Text>
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
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  categoryBtn: {
    paddingHorizontal: 10,
    borderLeftWidth: 2 * StyleSheet.hairlineWidth,
    borderLeftColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBtn: {
    marginLeft: 16,
    marginVertical: 8,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },

  historyBtn: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
  whiteBackgroundColor: {
    backgroundColor: '#fff',
  },
  blackBackgroundColor: {
    backgroundColor: '#666',
  },
  themeBackgroundColor: {
    backgroundColor: '#f86442',
  },
});

export default connector(TopTabBarWrapper);
