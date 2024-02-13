import React from 'react'
import { FaSearch, FaShoppingCart, FaAlignJustify } from "react-icons/fa";
import './layouts.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart } from '../../redux/slices/cartSlice';


const Navbar = () => {
  const cartItems = useSelector(state => state.cart.cartItems)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const cartInCokkie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('cartItems='));
    if (cartInCokkie) {
      const cartItems = JSON.parse(cartInCokkie.split("=")[1])
      cartItems.forEach(element => {
        dispatch(addtoCart(element));
      });
    }
  }, [])
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
            cartItems.length > 0 &&
            <span className="absolute -top-3 -right-3 text-white text-verySmall bg-db 
            rounded-full px-[6px] text-xs">
              {cartItems.length}
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