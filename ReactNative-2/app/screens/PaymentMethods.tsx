import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Danh sách phương thức thanh toán
const paymentOptions = [
  { id: '1', name: 'Paypal', icon: 'payment' },
  { id: '2', name: 'Apple Pay', icon: 'apple' },
  { id: '3', name: 'Google Pay', icon: 'google' },
];

const PaymentMethods = ({ navigation }: {navigation: any}) => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const selectPayment = (id) => {
    setSelectedPayment(id);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>

      {/* Credit & Debit Card */}
      <TouchableOpacity style={styles.addCardButton} onPress={() => navigation.navigate('Addcard')}>
        <Icon name="credit-card" size={24} color="#B88C66" />
        <Text style={styles.addCardText}>Add Card</Text>
        <Icon name="arrow-forward-ios" size={16} color="#B88C66" style={styles.arrowIcon} />
      </TouchableOpacity>



      {/* Confirm Payment Button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  addCardText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  moreOptionsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: '#B88C66',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  confirmButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
