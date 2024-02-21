import React, { useState } from 'react';
import { usersApi } from '../../redux/api/userApi';
import { Link, useNavigate } from 'react-router-dom';

function SignInComponent() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const navigate = useNavigate()
  const [signIn, { isError, isLoading, data }] = usersApi.useSignInMutation();
  
  if(data) {
    localStorage.setItem('token',data.token);
    localStorage.setItem('userId',data.userId)
    navigate('/')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn(formData).unwrap();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="text-veryLarge font-semibold text-center text-gray-800 mb-6">
          Artis-app
        </h1>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <label
              htmlFor="email"
              className="text-sm text-gray-600 mb-2 transition duration-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-lg border shadow-sm py-2 px-3 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300"
              placeholder="Your email address"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label
              htmlFor="password"
              className="text-sm text-gray-600 mb-2 transition duration-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-lg border shadow-sm py-2 px-3 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-indigo-500 hover:bg-indigo-600 py-2 mt-4 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Forgot your password?{' '}
          <a href="#" className="text-indigo-600 hover:underline transition duration-300">
            Reset it
          </a>
        </p>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to={'/signup'} className="text-indigo-600 hover:underline transition duration-300">
            Sign Up
          </Link>
        </p>
        {isError && <p className="text-red-500 text-sm mt-4">{isError}</p>}
      </div>
    </div>
  );
}

export default SignInComponent;
