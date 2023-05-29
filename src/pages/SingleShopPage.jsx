import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Card } from "../components/UI/Card/Card";

const SingleShopPage = () => {
  const [products, setProducts] = useState(null)
  const shop = useParams().shop;
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://food-delivery-api-rirm.onrender.com/api/products/${shop}/`)
      const json = await response.json()

      if (response.ok) {
        setProducts(json)
      }
    }

    fetchProducts()
  }, [shop])

  return (
    <div className='wrapper flex-wrapper'>
      <ul className='shops-list'>
        <li className='selected'>{shop}</li>        
      </ul>
      
      <div className='products-list'>
        {products && products.length > 0 && products.map(product => (
          <li key={product._id} >
            <Card product={product} 
              buttonText={'add to Cart'}              
            />
          </li>
        ))}
      </div>
    </div>
  )
}

export default SingleShopPage