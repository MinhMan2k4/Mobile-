import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure for the Wishlist context
interface WishlistContextType {
  wishlistItems: any[];
  setWishlistItems: React.Dispatch<React.SetStateAction<any[]>>;
  addToWishlist: (item: any) => void;
  removeFromWishlist: (itemId: number) => void;
  clearWishlist: () => void;
}

// Create the context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  // Function to add an item to the wishlist
  const addToWishlist = (item: any) => {
    setWishlistItems((prevItems) => [...prevItems, item]);
  };

  // Function to remove an item from the wishlist by ID
  const removeFromWishlist = (itemId: number) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  // Function to clear all items from the wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, setWishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook for accessing the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
