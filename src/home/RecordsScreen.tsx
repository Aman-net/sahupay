import {FlatList, View, Text} from 'react-native';
import React, {useState} from 'react';
import {Card, Searchbar, Chip} from 'react-native-paper';
import {customers, loans, payments} from '../data/ledgerData';

const RecordsScreen = ({route, navigation}: any) => {
  const {groupId, groupName} = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  const groupLoans = loans.filter(loan => loan.groupId === groupId);
  const filteredLoans = groupLoans.filter(loan => {
    const customer = customers.find(item => item.id === loan.customerId);
    const customerName = customer?.name ?? '';
    return customerName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderItem = ({item}: any) => {
    const customer = customers.find(entry => entry.id === item.customerId);
    const loanPayments = payments.filter(payment => payment.loanId === item.id);
    const paidAmount = loanPayments.reduce(
      (total, payment) => total + payment.amount,
      0,
    );
    const remaining = Math.max(item.principal - paidAmount, 0);
    const collateralLabel = item.collateral
      .map((col: any) => `${col.metal} ${col.type}`)
      .join(', ');

    return (
      <Card
        style={{marginHorizontal: 16, marginBottom: 12}}
        onPress={() =>
          navigation.navigate('CustomerDetail', {
            customerId: customer?.id,
            loanId: item.id,
          })
        }>
        <Card.Title
          title={customer?.name ?? 'Unknown Customer'}
          subtitle={`Loan ID: ${item.id.toUpperCase()}`}
        />
        <Card.Content>
          <Text>Principal: ₹{item.principal.toLocaleString()}</Text>
          <Text>Interest Rate: {item.interestRate}% / month</Text>
          <Text>Collateral: {collateralLabel}</Text>
          <Text>Remaining: ₹{remaining.toLocaleString()}</Text>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Chip style={{marginRight: 8}}>
              Payments: {loanPayments.length}
            </Chip>
            <Chip>Balance: ₹{remaining.toLocaleString()}</Chip>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View>
      <Searchbar
        value={searchQuery}
        onChangeText={query => setSearchQuery(query)}
        style={{margin: 16}}
      />
      <Text style={{marginHorizontal: 16, marginBottom: 12, fontSize: 16}}>
        {groupName} • {filteredLoans.length} active loans
      </Text>
      <FlatList
        data={filteredLoans}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{marginHorizontal: 16}}>
            No matching loans found.
          </Text>
        }
      />
    </View>
  );
};

export default RecordsScreen;
