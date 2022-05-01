import axios from 'axios'
import React, { useState } from 'react'
import { Card, Toast } from 'react-bootstrap'
import { server } from '../../config/constants';

function ProductItem({ product }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const toggleShow = () => setShow(!show);

  const buyItem = () => {
    const token = localStorage.getItem('token');
    //redirect to login if no token
    if (!token) {
      window.location.href = '/login';
    }
    axios
      .get(`${server}/api/products/${product?.id}/buy`, {
        headers: { Authorization: `Bearer ${localStorage?.getItem('token')}` },
      })
      .then((response) => {
        setMessage("Product Bought Successfully!");
        setShow(true);
      })
      .catch((e) => {
        setError(e?.response?.data?.error)
        setShow(true);
      })
  }

  return (
    <>
    <Toast show={show} onClose={toggleShow}>
        <Toast.Header>{error || message}</Toast.Header>
      </Toast>

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`${server}` + product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Link onClick={() => buyItem()}>Buy Now</Card.Link>
          <Card.Link href="#">
            <span style={{textDecoration:'line-through', paddingRight:'1.3rem'}}>${product.price}</span>
             ${(1 - (product.discount/100)) * product.price} </Card.Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProductItem
