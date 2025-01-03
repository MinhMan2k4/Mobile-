import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { addToWishlist } from '../../../service/wishlisstSevice'; // Đảm bảo đường dẫn đúng đến file dịch vụ của bạn
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const ItemProduct = ({ navigation, products }) => {
  const [wishlist, setWishlist] = useState([]); // Trạng thái cho wishlist

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
      if (!token) {
        Alert.alert('Lỗi', 'Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích.');
        return;
      }

      const wishlistItemData = { product_id: productId }; // Dữ liệu cần gửi
      const response = await addToWishlist(wishlistItemData); // Gọi hàm thêm vào wishlist
      setWishlist((prev) => [...prev, response]); // Cập nhật trạng thái wishlist
      Alert.alert('Thành công', 'Sản phẩm đã được thêm vào danh sách yêu thích.');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào danh sách yêu thích.');
    }
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('ProductDetail', { product: item })} 
          style={styles.productCard}
        >
          <Image 
            source={{ uri: item.image_url }} 
            style={styles.productImage} 
            resizeMode="contain"
          />
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={() => handleAddToWishlist(item.id)} // Gọi hàm thêm vào wishlist
          >
            <Icon name="favorite-border" size={24} color="#B88C66" />
          </TouchableOpacity>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{formatCurrency(item.price)}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color="#FFD700" />
            <Text style={styles.productRating}>{item.rating}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.productList}
    />
  );
};

export default ItemProduct;

const styles = StyleSheet.create({
  productList: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  productName: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    marginTop: 4,
    fontSize: 14,
    color: '#B88C66',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  productRating: {
    marginLeft: 4,
    fontSize: 12,
    color: '#555',
  },
});
