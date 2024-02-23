import React from 'react'
import Layout from '../components/layouts/Layout'
import ShopsList from '../components/shops/ShopsList'
import { Link } from 'react-router-dom'

const Shops = () => {
  return (
    <Layout>
      <div>Shops</div>
      <Link to='/artis-shops'>My Shop</Link>
      <ShopsList />
    </Layout>
  )
}

export default Shops