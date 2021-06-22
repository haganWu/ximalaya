import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Touchable from '@/components/Touchable';
import defaultAvatarImg from '@/assets/default_avatar.png';
import {navigate} from '@/utils/index';

interface IProps {
  authority?: boolean;
  noMatch?: () => JSX.Element; //RN的一个节点
}

class Authorized extends React.Component<IProps> {
  onLoginClick = () => {
    navigate('Login');
  };

  render() {
    const {children, authority} = this.props;
    if (authority) {
      //已登陆
      return children;
    }
    return this.renderNoMatch();
  }
  renderNoMatch = () => {
    if (this.props.noMatch) {
      return <View>{this.props.noMatch()}</View>;
    }
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={defaultAvatarImg} />
        <View style={styles.rightContainer}>
          <Touchable onPress={this.onLoginClick}>
            <Text style={styles.loginText}>立即登录</Text>
            <Text style={styles.loginTip}>登录后自动同步所有记录噢~</Text>
          </Touchable>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  rightContainer: {
    marginLeft: 12,
    justifyContent: 'center',
    flex: 1,
  },
  loginText: {
    fontSize: 14,
    color: '#d37666',
    borderWidth: 1,
    borderColor: '#d37666',
    paddingVertical: 4,
    width: 76,
    borderRadius: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginTip: {
    fontSize: 14,
    marginTop: 6,
    color: '#9c9a9c',
  },
});

export default Authorized;
