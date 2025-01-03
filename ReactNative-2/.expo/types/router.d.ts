/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/api/apiService` | `/screens/AddCardScreen ` | `/screens/CartScreen` | `/screens/CategoryProductsScreen` | `/screens/ChangePasswordScreen` | `/screens/CheckoutScreen ` | `/screens/DetailScreen` | `/screens/HomeScreen` | `/screens/IntroScreen` | `/screens/PaymentMethods` | `/screens/SignInScreen` | `/screens/SignUpScreen` | `/screens/hometabs/Cart` | `/screens/hometabs/Feed` | `/screens/hometabs/Notifications` | `/screens/hometabs/Profile` | `/screens/hometabs/Wishlist` | `/screens/hometabs/items/ItemCart` | `/screens/hometabs/items/ItemCategory` | `/screens/hometabs/items/ItemProduct` | `/screens/hometabs/profiletab/FirstRoute` | `/screens/hometabs/profiletab/SecondRoute` | `/screens/products/Product Detail` | `/service/CartContext` | `/service/cartService` | `/service/categoryService` | `/service/orderService` | `/service/productService` | `/service/userService` | `/service/wishlisstSevice` | `/service\WishlistContext `;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
