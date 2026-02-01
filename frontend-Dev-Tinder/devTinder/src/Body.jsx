import React from 'react'
import Navbar from './Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
const Body = () => {
  return (
    <div>
        <Navbar />
        {/* Nested routes will render here */}
        <Outlet/>
        
        <Footer />
    </div>
  )
}

export default Body
