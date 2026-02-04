import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import GroupScreen from '../home/GroupScreen';
import RecordsScreen from '../home/RecordsScreen';
import CustomerDetailScreen from '../home/CustomerDetailScreen';
import PaymentEntryScreen from '../home/PaymentEntryScreen';

const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Groups"
        component={GroupScreen}
        options={{title: 'Groups'}}
      />
      <HomeStack.Screen
        name="Records"
        component={RecordsScreen}
        options={{title: 'Ledger'}}
      />
      <HomeStack.Screen
        name="CustomerDetail"
        component={CustomerDetailScreen}
        options={{title: 'Customer Detail'}}
      />
      <HomeStack.Screen
        name="PaymentEntry"
        component={PaymentEntryScreen}
        options={{title: 'Add Payment'}}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
