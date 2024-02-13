import React from 'react'
import ProductList from '../components/products/ProductsList'
import Layout from '../components/layouts/Layout'
import products from '../data/products.json'
import { useParams } from 'react-router-dom'
import { productsApi } from '../redux/api/productApi'
import Loader from '../components/commen/Loader'

const CatagorizedProducts = () => {
  const {catagory} = useParams()
  const {isLoading,isError,data:catagorizedProducts} = productsApi.useGetCaratorizedProductsQuery(catagory)

  return (
    <Layout>
      <div>
        {
          isLoading ?
          <Loader/> :
        <ProductList products={catagorizedProducts}/>
}
    </div>
    </Layout>
  )
}

export default CatagorizedProducts