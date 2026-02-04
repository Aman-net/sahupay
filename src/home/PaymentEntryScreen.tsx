import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Button, Card, RadioButton, TextInput} from 'react-native-paper';
import {customers, loans} from '../data/ledgerData';

const PaymentEntryScreen = ({route, navigation}: any) => {
  const {loanId, customerId} = route.params;
  const loan = loans.find(item => item.id === loanId);
  const customer = customers.find(item => item.id === customerId);

  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState<'Full' | 'Partial'>(
    'Partial',
  );
  const [note, setNote] = useState('');

  if (!loan || !customer) {
    return (
      <View style={{margin: 16}}>
        <Text>Unable to load payment form.</Text>
      </View>
    );
  }

  return (
    <View style={{margin: 16}}>
      <Card>
        <Card.Title
          title={`Add Payment for ${customer.name}`}
          subtitle={`Loan ID: ${loan.id.toUpperCase()}`}
        />
        <Card.Content>
          <TextInput
            label="Amount"
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
            style={{marginBottom: 12}}
          />
          <Text style={{marginBottom: 8}}>Payment Type</Text>
          <RadioButton.Group
            onValueChange={value =>
              setPaymentType(value as 'Full' | 'Partial')
            }
            value={paymentType}>
            <RadioButton.Item label="Partial Payment" value="Partial" />
            <RadioButton.Item label="Full Payment" value="Full" />
          </RadioButton.Group>
          <TextInput
            label="Notes"
            value={note}
            onChangeText={setNote}
            multiline
            style={{marginTop: 12}}
          />
          <Button
            mode="contained"
            style={{marginTop: 16}}
            onPress={() => navigation.goBack()}>
            Save Payment
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default PaymentEntryScreen;
