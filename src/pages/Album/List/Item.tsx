import IconFont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';
import {IProgram} from '@/models/album';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IProps {
  data: IProgram;
  index: number;
  onPress: (data: IProgram, index: number) => void;
}

class Item extends React.Component<IProps> {
  onPress = () => {
    const {onPress, data, index} = this.props;
    if (typeof onPress === 'function') {
      onPress(data, index);
    }
  };

  render() {
    const {data, index} = this.props;
    return (
      <Touchable style={styles.container} onPress={this.onPress}>
        <Text style={styles.orderText}>{index + 1}</Text>

        <View style={styles.middleContainer}>
          <Text style={styles.titleText}>{data.title}</Text>
          <View style={styles.middleBottom}>
            <View style={styles.middleBottomLeft}>
              <IconFont name="iconerji" color="#939393" />
              <Text style={styles.middleBottomText}>{data.playVolume}</Text>
            </View>
            <View style={styles.middleBottomRight}>
              <IconFont name="iconshengyin" color="#939393" />
              <Text style={styles.middleBottomText}>{data.duration}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.dateText}>{data.date}</Text>
        </View>
      </Touchable>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    marginBottom: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 14,
    color: '#868686',
    fontWeight: 'bold',
  },
  middleContainer: {
    flex: 1,
    marginLeft: 22,
    marginRight: 16,
  },
  titleText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '900',
  },
  middleBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  middleBottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleBottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  middleBottomText: {
    marginLeft: 4,
    color: '#939393',
  },
  dateText: {
    color: '#939393',
    flex: 1,
  },
});
export default Item;
