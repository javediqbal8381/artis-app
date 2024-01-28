import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesBar = () => {
    return (
        <div className="flex w-full flex-col h-full bg-gray-200 sm:w-48">
            <ul className="flex flex-col p-4">
            <li className='pl-5 p-2 w-full border-2 font-bold bg-lb'>Collections</li>
                <li className="my-2"><Link to="/products/catagory/paintings/" className="block px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Paintings</Link></li>
                <li className="my-2"><Link to="/products/catagory/pottery/" className="block px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Pottery</Link></li>
                <li className="my-2"><Link to="/products/catagory/glass/" className="block px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Glass</Link></li>
                <li className="my-2"><Link to="/products/catagory/home-decor/" className="block px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Home Decor</Link></li>
                <li className="my-2"><Link to="/products/catagory/garden/" className="block px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Garden</Link></li>
                <li className="my-2"><Link to="/products/catagory/fabric/" className="block px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Fabric</Link></li>
                <li className="my-2"><Link to="/products/catagory/wood/" className="block px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Wood</Link></li>
                <li className="my-2"><Link to="/products/catagory/fine-craft/" className="block px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Fine Craft</Link></li>
                <li className="my-2"><Link to="/products/catagory/personalization/" className="block px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Personalization</Link></li>
            </ul>
        </div>
    );
}

export default CategoriesBar;
