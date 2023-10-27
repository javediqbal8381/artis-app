import React from 'react';

function SignInComponent() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign In
        </h2>
        <form className="mt-8" action="#" method="POST">
          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="mb-2 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="rounded-lg border shadow-sm py-2 px-3 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Your email address"
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
              className="rounded-lg border shadow-sm py-2 px-3 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 py-2 mt-4 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Forgot your password?{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Reset it
          </a>
        </p>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignInComponent;
