import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';

interface IProps {
  navigation: RootStackNavigation;
}

class Account extends React.Component<IProps> {
  onPress = () => {
  };

  render() {
    return (
      <View>
        <Text>Account Page</Text>
        <Button title="跳转到详情页" onPress={this.onPress} />
      </View>
    );
  }
}
export default Account;
