import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import products from '../data/products.json';
import { shops } from '../data/shops.json';
import Layout from '../components/layouts/Layout';
import StarRatings from '../components/commen/StartRatings';
import OutlinedButton from '../components/commen/buttons/OutlinedButton';
import { productsApi } from '../redux/api/productApi';

const ProductDetail = () => {
    const { productId } = useParams();
    const product = products.find((product) => product.id === parseInt(productId));

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!product) {
        return <div>Product not found</div>;
    }

    // find out the shop of product
    const shopOfProduct = shops.filter(shop => shop.id === product.shopId)[0];

    // Filter products from the same shop
    const moreProducts = products.filter(p => shopOfProduct.products.includes(p.id));

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
    };



    const navigate = useNavigate();

    const handleAddToCart = () => {
        // Get current cart items from cookie
        const existingCartItems = document.cookie.split(';').find(cookie => cookie.trim().startsWith('cartItems='));
        const cartItems = existingCartItems ? JSON.parse(existingCartItems.split('=')[1]) : [];
        // Add productId to cart
        cartItems.push(productId);
        // Update cartItems in cookie
        document.cookie = `cartItems=${JSON.stringify(cartItems)};max-age=604800;path=/`; // Max age set to 1 week (604800 seconds)
    };
    const handleOrderNow = () => {
        // Implement order now functionality
        console.log('Ordered now:', product);
        navigate('/checkout')
    };

    const { data, error, isLoading } = productsApi.useGetHomeProductsQuery('bulbasaur');

    return (
        <Layout>
            <div className="container mx-auto mt-8 flex flex-col sm:flex-row justify-center">
                <div className="w-full sm:w-2/3">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <img
                            className="w-[60%] h-auto object-contain mb-4 rounded-md"
                            src={product.images[selectedImageIndex]}
                            alt={product.name}
                        />
                        <div className="flex justify-between mb-4">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    className={`w-1/4 h-auto object-contain cursor-pointer ${index === selectedImageIndex ? 'border-2 border-blue-500' : ''}`}
                                    src={image}
                                    alt={product.name}
                                    onClick={() => handleThumbnailClick(index)}
                                />
                            ))}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-2">Category: {product.category}</p>
                        <p className="text-gray-600 mb-2">Price: ${product.price}</p>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <div className="flex gap-4">
                            <OutlinedButton onClick={handleAddToCart}>Add to Cart</OutlinedButton>
                            <OutlinedButton onClick={handleOrderNow}>Order Now</OutlinedButton>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                        <img src={shopOfProduct.image} alt="shop" />
                        <div>
                            <p className='text-mid'>{shopOfProduct.name}</p>
                            <StarRatings rating={3.5} />
                            <p>{shopOfProduct.description}</p>
                        </div>
                    </div>
                </div>
                <div className="w-3/4  sm:w-1/3 pl-8">
                    <h3 className="text-2xl font-bold mb-4">More Products from the Same Shop</h3>
                    {moreProducts.map((p) => (
                        <div key={p.id} className="bg-white p-4 mb-4 rounded-md shadow-md">
                            <img
                                className="w-full h-auto object-contain mb-2 rounded-md"
                                src={p.images[0]}
                                alt={p.name}
                            />
                            <h4 className="text-lg font-semibold mb-1">{p.name}</h4>
                            <p className="text-gray-600">Price: ${p.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetail;
