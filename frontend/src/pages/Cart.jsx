import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import products from '../data/products.json'

const Cart = () => {
    const addedToCart = JSON.parse(document.cookie.split('=')[1]).map(i => Number(i));
console.log(addedToCart)
    const [addedCartItems, setAddedCartItems] = React.useState(addedToCart);
    // get the products ids and convert to number
    const cartItems = products.filter(p => addedCartItems.includes(p.id))
    const handleRemoveProduct = (id) => {
        // Get current cart items from cookie
        const existingCartItems = document.cookie.split(';').find(cookie => cookie.trim().startsWith('cartItems='));
        const cartItems = existingCartItems ? JSON.parse(existingCartItems.split('=')[1]) : [];
        // console.log(id, cartItems)
        const itemRemoved = cartItems.filter(item => item !== id).map(i => Number(i)) 
        console.log(itemRemoved)
        // Update cartItems in cookie
        document.cookie = `cartItems=${JSON.stringify(itemRemoved)};max-age=604800;path=/`; // Max age set to 1 week (604800 seconds)
        // update the state to see instent change
        setAddedCartItems(itemRemoved)
        // Navigate to cart page
    }
    return (
        <Layout>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty. <Link to="/products">Continue shopping</Link></p>
                ) : (
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4">
                                <div className="flex items-center">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-gray-500">${item.price}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleRemoveProduct(item.id)} className="text-red-500">Remove</button>
                            </div>
                        ))}
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
