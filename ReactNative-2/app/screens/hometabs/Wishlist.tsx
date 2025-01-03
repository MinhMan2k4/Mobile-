import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getWishlistItems } from '../../service/wishlisstSevice'; // Đường dẫn tới file chứa hàm
import { useFocusEffect } from '@react-navigation/native';

const Wishlist = ({ navigation }: {navigation: any}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlistItems, setWishlistItems] = useState([]);

  const categories = ['All', 'Jacket', 'Shirt', 'Pant', 'T-Shirt'];

  const fetchWishlistItems = async () => {
    try {
      const items = await getWishlistItems();
      console.log("wis", items);
      setWishlistItems(items);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

    // Sử dụng `useFocusEffect` để load lại danh sách khi quay lại màn hình
    useFocusEffect(
      useCallback(() => {
        fetchWishlistItems(); // Gọi lại hàm fetch khi quay lại màn hình
      }, [])
    );

  const filteredProducts = selectedCategory === 'All' 
    ? wishlistItems 
    : wishlistItems.filter(product => product.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>

      {/* Bộ lọc */}
      <View style={styles.filterContainer}> 
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.filterButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === category && styles.filterTextActive
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.product.image_url }} style={styles.productImage} />
            <TouchableOpacity style={styles.favoriteIcon}>
              <Icon name="favorite-border" size={24} color="#B88C66" />
            </TouchableOpacity>
            <Text style={styles.productName}>{item.product.name}</Text>
            <Text style={styles.productPrice}>{item.product.price}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={14} color="#FFD700" />
              <Text style={styles.productRating}>{item.product.rating}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#B88C66',
  },
  filterButtonActive: {
    backgroundColor: '#B88C66',
  },
  filterText: {
    color: '#B88C66',
  },
  filterTextActive: {
    color: '#FFF',
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  productName: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
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
