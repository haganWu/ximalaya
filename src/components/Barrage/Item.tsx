import {viewportWidth} from '@/utils/index';
import React from 'react';
import {Animated, Easing, StyleSheet, Text} from 'react-native';
import {IBarrage, Message} from '.';

interface IProps {
  data: IBarrage;
  outside: (data: IBarrage) => void;
}

class Item extends React.PureComponent<IProps> {
  translateX = new Animated.Value(0);
  componentDidMount() {
    const {outside, data} = this.props;
    Animated.timing(this.translateX, {
      toValue: 10,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        outside(data);
      }
    });
    this.translateX.addListener(({value}) => {
      if (value > 3) {
        data.isFree = true;
      }
    });
  }
  render() {
    const {data} = this.props;
    const width = data.title.length * 15;
    return (
      <Animated.View
        style={{
          position: 'absolute', //设置弹幕位置
          top: data.trackIndex * 30,
          transform: [
            {
              translateX: this.translateX.interpolate({
                inputRange: [0, 10],
                outputRange: [viewportWidth, -width],
              }),
            },
          ],
        }}>
        <Text style={styles.barrageText}>{data.title}</Text>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  barrageText: {
    color: 'pink',
    fontSize: 15,
  },
});
export default Item;
