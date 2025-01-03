import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCartItems, clearCart } from "../service/cartService"; // Các hàm API để lấy danh sách giỏ hàng và xóa giỏ hàng
import { createOrder } from "../service/orderService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useCart } from "../service/CartContext"; // Import context


const CheckoutScreen = ({ navigation }: { navigation: any }) => {
  const [selectedPayment, setSelectedPayment] = useState(null); // Trạng thái cho phương thức thanh toán
  const [cartItems, setCartItems] = useState<any[]>([]); // Trạng thái cho sản phẩm trong giỏ hàng
  const [totalCost, setTotalCost] = useState(0); // Tổng chi phí
  const { cartItems: contextCartItems, refreshCart } = useCart(); // Sử dụng context

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const items = await getCartItems(token);
        setCartItems(items);
        console.log("cart", items);

        // Tính tổng chi phí
        const total = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        setTotalCost(total);
      }
    };

    fetchCartItems();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handlePlaceOrder = async () => {
    if (selectedPayment) {
      const token = await AsyncStorage.getItem("token");
      const orderDetails = {
        total: totalCost,
        status: "pending",
        order_items: cartItems.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          size: item.size,
          color: item.color,
        })),
      };
  
      try {
        console.log("order", orderDetails);
        const response = await createOrder(orderDetails);
        console.log("Order response:", response); 
        Alert.alert("Thành công", "Đặt hàng thành công!");
  
        await clearCart(); // Xóa giỏ hàng sau khi thanh toán
        setCartItems([]); 
        setTotalCost(0); 
        refreshCart();
        navigation.navigate('Feed');
      } catch (error) {
        console.error("Error placing order:", error);
        Alert.alert("Lỗi", "Không thể đặt hàng. Vui lòng thử lại.");
      }
    } else {
      Alert.alert("Cảnh báo", "Vui lòng chọn phương thức thanh toán");
    }
  };
  

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.product.image_url }} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.itemTitle}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>
          {formatCurrency(item.product.price)}
        </Text>
        <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
        {item.size && <Text style={styles.itemSize}>Kích thước: {item.size}</Text>}
        {item.color && (
          <Text style={styles.itemColor}>Màu sắc: {item.color}</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Nút Quay Lại */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Thanh toán</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Sản phẩm trong Giỏ hàng */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
      />

      {/* Chọn phương thức thanh toán */}
      <View style={styles.paymentContainer}>
        <Text style={styles.sectionTitle}>Chọn phương thức thanh toán</Text>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedPayment === "Thẻ Tín Dụng" && styles.selectedOption,
          ]}
          onPress={() => setSelectedPayment("Thẻ Tín Dụng")}
        >
          <Icon name="credit-card" size={24} color="#fff" />
          <Text style={styles.paymentText}>Thẻ Tín Dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedPayment === "Thanh Toán Khi Nhận Hàng" && styles.selectedOption,
          ]}
          onPress={() => setSelectedPayment("Thanh Toán Khi Nhận Hàng")}
        >
          <Icon name="money" size={24} color="#fff" />
          <Text style={styles.paymentText}>Thanh Toán Khi Nhận Hàng</Text>
        </TouchableOpacity>
      </View>

      {/* Tổng chi phí */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Tổng chi phí: {formatCurrency(totalCost)}
        </Text>
      </View>

      {/* Nút Đặt Hàng */}
      <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
        <Text style={styles.orderButtonText}>Đặt Hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#555",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#888",
  },
  paymentContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    marginVertical: 5,
  },
  paymentText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  selectedOption: {
    backgroundColor: "#0056b3",
  },
  summaryContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  orderButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemSize: {
    fontSize: 14,
    color: "#555",
  },
  itemColor: {
    fontSize: 14,
    color: "#555",
  },
});
