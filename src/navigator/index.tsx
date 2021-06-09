import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import {Animated, Platform, StatusBar, StyleSheet, View} from 'react-native';
import Category from '@/pages/Category/index';
import Album from '@/pages/Album/index';

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
const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0, //标题透明
  },
});

class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
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
          <Stack.Screen
            options={getAlbumOptions}
            name="Album"
            component={Album}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Navigator;
