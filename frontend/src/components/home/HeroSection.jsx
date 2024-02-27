import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className='min-h-[85vh] flex items-center w-full justify-center flex-col gap-4'>
      <p>----  Made With Love and patience  ----</p>
      <p className='text-center text-mid max-w-[44rem]'>
        Unleash your creativity with Artis - where passion meets pixels.
        Elevate your artistic journey with our intuitive platform designed
        for artists, by artists.
      </p>
      <Link className='home_btn' to={'/products'}>
        EXPLORE
      </Link>

    </div>
  )
}

export default HeroSection