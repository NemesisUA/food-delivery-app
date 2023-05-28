import { useState, useEffect, useContext } from 'react';
import './OrderForm.css';
import CartItem from '../CartItem/CartItem';
import Button from '../UI/Button/Button';

import { CartContext } from "../../hoc/CartProvider";
import { LocalStorageService, LS_KEYS } from "../../servises/localStorage";

function OrderForm({ totalPrice }) {
  const { cartItems, setCartItems } = useContext(CartContext || []);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const isCartEmpty = [...cartItems].map(item => item.amount)
        .reduce((a, b)=>  a + b, 0) ? false : true;
  setIsDisabled(() => (isCartEmpty))                                
  }, [cartItems])

  const [adress, setAdress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');

  const [error, setError] = useState(null);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {adress, email, phone, userName, totalPrice, cartItems };
    
    const response = await fetch('/api/products/cart', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setEmail('');
      setPhone('');
      setUserName('');   
      console.log('new orded added to database:', json);
    }

    setCartItems(() => []);
    LocalStorageService.remove(LS_KEYS.CART);
    LocalStorageService.set(LS_KEYS.CART, []);

    console.log('order: ', JSON.stringify(order))
  }

  return (
    <form onSubmit={handleSubmit} className='order-form'>
        <div className='flex-wrapper'>
          <div className='order-user'>
          <h3>User Info</h3>

          <label>adress:</label>
          <input 
            type="text" required placeholder='* required'
            onChange={(e) => setAdress(e.target.value)} 
            value={adress}
          />

          <label>email:</label>
          <input 
            type="text" required placeholder='* required'
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />

          <label>phone:</label>
          <input 
            type="text" required placeholder='* required'
            onChange={(e) => setPhone(e.target.value)} 
            value={phone}
          />

          <label>name:</label>
          <input 
            type="text" required placeholder='* required'
            onChange={(e) => setUserName(e.target.value)} 
            value={userName}
          />
          
          </div>

          <div className='order-products'>

            <div className="cart-container">{
              cartItems && cartItems.length >= 1 &&
              cartItems.sort((a, b) => a.id - b.id)
                .map(item => (                  
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                    />                  
                ))
            }
            </div>
          </div>
        </div>

        <div className='order-wrapper'>
          <Button disabled={isDisabled} type="submit">Submit Order</Button>
          <p className='total-price'>Total Price: <b>${totalPrice || 0}</b></p>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
  )
}

export default OrderForm