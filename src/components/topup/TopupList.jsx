import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Button, Card, Form, Spinner, Table} from 'react-bootstrap'
import Layout from '../Layout'
import './style.css'

export default function TopupList() {
  const [topups, setTopups] = useState([])
  const [amount, setAmount] = useState('')
  let total = 0;
  const accountId = localStorage.getItem('accountId');


  useEffect(() => {
      getTopups();
  }, [])




  const getTopups = () => {
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/accounts/${accountId}/topups`, {
      headers: { Authorization: `Bearer ${localStorage?.getItem('token')}` },
  })
    .then((response) => {
      setTopups(response.data)
    })
    .catch((e) => {
      console.log(' err get > ', e?.response?.data)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //show spinner
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'inline-block';
    //send request
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/accounts/${accountId}/topups`, { amount }, {
        headers: { Authorization: `Bearer ${localStorage?.getItem('token')}` },
    })
      .then((response) => {
        console.log(response.data)
        //hide spinner
        spinner.style.display = 'none';
        setTopups([
            ...topups,
            response?.data
        ])
      }).catch((e) => {
        //hide spinner
        spinner.style.display = 'none';
        console.log(" err post > ", e?.response?.data);
        window.alert(e?.response?.data?.message);

      })
  }

  return (
    <Layout>
      <Card>
        <Card.Header as="h5">Top up History</Card.Header>
        <Card.Body>
          <div className="my-2">
            My balance: ${topups[0]?.account?.amount ?? 0}
          </div>
          <div className="topupField">
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e?.target?.value)}
              required={true}
            />
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              <Spinner style={{"display":"none", marginBottom:"1rem"}}
                       id='spinner'
                       as="span"
                       animation="border"
                       size="sm"
                       role="status"
                       aria-hidden="true"></Spinner>
              Topup
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Account</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {topups?.length > 0 ? (
                  <>
                {topups?.map((topup, i) => {
                    total += +topup?.amount;
                    return (
                        <tr key={i?.toString()}>
                          <td>{i + 1}</td>
                          <td>{topup?.account_id}</td>
                          <td>${topup?.amount}</td>
                          <td>{new Date(topup?.created_at).toLocaleString()}</td>
                        </tr>
                      )
                    
                    })}
                </>
              ) : (
                <tr>
                  <td>No Top ups found</td>
                </tr>
              )}
              {topups?.length > 0 ? <tr>
                  <td>#</td>
                  <td>Total</td>
                  <td colSpan={2}>${total}</td>
              </tr> : null}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Layout>
  )
}
