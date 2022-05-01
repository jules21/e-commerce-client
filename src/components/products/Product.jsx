import React from 'react'
import ProductItem from './ProductItem'


function Product({products}) {
  return (
    <div>
        {products.map(product => (
            <ProductItem key={product.id} product={product} />
        ))}
    </div>
  )
}

export default Product