import axios from 'axios'
import React, { useState } from 'react'
import {Card, Spinner, Toast} from 'react-bootstrap'

function ProductItem({ product }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const toggleShow = () => setShow(!show);

  const buyItem = () => {
    //show spinner
    const spinner = document.getElementById('spinner-'+product.id);
    spinner.style.display = 'inline-block'
    const token = localStorage.getItem('token');
    //redirect to login if no token
    if (!token) {
      window.location.href = '/login';
    }
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/products/${product?.id}/buy`, {
        headers: { Authorization: `Bearer ${localStorage?.getItem('token')}` },
      })
      .then((response) => {
        setMessage("Product Bought Successfully!");
        setShow(true);
        spinner.style.display = 'none'
      })
      .catch((e) => {
        setError(e?.response?.data?.error)
        setShow(true);
        spinner.style.display = 'none'
      })
  }

  return (
    <>
    <Toast show={show} onClose={toggleShow}>
        <Toast.Header>{error || message}</Toast.Header>
      </Toast>

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`${process.env.REACT_APP_SERVER_URL}` + product.image} className="card-img-top" style={{objectFit: "cover",height: "150px", width: "100%"}} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Link onClick={() => buyItem()}>
            <Spinner style={{"display":"none"}}
                     id={`spinner-${product.id}`}
                     as="span"
                     animation="border"
                     size="sm"
                     role="status"
                     aria-hidden="true"></Spinner>
            Buy Now</Card.Link>
          <Card.Link href="#">
            <span style={{textDecoration:'line-through', paddingRight:'1.3rem'}}>${product.price}</span>
             ${(1 - (product.discount/100)) * product.price} </Card.Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProductItem
