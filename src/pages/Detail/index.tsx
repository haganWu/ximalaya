import IconFont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {ModelStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import PlaySlider from './PlaySlider';

const mapStateToProps = ({player}: RootState) => {
  return {
    soundUrl: player.soundUrl,
    playState: player.playState,
  };
};
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<ModelStackParamList, 'Detail'>;
}

class Detail extends React.Component<IProps> {
  componentDidMount() {
    const {dispatch, route} = this.props;
    dispatch({
      type: 'player/fetchPlayer',
      payload: {
        id: route.params.id,
      },
    });
    // dispatch({
    //   type: 'player/watcherCurrentTime',
    // });
  }
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/pause',
    });
  }

  toggle = () => {
    const {dispatch, playState} = this.props;
    if (playState === 'playing') {
      dispatch({
        type: 'player/pause',
      });
    } else {
      dispatch({
        type: 'player/play',
      });
      // dispatch({
      //   type: 'player/watcherCurrentTime',
      // });
    }
  };

  render() {
    const {playState} = this.props;
    return (
      <View style={styles.container}>
        <PlaySlider />
        <Touchable onPress={this.toggle}>
          <IconFont
            name={playState === 'playing' ? 'iconstop' : 'iconbofang'}
            size={40}
            color="#fff"
          />
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
});

export default connector(Detail);
