import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
  TabNavigationState,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import {RootStackNavigation, RootStackParamList} from '.';
import IconFont from '@/assets/iconfont';

export type BottomTabParamList = {
  Home: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator();

// function getHeaderTitle(route: Route) {
//   const routeName = route.state
//     ? route.state.routes[route.state.index].name
//     : route.params?.screen || 'Home';
//   switch (routeName) {
//     case 'Home':
//       return '首页';
//     case 'Listen':
//       return '我听';
//     case 'Found':
//       return '发现';
//     case 'Account':
//       return '账号';
//     default:
//       return '首页';
//   }
// }

// type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
//   state?: TabNavigationState<BottomTabParamList>;
// };
interface IProps {
  navigation: RootStackNavigation;
  route: RouteProp<RootStackParamList, 'BottomTabs'>;
}

class BottomTabs extends React.Component<IProps> {
  componentDidUpdate() {
    const {navigation, route} = this.props;
    navigation.setOptions({
      headerTitle: getFocusedRouteNameFromRoute(route),
    });
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#f86442',
        }}>
        <Tab.Screen
          options={{
            title: '首页',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconshouye" color={color} size={size} />
            ),
          }}
          name="首页"
          component={Home}
        />
        <Tab.Screen
          options={{
            title: '我听',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconwoting" color={color} size={size} />
            ),
          }}
          name="我听"
          component={Listen}
        />
        <Tab.Screen
          options={{
            title: '发现',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconfaxian" color={color} size={size} />
            ),
          }}
          name="发现"
          component={Found}
        />
        <Tab.Screen
          options={{
            title: '账户',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconzhanghu" color={color} size={size} />
            ),
          }}
          name="账户"
          component={Account}
        />
      </Tab.Navigator>
    );
  }
}
export default BottomTabs;
