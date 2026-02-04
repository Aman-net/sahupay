import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {group} from './data/dummyData';
import {Card, IconButton} from 'react-native-paper';

export default function Main({navigation}: any) {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {group.map(item => (
        <GroupCard navigation={navigation} item={item} />
      ))}

      <IconButton
        style={{position: 'absolute', bottom: 16, right: 16}}
        icon={'plus'}
        size={32}
        iconColor="black"
        containerColor="lightgrey"
        onPress={() => console.log('pressed')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

const GroupCard = ({navigation, item}: any) => {
  return (
    <View
      key={item.id}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 8,
      }}>
      <Card
        style={{backgroundColor: 'lightpink', flexGrow: 1}}
        onPress={() => navigation.navigate('Tabs', item)}>
        <Card.Title title={item.displayName} subtitle={item.businessName} />
        <Card.Content>
          <Text>No. Of Records: {item.noOfRecords}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};
