import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shopsApi } from '../../redux/api/shopsApi';
import Layout from '../../components/layouts/Layout';
import { productsApi } from '../../redux/api/productApi';
import { FiTrash2 } from "react-icons/fi";
import Loader from '../../components/commen/Loader';
import { ordersApi } from '../../redux/api/orderApi';
import ShopChat from '../../components/ShopChat/ShopChat';


const ArtisShopDetail = () => {
  const { shopId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOrders, setShowOrders] = React.useState(false)

  const [formData, setFormData] = useState({
    category: '',
    name: '',
    artisan: '',
    price: '',
    description: '',
    images: ['', '', ''],
    rating: 0,
    shopId,
    deliveryFee: '',
    ratingAmount: 0
  });

  const [isOpen, setIsOpen] = useState(false);


  const { data: shop, isSuccess, isLoading, isError } = shopsApi.useGetAllShopProductsQuery(shopId)
  const [uploadProduct, { isError: errorCreatingProduct, data: uploadedProduct }] = productsApi.useUploadProductMutation();
  const [deleteProduct, { isError: errorDeletinggProduct, isLoading: isDeletingProduct }] = productsApi.useDeleteProductMutation()
  const [deleteShop, { }] = shopsApi.useDeleteShopMutation()
  const { isError: ordersError, isLoading: ordersLoading, data: orders } = ordersApi.useGetOrderByShopQuery(shopId)

  const handleRemoveProduct = (productId) => {
    deleteProduct({
      productId,
      shopId: shop._id
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images]; // Create a copy of the images array
    newImages[index] = value; // Update the value at the specified index
    setFormData({ ...formData, images: newImages }); // Update the state with the new images array
  };

  const handleUploadProduct = () => {
    try {
      // Call the uploadProduct mutation function with formData
      uploadProduct(formData);
      // Reset form data and close modal
      setFormData({
        category: '',
        name: '',
        artisan: '',
        price: '',
        description: '',
        images: ['', '', ''],
        rating: 0,
        shopId,
        deliveryFee: '',
        ratingAmount: 0
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  const handleDeleteShop = () => {
    deleteShop(shopId)
  }

  if (isLoading) return <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
    <Loader />
  </div>;
  if (isError) return <div>Error: {isError}</div>;

  if (!shop) {
    return <div>Shop not found</div>;
  }
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">{shop?.name} Shop Detail</h1>
        <p className="mb-4">Location: {shop?.location}</p>
        <p className="mb-4">Website: <a href={shop?.website} target="_blank" rel="noreferrer">{shop?.website}</a></p>
        <p className="mb-4">Description: {shop?.description}</p>
        <button className='normal_btn' onClick={() => setIsModalOpen(true)}>Upload Products</button>
        <br />
        {isModalOpen && (
          <div className=" inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Upload Product</h3>
              <form onSubmit={handleUploadProduct} className="space-y-4">
                {/* Add form fields for product data */}
                <div className="flex flex-col">
                  <label htmlFor="category" className="text-sm font-semibold mb-1">Category:</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-semibold mb-1">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="artisan" className="text-sm font-semibold mb-1">Artisan:</label>
                  <input
                    type="text"
                    id="artisan"
                    name="artisan"
                    value={formData.artisan}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="price" className="text-sm font-semibold mb-1">Price:</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="text-sm font-semibold mb-1">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="deliveryFee" className="text-sm font-semibold mb-1">delivery Fee:</label>
                  <textarea
                    id="deliveryFee"
                    name="deliveryFee"
                    value={formData.deliveryFee}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image1" className="text-sm font-semibold mb-1">Image 1:</label>
                  <input
                    type="text"
                    id="image1"
                    name="images[0]"
                    value={formData.images[0]}
                    onChange={e => handleImageChange(0, e.target.value)} // Call handleImageChange with the index and new value
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image2" className="text-sm font-semibold mb-1">Image 2:</label>
                  <input
                    type="text"
                    id="image2"
                    name="images[1]"
                    value={formData.images[1]}
                    onChange={e => handleImageChange(1, e.target.value)} // Call handleImageChange with the index and new value
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image3" className="text-sm font-semibold mb-1">Image 3:</label>
                  <input
                    type="text"
                    id="image3"
                    name="images[2]"
                    value={formData.images[2]}
                    onChange={e => handleImageChange(2, e.target.value)} // Call handleImageChange with the index and new value
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 normal_btn py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <br />
        <p onClick={handleDeleteShop} className='flex text-center justify-between w-28'>Delete Shop<FiTrash2 color='red' /></p>
        <br />
        <div className='flex gap-5'>
          <button onClick={() => setShowOrders(false)} className={showOrders ? `outlined_btn` : `normal_btn`}>Products</button>
          <button onClick={() => setShowOrders(true)} className={showOrders ? `normal_btn` : `outlined_btn`}>Orders</button>
          <button onClick={() => setIsOpen(true)} className={isOpen ? `normal_btn` : `outlined_btn`}>Open Chat</button>

        </div>
        <br/>
        {!showOrders ?
          <>
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shop.products.map(product => (
                <div key={product._id} className="bg-white p-4 shadow rounded-lg">
                  <img
                    className="w-full h-48 object-cover"
                    src={product.images[0]}
                    alt={product.name}
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="mb-2">Price: ${product.price}</p>
                  <p className="mb-4">Category: {product.category}</p>
                  <p className="text-sm mb-4">{product.description}</p>
                  {
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleRemoveProduct(product._id)}
                        className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-600"
                      >
                        <FiTrash2 color='red' />
                      </button>
                    </div>
                  }
                </div>
              ))}
            </div>
          </>
          :
          <>
            <h2 className="text-xl font-semibold mb-4">Orders</h2>
            {
              orders.map(order => (
                <div key={order._id} className="bg-white shadow-lg rounded-md p-4 mb-4 w-300 h-150">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">Order ID: {order.orderId}</span>
                    <span className="text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Total Price: ${order.totalPrice}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Products: {order.products.join(', ')}
                  </div>
                  <div className="text-sm text-gray-600">
                    Shop ID: {order.shopId}
                  </div>
                </div>
              ))
            }

          </>
        }
      </div>
      {isOpen && 
            <ShopChat isOpen={isOpen} setIsOpen={setIsOpen} shopId={shopId}/>
      }
    </Layout>
  );
};

export default ArtisShopDetail;