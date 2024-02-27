import React, { useState } from 'react';
import {usersApi} from '../../redux/api/userApi';
import { Link, useNavigate } from 'react-router-dom';


function SignUpComponent() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobile: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const navigate = useNavigate();
const [signUp, {isLoading}] = usersApi.useSignUpMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(formData);
      console.log(response)
      if (response.error) {
        setError(response.error.data?.message);
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1 className="text-veryLarge text-db font-semibold text-center text-gray-800 mb-6">
          Artis-app
        </h1>
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create an Account
        </h2>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <label htmlFor="username" className="mb-2 text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="rounded-lg border shadow-sm py-2 px-3 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Your username"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="mb-2 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-lg border shadow-sm py-2 px-3 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Your email address"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="mobile" className="mb-2 text-sm text-gray-600">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="rounded-lg border shadow-sm py-2 px-3 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Your mobile number"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="password" className="mb-2 text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-lg border shadow-sm py-2 px-3 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Your password"
            />
          </div>
          <div className='w-full flex items-center justify-center '>
          <button
            type="submit"
            className=" normal_btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Ip...' : 'Sign Up'}
          </button>
          </div>
        </form>
        <p className="mt-12 text-xs text-center text-gray-600">
          Already have an account?{' '}
          <Link to={'/signin'} className="text-indigo-600 font-extrabold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpComponent;
