import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ListRenderItemInfo,
  Image,
} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import realm, {ISaveProgram} from '@/config/realm';
import IconFont from '@/assets/iconfont';
import {formateDate, formatTime} from '../utils';
import Touchable from '@/components/Touchable';
import { Collection } from 'realm';

interface IProps {
  navigation: RootStackNavigation;
}

class Listen extends React.Component<IProps> {

  onItemDelete = (item: ISaveProgram) => {
    realm.write(() => {
      realm.delete(realm.objects('Program').filtered(`id='${item.id}'`));
      //重新渲染
      this.setState({});
    });
  };

  renderItem = ({item}: ListRenderItemInfo<ISaveProgram>) => {
    // let percentage = item.currentTime / item.duration;
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={{uri: item.thumbnailUrl}} />

        <View style={styles.middelContainer}>
          <Text>{item.title}</Text>
          <View style={styles.middelBottomContainer}>
            <IconFont name="iconshijian" color="#999" />
            <Text style={styles.currentTime}>
              {formatTime(item.currentTime)}
            </Text>
            <Text style={styles.percentage}>已播:{item.rate}%</Text>
            {/* <Text style={styles.percentage}>已播:{percentage.toFixed(2)}%</Text> */}
          </View>
          <Text style={styles.lastPlay}>
            上次播放:{formateDate(item.listenTime)}
          </Text>
        </View>
        {/* 参数传递  this.onItemDelete  ->  () => {this.onItemDelete(item);
          }*/}
        <Touchable
          style={styles.deleteBtn}
          onPress={() => {
            this.onItemDelete(item);
          }}>
          <IconFont name="icontrash-gray" color="#999" />
        </Touchable>
      </View>
    );
  };

  keyExtractor = (item: ISaveProgram) => {
    return item.id;
  };

  render() {
    const programs = realm.objects<ISaveProgram>('Program');
    if (programs.length > 0) {
      return (
        <View>
          <FlatList
            data={programs}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            onEndReachedThreshold={0.2}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>------暂无数据------</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  empty: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 6,
  },
  middelContainer: {
    padding: 6,
    justifyContent: 'space-around',
    flex: 1,
  },
  middelBottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  currentTime: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  lastPlay: {
    fontSize: 12,
    color: '#999',
  },
  percentage: {
    fontSize: 14,
    color: '#f1cea5',
    marginLeft: 22,
  },
  deleteBtn: {
    padding: 8,
    justifyContent: 'center',
  },
});
export default Listen;
