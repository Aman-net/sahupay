// Will handle login logic and Entry screens
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '..';
import TabNavigator from './TabNavigator';
import GroupScreen from '../home/GroupScreen';

const EntryStack = createStackNavigator();
// Screens : Login, Main(Choose folder), Tabs(when folder opens)

export default function EntryNavigator() {
  return (
    <EntryStack.Navigator screenOptions={{headerShown: false}}>
      <EntryStack.Screen name="Main" component={Main} />
      <EntryStack.Screen name="Tabs" component={TabNavigator} />
    </EntryStack.Navigator>
  );
}

const styles = StyleSheet.create({});
