import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { addUser } from '../utils/userSlice'
import { Navigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'



const Login = () => {
    const user = useSelector((store) => store.user?.user);

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [isloggingIn,setIsLoggingIn]=useState(false);
    const [redirectPath, setRedirectPath] = useState(null);


    const dispatch=useDispatch();

    if (redirectPath) {
        return <Navigate to={redirectPath} replace />;
    }

    if (user) {
        return <Navigate to="/" replace />;
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
            setRedirectPath("/");

        } catch (err) {
            setError(err.response?.data || "An error occurred while logging in.");
            console.log(err.response?.data || err.message);
        }
    }

    const handleSignupClick=async()=>{
        try {
            const res =
            await axios.post(
                BASE_URL+"/signup", {
                firstName,
                lastName,
                email: emailId,
                password
            },{withCredentials:true});

            
            dispatch(addUser(res.data)); 
            setRedirectPath("/profile"); 

        } catch (err) {
            setError(err.response?.data || "An error occurred while signing up.");
            console.log(err.response?.data || err.message);
        }
    }


    return (
        <div className='p-10 flex items-center justify-center'>
            <div className="card bg-blue-900 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isloggingIn ? "Login Here!" : "Sign Up Here!"}</h2>
                    {!isloggingIn && (
                        <>
                        <fieldset className="fieldset gap-0 ">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" 
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                            placeholder="Enter your first name" />
                    </fieldset>
                    <fieldset className="fieldset gap-0 ">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" className="input" 
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        placeholder="Enter your last name" />
                    </fieldset>
                    </>)}
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
                    <div className="card-actions justify-center mt-2" onClick={isloggingIn ? handleLoginClick : handleSignupClick}>
                        <button className="btn btn-primary " > {isloggingIn ? "Login" : "Sign Up"}</button>
                    </div>
                    <p className="text-center text-sm mt-4">
                        {isloggingIn ? "Don't have an account?" : "Already have an account?"}
                        <button className="btn btn-link btn-sm" onClick={()=>setIsLoggingIn(!isloggingIn)}>
                            {isloggingIn ? "Sign Up" : "Login"}
                        </button>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Login
