import React, { useState } from 'react';
import products from '../data/products.json';
import Layout from '../components/layouts/Layout';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DiscountAndPayment from '../components/checkout/DiscoundAndPayment';
import { productsApi } from '../redux/api/productApi';
import Loader from '../components/commen/Loader';

const Checkout = ({ cartItems }) => {
    const [itemsToBuy, setItemsToBuy] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
    });
    const [pickFromStore, setPickFromStore] = React.useState(false)
    const itemsInCart = useSelector(state => state.cart.cartItems);
    const checkoutInfo = JSON.parse(localStorage.getItem('checkoutInfo'));

    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (location.search) {
            const productId = location.search.split('=')[1]
            setItemsToBuy([productId])
            // only buy the clicked item not in the cart ones
            return;
        }
        if (itemsInCart.length > 0) {
            setItemsToBuy(itemsInCart)
        }
    }, [location.search, itemsInCart])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pickFromStore) {
            // to close the pick from store modal option
            setPickFromStore(false);
            return;
        }
        // save order data in redux srore;
        // go to payment
        // go to paymentif the product has to be delivered to home
        sessionStorage.setItem('getProduct', "deliver")
        localStorage.setItem('addressInfo', JSON.stringify(formData))
        navigate('/payment')
        // Handle form submission, e.g., send data to server
    };
    const handlePickSubmit = (e) => {
        e.preventDefault();
        // save order data in redux srore;
        // go to paymentif the product has to be picked up from shop
        // to inform payment page 
        sessionStorage.setItem('getProduct', "pickFromShop")
        navigate('/payment')
        // Handle form submission, e.g., send data to server
    };

    const handleRemoveProduct = (productId) => {
        // Handle removing product from cart
    };

    // Get product details for products in cart
    const { data: finalProducts, isLoading, isError } = productsApi.useGetProductsDetailListMutation({
        productIds: itemsToBuy,
    });

    const handlePickFromShop = (e) => {
        setPickFromStore(e.target.checked)
    }
    return (
        <Layout>
            <div className="container mx-auto mt-8">
                {
                    isLoading ?
                        <Loader /> :
                        <>
                            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                            <DiscountAndPayment checkoutInfo={checkoutInfo || {}} />
                            <br />
                            <h2>Enter Address info below or select pick from shop</h2>
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
                                    <div>
                                        <label htmlFor="phone" className="block mb-1">Phone Number</label>
                                        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-md py-2 px-3" required />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mt-6 mb-2">Selected Products</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                </div>
                                <button type="submit" className="bg-blue-500 border-2 py-2 px-4 rounded-md hover:bg-blue-600 mt-4">Place Order</button>
                            </form>
                            <form onSubmit={handlePickSubmit} className='py-6'>
                                <div>
                                    <input id='pickfromshop' type="checkbox" onChange={handlePickFromShop} />
                                    <label htmlFor="pickfromshop">Select if want to Collect your order from our shop location.</label>
                                </div>
                                {
                                    pickFromStore &&
                                    <div className='flex flex-col w-48'>
                                        <p>Please provide the time the item to be picked up</p>
                                        <label for="birthday">Birthday:</label>
                                        <input type="date" id="birthday" name="birthday" />
                                        <button type="submit" className="bg-blue-500 border-2 py-2 px-4 rounded-md hover:bg-blue-600 mt-4">Place Order</button>
                                    </div>
                                }
                            </form>
                        </>

                }
            </div>
        </Layout>
    );
};

export default Checkout;
