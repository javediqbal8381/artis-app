import React from 'react';

const DiscountAndPayment = ({finalProducts}) => {
    const totalPrice = finalProducts.reduce((acc, curr) => acc + curr.price, 0);
    return (
        <div className="p-4 bg-white shadow-lg max-w-sm">
            <div className="mb-4">
                <h2 className="text-lg font-bold">Discount and Payment</h2>
                <div className="flex items-center justify-between mt-2">
                    <span className="mr-2 text-orange-500">Daraz Voucher</span>
                    <span>No Applicable Voucher</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="mr-2 text-orange-500">Promo Code</span>
                    <input
                        type="text"
                        placeholder="Enter Store/Daraz Code"
                        className="border p-1"
                    />
                </div>
            </div>

            <div className="mb-4 border-t pt-4">
                <h3>Order Summary</h3>
                <div className="flex justify-between mt-2">
                    <span>Items Total</span><span>Rs. {totalPrice}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Delivery Fee</span><span>Rs. 109</span>
                </div>

                {/* Add more details as needed */}

            </div>

            {/* Total Payment Section */}
            {/* Place Order Button */}
        </div>
    );
};

export default DiscountAndPayment;
