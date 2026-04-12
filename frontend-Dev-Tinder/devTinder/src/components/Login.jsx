import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { addUser } from '../utils/userSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'


const Login = () => {
    const user = useSelector((store) => store.user?.user);

    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");

    const dispatch=useDispatch();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/" />;
    }

    const handleLoginClick=async ()=>{
        try {
            const res = await axios.post(
                BASE_URL+"/login", {
                email: emailId,
                password
            },{withCredentials:true});
            //dispatch the user data to the store
            dispatch(addUser(res.data));
            //navigate to the home page
            navigate("/");

        } catch (err) {
            setError(err.response?.data || "An error occurred while logging in.");
            console.log(err.response?.data || err.message);
        }
    }
    return (
        <div className='p-10 flex items-center justify-center'>
            <div className="card bg-blue-900 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login Here!</h2>
                    <fieldset className="fieldset gap-0 ">
                        <legend className="fieldset-legend">Email ID</legend>
                        <input type="text" className="input" 
                        value={emailId}
                        onChange={(e)=>setEmailId(e.target.value)}
                        placeholder="Enter your email id" />
                    </fieldset>
                    <fieldset className="fieldset gap-0">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="password" className="input"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Enter your password" />
                    </fieldset>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <div className="card-actions justify-center mt-2">
                        <button className="btn btn-primary " onClick={handleLoginClick}> Login</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
