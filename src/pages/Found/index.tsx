import {IFound} from '@/models/found';
import React from 'react';
import {useReducer} from 'react';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Item from './Item';

const connector = connect();

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

interface IState {
  list: IFound[];
  currentId: string;
}

enum ActionType {
  LIST,
  CURRENTID,
}

type IAction =
  | {type: ActionType.LIST; list: IFound[]}
  | {type: ActionType.CURRENTID; currentId: string};

function reducer(state: IState, action: any) {
  switch (action.type) {
    case ActionType.LIST:
      return {...state, list: action.list};
    case ActionType.CURRENTID:
      return {...state, currentId: action.currentId};
    default:
      return state;
  }
}

function Found(props: IProps) {
  const initState = {
    list: [],
    currentId: '',
  };

  const [state, _dispatch] = useReducer(reducer, initState);

  const {dispatch} = props;
  useEffect(() => {
    dispatch({
      type: 'found/fetchList',
      callback: (data: IFound[]) => {
        _dispatch({
          type: ActionType.LIST,
          list: data,
        });
      },
    });
  },[dispatch]);

  const setCurrentId = (id: string) => {
    // this.setState({
    //   currentId: id,
    // });
    _dispatch({
      type: ActionType.CURRENTID,
      currentId: id,
    });
    if (id) {
      dispatch({
        type: 'player/pause',
      });
    }
  };

  const renderItem = ({item}: ListRenderItemInfo<IFound>) => {
    const paused = item.id !== state.currentId;
    return <Item data={item} paused={paused} setCurrentId={setCurrentId} />;
  };

  const keyExtractor = (item: IFound) => {
    return item.id;
  };

  const {list} = state;
  return (
    <View style={styles.view}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={state.currentId} //通过currentId值的变化刷新列表
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#ebebeb',
  },
});
export default connector(Found);
