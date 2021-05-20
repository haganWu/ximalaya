import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';

export type BottomTabParamList = {
  Home: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator();

class BottomTabs extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{
            activeTintColor:'#f86442'
        }}>
          <Tab.Screen 
            options={{title: '首页'}} 
            name="Home" 
            component={Home} 
          />
          <Tab.Screen
            options={{title: '我听'}}
            name="Listen"
            component={Listen}
          />
          <Tab.Screen
            options={{title: '发现'}}
            name="Found"
            component={Found}
          />
          <Tab.Screen
            options={{title: '账号'}}
            name="Account"
            component={Account}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
export default BottomTabs;
