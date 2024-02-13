import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const CartItem = ({ item, handleRemoveProduct }) => {
    const [itemQuantity, setItemQuantity] = useState(1);


    const incrementQuantity = (index) => {
        if (itemQuantity < 10) {
            setItemQuantity(prev => prev + 1)
        }
    }
    const decrementQuantity = (index) => {
        if (itemQuantity > 1) {
            setItemQuantity(prev => prev - 1)
        }
    }
    return (
        <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4">
            <div className="flex items-center">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">{item.price} pkr</p>
                </div>
            </div>
            <div className='flex gap-8 items-center'>
                <p className='w-6 text-center'>{itemQuantity}</p>
                <div className='flex gap-4'>
                    <FaPlus onClick={incrementQuantity} className='cursor-pointer hover:scale-125' />
                    <FaMinus onClick={decrementQuantity} className='cursor-pointer hover:scale-125' />
                </div>
                <button onClick={() => handleRemoveProduct(item.id)} className="text-red-500">Remove</button>
            </div>
        </div>
    )
}

export default CartItem