import {IProgram} from '@/models/album';
import {RootState} from '@/models/index';
import React from 'react';
import {Animated, ListRenderItemInfo, StyleSheet} from 'react-native';
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
  onPress = (data: IProgram) => {
    // console.log('data:', data);
  };

  renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={this.onPress} />;
  };

  keyExtractor = (item: IProgram) => {
    return item.id;
  };

  render() {
    const {list, panRef, tapRef, nativeRef,onScrollDrag} = this.props;
    console.log('List/index -> panRef:', panRef);
    console.log('List/index -> tapRef:', tapRef);
    console.log('List/index -> nativeRef:', nativeRef);
    return (
      <NativeViewGestureHandler
        simultaneousHandlers={[panRef]}
        waitFor={tapRef}
        ref={nativeRef}>
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
