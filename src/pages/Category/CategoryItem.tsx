import {ICategory} from '@/models/category';
import {viewportWidth} from '@/utils/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const itemsOffset = 12;
const parentWidth = viewportWidth - 5 * itemsOffset;
const itemWidth = parentWidth / 4;

interface IProps {
  isEdit: boolean;
  selected: boolean;
  data: ICategory;
  disable: boolean;
}

class CategoryItem extends React.Component<IProps> {
  render() {
    const {data, disable, isEdit, selected} = this.props;
    return (
      <View
        key={data.id}
        style={[styles.renderItem, disable && styles.renderItemUnoperation]}>
        <Text style={styles.itemName}>{data.name}</Text>
        {isEdit && !disable && (
          <View style={styles.icon}>
            <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
          </View>
        )}
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
    marginBottom: 8,
  },
  renderItemUnoperation: {
    backgroundColor: '#ccc',
  },
  itemName: {
    fontSize: 14,
  },
  icon: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f86442',
    borderRadius: 8,
  },
  iconText: {
    color: '#fff',
    lineHeight: 15,
  },
});
export default CategoryItem;
