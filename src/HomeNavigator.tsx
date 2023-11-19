import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';

const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen1} />
      <HomeStack.Screen name="Home2" component={HomeScreen2} />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;

function HomeScreen1() {
  return <Text>"HomeScreen"</Text>;
}

function HomeScreen2() {
  return <Text>"HomeScreen2"</Text>;
}
