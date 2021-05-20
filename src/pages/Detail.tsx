import {RouteProp} from '@react-navigation/core';
import React from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from '@/navigator/index';

interface IProps {
  route: RouteProp<RootStackParamList, 'Detail'>;
}

class Detail extends React.Component<IProps> {
  render() {
    const {route} = this.props;
    return (
      <View>
        <Text>id:{route.params.id}</Text>
      </View>
    );
  }
}
export default Detail;
