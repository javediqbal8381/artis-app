// ShopDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { shops } from '../data/shops.json';
import ProductList from '../components/products/ProductsList';
import products from '../data/products.json'
import Layout from '../components/layouts/Layout';
import { shopsApi } from '../redux/api/shopsApi';
import StartRatings from '../components/commen/StartRatings';

const ShopDetails = () => {
  const { shopId } = useParams();

  const { data: shop, isSuccess, isLoading } = shopsApi.useGetAllShopProductsQuery(shopId)
  console.log(shop)
  if (!shop) {
    return <div>Shop not found</div>;
  }

  const handleStarClick = (starIndex) => {

  }

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        {
          isLoading ?
            <></> :
            <>
              <h2 className="text-3xl font-bold mb-4">{shop.name} Products</h2>
              <p>{shop.description}</p>
              <br />
              <StartRatings
                detail={"shop"}
                rating={shop.rating}
                handleStarClick={handleStarClick}
              />
              <br/>
              <p>{shop.location}</p>
              <p>{shop.hours}</p>
              <ProductList products={shop.products} />
            </>
        }
      </div>
    </Layout>
  );
};

export default ShopDetails;
