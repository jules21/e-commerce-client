import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem'
import axios from 'axios';
import Layout from '../Layout';


function Product() {

  const [products,setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/products`)
    .then(response => {
        setProducts(response.data)
    })
    .catch(error => console.error(error));
}, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Products</h1>
          </div>
        </div>
        <div className="row">
            {products.map(product => (
                <div className="col-md-4 col-lg-3 col-sm-6 my-2" key={product.id}>
                    <ProductItem product={product} />
                </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default Product;