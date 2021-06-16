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
import HomeTabs from './HomeTabs';
import Play from '@/pages/views/Play';
import Detail from '@/pages/Detail';

export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Play: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

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

function getHeaderTitle(routeName: string) {
  switch (routeName) {
    case 'HomeTabs':
      return '首页';
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    case 'Account':
      return '账号';
    default:
      return '首页';
  }
}

interface IProps {
  navigation: RootStackNavigation;
  route: RouteProp<RootStackParamList, 'BottomTabs'>;
}
class BottomTabs extends React.Component<IProps> {
  componentDidMount() {
    this.setOptions();
  }

  componentDidUpdate() {
    this.setOptions();
  }

  setOptions = () => {
    const {navigation, route} = this.props;
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'HomeTabs' || routeName === undefined) {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
      });
    } else {
      navigation.setOptions({
        headerTransparent: false,
        headerTitle: getHeaderTitle(routeName),
      });
    }
  };

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#f86442',
          
        }}>
        <Tab.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            title: '首页',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconshouye" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Listen"
          component={Listen}
          options={{
            title: '我听',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconwoting" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Play"
          component={Play}
          options={{
            title: '',
            tabBarIcon: () => {
              return <Play maringTop={14} />;
            },
          }}
        />
        <Tab.Screen
          name="Found"
          component={Found}
          options={{
            title: '发现',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconfaxian" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            title: '账户',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconzhanghu" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
export default BottomTabs;
