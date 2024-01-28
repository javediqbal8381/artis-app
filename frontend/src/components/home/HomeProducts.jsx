import React from 'react'
import products from '../../data/products.json'
import ProductList from '../products/ProductsList'

const HomeProducts = () => {
    const topProducts = products.filter((p, i) => p.rating > 4 && i < 7)
    return (
        <div>
            HomeProducts
            <ProductList products={topProducts} />
        </div>
    )
}

export default HomeProducts