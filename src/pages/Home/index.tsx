import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import Detail from '../Detail';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Carousel from './Carousel';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
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

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarousels',
    });
  }

  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 100,
    });
  };



  render() {
    const {carousels} = this.props;
    return (
      <View>
        <View style={{marginTop: 6}}>
          <Carousel data={carousels}/>
        </View>
      </View>
    );
  }
}
/**
 * connector(Home)会返回一个新的组件 把Home组件进行加工
 */
export default connector(Home);
