import React from 'react'
import { Card } from 'react-bootstrap'
function ProductItem({product}) {
  return (
        // <div class="card" style="width: 18rem;">
        //     {/* <img class="card-img-top" src="..." alt="Card image cap"></img> */}
        //   <div class="card-body">
        //     <h5 class="card-title">{product.name}</h5>
        //     <p class="card-text">{product.description}</p>
        //     <a href="#" class="card-link">Buy Now</a>
        //     <a href="#" class="card-link">{product.price}</a>
        //   </div>
        // </div>

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`http://127.0.0.1:8000`+product.image} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
            {product.description}
            </Card.Text>
            <Card.Link href="#">Buy Now</Card.Link>
            <Card.Link href="#">${product.price} </Card.Link>
          </Card.Body>
        </Card>
  )
}

export default ProductItem