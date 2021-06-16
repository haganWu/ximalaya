import {RootState} from '@/models/index';
import {navigate, viewportWidth} from '@/utils/index';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Play from './Play';

const mapStateToProps = ({player}: RootState) => {
  return {
    duration: player.duration,
    playState: player.playState,
  };
};

const connector = connect(mapStateToProps);

type ModelStack = ConnectedProps<typeof connector>;

interface IProps extends ModelStack {
  routeName: string;
}

class PlayView extends React.Component<IProps> {
  onPress = () => {
    navigate('Detail');
  };

  render() {
    const {routeName, playState} = this.props;
    if (
      playState !== 'playing' ||
      routeName === 'Root' ||
      routeName === 'Detail'
    ) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Play maringTop={0} onPress={this.onPress} />
      </View>
    );
  }
}

const width = 50;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: width + 20,
    bottom: 0,
    left: (viewportWidth - width) / 2,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 4,
    borderTopLeftRadius: width / 2,
    borderTopRightRadius: width / 2,
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      ios: {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOpacity: 0.85,
        shadowRadius: 5,
        shadowOffset: {
          width: StyleSheet.hairlineWidth,
          height: StyleSheet.hairlineWidth,
        },
      },
    }),
  },
});
export default connector(PlayView);
