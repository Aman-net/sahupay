// Will handle login logic and Entry screens
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';

const EntryStack = createStackNavigator();
// Screens : Login, Main(Choose folder), Tabs(when folder opens)

export default function EntryNavigator() {
  return (
    <EntryStack.Navigator screenOptions={{headerShown: false}}>
      <EntryStack.Screen name="Tabs" component={TabNavigator} />
    </EntryStack.Navigator>
  );
}
