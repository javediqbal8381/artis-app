import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Layout from '../components/layouts/Layout'
import CategoriesBar from '../components/home/CatagoriesBar'
import HomeProducts from '../components/home/HomeProducts'
import ShowCase from '../components/home/ShowCase'
import benifets from '../assets/benifets.png';


const Home = () => {
  return (
    <div className='min-h-screen'>
      <Layout>
        <div className='flex flex-col sm:flex-row'>
          <CategoriesBar />
          <HeroSection />
        </div>
        <ShowCase/>
        <div className='w-full flex items-center justify-center'>
        <img src={benifets} alt="" className='w-[40]'/>
 
        </div>
        <HomeProducts/>
      </Layout>
    </div>
  )
}

export default Home