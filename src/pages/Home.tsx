import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import Detail from './Detail';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';

const mapStateToProps = ({home}: RootState) => ({
  num: home.num,
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
  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 100,
    });
  };

  handleAdd = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/add',
      payload: {
        num: 100,
      },
    });
  };

  handleAsyncAdd = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/asyncAdd',
      payload: {
        num: 1000,
      },
    });
  };
  
  handleAsyncMultiply = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/asyncMultiply',
      payload: {
        num: 8000,
      },
    });
  };

  backZero = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/backZero',
      payload: {
        num: 0,
      },
    });
  };

  render() {
    const {num} = this.props;
    return (
      <View>
        <Text>Home Page add result:{num}</Text>
        <Button title="跳转到详情页" onPress={this.onPress} />
        <Button title="+" onPress={this.handleAdd} />
        <Button title="异步+" onPress={this.handleAsyncAdd} />
        <Button title="异步*" onPress={this.handleAsyncMultiply} />
        <Button title="归零" onPress={this.backZero} />
      </View>
    );
  }
}
/**
 * connector(Home)会返回一个新的组件 把Home组件进行加工
 */
export default connector(Home);
