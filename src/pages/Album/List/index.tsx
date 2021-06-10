import {IProgram} from '@/models/album';
import {RootState} from '@/models/index';
import React from 'react';
import {Alert, Animated, ListRenderItemInfo, StyleSheet} from 'react-native';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {connect, ConnectedProps} from 'react-redux';
import {ITabProps} from '../Tab';
import Item from './Item';

const mapStateToProps = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = ModelState & ITabProps;

class List extends React.Component<IProps> {
  onPress = (data: IProgram, index: number) => {
    const {onItemPress} = this.props;
    onItemPress(data, index);
  };

  renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={this.onPress} />;
  };

  keyExtractor = (item: IProgram) => {
    return item.id;
  };

  render() {
    const {list, panRef, tapRef, nativeRef, onScrollDrag} = this.props;
    return (
      <NativeViewGestureHandler
        simultaneousHandlers={[panRef]}
        ref={nativeRef}
        waitFor={tapRef}>
        <Animated.FlatList
          style={styles.flatList}
          data={list}
          bounces={false}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onScrollBeginDrag={onScrollDrag}
          onScrollEndDrag={onScrollDrag}
        />
      </NativeViewGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#e3e3e3',
  },
});

export default connector(List);
