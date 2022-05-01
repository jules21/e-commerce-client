import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Toast } from 'react-bootstrap'
function ProductItem({ product }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const toggleShow = () => setShow(!show);

  const buyItem = () => {
    axios
      .get('http://127.0.0.1:8000/api/products/1/buy', {
        headers: { Authorization: `Bearer ${localStorage?.getItem('token')}` },
      })
      .then((response) => {
        setMessage("Succesuful");
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
        <Card.Img variant="top" src={`http://127.0.0.1:8000` + product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Link onClick={() => buyItem()}>Buy Now</Card.Link>
          <Card.Link href="#">${product.price} </Card.Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProductItem
