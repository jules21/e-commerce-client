import React from 'react'
import axios from 'axios'
import Layout from '../Layout'
import {server} from '../../config/constants'

function Login() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${server}/api/login`, {
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
      })
  }
  return (
    <Layout>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </Layout>
  )
}

export default Login
