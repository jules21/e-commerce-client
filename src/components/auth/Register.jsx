import React, { useState } from 'react'
import axios from 'axios'
import Layout from '../Layout'
import { Link } from 'react-router-dom'
import {Spinner,Button} from "react-bootstrap";

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    //show spinner
    const spinner = document.getElementById('spinner')
    spinner.style.display = 'inline-block'
    //send request to server
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {
        if(response?.data?.token) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('accountId', response.data.user.accountId)
          window.location.href = '/';
        }
      }).catch((e) => {
        console.log(" err > ", e?.response?.data);
        window.alert(e?.response?.data?.message);
      })
  }
  return (
    <Layout>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name: </label><br />
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />
        <label htmlFor="">Email: </label><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <label htmlFor="">Password: </label><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <label htmlFor="passwordConfirmation">Confirm Password</label> <br />
          <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <br /><br />
        <Button type="submit" variant="primary">
          <Spinner style={{"display":"none"}}
                   id='spinner'
                   as="span"
                   animation="border"
                   size="sm"
                   role="status"
                   aria-hidden="true"></Spinner>
          Register</Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </Layout>
  )
}

export default Register