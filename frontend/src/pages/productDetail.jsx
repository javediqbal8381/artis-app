// ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import { shops } from '../data/shops.json'

const ProductDetail = () => {
    const { productId } = useParams();
    const product = products.find((product) => product.id === parseInt(productId));

    if (!product) {
        return <div>Product not found</div>;
    }

    // find out the shop of product
    const shopOfProduct = shops.filter(shop => shop.id === product.shopId)[0];
    // Filter products from the same shop
    const moreProducts = products.filter(p => shopOfProduct.products.includes(p.id))

    return (
        <div className="container mx-auto mt-8 flex justify-center">
            <div className="w-2/3">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <img
                        className="w-full h-auto object-contain mb-4 rounded-md"
                        src={product.image}
                        alt={product.name}
                    />
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">Category: {product.category}</p>
                    <p className="text-gray-600 mb-2">Price: ${product.price}</p>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    {/* Add more details as needed */}
                </div>
            </div>
            <div className="w-1/3 pl-8">
                <h3 className="text-2xl font-bold mb-4">More Products from the Same Shop</h3>
                {moreProducts.map((p) => (
                    <div key={p.id} className="bg-white p-4 mb-4 rounded-md shadow-md">
                        <img
                            className="w-full h-auto object-contain mb-2 rounded-md"
                            src={p.image}
                            alt={p.name}
                        />
                        <h4 className="text-lg font-semibold mb-1">{p.name}</h4>
                        <p className="text-gray-600">Price: ${p.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetail;
