import {FlatList, View, Text} from 'react-native';
import React from 'react';
import {Card, Chip, Divider, Button} from 'react-native-paper';
import {customers, loans, payments} from '../data/ledgerData';

const CustomerDetailScreen = ({route, navigation}: any) => {
  const {customerId, loanId} = route.params;
  const customer = customers.find(item => item.id === customerId);
  const loan = loans.find(item => item.id === loanId);

  if (!customer || !loan) {
    return (
      <View style={{margin: 16}}>
        <Text>Customer details not found.</Text>
      </View>
    );
  }

  const loanPayments = payments.filter(payment => payment.loanId === loan.id);
  const paidAmount = loanPayments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );
  const remaining = Math.max(loan.principal - paidAmount, 0);

  return (
    <View style={{flex: 1}}>
      <Card style={{margin: 16}}>
        <Card.Title title={customer.name} subtitle={customer.phone} />
        <Card.Content>
          <Text>Address: {customer.address}</Text>
          <Text>KYC: {customer.kycId}</Text>
          <Divider style={{marginVertical: 12}} />
          <Text style={{fontWeight: '600'}}>Loan Overview</Text>
          <Text>Principal: ₹{loan.principal.toLocaleString()}</Text>
          <Text>Interest: {loan.interestRate}% / month</Text>
          <Text>Start Date: {loan.startDate}</Text>
          <Text>Status: {loan.status}</Text>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Chip style={{marginRight: 8}}>
              Paid: ₹{paidAmount.toLocaleString()}
            </Chip>
            <Chip>Remaining: ₹{remaining.toLocaleString()}</Chip>
          </View>
        </Card.Content>
      </Card>

      <View style={{marginHorizontal: 16}}>
        <Text style={{fontWeight: '600', marginBottom: 8}}>
          Collateral Items
        </Text>
        {loan.collateral.map(item => (
          <Card key={item.id} style={{marginBottom: 8}}>
            <Card.Content>
              <Text>
                {item.metal} {item.type}
              </Text>
              <Text>Weight: {item.grossWeightGrams}g</Text>
              <Text>Purity: {item.purity}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={{marginHorizontal: 16, marginTop: 16, flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          <Text style={{fontWeight: '600'}}>Payment History</Text>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate('PaymentEntry', {
                loanId: loan.id,
                customerId: customer.id,
              })
            }>
            Add Payment
          </Button>
        </View>
        <FlatList
          data={loanPayments}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card style={{marginBottom: 8}}>
              <Card.Content>
                <Text>
                  {item.type} • ₹{item.amount.toLocaleString()}
                </Text>
                <Text>Date: {item.date}</Text>
                {item.note ? <Text>Note: {item.note}</Text> : null}
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={
            <Text style={{marginTop: 8}}>No payments recorded yet.</Text>
          }
        />
      </View>
    </View>
  );
};

export default CustomerDetailScreen;
