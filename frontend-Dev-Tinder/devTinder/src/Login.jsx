import React, { useState } from 'react'
import axios from "axios"
const Login = () => {
    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");

    const handleLoginClick=async ()=>{
        try {
            const res = await axios.post("http://localhost:4000/login", {
                email: emailId,
                password
            },{withCredentials:true});
            console.log(res.data);
        } catch (err) {
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
                    <div className="card-actions justify-center mt-2">
                        <button className="btn btn-primary " onClick={handleLoginClick}> Login</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
