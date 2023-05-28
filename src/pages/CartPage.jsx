import { useContext, useEffect, useRef, useState } from 'react';
import './styles/CartPage.css';
import { CartContext } from "../hoc/CartProvider";
import OrderForm from '../components/OrderForm/OrderForm';

function CartPage() {
  const { cartItems, setCartItems } = useContext(CartContext || []);

  const [totalPrice, setTotalPrice] = useState([...cartItems].reduce((acc, cur) => {
    return acc + +cur.price * cur.amount
  }, 0).toFixed(2) || 0);
  
  useEffect(() => {
    setTotalPrice(() => [...cartItems].reduce((acc, cur) => {
      return acc + +cur.price * cur.amount
    }, 0).toFixed(2) || 0);
  }, [cartItems, totalPrice]);

  return (
    <div className='wrapper'>
      <OrderForm 
        totalPrice={totalPrice}       
      />
    </div>
  )
}

export default CartPage