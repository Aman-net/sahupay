import {ScrollView, View, Text} from 'react-native';
import React from 'react';
import {Card, Chip} from 'react-native-paper';
import {customers, loans, payments} from '../data/ledgerData';

const DashboardScreen = () => {
  const activeLoans = loans.filter(loan => loan.status === 'Active');
  const totalPrincipal = activeLoans.reduce(
    (total, loan) => total + loan.principal,
    0,
  );
  const totalPaid = payments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );
  const totalOutstanding = Math.max(totalPrincipal - totalPaid, 0);

  const collateralBreakdown = activeLoans.flatMap(loan => loan.collateral);
  const goldCount = collateralBreakdown.filter(
    item => item.metal === 'Gold',
  ).length;
  const silverCount = collateralBreakdown.filter(
    item => item.metal === 'Silver',
  ).length;

  return (
    <ScrollView contentContainerStyle={{padding: 16}}>
      <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 12}}>
        Dashboard Overview
      </Text>
      <Card style={{marginBottom: 12}}>
        <Card.Title title="Active Loans" />
        <Card.Content>
          <Text>{activeLoans.length} loans currently active</Text>
          <Text>Total Principal: ₹{totalPrincipal.toLocaleString()}</Text>
          <Text>Total Paid: ₹{totalPaid.toLocaleString()}</Text>
          <Text>Outstanding: ₹{totalOutstanding.toLocaleString()}</Text>
        </Card.Content>
      </Card>

      <Card style={{marginBottom: 12}}>
        <Card.Title title="Customers" />
        <Card.Content>
          <Text>Total Customers: {customers.length}</Text>
        </Card.Content>
      </Card>

      <Card style={{marginBottom: 12}}>
        <Card.Title title="Collateral Mix" />
        <Card.Content>
          <View style={{flexDirection: 'row'}}>
            <Chip style={{marginRight: 8}}>Gold Items: {goldCount}</Chip>
            <Chip>Silver Items: {silverCount}</Chip>
          </View>
        </Card.Content>
      </Card>

      <Card>
        <Card.Title title="Recent Payments" />
        <Card.Content>
          {payments.slice(0, 3).map(payment => (
            <View key={payment.id} style={{marginBottom: 8}}>
              <Text>
                {payment.type} • ₹{payment.amount.toLocaleString()}
              </Text>
              <Text>Date: {payment.date}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default DashboardScreen;
