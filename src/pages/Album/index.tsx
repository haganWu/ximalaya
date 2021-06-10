import React from 'react';
import {
  Alert,
  Animated,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProp} from '@react-navigation/core';
import {ModelStackNavigation, RootStackParamList} from '@/navigator/index';
import {BlurView} from '@react-native-community/blur';
import Tab from './Tab';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {viewportHeight} from '@/utils/index';
import {IProgram} from '@/models/album';

const mapStateToProps = ({album}: RootState) => {
  return {
    summary: album.summary,
    author: album.author,
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

//传递值 需先声明IProps接口
interface IProps extends MadelState {
  headerHeight: number;
  route: RouteProp<RootStackParamList, 'Album'>;
  navigation: ModelStackNavigation; //设置列表上拉时标题栏的透明度
}

const USE_NATIVE_DRIVER = true;
const HEADER_HEIGHT = 260;

class Album extends React.Component<IProps> {
  panRef = React.createRef<PanGestureHandler>();
  tapRef = React.createRef<TapGestureHandler>();
  nativeRef = React.createRef<NativeViewGestureHandler>();
  RANGE = [-(HEADER_HEIGHT - this.props.headerHeight), 0];
  translationY = new Animated.Value(0);
  lastScrollY = new Animated.Value(0);
  lastScrollYValue = 0;
  reverseLastScrollY = Animated.multiply(
    new Animated.Value(-1),
    this.lastScrollY,
  );

  translationYValue = 0;
  translationYOffset = new Animated.Value(0); //保存每次移动的垂直距离
  translateY = Animated.add(
    Animated.add(this.translationY, this.reverseLastScrollY),
    this.translationYOffset,
  );

  componentDidMount() {
    const {route, dispatch, navigation} = this.props;
    dispatch({
      type: 'album/fetchAlbum',
      payload: {
        id: route.params.item.id,
      },
    });
    /**
     * 设置列表上拉时标题栏的透明度
     */
    navigation.setParams({
      opacity: this.translateY.interpolate({
        inputRange: this.RANGE,
        outputRange: [1, 0],
      }),
    });
    // Animated.timing(this.translateY, {
    //   toValue: -180,
    //   duration: 3000,
    //   useNativeDriver: true,
    // }).start();
    // Animated.spring(this.translateY, {
    //   toValue: -180,
    //   tension: 100, //张力
    //   friction: 10, //摩擦力
    //   useNativeDriver: true,
    // }).start();
  }
  // onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
  //   console.log('event:', event.nativeEvent.translationY);
  // };

  onItemPress = (data: IProgram, index: number) => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {id: data.id});
  };

  /**
   * onScrollDrag 解决列表下拉时[页面头部]部分跟着下滑(实际效果应是列表下拉至[列表顶部]列表第一条数据时再下拉[页面头部]部分才下滑)
   */
  onScrollDrag = Animated.event(
    [{nativeEvent: {contentOffset: {y: this.lastScrollY}}}],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
      listener: ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        this.lastScrollYValue = nativeEvent.contentOffset.y;
      },
    },
  );

  onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: this.translationY}}],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
    },
  );

  onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let {translationY} = nativeEvent; //获取上次active状态下垂直方向的移动距离
      translationY -= this.lastScrollYValue;
      /**
       *Animated.Value下有两个值:
       *1.Value
       *2.offset
       */

      /**
       * 以下三个函数作用:将每次拖动距离累计叠加起来
       */
      this.translationYOffset.extractOffset(); //将translationYOffset动画值的value值设置给offset偏移值,然后清空value值
      this.translationYOffset.setValue(translationY); //重新设置value值(将上次垂直方向的移动距离赋值给translationYOffset)
      this.translationYOffset.flattenOffset(); //将value和offset值相加重置赋值给value
      this.translationY.setValue(0);
      this.translationYValue += translationY;
      let maxDeltaY = -this.RANGE[0] - this.translationYValue; //解决第二次以后要滑动一段距离之后列表才会滚动问题

      if (this.translationYValue < this.RANGE[0]) {
        this.translationYValue = this.RANGE[0];
        Animated.timing(this.translationYOffset, {
          toValue: this.RANGE[0],
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        maxDeltaY = this.RANGE[1];
      } else if (this.translationYValue > this.RANGE[1]) {
        this.translationYValue = this.RANGE[1];
        Animated.timing(this.translationYOffset, {
          toValue: this.RANGE[1],
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        maxDeltaY = -this.RANGE[0];
      }
      if (this.tapRef.current) {
        const tap: any = this.tapRef.current;
        tap.setNativeProps({
          maxDeltaY,
        });
      }
    }
  };

  renderHeader = () => {
    const {headerHeight, summary, author, route} = this.props;
    const {title, image} = route.params.item;
    return (
      <View style={[styles.headerContainer, {paddingTop: headerHeight}]}>
        <Image style={styles.backgroundPic} source={{uri: image}} />
        <BlurView
          blurType="light"
          blurAmount={2}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.leftView}>
          <Image style={styles.thumbnail} source={{uri: image}} />
        </View>

        <View style={styles.rightView}>
          <Text numberOfLines={1} style={styles.titleText}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.titleSummary}>
            {summary}
          </Text>
          <View style={styles.authorContainer}>
            <Image style={styles.authorIcon} source={{uri: author.avatar}} />
            <Text style={styles.authorName}>{author.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    // const {title, image} = route.params.item;
    return (
      <TapGestureHandler ref={this.tapRef} maxDeltaY={-this.RANGE[0]}>
        <View style={styles.container}>
          <PanGestureHandler
            ref={this.panRef}
            simultaneousHandlers={[this.tapRef, this.nativeRef]}
            onGestureEvent={this.onGestureEvent}
            onHandlerStateChange={this.onHandlerStateChange}>
            <Animated.View
              style={[
                styles.container,
                {
                  // padding: 10,
                  // backgroundColor: this.translateY.interpolate({
                  //   inputRange: [-180, 0],
                  //   outputRange: ['red', '#fff'],
                  // }),
                  // opacity: this.translateY.interpolate({
                  //   inputRange: [-180, 0],
                  //   outputRange: [1, 0],
                  // }),
                  transform: [
                    {
                      translateY: this.translateY.interpolate({
                        inputRange: this.RANGE,
                        outputRange: this.RANGE,
                        extrapolate: 'clamp',
                        // extrapolate: 'extend',
                        // inputRange: [
                        //   this.RANGE[0] - 50,
                        //   ...this.RANGE,
                        //   this.RANGE[1] + 50,
                        // ],
                        // outputRange: [
                        //   this.RANGE[0] - 10,
                        //   ...this.RANGE,
                        //   this.RANGE[1] + 10,
                        // ],
                      }),
                    },
                  ],
                },
              ]}>
              {this.renderHeader()}
              <View
                style={{
                  height: viewportHeight - this.props.headerHeight,
                }}>
                <Tab
                  panRef={this.panRef}
                  tapRef={this.tapRef}
                  nativeRef={this.nativeRef}
                  onScrollDrag={this.onScrollDrag}
                  onItemPress={this.onItemPress}
                />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </TapGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  backgroundPic: {
    ...StyleSheet.absoluteFillObject, //绝对定位
    backgroundColor: '#eee',
  },
  leftView: {},
  thumbnail: {
    width: 100,
    height: 100,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#dedede',
  },
  rightView: {
    flex: 1,
    marginLeft: 12,
  },
  titleText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold', //加粗
  },
  titleSummary: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 6,
    marginVertical: 12,
    borderRadius: 4,
  },

  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  authorName: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
});

function Wrapper(props: IProps) {
  const headerHeight = useHeaderHeight();
  return <Album {...props} headerHeight={headerHeight} />;
}

export default connector(Wrapper);
