import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { addToCart } from "../../service/cartService"; // Import hàm addToCart
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../../service/CartContext"; // Import context
import { Picker } from "@react-native-picker/picker";

const ProductDetail = ({ route, navigation }: { navigation: any }) => {
  const { product } = route.params;
  const { cartItems, setCartItems } = useCart(); // Sử dụng context
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [selectedSize, setSelectedSize] = useState("M"); // Kích thước mặc định
  const [selectedColor, setSelectedColor] = useState("Red"); // Màu mặc định

  const handleAddToCart = async () => {
    setLoading(true);

    // Kiểm tra xem người dùng đã đăng nhập chưa
    const token = await AsyncStorage.getItem("token");
    console.log("user", token);
    if (!token) {
      setLoading(false);
      Alert.alert(
        "Lỗi",
        "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng."
      );
      return;
    }

    const cartItemData = {
      product_id: product.id,
      quantity: 1,
      size: selectedSize, // Kích thước đã chọn
      color: selectedColor, // Màu đã chọn
    };

    try {
      console.log("op", cartItemData);
      const response = await addToCart(cartItemData);
      setCartItems([...cartItems, { ...product, quantity: 1 }]); // Cập nhật giỏ hàng với kích thước và màu
      setLoading(false);
      Alert.alert("Thành công", "Đã thêm sản phẩm vào giỏ hàng thành công");
    } catch (error) {
      setLoading(false);
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      Alert.alert("Lỗi", "Thêm sản phẩm vào giỏ hàng thất bại. Vui lòng thử lại.");
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }); // Định dạng giá tiền
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
      </View>

      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: product.image_url }} style={styles.productImage} />

      {/* Thông tin sản phẩm */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productCategory}>{product.category}</Text>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.ratingRow}>
          <Icon name="star" size={18} color="#FFD700" />
          <Text style={styles.productRating}>{product.rating}</Text>
        </View>

        {/* Mô tả sản phẩm */}
        <Text style={styles.productDescription}>{product.description}</Text>

        {/* Chọn kích thước */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Kích thước:</Text>
          <Picker
            selectedValue={selectedSize}
            onValueChange={(itemValue) => setSelectedSize(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="S" value="S" />
            <Picker.Item label="M" value="M" />
            <Picker.Item label="L" value="L" />
            <Picker.Item label="XL" value="XL" />
          </Picker>
        </View>

        {/* Chọn màu sắc */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Màu sắc:</Text>
          <Picker
            selectedValue={selectedColor}
            onValueChange={(itemValue) => setSelectedColor(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Đỏ" value="Red" />
            <Picker.Item label="Xanh lá" value="Green" />
            <Picker.Item label="Xanh dương" value="Blue" />
            <Picker.Item label="Đen" value="Black" />
          </Picker>
        </View>

        {/* Giá tiền và Thêm vào giỏ hàng */}
        <View style={styles.priceRow}>
          <Text style={styles.totalPrice}>Tổng giá</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
        </View>

        {/* Nút Thêm vào giỏ hàng */}
        <TouchableOpacity
          style={[styles.addToCartButton, loading && styles.disabledButton]} // Thêm class nếu đang loading
          onPress={handleAddToCart}
          disabled={loading} // Vô hiệu hóa nút khi đang loading
        >
          <Text style={styles.addToCartText}>
            {loading ? "Đang thêm..." : "Thêm vào giỏ hàng"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
  },
  productCategory: {
    fontSize: 14,
    color: "#888",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  productRating: {
    marginLeft: 4,
    fontSize: 16,
  },
  productDescription: {
    marginTop: 12,
    fontSize: 14,
    color: "#555",
  },
  pickerContainer: {
    marginTop: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#B88C66",
  },
  addToCartButton: {
    backgroundColor: "#B88C66",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 16,
  },
  addToCartText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc", // Đổi màu khi đang loading
  },
});
