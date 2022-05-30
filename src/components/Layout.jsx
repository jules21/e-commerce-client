import React from 'react'
import Navbar from './Navbar'

function Layout({children}) {

  const layoutSyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
  return (
      <>
        <Navbar />
        <div style={layoutSyles}>
        {children}
        </div>
      </>
  )
}

export default Layout