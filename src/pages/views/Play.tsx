import IconFont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import React from 'react';
import {Easing, Image, StyleSheet, Animated} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Progress from './Progress';

const mapStateToProps = ({player}: RootState) => {
  return {
    thumbnailUrl: player.thumbnailUrl,
    playState: player.playState,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class Play extends React.Component<IProps> {
  anmi = new Animated.Value(0);
  rotate: Animated.AnimatedInterpolation;
  timing: Animated.CompositeAnimation;
  constructor(props: IProps) {
    super(props);
    this.timing = Animated.loop(
      Animated.timing(this.anmi, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {iterations: -1},
    );
    //使用差值动画转换成角度旋转
    this.rotate = this.anmi.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  }

  componentDidMount() {
    const {playState} = this.props;
    console.log('playState:', playState);
    if (playState === 'playing') {
      this.timing.start();
    }
  }

  componentDidUpdate() {
    const {playState} = this.props;
    console.log('playState:', playState);
    if (playState === 'playing') {
      this.timing.start();
    } else if (playState === 'paused') {
      this.timing.stop();
    }
  }

  render() {
    const {thumbnailUrl} = this.props;
    return (
      <Touchable style={styles.container}>
        <Progress>
          <Animated.View style={{transform: [{rotate: this.rotate}]}}>
            {thumbnailUrl ? (
              <Image source={{uri: thumbnailUrl}} style={styles.image} />
            ) : (
              <IconFont name={'iconbofang1'} size={40} color="#ededed" />
            )}
          </Animated.View>
        </Progress>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
});
export default connector(Play);
