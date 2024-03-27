import React from 'react'
import Layout from '../components/layouts/Layout'
import ShopsList from '../components/shops/ShopsList'
import { Link } from 'react-router-dom'

const Shops = () => {
  return (
    <Layout>
      <div className='p-4'>
        <div className='pl-28'>
          <Link className='normal_btn' to='/artis-shops'>My Shops</Link>
        </div>
        <ShopsList />
      </div>
    </Layout>
  )
}

export default Shops