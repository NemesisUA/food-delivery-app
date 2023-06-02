import { createContext, useState } from "react";
import { LocalStorageService, LS_KEYS } from "../servises/localStorage";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [shopChosen, setShopChosen] = useState(
    LocalStorageService.get(LS_KEYS.CART)?.chopChosen || '' );
  const [totalPrice, setTotalPrice] = useState(
    LocalStorageService.get(LS_KEYS.CART)?.totalPrice || 0 );  
  const [cartItems, setCartItems] = useState(
    LocalStorageService.get(LS_KEYS.CART)?.cartItems || [] );

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      totalPrice,
      setTotalPrice,
      shopChosen,
      setShopChosen,
    }}>
      {children}
    </CartContext.Provider>
  )
}