import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shopsApi } from '../../redux/api/shopsApi';
import Layout from '../../components/layouts/Layout';
import { productsApi } from '../../redux/api/productApi';
import { FiTrash2 } from "react-icons/fi";
import Loader from '../../components/commen/Loader';
import { ordersApi } from '../../redux/api/orderApi';
import ShopChat from '../../components/ShopChat/ShopChat';
import { Button, Dialog, TextField, TextareaAutosize } from '@mui/material';


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
        <Button variant='contained' onClick={() => setIsModalOpen(true)}>Upload Products</Button>
        <br />
        {isModalOpen && (
          <div className=" inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Upload Product</h3>
              <form onSubmit={handleUploadProduct} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="category" className="text-sm font-semibold mb-1">Category:</label>
                  <TextField
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-semibold mb-1">Name:</label>
                  <TextField
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="artisan" className="text-sm font-semibold mb-1">Artisan:</label>
                  <TextField
                    id="artisan"
                    name="artisan"
                    value={formData.artisan}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="price" className="text-sm font-semibold mb-1">Price:</label>
                  <TextField
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="text-sm font-semibold mb-1">Description:</label>
                  <TextareaAutosize
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                    minRows={3}
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="deliveryFee" className="text-sm font-semibold mb-1">Delivery Fee:</label>
                  <TextField
                    id="deliveryFee"
                    name="deliveryFee"
                    value={formData.deliveryFee}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image1" className="text-sm font-semibold mb-1">Image 1:</label>
                  <TextField
                    id="image1"
                    name="images[0]"
                    value={formData.images[0]}
                    onChange={e => handleImageChange(0, e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image2" className="text-sm font-semibold mb-1">Image 2:</label>
                  <TextField
                    id="image2"
                    name="images[1]"
                    value={formData.images[1]}
                    onChange={e => handleImageChange(1, e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image3" className="text-sm font-semibold mb-1">Image 3:</label>
                  <TextField
                    id="image3"
                    name="images[2]"
                    value={formData.images[2]}
                    onChange={e => handleImageChange(2, e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Upload
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        <br />
        <Button
          variant="outlined"
          color="error"
          startIcon={<FiTrash2 />}
          onClick={handleDeleteShop}
        >
          Delete Shop
        </Button>        <br />
        <div className='flex gap-5'>
          <Button onClick={() => setShowOrders(false)} variant={showOrders ? 'outlined' : 'contained'}>Products</Button>
          <Button onClick={() => setShowOrders(true)} variant={showOrders ? 'contained' : 'outlined'}>Orders</Button>
          <Button onClick={() => setIsOpen(true)} variant={isOpen ? 'contained' : 'outlined'}>Open Chat</Button>
        </div>
        <br />
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
        <Dialog open={isOpen}>
          <ShopChat isOpen={isOpen} setIsOpen={setIsOpen} shopId={shopId} />

        </Dialog>
      }
    </Layout>
  );
};

export default ArtisShopDetail;