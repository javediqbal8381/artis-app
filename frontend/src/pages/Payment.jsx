import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/Layout';
import { BsCashCoin, BsCreditCard, } from "react-icons/bs";
import { FaStore } from "react-icons/fa";
import { ordersApi } from '../redux/api/orderApi';


const Payment = () => {
    const pickFromStore = sessionStorage.getItem('getProduct') === 'pickFromShop';
    const checkoutInfo = JSON.parse(localStorage.getItem('checkoutInfo'));
    const finalPrice = Number(checkoutInfo.totalDeliveryFee) + Number(checkoutInfo.totalPrice)
    const [triggerPayment, { isError, isLoading, data: safePayUrl }] = ordersApi.useLazyPerformSafePayPaymentQuery()

    const handlePayment = (method) => {
        if (method === 'SafePay') {
            triggerPayment(finalPrice);
        }
    };

    useEffect(() => {
        if (safePayUrl && !isLoading) {
            window.open(safePayUrl, '_self');
        }
    }, [safePayUrl, isLoading])

    return (
        <Layout>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>
                <div className="flex justify-between">
                    {
                        !pickFromStore &&
                        <div className="w-1/3 border p-4 rounded-md cursor-pointer" onClick={() => handlePayment('cod')}>
                            <BsCashCoin className="w-8 h-8 mb-2 mx-auto" />
                            <p className="text-center">Cash on Delivery</p>
                        </div>
                    }
                    <div className="w-1/3 border p-4 rounded-md cursor-pointer" onClick={() => handlePayment('SafePay')}>
                        <BsCreditCard className="w-8 h-8 mb-2 mx-auto" />
                        <p className="text-center">Online Payment</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Payment;
