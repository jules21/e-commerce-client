import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem'
import axios from 'axios';
import Layout from '../Layout';
import {server} from '../../config/constants'


function Product() {

  const [products,setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${server}/api/products`)
    .then(response => {
        setProducts(response.data)
    })
    .catch(error => console.error(error));
}, []);

  return (
    <Layout>
      
        {products.map(product => (
            <ProductItem key={product.id} product={product} />
        ))}
    </Layout>
  )
}

export default Product;