import React from 'react';
import {
  FlatList,
  View,
  ListRenderItemInfo,
  Alert,
  Text,
  StyleSheet,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Carousel, {sideHeight} from './Carousel';
import Guess from './Guess';
import ChannelItem from './ChannelItem';
import {IChannel} from '@/models/home';
import IconFont from '@/assets/iconfont';
import {hp} from '@/utils/index';
import {RouteProp} from '@react-navigation/native';
import {HomeParamList} from '@/navigator/HomeTabs';

const mapStateToProps = (
  state: RootState,
  {route}: {route: RouteProp<HomeParamList, string>},
) => {
  const {namespace} = route.params;
  const modelState = state[namespace];
  return {
    namespace,
    carousels: modelState.carousels,
    channels: modelState.channels,
    hasMore: modelState.pagination.hasMore,
    gradientVisible: modelState.gradientVisible,
    loading: state.loading.effects[namespace + '/fetchChannels'],
  };
};

/**
 * connect()函数作用用于将 models中的home.ts文件中HomeModel中的state(即dva仓库)映射到 Home(本文件L15)组件中(通过函数mapStateToProps())
 */
const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

interface IState {
  refreshing: boolean;
}

class Home extends React.Component<IProps, IState> {
  state = {
    refreshing: false,
  };
  componentDidMount() {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchCarousels',
    });
    dispatch({
      type: namespace + '/fetchChannels',
    });
  }

  onPress = (data: IChannel) => {
    Alert.alert(data.title);
  };

  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onPress={this.onPress} />;
  };

  keyExtractor = (item: IChannel) => {
    return item.id;
  };

  /**
   * 上拉刷新
   */
  onRefresh = () => {
    //1.修改刷新状态--true
    this.setState({
      refreshing: true,
    });
    //2.获取数据
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchChannels',
      payload: {
        refreshing: true,
      },
      //加载数据完成之后再修改刷新状态,通过回调函数完成,callback()在 models/home.ts中fetchChannels方法中调用
      callback: () => {
        //3.修改刷新着状态--false
        this.setState({
          refreshing: false,
        });
      },
    });
  };

  /**
   * 上拉加载更多
   */
  onEndReached = () => {
    const {dispatch, loading, hasMore, namespace} = this.props;
    if (loading || !hasMore) {
      return;
    }
    dispatch({
      type: namespace + '/fetchChannels',
      payload: {
        loadMore: true,
      },
    });
  };

  /**
   * 滑动监听
   */
  onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offSetY = nativeEvent.contentOffset.y;
    const carouselHeight = sideHeight ? sideHeight : hp(26);
    let newGradientVisible = offSetY < carouselHeight;
    const {dispatch, gradientVisible, namespace} = this.props;
    if (gradientVisible !== newGradientVisible) {
      dispatch({
        type: namespace + '/setState',
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  };

  get header() {
    const {namespace} = this.props;
    return (
      <View>
        <Carousel namespace={namespace}/>
        <View style={styles.background}>
          <Guess namespace={namespace} />
        </View>
      </View>
    );
  }

  get footer() {
    const {hasMore, loading, channels} = this.props;
    if (!hasMore && channels.length > 0) {
      return (
        <View style={styles.end}>
          <IconFont style={styles.endLine} name="iconxuxian" color="grey" />
          <Text style={styles.endText}>我是有底线的</Text>
          <IconFont style={styles.endLine} name="iconxuxian" color="grey" />
        </View>
      );
    } else if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.end}>
          <IconFont style={styles.endLine} name="iconxuxian" color="grey" />
          <Text style={styles.endText}>正在加载中</Text>
          <IconFont style={styles.endLine} name="iconxuxian" color="grey" />
        </View>
      );
    }
  }

  get empty() {
    const {loading} = this.props;
    if (loading) return;
    return (
      <View style={styles.empty}>
        <IconFont style={styles.endLine} name="iconxuxian" color="grey" />
        <Text style={styles.endText}>暂无数据</Text>
        <IconFont style={styles.endLine} name="iconxuxian" color="grey" />
      </View>
    );
  }

  render() {
    const {channels} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        ListFooterComponent={this.footer}
        ListEmptyComponent={this.empty}
        data={channels}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        refreshing={refreshing}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
        onScroll={this.onScroll}
      />
    );
  }
}

const styles = StyleSheet.create({
  end: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'center',
  },
  empty: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 30,
    alignItems: 'center',
  },
  endText: {
    color: 'grey',
    fontSize: 12,
    marginHorizontal: 2,
  },
  endLine: {
    flex: 1,
  },
  background: {
    backgroundColor: '#fff',
  },
});

/**
 * connector(Home)会返回一个新的组件 把Home组件进行加工
 */
export default connector(Home);
