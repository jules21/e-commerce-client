import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Navbar() {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const NavStyles = {
      listStyle:'none',
      display:'flex',
      justifyContent:'space-between',
  }

  return (
    <>
      {(() => {
        if (localStorage.getItem('token')) {
          return (
            <ul style={NavStyles}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/topups">Topups</Link>
              </li>
              <li>
                <Link to="/purchases">Purchases</Link>
              </li>
              <li>
                <Link to="#" onClick={() => logout()}>
                  Logout
                </Link>
              </li>
            </ul>
          )
        } else {
          return (
            <ul style={NavStyles}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/Register">Register</Link>
              </li>
            </ul>
          )
        }
      })()}
    </>
  )
}

export default Navbar
