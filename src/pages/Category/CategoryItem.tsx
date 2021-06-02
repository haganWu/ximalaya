import {ICategory} from '@/models/category';
import {viewportWidth} from '@/utils/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const itemsOffset = 6;
const parentWidth = viewportWidth - 5 * itemsOffset;
const itemWidth = parentWidth / 4;

interface IProps {
  data: ICategory;
}

class CategoryItem extends React.Component<IProps> {
  render() {
    const {data} = this.props;
    return (
      <View key={data.id} style={styles.renderItem}>
        <Text style={styles.itemName}>{data.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  renderItem: {
    width: itemWidth,
    backgroundColor: '#fff',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: itemsOffset,
    marginTop: 6,
    borderRadius: 6,
  },
  itemName: {
    fontSize: 14,
  },
});
export default CategoryItem;
