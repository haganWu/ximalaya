import React from 'react';
import {Text, View} from 'react-native';
import {ModelStackNavigation} from '@/navigator/index';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import Touchable from '@/components/Touchable';
import {RootState} from '../models';
import {connect, ConnectedProps} from 'react-redux';
import Authorized from './Authorized';

const mapStateToProps = ({account}: RootState) => {
  return {
    account: account.account,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: ModelStackNavigation;
}

class Account extends React.Component<IProps> {
  onLoginClick = () => {
    const {navigation} = this.props;
    navigation.navigate('Login');
  };
  onLogoutClick = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'account/logout',
    });
  };

  render() {
    const {account} = this.props;
    return (
      <Authorized authority={!!account}>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: account?.avatar}} />
          <View style={styles.rightContainer}>
            <Touchable onPress={this.onLogoutClick}>
              <Text style={styles.name}>{account?.name}</Text>
              <Text style={styles.logoutText}>退出登录</Text>
            </Touchable>
          </View>
        </View>
      </Authorized>
    );
  }
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
  name: {
    fontSize: 16,
    color: 'black',
  },

  logoutText: {
    fontSize: 14,
    color: '#d37666',
    borderWidth: 1,
    borderColor: '#d37666',
    paddingVertical: 4,
    width: 76,
    borderRadius: 16,
    marginTop: 6,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default connector(Account);
