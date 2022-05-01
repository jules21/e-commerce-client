import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import { server } from '../../config/constants'
import Layout from '../Layout'

export default function Purchases() {
  const [purchasess, setPurchasess] = useState([])

  useEffect(() => {
    axios
      .get(`${server}/api/my-purchases`, {
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
                <th>Product ID</th>
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
                      <td>{purchases?.product_id}</td>
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
