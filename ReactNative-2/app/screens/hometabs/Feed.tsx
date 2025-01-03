import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import ItemCategory from "./items/ItemCategory";
import ItemProduct from "./items/ItemProduct"; // Import ItemProduct
import { getAllProducts } from "../../service/productService";
import { getAllCategories } from "../../service/categoryService";

const Feed = ({ navigation }: { navigation: any }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(productData);
        setCategories(categoryData); // Gán danh mục vào state
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, 4);

  return (
    <ScrollView style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Icon
            name="search"
            size={20}
            color="#B88C66"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Tìm kiếm"
            placeholderTextColor="#B88C66"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="tune" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Banner bộ sưu tập mới */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Bộ sưu tập mới</Text>
        <Text style={styles.bannerDiscount}>
          Giảm giá 50% cho giao dịch đầu tiên
        </Text>
        <TouchableOpacity style={styles.shopButton}>
          <Text style={styles.shopButtonText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách danh mục */}
      <View style={styles.categoryContainer}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Danh mục</Text>
          <TouchableOpacity
            onPress={() => setShowAllCategories(!showAllCategories)}
          >
            <Text style={styles.seeAllText}>
              {showAllCategories ? "Thu gọn" : "Xem tất cả"}
            </Text>
          </TouchableOpacity>
        </View>
        <ItemCategory
          categories={displayedCategories}
          navigation={navigation}
          onPressCategory={(category) =>
            navigation.navigate("CategoryProductsScreen", {
              categoryId: category.id,
              categoryName: category.name,
            })
          }
        />
      </View>

      {/* Phần Flash Sale */}
      <View style={styles.flashSaleHeader}>
        <Text style={styles.sectionTitle}>Flash Sale</Text>
        <Text style={styles.countdown}>Đóng trong: 02:12:56</Text>
      </View>

      {/* Bộ lọc sản phẩm */}
      <View style={styles.filterContainer}>
        {["Tất cả", "Mới nhất", "Phổ biến", "Nam", "Nữ"].map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.filterItem, index === 1 && styles.activeFilter]}
          >
            <Text
              style={[
                styles.filterText,
                index === 1 && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách sản phẩm */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : (
        <ItemProduct products={filteredProducts} navigation={navigation} /> // Gọi ItemProduct
      )}
    </ScrollView>
  );
};

export default Feed;


// Các style giữ nguyên

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: "#7D4E3A",
    padding: 10,
    borderRadius: 50,
  },
  banner: {
    backgroundColor: "#F6E6D6",
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },
  bannerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bannerDiscount: {
    fontSize: 14,
    marginTop: 8,
  },
  shopButton: {
    backgroundColor: "#B88C66",
    padding: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  shopButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  categoryContainer: {
    marginVertical: 20,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
    color: "#7D4E3A",
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  filterItem: {
    padding: 8,
    borderRadius: 20,
    borderColor: "#B88C66",
    borderWidth: 1,
  },
  filterText: {
    color: "#B88C66",
  },
  activeFilter: {
    backgroundColor: "#B88C66",
  },
  activeFilterText: {
    color: "#FFF",
  },
  flashSaleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countdown: {
    fontSize: 14,
    color: "#555",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productName: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 14,
  },
  productPrice: {
    marginTop: 4,
    fontSize: 14,
    color: "#B88C66",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  productRating: {
    marginLeft: 4,
    fontSize: 12,
    color: "#555",
  },
});
