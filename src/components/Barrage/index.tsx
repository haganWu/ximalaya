import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Item from './Item';

export interface Message {
  id: number;
  title: string;
}

export interface IBarrage extends Message {
  trackIndex: number;
  isFree?: boolean;
}

/**
 * 接受父组件传递过来的数据
 */
interface IProps {
  data: Message[];
  maxTrack: number;
  style?: StyleProp<ViewStyle>; //给自定义控件设置style
}

interface IState {
  data: Message[];
  list: IBarrage[][];
}

/**
 *
 * @param data 待添加的弹幕
 * @param maxTrack 最大轮播的轨道
 * @param list 之前的弹幕数据
 */
function addBarrage(data: Message[], maxTrack: number, list: IBarrage[][]) {
  for (let i = 0; i < data.length; i++) {
    //需要知道当前弹幕放在哪个轨道上
    const trackIndex = getTrackIndex(list, maxTrack);
    if (trackIndex < 0) {
      continue; //当前轨道已有数据
    }
    if (!list[trackIndex]) {
      list[trackIndex] = [];
    }
    const barrage = {
      ...data[i],
      trackIndex,
    };
    list[trackIndex].push(barrage);
  }
  return list;
}

/**
 * 获取弹幕轨道下标
 * 数据结构:
 * [
 * [{id:'',title:'第一条轨道第一个数据'},{id:'',title:'第一条轨道第二个数据'}],
 * [{id:'',title:'第二条轨道第一个数据'},{id:'',title:'第二条轨道第二个数据'}],
 * [{id:'',title:'第三条轨道第一个数据'},{id:'',title:'第三条轨道第二个数据'}],
 * [{id:'',title:'第四条轨道第一个数据'},{id:'',title:'第四条轨道第二个数据'}],
 * [{id:'',title:'第五条轨道第一个数据'},{id:'',title:'第五条轨道第二个数据'},{id:'',title:'第五条轨道第三个数据'}],
 * ]
 * @param list
 * @param maxTrack
 */
function getTrackIndex(list: IBarrage[][], maxTrack: number) {
  for (let i = 0; i < maxTrack; i++) {
    const barragesOfTrack = list[i]; //第i条轨道的数据
    if (!barragesOfTrack || barragesOfTrack.length === 0) {
      return i;
    }
    const lastBarrageOfTrack = barragesOfTrack[barragesOfTrack.length - 1];
    if (lastBarrageOfTrack.isFree) {
      return i;
    }
  }
  return -1;
}

class Barrage extends React.Component<IProps, IState> {
  state = {
    data: this.props.data,
    list: [this.props.data.map(item => ({...item, trackIndex: 0}))],
  };

  /**
   * 从props里面获取数据然后更新state,在每次重新渲染的时候调用
   */
  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const {data, maxTrack} = nextProps;
    if (data != prevState.data) {
      return {
        data,
        list: addBarrage(data, maxTrack, prevState.list),
      };
    }
    return null;
  }
  /**
   * 删除已轮播完成的数据(通过动画执行完成回调监听已轮播完成的数据)
   * @param data 当前已轮播完成的数据
   */
  outside = (data: IBarrage) => {
    const {list} = this.state;
    const newList = list.slice(); //赋值数组
    if (newList.length > 0) {
      const {trackIndex} = data;
      newList[trackIndex] = newList[trackIndex].filter(
        item => item.id !== data.id,
      );
      this.setState({
        list: newList,
      });
    }
  };

  renderItem = (item: IBarrage[], index: number) => {
    return item.map((barrage, index) => {
      return <Item key={barrage.id} data={barrage} outside={this.outside} />;
    });
  };

  render() {
    const {list} = this.state;
    const {style} = this.props; //从父组件拿到测style
    return (
      <View style={[styles.container, style]}>{list.map(this.renderItem)}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
export default Barrage;
