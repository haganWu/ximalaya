import React from 'react';
import {useState} from 'react';
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
/**
 * 自定义hook函数
 */
function useDerivedState(cb: Function, data: any) {
  //自定义hook函数中可以调用任意的其他hook函数
  const [prevData, setPrevData] = useState<any>(null);
  if (data !== prevData) {
    cb();
    setPrevData(data);
  }
}

function Barrage(props: IProps) {
  const [list, setList] = useState(() => {
    //传入函数,这个函数之后在Barrage函数第一次加载时执行
    return [props.data.map(item => ({...item, trackIndex: 0}))];
  });

  useDerivedState(() => {
    setList(addBarrage(props.data, props.maxTrack, list));
  }, props.data);

  // if (props.data !== data) {
  //   setData(props.data);
  //   setList(addBarrage(props.data, props.maxTrack, list));
  // }

  /**
   * 从props里面获取数据然后更新state,在每次重新渲染的时候调用
   */
  // static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
  //   const {data, maxTrack} = nextProps;
  //   if (data != prevState.data) {
  //     return {
  //       data,
  //       list: addBarrage(data, maxTrack, prevState.list),
  //     };
  //   }
  //   return null;
  // }
  /**
   * 删除已轮播完成的数据(通过动画执行完成回调监听已轮播完成的数据)
   * @param data 当前已轮播完成的数据
   */
  const outside = (data: IBarrage) => {
    const newList = list.slice(); //赋值数组
    if (newList.length > 0) {
      const {trackIndex} = data;
      newList[trackIndex] = newList[trackIndex].filter(
        item => item.id !== data.id,
      );
      setList(newList);
    }
  };

  const renderItem = (item: IBarrage[], index: number) => {
    return item.map((barrage, index) => {
      return <Item key={barrage.id} data={barrage} outside={outside} />;
    });
  };

  const {style} = props; //从父组件拿到测style
  return <View style={[styles.container, style]}>{list.map(renderItem)}</View>;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
export default Barrage;
