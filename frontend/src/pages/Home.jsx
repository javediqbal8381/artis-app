import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Layout from '../components/layouts/Layout'

const Home = () => {
  return (
    <div className='border-2 border-red-400 min-h-screen'>
      <Layout>
      <HeroSection/>
      </Layout>
    </div>
  )
}

export default Home