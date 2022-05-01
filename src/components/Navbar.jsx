import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <>
    <ul className='navbar'>
      <li>
        <Link to="/topups" >Topups</Link>
      </li>
      <li>
        <Link to="/purchases" >Purchases</Link></li>
        <li>
        <Link to="#" onClick={() => logout()}>Logout</Link></li>
    </ul>
    </>
  )
}

export default Navbar;
