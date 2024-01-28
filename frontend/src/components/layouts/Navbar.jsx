import React from 'react'
import { FaSearch, FaShoppingCart, FaAlignJustify } from "react-icons/fa";
import './layouts.css'
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const addedToCart = JSON.parse(document.cookie.split('=')[1]).map(i => Number(i));
  const navigate = useNavigate();

  const gotoCart = () => {
    navigate('/cart')
  }
  return (
    <div className='h-20 p-3 px-8 flex items-center justify-between'>
      <h3 className='text-mid'>
        MyArtisApp
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
        <div onClick={gotoCart} className="relative cursor-pointer hover:scale-110">
          <FaShoppingCart />
          {
            addedToCart.length > 0 &&
            <span className="absolute -top-3 -right-3 text-white text-verySmall bg-db 
            rounded-full px-[6px] text-xs">
              {addedToCart.length}
            </span>
          }
        </div>
        <FaSearch className='cursor-pointer hover:scale-110' />
      </div>

      <div className='flex sm:hidden'>
        <FaAlignJustify />
      </div>
    </div>
  )
}

export default Navbar