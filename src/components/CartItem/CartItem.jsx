import { useContext, useEffect, useState } from 'react';
import './CartItem.css';
import { LocalStorageService, LS_KEYS } from "../../servises/localStorage";
import { CartContext } from "../../hoc/CartProvider";

function CartItem({ name, price, image, id}) {
  const { cartItems, setCartItems } = useContext(CartContext);
  
  const storageAmount = LocalStorageService.get(LS_KEYS.CART) ?
  [...LocalStorageService.get(LS_KEYS.CART)]
      .filter(el => el.id === id)
      .map(el => el.amount)[0]
  : 1;

const [amount, setAmount] = useState(storageAmount || 1);        
  
  const handleDeleteCartItem = (e) => {
    e.preventDefault();     
    setCartItems(prevstate => ([...prevstate.filter(el => el.id !== id)]));    
  }

  useEffect(() => {
    LocalStorageService.set(LS_KEYS.CART, cartItems);
  }, [cartItems]);

  const handleAmount = (e) => {    
    setAmount(prev => e.target.value); 
    
    setCartItems((prevstate) => ([...prevstate.filter(el => el.id !== id), {
      id: id,
      name: name,
      price: price,
      image: image,
      amount: amount
  }]));
  }

  useEffect(() => {
    LocalStorageService.set(LS_KEYS.CART,cartItems )
  }, [cartItems])

  return (
    <div className='cart-item'>
      <div className='cart-item__img'>
        <img src={image} alt={name} width={100} />
      </div>

      <div className='cart-item__info'>
        <h3 className='cart-item__info'>{name}</h3>
        <p className='cart-item__info'>price ${price}</p>

        <input 
          className='cart-item__input' 
          type="number" 
          placeholder={1}
          min={1} 
          value={amount}
          onChange={handleAmount}
        />

        <span className='cart-item__total'>sum: ${amount * price}</span>
      </div>

      <button         
        className='deleteCartItem'
        onClick={handleDeleteCartItem}
      >
        <i className="fa-solid fa-close"></i>
      </button>
    </div>
  )
}

export default CartItem