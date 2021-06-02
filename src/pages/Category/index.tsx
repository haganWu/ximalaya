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

class Category extends React.Component<IProps, IState> {
  state = {
    myCategories: this.props.myCategories,
  };

  constructor(props: IProps) {
    super(props);
    props.navigation.setOptions({
        headerRight:() => <HeaderRightButton onSubmit={this.onSubmit}/>
    });
  }

  onSubmit = () => {
      const {dispatch} = this.props;
      dispatch({
          type:'category/toogle'
      });
  }

  renderItem = (item: ICategory, index: number) => {
    return <CategoryItem data={item} />;
  };

  render() {
    const {categories} = this.props;
    const {myCategories} = this.state;
    const classifyGroup = _.groupBy(categories, item => item.classify);
    console.log('classifyGroup:', classifyGroup);

    // console.log(`categories:${categories}, myCategories:${myCategories}`);
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.classifyName}>我的分类</Text>
          <View style={styles.classifyView}>
            {myCategories.map(this.renderItem)}
          </View>
        </View>

        <View>
          {Object.keys(classifyGroup).map(classify => {
            return (
              <View key={classify}>
                <Text style={styles.classifyName}>{classify}</Text>
                <View style={styles.classifyView}>
                  {classifyGroup[classify].map(this.renderItem)}
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
