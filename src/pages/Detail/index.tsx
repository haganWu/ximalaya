import IconFont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {ModelStackNavigation, ModelStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import PlaySlider from './PlaySlider';

const mapStateToProps = ({player}: RootState) => {
  return {
    soundUrl: player.soundUrl,
    playState: player.playState,
    thumbnailUrl: player.thumbnailUrl,
    title: player.title,
    previousId: player.previousId,
    nextId: player.nextId,
  };
};
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<ModelStackParamList, 'Detail'>;
  navigation: ModelStackNavigation;
}

class Detail extends React.Component<IProps> {
  componentDidMount() {
    const {dispatch, route, navigation, title} = this.props;
    dispatch({
      type: 'player/fetchPlayer',
      payload: {
        id: route.params.id,
      },
    });
    // dispatch({
    //   type: 'player/watcherCurrentTime',
    // });
    navigation.setOptions({
      headerTitle: title,
    });
  }
  /**
   * @description 解决点击上一首/下一首 标题不更新问题
   * @param prevProps
   */
  componentDidUpdate(prevProps: IProps) {
    if (this.props.title !== prevProps.title) {
      this.props.navigation.setOptions({
        headerTitle: this.props.title,
      });
    }
  }
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/pause',
    });
  }

  /**
   * 暂停/播放
   */
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

  /**
   * 上一首
   */
  previousPress = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/previoud',
    });
  };
  /**
   * 下一首
   */
  nextPress = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/next',
    });
  };

  render() {
    const {playState, thumbnailUrl, previousId, nextId} = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: thumbnailUrl}} />

        <Text style={styles.tanmu}>弹幕</Text>

        <PlaySlider />

        <View style={styles.bottomContainer}>
          <Touchable disabled={!previousId} onPress={this.previousPress}>
            <IconFont name={'iconnext'} size={30} color="#fff" />
          </Touchable>

          <Touchable style={styles.toggle} onPress={this.toggle}>
            <IconFont
              name={playState === 'playing' ? 'iconstop' : 'iconbofang'}
              size={30}
              color="#fff"
            />
          </Touchable>

          <Touchable disabled={!nextId} onPress={this.nextPress}>
            <IconFont name={'iconxiayishou'} size={30} color="#fff" />
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  tanmu: {
    color: 'white',
    fontSize: 16,
    borderColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    width: 60,
    textAlign: 'center',
    padding: 2,
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 12,
    // justifyContent:'space-between',//分散布局
  },
  toggle: {
    marginHorizontal: 60,
  },
});

export default connector(Detail);
