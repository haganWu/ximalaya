import {IProgram} from '@/models/album';
import {RootState} from '@/models/index';
import React from 'react';
import {ListRenderItemInfo, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {connect, ConnectedProps} from 'react-redux';
import Item from './Item';

const mapStateToProps = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class List extends React.Component<IProps> {
  onPress = (data: IProgram) => {
    console.log('data:', data);
  };

  renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={this.onPress} />;
  };

  keyExtractor = (item: IProgram) => {
    return item.id;
  };

  render() {
    const {list} = this.props;
    return (
      <FlatList
        style={styles.flatList}
        data={list}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#e3e3e3',
  },
});

export default connector(List);
