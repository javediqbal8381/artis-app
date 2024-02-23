// Shops.js
import React from 'react';
import { BsGeoAlt, BsClock, BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import StartRatings from '../../components/commen/StartRatings';
import { shopsApi } from '../../redux/api/shopsApi';
import Loader from '../../components/commen/Loader'
import Layout from '../../components/layouts/Layout';

const ArtisShops = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    location: '',
    website: '',
    hours: '',
    rating: 0,
    description: '',
    image: '',
    products: [],
    artisId: localStorage.getItem('userId') // Assuming userId is stored in localStorage
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const navigate = useNavigate()
  const gotoShop = (shopId) => {
    navigate(`/artis-shop-detail/${shopId}`)
  }
  const userId = localStorage.getItem('userId');
  const { isLoading, isError, data: shops } = shopsApi.useGetArtisShopsQuery(userId);

  const [createShop,{isError:isShopError,data:shopData,isLoading:isLoadingShopCreation}] = shopsApi.useCreateShopMutation()

  const handleCreateShop = async (e) => {
    e.preventDefault()
    createShop(formData)
  };

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4">Explore Online ArtisShops</h2>
        <button onClick={() => setIsModalOpen(true)}>CreateShop</button>


        {isModalOpen && (
          <div className="inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Create New Shop</h3>
              <form onSubmit={handleCreateShop} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-semibold mb-1">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="location" className="text-sm font-semibold mb-1">Location:</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="website" className="text-sm font-semibold mb-1">Website:</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="hours" className="text-sm font-semibold mb-1">Operating Hours:</label>
                  <input
                    type="text"
                    id="hours"
                    name="hours"
                    value={formData.hours}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="text-sm font-semibold mb-1">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image" className="text-sm font-semibold mb-1">Image URL:</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                  >
                    Create Shop
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {
          isLoading ?
            <Loader /> :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {shops.map((shop) => (
                <div onClick={() => gotoShop(shop._id)} key={shop._id} className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
                  <img
                    className="w-full h-40 object-cover mb-4 rounded-md"
                    src={`./images/${shop.image}`}  // Assuming your images are in the 'images' folder
                    alt={shop.name}
                  />
                  <h3 className="text-xl font-bold mb-2">{shop.name}</h3>
                  <p className="text-gray-600 mb-2">
                    <BsGeoAlt className="inline-block mr-2" />
                    {shop.location}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <BsClock className="inline-block mr-2" />
                    {shop.hours}
                  </p>
                  <div className="flex items-center mb-4">
                    <BsStarFill className="text-yellow-500 mr-1" />
                    <span className="text-gray-700">
                      <StartRatings rating={shop.rating} />
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{shop.description}</p>
                  <a
                    href={shop.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              ))}
            </div>
        }
      </div>
    </Layout>
  );
};

export default ArtisShops;
