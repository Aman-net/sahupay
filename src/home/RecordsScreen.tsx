import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';

const RecordsScreen = ({route, navigation}: any) => {
  const {name} = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View>
      <Searchbar
        value={searchQuery}
        onChangeText={query => setSearchQuery(query)}
        style={{margin: 16}}
      />
      <Text>{name}</Text>
    </View>
  );
};

export default RecordsScreen;
