import IconFont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';
import {IGuess} from '@/models/home';
import {RootState} from '@/models/index';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ListRenderItemInfo,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import GuessItem from './GuessItem';

const mapStateToProps = ({home}: RootState) => {
  return {
    guesses: home.guesses,
  };
};

/**
 * connect()函数作用用于将 models中的home.ts文件中HomeModel中的state(即dva仓库)映射到 Home(本文件L15)组件中(通过函数mapStateToProps())
 */
const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  namespace: string;
}

class Guess extends React.Component<IProps> {
  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchGuess',
    });
  };

  onPress = (data: IGuess) => {
    Alert.alert(data.title);
  };

  renderItem = ({item}: ListRenderItemInfo<IGuess>) => {
    return <GuessItem data={item} onPress={this.onPress} />;
  };

  keyExtractor = (item: IGuess) => {
    return item.id;
  };

  render() {
    const {guesses} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <IconFont name="iconxihuan" />
            <Text style={styles.headerTitle}>猜你喜欢</Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.headerMoreText}>更多</Text>
            <IconFont size={14} name="iconmore" />
          </View>
        </View>

        <FlatList
          style={styles.flatListContainer}
          numColumns={3}
          data={guesses}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        {/* <Text>{JSON.stringify(guesses)}</Text> */}

        <Touchable style={styles.changeOneGroup} onPress={this.fetch}>
          <IconFont name="iconhuanyipi" color="#f86442" />
          <Text style={styles.changeOneGroupText}>换一批</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 4,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  flatListContainer: {
    padding: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 4,
    color: '#333',
  },
  headerMoreText: {
    marginRight: 4,
    color: '#6f6f6f',
  },
  itemText: {
    fontSize: 10,
    color: '#333',
  },
  changeOneGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  changeOneGroupText: {
    marginRight: 4,
    color: '#333',
    marginLeft: 4,
  },
});
export default connector(Guess);
