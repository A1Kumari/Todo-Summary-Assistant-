import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js"
import TokenContext from '../context/TokenContext.js';

function Login() {
    const [formData, setFormData] = useState({});
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/login", formData)
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token })
            userDispatch({ type: "SET_USER", payload: result.data.user })
            localStorage.setItem("authToken",JSON.stringify(result.data.token))
        } catch (error) {
            console.log(error);
            setError({ message: error.response.data.message })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    return (
        <div>
  {userToken && <Navigate to="/" />}

  <section className="login-container min-h-screen flex items-center justify-center bg-blue-50">
    <div className="w-full max-w-6xl px-6 py-12 bg-white rounded-lg shadow-lg flex items-center justify-center">
      
      {/* Left Image */}
      <div className="hidden md:block md:w-5/12 lg:w-4/12">
        <img 
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
          alt="Sample" 
          className="w-full max-w-xs mx-auto"
        />
      </div>

      {/* Login Form */}
      <div className="w-full md:w-7/12 lg:w-6/12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login to Your Account</h2>

        {error && (
          <div className="mb-4 text-red-800 bg-red-200 border border-red-400 p-3 rounded text-center">
            {error}
          </div>
        )}

        <form method="post" onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Optional extra links */}
        <div className="text-sm text-center mt-4">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </div>
      </div>
    </div>
  </section>
</div>

    );
}

export default Login;
