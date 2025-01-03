import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  // Hàm refreshCart để xóa các sản phẩm trong giỏ hàng
  const refreshCart = () => {
    setCartItems([]); // Đặt giỏ hàng về trống
  };
  return (
    <CartContext.Provider value={{ cartItems, setCartItems, refreshCart  }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
