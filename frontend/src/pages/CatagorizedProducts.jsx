import React from 'react'
import ProductList from '../components/products/ProductsList'
import Layout from '../components/layouts/Layout'
import products from '../data/products.json'
import { useParams } from 'react-router-dom'

const CatagorizedProducts = () => {
  const {catagory} = useParams()

  const catagorizedProducts = products.filter(p => p.category === catagory)

  return (
    <Layout>
      <div>
        <ProductList products={catagorizedProducts}/>
    </div>
    </Layout>
  )
}

export default CatagorizedProducts