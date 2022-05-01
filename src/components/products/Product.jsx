import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem'
import axios from 'axios';


function Product() {

  const [products,setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products')
    .then(response => {
        setProducts(response.data)
    })
    .catch(error => console.error(error));
}, []);

  return (
    <div>
        {products.map(product => (
            <ProductItem key={product.id} product={product} />
        ))}
    </div>
  )
}

export default Product;