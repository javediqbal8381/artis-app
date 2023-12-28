import { useState } from 'react'
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import Navbar from './components/layouts/Navbar';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/signup",
      element: <SignUp/>,
    },
    {
      path: "signin",
      element: <SignIn/>,
    },
    {
      path: "/about",
      element: <About/>,
    },
    {
      path: "/contact",
      element: <Contact/>,
    },
  ]);

  return (
    <>
      <Navbar/>
      <RouterProvider router={router} />
      <Footer/>
    </>
  )
}

export default App
