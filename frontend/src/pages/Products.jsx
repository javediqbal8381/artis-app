import React from 'react'
import Layout from '../components/layouts/Layout'
import ProductList from '../components/products/ProductsList'
import { productsApi } from '../redux/api/productApi'
import Loader from '../components/commen/Loader'

const Products = () => {
  const {isLoading,isError,data:allProducts} = productsApi.useGetAllProductsQuery()
  return (
    <Layout>
      <div>Products</div>
     {
      isLoading ? 
      <Loader/> :
      <ProductList products={allProducts} />
     }
    </Layout>
  )
}

export default Products