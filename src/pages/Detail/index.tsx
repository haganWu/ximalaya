import IconFont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {ModelStackNavigation, ModelStackParamList} from '@/navigator/index';
import {viewportWidth} from '@/utils/index';
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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

interface IState {
  barrage: boolean;
}

const IMAGE_SIZE = 180;
const PADDING_TOP = (viewportWidth - IMAGE_SIZE) / 2;
const SCALE = viewportWidth / IMAGE_SIZE;
class Detail extends React.Component<IProps, IState> {
  state = {
    barrage: false,
  };
  anim = new Animated.Value(1);
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

  barragePress = () => {
    this.setState({
      barrage: !this.state.barrage,
    });
    Animated.timing(this.anim, {
      toValue: this.state.barrage ? 1 : SCALE,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {barrage} = this.state;
    const {playState, thumbnailUrl, previousId, nextId} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Animated.Image
            style={[styles.image, {transform: [{scale: this.anim}]}]}
            source={{uri: thumbnailUrl}}
          />
        </View>

        {barrage && (
          <LinearGradient
            colors={['rgba(128,104,102,0.5)', '#807c66']}
            style={styles.LinearGradient}
          />
        )}

        <Touchable
          style={styles.barrageBtn}
          disabled={!previousId}
          onPress={this.barragePress}>
          <Text style={styles.barrageText}>弹幕</Text>
        </Touchable>

        <PlaySlider />

        <View style={styles.bottomContainer}>
          <Touchable disabled={!previousId} onPress={this.previousPress}>
            <IconFont name={'iconnext'} size={30} color="#fff" />
          </Touchable>

          <Touchable onPress={this.toggle}>
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
    paddingTop: PADDING_TOP,
  },
  imageView: {
    alignItems: 'center',
    height: IMAGE_SIZE,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  barrageBtn: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    paddingVertical: 1,
    borderWidth: 1,
    marginLeft: 10,
  },
  barrageText: {
    color: '#fff',
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 80,
  },
  LinearGradient: {
    position: 'absolute',
    top: 0,
    height: viewportWidth,
    width: viewportWidth,
  },
});

export default connector(Detail);
