import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import whexagonImg from '../../assets/w-hexagon.webp';

const HeroSection = () => {
  const heroImgRep = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = heroImgRep.current.offsetLeft + heroImgRep.current.offsetWidth / 2;
      const centerY = heroImgRep.current.offsetTop + heroImgRep.current.offsetHeight / 2;
      const moveX = (centerX - clientX) / 30;
      const moveY = (centerY - clientY) / 30;
      heroImgRep.current.style.transform = `rotateX(${moveY}deg) rotateY(${moveX}deg)`;
    };

    // Add event listener for mousemove
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='min-h-[85vh] flex items-center w-full justify-center flex-col gap-4'>
      <img ref={heroImgRep} className='hero_img' src={whexagonImg} alt="heroImg" />
      <p>----  Made With Love and patience  ----</p>
      <p className='text-center text-mid max-w-[44rem]'>
        Unleash your creativity with ArtisanAvenue - where passion meets pixels.
        Elevate your artistic journey with our intuitive platform designed
        for artists, by artists.
      </p>
      <Link className='home_btn' to={'/products'}>
        EXPLORE
      </Link>
    </div>
  );
};

export default HeroSection;
