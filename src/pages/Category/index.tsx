import Touchable from '@/components/Touchable';
import {ICategory} from '@/models/category';
import {RootState} from '@/models/index';
import {RootStackNavigation} from '@/navigator/index';
import _ from 'lodash';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect, ConnectedProps} from 'react-redux';
import CategoryItem, {itemHeight, margin, itemWidth} from './CategoryItem';
import HeaderRightButton from './HeaderRightButton';
import {DragSortableView} from 'react-native-drag-sort';
import {viewportWidth} from '@/utils/index';
import {useEffect} from 'react';
import {useState} from 'react';

/**
 * 从dva获取数据
 */
const mapStateToProps = ({category}: RootState) => {
  return {
    myCategories: category.myCategories,
    categories: category.categories,
    isEdit: category.isEdit,
  };
};
const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

const fixedItems = [0, 1];

function Category(props: IProps) {
  const [myCategories, setMyCategories] = useState(props.myCategories);
  console.log('myCategories', myCategories);
  const {dispatch, categories, navigation, isEdit} = props;
  useEffect(() => {
    const onSubmit = () => {
      dispatch({
        type: 'category/toogle',
        payload: {
          myCategories,
        },
      });
      if (isEdit) {
        navigation.goBack();
      }
    };

    navigation.setOptions({
      headerRight: () => <HeaderRightButton onSubmit={onSubmit} />,
    });
  }, [dispatch, navigation, isEdit, myCategories]);

  /**
   * 组件卸载的时候调用
   */
  useEffect(() => {
    //清除副作用
    return () => {
      dispatch({
        type: 'category/setState',
        payload: {
          isEdit: false,
        },
      });
    };
  }, [dispatch]);

  const onLongPress = () => {
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: true,
      },
    });
  };

  const onPress = (item: ICategory, index: number, isSelected: boolean) => {
    if (isEdit) {
      if (isSelected) {
        const disable = fixedItems.indexOf(index) > -1;
        if (disable) {
          return;
        } else {
          setMyCategories(
            myCategories.filter(selectedItem => selectedItem.id !== item.id),
          );
        }
      } else {
        setMyCategories(myCategories.concat([item]));
      }
    }
  };

  const onDataChange = (data: ICategory[]) => {
    setMyCategories(data);
  };

  const onClickItem = (data: ICategory[], item: ICategory) => {
    onPress(item, data.indexOf(item), true);
  };

  const renderSelectedItem = (item: ICategory, index: number) => {
    const disable = fixedItems.indexOf(index) > -1;
    return (
      <CategoryItem
        key={item.id}
        data={item}
        disable={disable}
        isEdit={isEdit}
        selected={true}
      />
    );
  };
  const renderUnselectedItem = (item: ICategory, index: number) => {
    return (
      <Touchable
        key={item.id}
        onPress={() => onPress(item, index, false)}
        onLongPress={onLongPress}>
        <CategoryItem
          data={item}
          disable={false}
          isEdit={isEdit}
          selected={false}
        />
      </Touchable>
    );
  };

  const classifyGroup = _.groupBy(categories, item => item.classify);
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.classifyName}>我的分类</Text>
        <View style={styles.classifyView}>
          <DragSortableView
            dataSource={myCategories}
            fixedItems={fixedItems}
            renderItem={renderSelectedItem}
            sortable={isEdit}
            keyExtractor={item => item.id}
            onDataChange={onDataChange}
            parentWidth={viewportWidth}
            childrenWidth={itemWidth}
            childrenHeight={itemHeight}
            marginChildrenTop={margin}
            onClickItem={onClickItem}
          />
        </View>
      </View>

      <View>
        {Object.keys(classifyGroup).map(classify => {
          return (
            <View key={classify}>
              <Text style={styles.classifyName}>{classify}</Text>
              <View style={styles.classifyView}>
                {classifyGroup[classify].map((item, index) => {
                  if (
                    myCategories.find(
                      selectedItem => selectedItem.id === item.id,
                    )
                  ) {
                    return null;
                  }
                  return renderUnselectedItem(item, index);
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  classifyName: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 6,
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap', //自动换行
    padding: margin,
  },
});

export default connector(Category);
