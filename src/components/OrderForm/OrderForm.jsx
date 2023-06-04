import { useState, useEffect, useContext } from 'react';
import './OrderForm.css';
import CartItem from '../CartItem/CartItem';
import Button from '../UI/Button/Button';

import { CartContext } from "../../hoc/CartProvider";
import { LocalStorageService, LS_KEYS } from "../../servises/localStorage";

function OrderForm() {
  const {
    cartItems,
    setCartItems,
    totalPrice,
    setTotalPrice,
    shopChosen,
    } = useContext(CartContext);
  const [isDisabled, setIsDisabled] = useState(true);
  
  
  // const [totalPrice, setTotalPrice] = useState([...cartItems].reduce((acc, cur) => {
  //   return acc + +cur.price * cur.amount
  // }, 0).toFixed(2) || 0);

  useEffect(() => {
    setTotalPrice(() => [...cartItems].reduce((acc, cur) => {
      return acc + +cur.price * cur.amount
    }, 0).toFixed(2) || 0);
  }, [cartItems, totalPrice, setTotalPrice]);
  
  useEffect(() => {
    const isCartEmpty = [...cartItems].map(item => item.amount)
      .reduce((a, b) => a + b, 0) ? false : true;
    setIsDisabled(() => (isCartEmpty))
  }, [cartItems])

  const [adress, setAdress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');

  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = { adress, email, phone, userName, shopChosen, totalPrice, cartItems };

    const response = await fetch('https://food-delivery-api-rirm.onrender.com/api/products/cart', {
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
      setAdress('')
      setEmail('');
      setPhone('');
      setUserName('');
      console.log('new orded added to database:', json);
    }

    setCartItems(() => []);
    LocalStorageService.remove(LS_KEYS.CART);
    LocalStorageService.set(LS_KEYS.CART, {
      "chopChosen": '',
      "totalPrice": 0,
      "cartItems": [],
    });

    console.log('order: ', JSON.stringify(order))
  }

  return (
    <form onSubmit={handleSubmit} className='order-form'>
      <div className='flex-wrapper'>
        <div className='order-user'>
          <h3>User Info</h3>

          <label>adress:
            <input
              type="text" required placeholder='* required'
              onChange={(e) => setAdress(e.target.value)}
              value={adress}
            />
          </label>

          <label>email:
            <input
              type="text" required placeholder='* required'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>

          <label>phone:
            <input
              type="text" required placeholder='* required'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </label>

          <label>name:
            <input
              type="text" required placeholder='* required'
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          </label>

        </div>

        <div className='order-products'>

          <div className="cart-container">{
            cartItems && cartItems.length >= 1 &&
            cartItems.sort((a, b)=> a.id.localeCompare(b.id))
              .map(item => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  amount={item.amount}
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