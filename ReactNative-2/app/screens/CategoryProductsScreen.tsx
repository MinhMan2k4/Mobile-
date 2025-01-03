// CategoryProductsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import ItemProduct from "./hometabs/items/ItemProduct"; // Component hiển thị sản phẩm
import { getCategoryProducts } from "../service/categoryService"; // Import hàm lấy sản phẩm theo category
import { Ionicons } from '@expo/vector-icons';

const CategoryProductsScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
        try {
            const { products, categoryName } = await getCategoryProducts(categoryId);
            setProducts(products);
            setCategoryName(categoryName); // Lưu tên danh mục
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm của danh mục:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Sản phẩm trong {categoryName}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ItemProduct products={products} navigation={navigation} />
      )}
    </View>
  );
};

export default CategoryProductsScreen;


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F5F5F5" },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 16,
    textAlign: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 10,
    zIndex: 1,
  },
});
