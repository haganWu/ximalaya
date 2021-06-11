import React from 'react';
import {View} from 'react-native';
import Item from './Item';

export interface Message {
  id: number;
  title: string;
}

/**
 * 接受父组件传递过来的数据
 */
interface IProps {
  data: Message[];
  maxTrack: number;
}

interface IState {
  data: Message[];
  list: Message[];
}

class Barrage extends React.Component<IProps, IState> {
  state = {
    data: this.props.data,
    list: this.props.data,
  };

  /**
   * 从props里面获取数据然后更新state,在每次重新渲染的时候调用
   */
  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const {data} = nextProps;
    if (data != prevState.data) {
      return {
        data,
        list: prevState.list.concat(data),
      };
    }
    return null;
  }
  /**
   * 删除已轮播完成的数据(通过动画执行完成回调监听已轮播完成的数据)
   * @param data 当前已轮播完成的数据
   */
  outside = (data: Message) => {
    const {list} = this.state;
    const newList = list.slice(); //赋值数组
    if (newList.length > 0) {
      const deleteIndex = newList.indexOf(data);
      if (deleteIndex > -1) {
        newList.splice(deleteIndex, 1); //删除元素
        this.setState({
          list: newList,
        });
      }
    }
  };

  renderItem = (item: Message, index: number) => {
    return <Item key={item.id} data={item} outside={this.outside} />;
  };

  render() {
    const {list} = this.state;
    return <View>{list.map(this.renderItem)}</View>;
  }
}
export default Barrage;
