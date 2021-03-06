import React from 'react'
import axios from 'axios'
import Layout from '../Layout'
import {server} from '../../config/constants'
import { Link } from 'react-router-dom'
import {Spinner, Button} from "react-bootstrap";

function Login() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    //show spinner
    const spinner = document.getElementById('spinner')
    spinner.style.display = 'inline-block'
    //send request to server
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if(response?.data?.token) {
          localStorage.setItem('token', response.data.token)
          window.location.href = '/';
        }
      }).catch((e) => {
        console.log(" err > ", e?.response?.data);
        window.alert(e?.response?.data?.error);
      })
  }
  return (
    <Layout style={{alignItems:"center", justifyContent:"center"}}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label> <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <label htmlFor="password">Password</label> <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /> <br />
        <Button type="submit" variant="primary">
          <Spinner style={{"display":"none"}}
              id='spinner'
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"></Spinner>
          Login</Button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </Layout>
  )
}

export default Login
