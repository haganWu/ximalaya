import Touchable from '@/components/Touchable';
import {IGuess} from '@/models/home';
import React from 'react';
import {Alert, Image, StyleSheet, Text} from 'react-native';

interface Iprops {
  data: IGuess;
  onPress: (data: IGuess) => void;
}

class GuessItem extends React.PureComponent<Iprops> {
  onPress = () => {
    const {onPress, data} = this.props;
    if (typeof onPress === 'function') {
      onPress(data);
    }
  };

  render() {
    const {data} = this.props;
    return (
      <Touchable style={styles.item} onPress={this.onPress}>
        <Image style={styles.image} source={{uri: data.image}} />
        <Text style={styles.itemText} numberOfLines={2}>
          {data.title}
        </Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 10,
    color: '#333',
  },
});

export default GuessItem;
