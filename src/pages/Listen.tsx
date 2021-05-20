import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import Detail from './Detail';

interface IProps {
  navigation: RootStackNavigation;
}

class Listen extends React.Component<IProps> {
  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail',{
        id:100,
    });
  };

  render() {
    return (
      <View>
        <Text>Listen Page</Text>
        <Button title="跳转到详情页" onPress={this.onPress} />
      </View>
    );
  }
}
export default Listen;
