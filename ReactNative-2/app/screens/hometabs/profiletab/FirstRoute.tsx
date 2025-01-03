import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUserInfo, logoutUser  } from '../../../service/userService'; // Đường dẫn tới file chứa hàm getUserInfo
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstRoute = ({ navigation }: { navigation: any }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const menuItems = [
    { id: 1, title: 'Your profile', icon: 'user', screen: 'YourProfile' },
    { id: 2, title: 'Payment Methods', icon: 'credit-card', screen: 'PaymentMethods' },
    { id: 3, title: 'My Orders', icon: 'list-alt', screen: 'MyOrders' },
    { id: 4, title: 'Settings', icon: 'cog', screen: 'Settings' },
    { id: 5, title: 'Help Center', icon: 'question-circle', screen: 'HelpCenter' },
    { id: 6, title: 'Privacy Policy', icon: 'lock', screen: 'PrivacyPolicy' },
    { id: 7, title: 'Invite Friends', icon: 'users', screen: 'InviteFriends' },
    { id: 8, title: 'Change Password', icon: 'key', screen: 'ChangePassword' },
    { id: 8, title: 'Log out', icon: 'sign-out', screen: 'Logout' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Kiểm tra xem token có tồn tại trong AsyncStorage không
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.warn("No token found, user not authenticated.");
          return; // Không gọi getUserInfo nếu không có token
        }

        const userData = await getUserInfo(); // Sử dụng hàm getUserInfo để lấy dữ liệu người dùng
        console.log("user", userData);
        if (userData && userData.username && userData.email) {
          setUser(userData);
        } else {
          console.warn("User data is missing expected properties.");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      Alert.alert("Logout Successful", response.message);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Logout Failed", "An error occurred while logging out.");
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        if (item.title === 'Log out') {
          handleLogout();
        }else if (item.title === 'Change Password') {
          navigation.navigate('ChangePassword'); // Điều hướng đến ChangePasswordScreen
        } else {
          navigation.navigate(item.screen);
        }
      }}
    >
      <Icon name={item.icon} size={20} color="#000" style={styles.icon} />
      <Text style={styles.menuText}>{item.title}</Text>
      <Icon name="chevron-right" size={16} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?w=203&h=212&c=7&r=0&o=5&pid=1.7' }} // Link ảnh của người dùng
        />
        {user ? (
          <>
             <Text style={styles.name}>{user.username}</Text>
             <Text style={styles.email}>{user.email}</Text>
          </>
        ) : (
          <Text style={styles.name}>Loading...</Text> // Hiển thị khi đang tải dữ liệu
        )}
      </View>

      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.menuList}
      />
    </View>
  );
}

export default FirstRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#777', // Màu cho email
  },
  menuList: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
});
