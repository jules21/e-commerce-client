import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import Layout from '../Layout'

export default function Purchases() {
  const [purchasess, setPurchasess] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/my-purchases`, {
        headers: { Authorization: `Bearer ${localStorage?.getItem('token')}` },
      })
      .then((response) => {
        setPurchasess(response.data)
      })
      .catch((e) => {
        console.log(' err get > ', e?.response?.data)
      })
  }, [])

  return (
    <Layout>
      <Card>
        <Card.Header as="h5">Purchases History</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {purchasess?.length > 0 ? (
                <>
                  {purchasess?.map((purchases, i) => (
                    <tr key={i?.toString()}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={`${process.env.REACT_APP_SERVER_URL}` + purchases?.product?.image} style={{objectFit: "cover",height: "150px", width: "100%"}} />
                      </td>
                      <td>{purchases?.product?.name}</td>
                      <td>{purchases?.amount}</td>
                      <td>{purchases?.status}</td>
                      <td>{new Date(purchases?.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td>No Top ups found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Layout>
  )
}
