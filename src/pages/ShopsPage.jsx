import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import { Card } from "../components/UI/Card/Card";
import { CartContext } from "../hoc/CartProvider";

const ShopsPage = () => {
  const [products, setProducts] = useState(null)
  const  { shopChosen }= useContext(CartContext)
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://food-delivery-api-rirm.onrender.com/api/products')
      const json = await response.json()
      
      if (response.ok) {
        setProducts(json)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className='wrapper flex-wrapper'>
      <ul className='shops-list'>
        <li className={shopChosen === 'KFC' ? 'selected' : ''}>
          <Link to={'/shops/KFC'}>KFC</Link>
        </li>
        <li className={shopChosen === 'McDonny' ? 'selected' : ''}>
          <Link to={'/shops/McDonny'}>McDonny</Link>
        </li>
        <li className={shopChosen === 'BurgerKing' ? 'selected' : ''}>
          <Link to={'/shops/BurgerKing'}>BurgerKing</Link>
        </li>
      </ul>
      
      <div className='products-list'>
        {products && products.length > 0 && products.map(product => (
          <Link key={product._id} to={`/shops/${product.shop}`} >
            <Card product={product} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ShopsPage