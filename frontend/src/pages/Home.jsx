import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Layout from '../components/layouts/Layout'
import CategoriesBar from '../components/home/CatagoriesBar'
import HomeProducts from '../components/home/HomeProducts'

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Layout>
        <div className='flex flex-col sm:flex-row'>
          <CategoriesBar />
          <HeroSection />
        </div>
        <HomeProducts/>
      </Layout>
    </div>
  )
}

export default Home