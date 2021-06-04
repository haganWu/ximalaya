import {ICategory} from '@/models/category';
import {viewportWidth} from '@/utils/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const margin = 5;
export const parentWidth = viewportWidth - 2 * margin;
export const itemWidth = parentWidth / 4;
export const itemHeight = 48;

interface IProps {
  isEdit: boolean;
  selected: boolean;
  data: ICategory;
  disable?: boolean;
}

class CategoryItem extends React.Component<IProps> {
  render() {
    const {data, disable, isEdit, selected} = this.props;
    return (
      <View key={data.id} style={styles.itemWrapper}>
        <View style={[styles.item, disable && styles.disabled]}>
          <Text>{data.name}</Text>
          {isEdit && !disable && (
            <View style={styles.icon}>
              <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {width: itemWidth, height: itemHeight},
  item: {
    flex: 1,
    backgroundColor: '#fff',
    margin: margin,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  disabled: {
    backgroundColor: '#ccc',
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
