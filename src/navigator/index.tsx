import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import {Platform, StyleSheet} from 'react-native';

/**
 * 使用type约束泛型类型
 */
export type RootStackParamList = {
  Home: undefined;
  Detail: {
      id:number;
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

class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTitleAlign: 'left',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth:StyleSheet.hairlineWidth,
                },
              }),
            },
          }}>
          <Stack.Screen
            options={{headerTitle: '首页'}}
            name="Home"
            component={Home}
          />
          {/* headerTitleAlign: 'left',  */}
          <Stack.Screen
            options={{headerTitle: '详情页'}}
            name="Detail"
            component={Detail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Navigator;
