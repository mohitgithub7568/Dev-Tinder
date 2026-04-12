import React, { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addUser } from '../utils/userSlice.js'
import { BASE_URL } from '../utils/constants.js'
import { useNavigate } from 'react-router-dom'
 

const Body = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const fetchUserData=async()=>{
    if(user) return;
      try {
        const res = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
        dispatch(addUser(res.data));
      } catch (err) {
        if(err.response?.status === 401)
        navigate("/login");
        console.log(err.response?.data || err.message);
      }
  }
  useEffect(()=>{
    if(!user){
      fetchUserData();
    }
  },[])

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
