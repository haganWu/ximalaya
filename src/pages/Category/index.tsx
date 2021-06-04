import Touchable from '@/components/Touchable';
import {ICategory} from '@/models/category';
import {RootState} from '@/models/index';
import {RootStackNavigation} from '@/navigator/index';
import _ from 'lodash';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect, ConnectedProps} from 'react-redux';
import CategoryItem from './CategoryItem';
import HeaderRightButton from './HeaderRightButton';

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

/**
 * 保存用户临时选择的分类,待用户点击"完成"之后再将用户选择的分类报错值dva仓库
 */
interface IState {
  myCategories: ICategory[];
}

const fixedItems = [0, 1];

class Category extends React.Component<IProps, IState> {
  state = {
    myCategories: this.props.myCategories,
  };

  constructor(props: IProps) {
    super(props);
    props.navigation.setOptions({
      headerRight: () => <HeaderRightButton onSubmit={this.onSubmit} />,
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: false,
      },
    });
  }

  onSubmit = () => {
    const {dispatch} = this.props;
    const {myCategories} = this.state;
    dispatch({
      type: 'category/toogle',
      payload: {
        myCategories,
      },
    });
  };

  onLongPress = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: true,
      },
    });
  };

  onPress = (item: ICategory, index: number, isSelected: boolean) => {
    const {isEdit} = this.props;
    const {myCategories} = this.state;
    if (isEdit) {
      if (isSelected) {
        const disable = fixedItems.indexOf(index) > -1;
        if (disable) {
          return;
        } else {
          this.setState({
            myCategories: myCategories.filter(
              selectedItem => selectedItem.id !== item.id,
            ),
          });
        }
      } else {
        this.setState({
          myCategories: myCategories.concat([item]),
        });
      }
    }
  };

  renderSelectedItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    const disable = fixedItems.indexOf(index) > -1;
    return (
      <Touchable
        key={item.id}
        onPress={() => this.onPress(item, index, true)}
        onLongPress={this.onLongPress}>
        <CategoryItem
          data={item}
          disable={disable}
          isEdit={isEdit}
          selected={true}
        />
      </Touchable>
    );
  };
  renderUnselectedItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    return (
      <Touchable
        key={item.id}
        onPress={() => this.onPress(item, index, false)}
        onLongPress={this.onLongPress}>
        <CategoryItem
          data={item}
          disable={false}
          isEdit={isEdit}
          selected={false}
        />
      </Touchable>
    );
  };

  render() {
    const {categories} = this.props;
    const {myCategories} = this.state;
    const classifyGroup = _.groupBy(categories, item => item.classify);
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.classifyName}>我的分类</Text>
          <View style={styles.classifyView}>
            {myCategories.map(this.renderSelectedItem)}
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
                    return this.renderUnselectedItem(item, index);
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
});

export default connector(Category);
