import React, { useState } from 'react'
import axios from 'axios'
import Layout from '../Layout'
import {server} from '../../config/constants'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${server}/api/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {
        if(response?.data?.token) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('accountId', response.data.accountId)
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
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </Layout>
  )
}

export default Register