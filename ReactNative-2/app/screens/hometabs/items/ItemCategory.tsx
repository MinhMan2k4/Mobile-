import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ItemCategory = ({ categories, navigation, onPressCategory }) => {
  return (
    <View style={styles.categories}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          onPress={() => onPressCategory(category)}
          style={styles.categoryItem}
          onPress={() =>
            navigation.navigate("CategoryDetail", { categoryId: category.id })
          }
        >
          <View style={styles.categoryIconWrapper}>
            {category.image_url ? (
              <Image
                source={{ uri: category.image_url }}
                style={styles.categoryImage}
              />
            ) : (
              <Icon name="checkroom" size={30} color="#7D4E3A" />
            )}
          </View>
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ItemCategory;

const styles = StyleSheet.create({
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    alignItems: "center",
    margin: 8,
  },
  categoryIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryText: {
    fontSize: 14,
    color: "#555",
  },
});
