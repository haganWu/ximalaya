import {RootState} from '@/models/index';
import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({home}: RootState) => {
  return {
    channels: home.channels,
  };
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

class Channel extends React.Component<MadelState> {
  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchChannel',
    });
  };

  render() {
    const {channels} = this.props;
    return (
      <View style={styles.container}>
        <Text>HelloWorld</Text>
        <Text>{JSON.stringify(channels)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});

export default connector(Channel);
