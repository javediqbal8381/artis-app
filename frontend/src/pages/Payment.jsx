import React, { useState } from 'react';
import Layout from '../components/layouts/Layout';
import { BsCashCoin, BsCreditCard,  } from "react-icons/bs";
import { FaStore } from "react-icons/fa";


const Payment = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const pickFromStore = sessionStorage.getItem('getProduct') === 'pickFromShop';
console.log(pickFromStore)
    const handleMethodSelection = (method) => {
        setSelectedMethod(method);
    };

    return (
        <Layout>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>
                <div className="flex justify-between">
                    {
                        !pickFromStore &&
                        <div className="w-1/3 border p-4 rounded-md cursor-pointer" onClick={() => handleMethodSelection('cod')}>
                        <BsCashCoin className="w-8 h-8 mb-2 mx-auto" />
                        <p className="text-center">Cash on Delivery</p>
                    </div>
                    }
                    <div className="w-1/3 border p-4 rounded-md cursor-pointer" onClick={() => handleMethodSelection('jazzcash')}>
                        <BsCreditCard className="w-8 h-8 mb-2 mx-auto" />
                        <p className="text-center">JazzCash</p>
                    </div>
                </div>

                {selectedMethod === 'cod' && (
                    <div className="mt-8 bg-gray-100 p-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Cash on Delivery</h3>
                        <p>Pay cash when your order is delivered.</p>
                    </div>
                )}

                {selectedMethod === 'jazzcash' && (
                    <div className="mt-8 bg-gray-100 p-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">JazzCash</h3>
                        <p>Pay securely using JazzCash.</p>
                    </div>
                )}

                {selectedMethod === 'pick' && (
                    <div className="mt-8 bg-gray-100 p-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Pick from Shop</h3>
                        <p>Collect your order from our shop location.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Payment;
