import React, { useEffect } from 'react';
import { productsApi } from '../redux/api/productApi';
import { ordersApi } from '../redux/api/orderApi';
import { Link } from 'react-router-dom';

const OrderCompletePage = () => {
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    const addressInfo = JSON.parse(localStorage.getItem('addressInfo'));
    const [getProducts, { isError: isErrorProducts, isLoading: isLoadingProducts, data: moreProducts }] = productsApi.useGetProductsDetailListMutation();

    const [saveOrder, { isError, isLoading, data:order }] = ordersApi.useSaveOrderMutation()

    useEffect(() => {
        getProducts(orderData?.productIds);
    }, [])

    console.log(orderData)

    useEffect(() => {
      if(orderData && moreProducts){
        const order = {
            products: orderData.productIds,
            totalPrice: orderData.totalPrice,
            userId: orderData.userId,
            shopId: moreProducts[0].shopId,
            address: addressInfo.address,
            status: "pending",
            phone: addressInfo.phone,
            zip: addressInfo.zip 
        }
        saveOrder(order)
      }
    }, [moreProducts])

    const handleRemoveAllProducts = () => {
            // Get current cart items from cookie
            const existingCartItems = document.cookie.split(';').find(cookie => cookie.trim().startsWith('cartItems='));
            const cartItems = existingCartItems ? JSON.parse(existingCartItems.split('=')[1]) : [];
            // console.log(id, cartItems)
            const itemRemoved = cartItems?.filter(item => item !== item)
            // Update cartItems in cookie
            document.cookie = `cartItems=${JSON.stringify(itemRemoved)};max-age=604800;path=/`; // Max age set to 1 week (604800 seconds)
            // update the state to see instent change
            // Navigate to cart page
    }

    useEffect(() => {
        if(order && order._id) {
            localStorage.removeItem("orderData");
            localStorage.removeItem("addressInfo");
            handleRemoveAllProducts();
        }
    },[order])

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Thank You for Your Purchase!</h1>
                <p className="text-lg text-center text-gray-600 mb-6">Your order has been successfully processed.</p>
                <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Order type</span>
                            <span>
                                {orderData?.deliveryType === 'deliver' ? "will be delivered" : "will picked from shop"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Products:</span>
                            {
                                moreProducts && orderData && moreProducts.map ((p, i) => {
                                   if(orderData?.productIds?.includes(p?._id)) {
                                    return <><br />{i} - {p.name}</>
                                   }
                                   else return
                                })
                            }
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Quantity:</span>
                            <span>{orderData?.productIds?.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Total:</span>
                            <span>PKR: {orderData?.totalPrice}</span>
                        </div>
                    </div>
                </div>
                <p className="mt-6 text-center text-gray-600">For any inquiries, please contact our customer support.</p>
                <Link to="/"><strong>Go back</strong></Link>
            </div>
        </div>
    );
};

export default OrderCompletePage;
