import {FlatList, View, Text} from 'react-native';
import React, {useState} from 'react';
import {Card, Searchbar} from 'react-native-paper';
import {customers, loans, payments} from '../data/ledgerData';

const TransactionsScreen = () => {
  const [query, setQuery] = useState('');

  const filteredPayments = payments.filter(payment => {
    const loan = loans.find(item => item.id === payment.loanId);
    const customer = customers.find(
      item => item.id === loan?.customerId,
    );
    return (
      customer?.name.toLowerCase().includes(query.toLowerCase()) ?? false
    );
  });

  return (
    <View style={{flex: 1}}>
      <Searchbar
        value={query}
        onChangeText={setQuery}
        style={{margin: 16}}
        placeholder="Search by customer"
      />
      <FlatList
        data={filteredPayments}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const loan = loans.find(entry => entry.id === item.loanId);
          const customer = customers.find(
            entry => entry.id === loan?.customerId,
          );
          return (
            <Card style={{marginHorizontal: 16, marginBottom: 12}}>
              <Card.Title
                title={customer?.name ?? 'Unknown Customer'}
                subtitle={`Loan: ${loan?.id.toUpperCase()}`}
              />
              <Card.Content>
                <Text>
                  {item.type} payment • ₹{item.amount.toLocaleString()}
                </Text>
                <Text>Date: {item.date}</Text>
                {item.note ? <Text>Note: {item.note}</Text> : null}
              </Card.Content>
            </Card>
          );
        }}
        ListEmptyComponent={
          <Text style={{marginHorizontal: 16}}>
            No payments match this search.
          </Text>
        }
      />
    </View>
  );
};

export default TransactionsScreen;
