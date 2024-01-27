import React from 'react'
import Layout from '../components/layouts/Layout'
import ProductList from '../components/products/ProductsList'
import products from '../data/products.json'

const Products = () => {
  return (
    <Layout>
      <div>Products</div>
      <ProductList products={products} />
    </Layout>
  )
}

export default Products