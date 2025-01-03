import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../service/userService'; 
import CheckBox from '@react-native-community/checkbox';

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password) {
        Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
        return;
    }

    try {
        const registerData = {
            username: name,
            email: email,
            password: password,
            password_confirmation: password, // Đảm bảo trường này khớp
        };

        const response = await registerUser(registerData);
        Alert.alert('Thành công', 'Đăng ký thành công!');
        navigation.navigate('SignIn');
    } catch (error) {
        console.error(error);
        
        // Kiểm tra lỗi và hiển thị thông báo phù hợp
        if (error.response && error.response.data) {
            const { password, username } = error.response.data;
            if (password) {
                Alert.alert('Lỗi', password.join(' '));
            }
            if (username) {
                Alert.alert('Lỗi', username.join(' '));
            }
        } else {
            Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi đăng ký.');
        }
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />


      <TouchableOpacity style={styles.button} onPress={handleSignUp} >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign up with</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Text>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text>Apple</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.footerText}>
          Đã có tài khoản? <Text style={styles.linkText}>Đăng nhập</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    marginLeft: 10,
    color: '#7d7d7d',
  },
  linkText: {
    color: '#a0522d',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#a0522d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#7d7d7d',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  socialButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
  },
  footerText: {
    textAlign: 'center',
    color: '#7d7d7d',
  },
});

export default SignUpScreen;
