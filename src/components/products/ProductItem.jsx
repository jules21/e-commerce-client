import React from 'react'

function ProductItem({product}) {
  return (
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{product.name}</h5>
            <p class="card-text">{product.description}</p>
            <a href="#" class="card-link">Buy Now</a>
            <a href="#" class="card-link">{product.price}</a>
          </div>
        </div>
  )
}

export default ProductItem