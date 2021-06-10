import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import {Animated, Platform, StatusBar, StyleSheet, View} from 'react-native';
import Category from '@/pages/Category/index';
import Album from '@/pages/Album/index';
import Detail from '@/pages/Detail/index';
import IconFont from '@/assets/iconfont';

/**
 * 使用type约束泛型类型
 */
export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
    opacity?: Animated.Value; //设置列表上拉时标题栏的透明度
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

/**
 * {
 *     Navigator,//真正导航器的组件
 *     Screen    //作为Navigator的子组件,用来定义路由(界面)
 * }
 */
const Stack = createStackNavigator<RootStackParamList>();

function getAlbumOptions({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Album'>;
}) {
  return {
    headerTitle: route.params.item.title,
    headerTransparent: true, //标题栏透明
    headerTitleStyle: {
      opacity: route.params.opacity, //标题透明  设置列表上拉时标题栏的透明度
    },
    headerBackground: () => {
      //设置标题栏背景   设置列表上拉时标题栏的透明度
      return (
        <Animated.View
          style={[styles.headerBackground, {opacity: route.params.opacity}]}
        />
      );
    },
  };
}

function RootStackScreen() {
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...Platform.select({
          android: {
            headerStatusBarHeight: StatusBar.currentHeight, //防止顶部标题每次都渲染闪跳
          },
        }),
        headerBackTitleVisible: false, //去除iOS返回按钮带标题'返回'字样
        headerTintColor: '#333', //修改标题和返回按钮的颜色
        headerStyle: {
          backgroundColor: '#fff', //设置状态栏颜色
          ...Platform.select({
            android: {
              elevation: 0,
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
          }),
        },
      }}>
      <Stack.Screen
        options={{title: '首页', headerTitle: '首页'}}
        name="BottomTabs"
        component={BottomTabs}
      />
      <Stack.Screen
        options={{
          title: '分类',
          headerTitle: '分类',
          // headerRight: () => {  //添加右侧按钮
          //   return (
          //     <View>
          //       <Text>编辑</Text>
          //     </View>
          //   );
          // },
        }}
        name="Category"
        component={Category}
      />
      {/* headerTitleAlign: 'left',  */}
      <Stack.Screen options={getAlbumOptions} name="Album" component={Album} />
    </Stack.Navigator>
  );
}

export type ModelStackParamList = {
  Root: undefined;
  Detail: {
    id: string;
  };
};

const ModelStack = createStackNavigator<ModelStackParamList>();

export type ModelStackNavigation = StackNavigationProp<ModelStackParamList>;

function ModelStackScreen() {
  return (
    /**ModelStack.Navigator:::
     *   mode="modal"全屏    headerMode="screen"每个页面有一个独立的标题栏
     *   headerTitleAlign 标题居中
     *   gestureEnabled 开启手势
     *   TransitionPresets.ModalSlideFromBottomIOS 动画效果
     *   headerBackTitleVisible: false, 隐藏IOS返回键右边标题
     *
     * ModelStack.Screen:::
     *   headerTintColor:'#fff'设置标题和返回按钮颜色
     *   headerTitle: '' 设置标题
     *   headerTransparent: true 设置标题透明
     *   cardStyle:{backgroundColor:'#807c66'} 设置页面容器样式
     *    headerBackImage: ({tintColor}) => (<IconFont name="iconxia" size={22} color={tintColor}/> 设置返回键图标
     * */
    <ModelStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'center',
        gestureEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerBackTitleVisible: false,
      }}>
      <ModelStack.Screen
        name="Root"
        component={RootStackScreen}
        options={{headerShown: false}}
      />
      <ModelStack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTintColor: '#fff',
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {backgroundColor: '#807c66'},
          headerBackImage: ({tintColor}) => (
            <IconFont
              name="iconxia"
              size={24}
              color={tintColor}
              style={styles.headerBackImage}
            />
          ),
        }}
      />
    </ModelStack.Navigator>
  );
}

class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <ModelStackScreen />
      </NavigationContainer>
    );
  }
}

/**
 * 
    Platform.OS === 'android' ?:  平台区分
 */
const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0, //标题透明
  },
  headerBackImage: {
    marginHorizontal: Platform.OS === 'android' ? 0 : 8,
  },
});
export default Navigator;
