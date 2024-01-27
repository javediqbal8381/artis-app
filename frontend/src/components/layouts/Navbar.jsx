import React from 'react'
import { FaSearch, FaShoppingCart, FaAlignJustify } from "react-icons/fa";
import './layouts.css'
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className='h-20 p-3 px-8 flex items-center justify-between'>
      <h3 className='text-mid'>
        Creator
      </h3>
      <ul className='hidden sm:flex justify-between items-center w-[60%]'>
        <li className='nav_link'>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav_link'>
          <Link to='/products'>Products</Link>
        </li>
        <li className='nav_link'>
          <Link to='/shops'>Shops</Link>
        </li>
        <li className='nav_link'>

          <Link to='/about'>About</Link>
        </li>
      </ul>
      <div className='hidden sm:flex gap-6'>
        <FaShoppingCart />
        <FaSearch />
      </div>

      <div className='flex sm:hidden'>
        <FaAlignJustify />
      </div>
    </div>
  )
}

export default Navbar