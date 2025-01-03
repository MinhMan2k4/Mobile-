import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddCardScreen = ({ navigation }: {navigation: any}) => {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add Card</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.cardPreview}>
        <Text style={styles.cardNumber}>4716 9627 1635 8047</Text>
        <Text style={styles.cardHolderName}>Card holder name</Text>
        <Text style={styles.nameText}>Esther Howard</Text>
        <Text style={styles.expiryText}>Expiry date</Text>
        <Text style={styles.expiryDate}>02/30</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Card Holder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Holder Name"
          value={cardHolderName}
          onChangeText={setCardHolderName}
        />
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Expiry Date</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
        <Text style={styles.label}>CVV</Text>
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          secureTextEntry
        />
        {/* <View style={styles.checkboxContainer}>
          <CheckBox value={isSaved} onValueChange={setIsSaved} />
          <Text style={styles.checkboxLabel}>Save Card</Text>
        </View> */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  cardPreview: {
    backgroundColor: '#a67c52',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardNumber: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  cardHolderName: {
    fontSize: 14,
    color: '#fff',
  },
  nameText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  expiryText: {
    fontSize: 14,
    color: '#fff',
  },
  expiryDate: {
    fontSize: 18,
    color: '#fff',
  },
  formContainer: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#333',
  },
  button: {
    backgroundColor: '#a67c52',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCardScreen;
