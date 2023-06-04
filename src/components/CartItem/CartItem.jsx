import { useContext, useEffect, useState } from 'react';
import './CartItem.css';
import { LocalStorageService, LS_KEYS } from "../../servises/localStorage";
import { CartContext } from "../../hoc/CartProvider";

function CartItem({name, price, image, id, amount }) {
  const { 
    cartItems,
    setCartItems,
    totalPrice,   
    shopChosen,
    setShopChosen
  } = useContext(CartContext);
  
  const [count, setCount] = useState(+amount);
  
  const handleDeleteCartItem = (e) => {
    e.preventDefault();
    
    if ( cartItems.length === 1) {
      setShopChosen('');
    }
    setCartItems(prevstate => ([...prevstate.filter(el => el.id !== id)]));     
  }

    const handleAmount = (e) => {    
    setCount(() => +e.target.value);
    
    setCartItems((prevstate) => ([...prevstate.filter(el => el.id !== id), {
      id: id,
      name: name,
      price: price,
      image: image,
      amount: count
    }].sort((a, b)=> a.id - b.id)));
  }

  useEffect(() => {
    LocalStorageService.set(LS_KEYS.CART, {
      "shopChosen": shopChosen,
      "totalPrice": totalPrice,
      "cartItems": cartItems,
    });
  }, [cartItems, totalPrice, shopChosen]);

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