import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import products from '../data/products.json'
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart, removeFromCart } from '../redux/slices/cartSlice';
import { FaMinus, FaPlus } from 'react-icons/fa';
import CartItem from '../components/cart/CartItem';

const Cart = () => {

    const addedCartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    // get the products ids and convert to numberset
    const cartItems = products.filter(p => addedCartItems.includes(p.id))
    const handleRemoveProduct = (id) => {
        // Get current cart items from cookie
        const existingCartItems = document.cookie.split(';').find(cookie => cookie.trim().startsWith('cartItems='));
        const cartItems = existingCartItems ? JSON.parse(existingCartItems.split('=')[1]) : [];
        // console.log(id, cartItems)
        const itemRemoved = cartItems.filter(item => item !== id).map(i => Number(i))
        // Update cartItems in cookie
        document.cookie = `cartItems=${JSON.stringify(itemRemoved)};max-age=604800;path=/`; // Max age set to 1 week (604800 seconds)
        // update the state to see instent change
        // Navigate to cart page
        dispatch(removeFromCart(id));

    }

    let itemQuanity = [];

    const incrementQuantity = (index) => {

    }
    return (
        <Layout>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty. <Link to="/products">Continue shopping</Link></p>
                ) : (
                    <div className='w-[100%] sm:w-[50%]'>
                        {cartItems.map((item, index) => {
                            return (
                                <CartItem
                                    item={item}
                                    handleRemoveProduct={handleRemoveProduct}
                                    key={index + item.id}
                                />
                            )
                        })}
                        <div className="mt-8">
                            <Link to="/checkout" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Proceed to Checkout</Link>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Cart;
