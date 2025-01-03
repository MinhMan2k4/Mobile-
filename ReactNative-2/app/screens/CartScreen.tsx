import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getCartItems,
  removeCartItem,
  updateCartItem,
} from "../service/cartService"; // Giả sử bạn có dịch vụ để lấy và xóa sản phẩm
import { useCart } from "../service/CartContext"; // Import context

const CartScreen = ({ navigation }: { navigation: any }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { cartItems: contextCartItems, refreshCart } = useCart(); // Sử dụng context

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const items = await getCartItems(token); // Gọi hàm để lấy danh sách sản phẩm trong giỏ hàng
        setCartItems(items);
        console.log(items); // Để kiểm tra giá trị của cartItems
      }
    };

    fetchCartItems();

    
  }, [contextCartItems]);

  const renderRightActions = (progress, dragX, itemId) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 1],
    });

    return (
      <TouchableOpacity onPress={() => handleConfirmDelete(itemId)}>
        <Animated.View
          style={[styles.deleteButton, { transform: [{ scale: trans }] }]}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color="#fff"
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const handleConfirmDelete = (itemId) => {
    setSelectedItem(itemId);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedItem !== null) {
      await removeCartItem(selectedItem); // Gọi hàm xóa sản phẩm
      setCartItems(cartItems.filter((item) => item.id !== selectedItem)); // Cập nhật trạng thái giỏ hàng
      setModalVisible(false);
    }
  };

  const calculateTotalCost = () => {
    const totalCost = cartItems.reduce((total, item) => {
      const itemPrice = Number(item.product.price) || 0; // Chuyển đổi thành số, mặc định là 0 nếu không hợp lệ
      const itemQuantity = item.quantity || 0; // Đảm bảo số lượng là số, mặc định là 0 nếu không hợp lệ
      return total + itemPrice * itemQuantity;
    }, 0);

    return formatCurrency(totalCost); // Gọi toFixed() trên tổng
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const updateQuantity = async (item, increment) => {
    const updatedQuantity = item.quantity + increment;

    // Chỉ cập nhật nếu số lượng lớn hơn 0
    if (updatedQuantity > 0) {
      try {
        // Gọi API để cập nhật số lượng sản phẩm
        const updatedItem = await updateCartItem(item.id, {
          product_id: item.product.id,
          quantity: updatedQuantity,
        });

        // Cập nhật lại trạng thái của giỏ hàng
        setCartItems(
          cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: updatedQuantity } : i
          )
        );
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "#F8F8F8", paddingHorizontal: 20 }}
    >
      {/* Header */}
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Giỏ Hàng Của Tôi</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Các Sản Phẩm Trong Giỏ Hàng */}
      <ScrollView style={{ marginTop: 20 }}>
        {cartItems.map((item) => (
          <Swipeable
            key={item.id}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, item.id)
            }
          >
            <View style={styles.cartItem}>
              <Image
                source={{ uri: item.product.image_url }}
                style={styles.image}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.itemTitle}>{item.product.name}</Text>
                <Text style={styles.itemSubtitle}>Kích cỡ: {item.size}</Text> 
                <Text style={styles.itemSubtitle}>Màu sắc: {item.color}</Text>
                <Text style={styles.itemPrice}>{formatCurrency(item.product.price)}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item, -1)}
                >
                  <MaterialCommunityIcons name="minus" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item, 1)}
                >
                  <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </Swipeable>
        ))}
      </ScrollView>

      <View style={styles.summaryContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Tổng Chi Phí</Text>
          <Text style={styles.totalText}>{calculateTotalCost()}</Text>
        </View>
      </View>

      {/* Tiến Tới Thanh Toán */}
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate("Checkout")}
      >
        <Text style={styles.checkoutButtonText}>Tiến Tới Thanh Toán</Text>
      </TouchableOpacity>

      {/* Modal Xác Nhận Xóa */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xóa Khỏi Giỏ Hàng?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmButtonText}>Đồng Ý, Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
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
  itemSubtitle: {
    fontSize: 14,
    color: "#888",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "#8B4513",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  promoCodeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  promoCodeInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  applyButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  applyButtonText: {
    color: "#fff",
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
  },
  summaryText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
  },
  confirmButtonText: {
    color: "#fff",
  },
});
