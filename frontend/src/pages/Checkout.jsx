import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import Layout from '../components/layouts/Layout';

const Checkout = ({ cartItems }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
    });

    // const { productIds } = useParams();

    const productIds = [1, 4]
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to server
    };

    const handleRemoveProduct = (productId) => {
        // Handle removing product from cart
    };

    // Get product details for products in cart
    const productsInCart = productIds.map((productId) => products.find((product) => product.id === 1));

    return (
        <Layout>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block mb-1">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-md py-2 px-3" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-md py-2 px-3" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-1">Address</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full border rounded-md py-2 px-3" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block mb-1">City</label>
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full border rounded-md py-2 px-3" required />
                        </div>
                        <div>
                            <label htmlFor="zip" className="block mb-1">ZIP Code</label>
                            <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} className="w-full border rounded-md py-2 px-3" required />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mt-6 mb-2">Selected Products</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {productsInCart.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img src={product.images[0]} alt={product.name} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-gray-600">${product.price}</p>
                                    <button onClick={() => handleRemoveProduct(product.id)} className="mt-2 text-sm text-red-500 focus:outline-none">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4">Place Order</button>
                </form>
            </div>
        </Layout>
    );
};

export default Checkout;
