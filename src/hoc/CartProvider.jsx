import { createContext, useState } from "react";
import { LocalStorageService, LS_KEYS } from "../servises/localStorage";

export const CartContext = createContext([], () => { });

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(LocalStorageService.get(LS_KEYS.CART) || []);  

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  )
}