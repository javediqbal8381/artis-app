import React from 'react'
import Layout from '../components/layouts/Layout'

const About = () => {
  return (
    <Layout>
          <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-4">
          Welcome to MyArtisApp - your destination for unique handcrafted products from artisans
          around the world.
        </p>
        <p className="text-gray-600 mb-4">
          Our mission is to connect talented artisans with discerning customers who appreciate
          quality, craftsmanship, and the stories behind each piece.
        </p>
        <p className="text-gray-600 mb-4">
          At MyArtisApp, we believe in supporting small businesses and preserving traditional
          crafts. Each item in our collection is carefully curated to ensure authenticity,
          sustainability, and beauty.
        </p>
        <p className="text-gray-600 mb-4">
          Whether you're searching for the perfect gift or looking to add a touch of personality to
          your home, MyArtisApp offers a diverse selection of handmade goods to suit every
          taste and style.
        </p>
        <p className="text-lg font-semibold mb-2">Contact Us</p>
        <p className="text-gray-600">
          Have questions, feedback, or just want to say hello? We'd love to hear from you! Reach out
          to us at <a href="mailto:info@example.com" className="text-blue-500">info@example.com</a>.
        </p>
      </div>
    </div>
    </Layout>
  )
}

export default About