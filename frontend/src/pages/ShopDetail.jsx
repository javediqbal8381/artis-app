// ShopDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { shops } from '../data/shops.json';
import ProductList from '../components/products/ProductsList';
import products from '../data/products.json'
import Layout from '../components/layouts/Layout';

const ShopDetails = () => {
  const { shopId } = useParams();

  const shop = shops.find((shop) => shop.id === parseInt(shopId));
  const shopProducts = products.filter(p => shop.products.includes(p.id))
  console.log(shopProducts)
  if (!shop) {
    return <div>Shop not found</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4">{shop.name} Products</h2>
        <ProductList products={shopProducts} />
      </div>
    </Layout>
  );
};

export default ShopDetails;
