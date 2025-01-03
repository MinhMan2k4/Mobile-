import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProductDetail from "./screens/products/Product Detail";
import IntroScreen from "./screens/IntroScreen";
import CheckoutScreen from "./screens/CheckoutScreen ";
import PaymentMethods from "./screens/PaymentMethods";
import AddCardScreen from "./screens/AddCardScreen ";
import CategoryProductsScreen from "./screens/CategoryProductsScreen";
import { CartProvider } from "./service/CartContext";
import CartScreen from "./screens/CartScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import { WishlistProvider } from "./service/WishlistContext ";
const Stack = createNativeStackNavigator();

const MyApp = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <WishlistProvider>
          <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Intro">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Intro"
                component={IntroScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Payment"
                component={PaymentMethods}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Addcard"
                component={AddCardScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CategoryDetail"
                component={CategoryProductsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </WishlistProvider>
      </CartProvider>
    </GestureHandlerRootView>
  );
};

export default MyApp;
