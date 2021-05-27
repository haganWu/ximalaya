import React from 'react';
import {FlatList, View, ListRenderItemInfo, Alert} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import Detail from '../Detail';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Carousel from './Carousel';
import Guess from './Guess';
import ChannelItem from './ChannelItem';
import {IChannel} from '@/models/home';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  channels: home.channels,
  loading: loading.effects['home/asyncAdd'],
});

/**
 * connect()函数作用用于将 models中的home.ts文件中HomeModel中的state(即dva仓库)映射到 Home(本文件L15)组件中(通过函数mapStateToProps())
 */
const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarousels',
    });
    dispatch({
      type: 'home/fetchChannels',
    });
  }

  onPress = (data: IChannel) => {
    Alert.alert(data.title);
  };

  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onPress={this.onPress} />;
  };

  keyExtractor = (item:IChannel) => {
    return item.id;
  };

  get header() {
    const {carousels} = this.props;
    return (
      <View>
        <Carousel data={carousels} />
        <Guess />
      </View>
    );
  }

  render() {
    const {carousels, channels} = this.props;

    return (
      <FlatList
        ListHeaderComponent={this.header}
        data={channels}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

/**
 * connector(Home)会返回一个新的组件 把Home组件进行加工
 */
export default connector(Home);
