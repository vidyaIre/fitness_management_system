import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../apiUtils/userApi';
import { useEffect } from 'react';
import {toast} from "react-toastify";

const Login = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem("@token");
    const user = localStorage.getItem("@user");
    if (token && user) {
        navigate("/Pages/Users");
        toast.info("you are already logged in");
        return;
    } else{
        localStorage.removeItem("@token");
        localStorage.removeItem("@user");
        toast.info("session expired, please login again");
        navigate("/Pages/Login");
    }
    
}, 
//eslint-disable-next-line 
[]);


const isValid = () => {
    if(email && password && email.trim().length > 0 && password.trim().length > 0){
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }else {
        toast.error("please enter the email and password");
        return false;   
    }
}

const handleSubmit = async (event) => {
    event.preventDefault();
    email.trim();
    password.trim();
    if(isValid()){
        console.log("email from login:", email);
        console.log("password from login:", password);
        try {
            const response = await loginUser({email:email, password:password});
            console.log("response is:", response);
            if(response?.success){
                toast.success("login successfully");
                localStorage.setItem("@token", JSON.stringify(response?.token));
                localStorage.setItem("@user", JSON.stringify(response?.user));
                navigate("/Pages/Users");
            } else {
                toast.info("login failed, please check your credentials");
                navigate("/Pages/Login");
            }
        }
        catch (error) {
            console.error("Error during login:", error);
            toast.info("login failed, please check your credentials");
            navigate("/Pages/Login");
        }
       
    } else {
        toast.error("please enter the email and password");
    }
}



    return (
        // <div>
        //     <h2>Login</h2>
        //     <form>
        //         <label htmlFor="email">Email:</label>
        //         <input
        //          type="email" 
        //          value={email}
        //          placeholder='enter the Email'
        //          onChange={(e) => setEmail(e.target.value)}/>

               
        //         <label htmlFor="password">Password:</label>
        //         <input 
        //         type="password"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //          placeholder='enter the password'/>
        //         <button type="submit"
        //         onClick={handleSubmit}
        //         >Login</button>    
        //     </form>
        // </div>

        <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>

            {/* Register Link */}
            <p className="text-center mt-3">
              Don’t have an account? <a href="/Pages/Register" className="text-decoration-none">Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default Login;