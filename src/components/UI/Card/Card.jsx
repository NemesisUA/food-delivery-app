import { useContext, useEffect } from 'react'
import Button from '../Button/Button'
import './Card.css'

import { LocalStorageService, LS_KEYS } from "../../../servises/localStorage";
import { CartContext } from "../../../hoc/CartProvider";


const Card = ({ product, buttonText = false, className}) => {
  const { 
    cartItems,
    setCartItems,
    totalPrice,
    setTotalPrice,
    shopChosen,
    setShopChosen, } = useContext(CartContext);

  const handleAddToCart = () => {   
    if ( !shopChosen ) {
      setShopChosen(product.shop);
    }
    
    setCartItems((prevstate) => ([...prevstate.filter(el => el.id !== product._id), {
      id: product._id,
      shop: product.shop,
      name: product.name,
      price: product.price,
      image: product.image,
      amount: 1
    }]));
    
    setTotalPrice( (+totalPrice + +product.price).toFixed(2) );
  }

  useEffect(() => {
    LocalStorageService.set(LS_KEYS.CART, {
      shopChosen: shopChosen,
      totalPrice: totalPrice,
      cartItems: cartItems,
    }); 
  }, [shopChosen, totalPrice, cartItems])

  return (
    <div className={`card ${shopChosen && product.shop !== shopChosen && 'unchoosable'}`}>
      <h2 className='card__title' >{product.name}</h2>
      <p className='card__shop'>{product.shop}</p>
      <img className='card__image' src={product.image} alt="food" />
      <div className='card__buy'>
        <h4 className='card__price'>{`price - $${product.price}`}</h4>
        { buttonText && (
          <Button 
            children={buttonText} 
            className='styled-btn transparent'
            onClick={handleAddToCart} 
          />
        )}
      </div>
      
    </div>
  )
}

export { Card }