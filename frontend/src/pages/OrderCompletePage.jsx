import React from 'react';

const OrderCompletePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Thank You for Your Purchase!</h1>
                <p className="text-lg text-center text-gray-600 mb-6">Your order has been successfully processed.</p>
                <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Product:</span>
                            <span>Product Name</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Price:</span>
                            <span>$100.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Quantity:</span>
                            <span>1</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Total:</span>
                            <span>$100.00</span>
                        </div>
                    </div>
                </div>
                <p className="mt-6 text-center text-gray-600">For any inquiries, please contact our customer support.</p>
            </div>
        </div>
    );
};

export default OrderCompletePage;
