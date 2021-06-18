import {IFound} from '@/models/found';
import React from 'react';
import {StyleSheet} from 'react-native';
import {FlatList, ListRenderItemInfo, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Item from './Item';

const connector = connect();

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

interface IState {
  list: IFound[];
  currentId: string;
}

class Found extends React.Component<IProps, IState> {
  state = {
    list: [],
    currentId: '',
  };
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'found/fetchList',
      callback: (data: IFound[]) => {
        this.setState({
          list: data,
        });
      },
    });
  }

  setCurrentId = (id: string) => {
    this.setState({
      currentId: id,
    });
    if (id) {
      const {dispatch} = this.props;
      dispatch({
        type: 'player/pause',
      });
    }
  };

  renderItem = ({item}: ListRenderItemInfo<IFound>) => {
    const paused = item.id !== this.state.currentId;
    return (
      <Item data={item} paused={paused} setCurrentId={this.setCurrentId} />
    );
  };

  keyExtractor = (item: IFound) => {
    return item.id;
  };

  render() {
    const {list} = this.state;
    return (
      <View style={styles.view}>
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          extraData={this.state.currentId} //通过currentId值的变化刷新列表
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#ebebeb',
  },
});
export default connector(Found);
