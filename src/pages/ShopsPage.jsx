import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Card } from "../components/UI/Card/Card";

const ShopsPage = () => {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products')
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
        <li><Link to={'/shops/KFC'}>KFC</Link></li>
        <li><Link to={'/shops/McDonny'}>McDonny</Link></li>
        <li><Link to={'/shops/BurgerKing'}>BurgerKing</Link></li>
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