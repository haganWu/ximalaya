import IconFont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';
import {IChannel} from '@/models/home';
import React from 'react';
import {Alert, Text} from 'react-native';
import {View, StyleSheet, Image} from 'react-native';

interface Iprops {
  data: IChannel;
  onPress: (data: IChannel) => void;
}

class ChannelItem extends React.PureComponent<Iprops> {
  onPress = () => {
    const {onPress, data} = this.props;
    if (typeof onPress === 'function') {
      onPress(data);
    }
  };

  render() {
    const {data} = this.props;
    return (
      <Touchable onPress={this.onPress}>
        <View style={styles.itemContainer}>
          <Image style={styles.image} source={{uri: data.image}} />
          <View style={styles.itemRight}>
            <Text style={styles.title} numberOfLines={1}>
              {data.title}
            </Text>

            <View style={styles.remarkContainer}>
              <Text style={styles.remark} numberOfLines={2}>
                {data.remark}
              </Text>
            </View>

            <View style={styles.itemRightBottom}>
              <View style={styles.itemRightBottomTextContainer}>
                <IconFont name="iconlijitingke" color="#f86442" />
                <Text style={styles.itemRightBottomText}>{data.played}</Text>
              </View>

              <View style={styles.itemRightBottomTextContainerRight}>
                <IconFont name="iconshengyin" color="#f86442" />
                <Text style={styles.itemRightBottomText}>{data.playing}</Text>
              </View>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#dedede',
  },
  itemRight: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 8,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  itemRightBottom: {
    flexDirection: 'row',
  },
  title: {
    color: 'black',
    fontSize: 14,
  },
  remarkContainer: {
    backgroundColor: '#efefef',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  remark: {
    color: 'black',
    fontSize: 12,
  },
  itemRightBottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRightBottomTextContainerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
  },
  itemRightBottomText: {
    color: 'black',
    fontSize: 12,
    marginLeft: 6,
  },
});
export default ChannelItem;
