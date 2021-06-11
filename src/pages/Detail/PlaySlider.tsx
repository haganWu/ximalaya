import {RootState} from '@/models/index';
import {formatTime} from '@/utils/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from 'react-native-slider-x';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({player}: RootState) => {
  return {
    currentTime: player.currentTime,
    duration: player.duration,
  };
};
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class PlaySlider extends React.Component<IProps> {
  renderThumb = () => {
    const {currentTime, duration} = this.props;
    return (
      <View>
        <Text style={styles.thumbText}>
          {formatTime(currentTime)}/{formatTime(duration)}
        </Text>
      </View>
    );
  };
  render() {
    const {currentTime, duration} = this.props;
    console.log('---duration:' + duration + ' ,currentTime:' + currentTime);
    return (
      <View style={styles.container}>
        <Slider
          value={currentTime}
          maximumValue={duration}
          maximumTrackTintColor="rgba(255,255,255,0.3)" //未播放颜色
          minimumTrackTintColor="white" //已播放颜色
          renderThumb={this.renderThumb} //自定义滑块
          thumbStyle={styles.thumb} //设置划款样式
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: 10,
  },
  thumb: {
    backgroundColor: '#fff',
    width: 80,
    height: 20,
    alignItems: 'center', //设置次轴居中
    justifyContent: 'center', //设置主轴居中
  },
  thumbText: {
    fontSize: 12,
    color: 'black',
  },
});

export default connector(PlaySlider);
