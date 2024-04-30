import React from 'react';
import beads from '../../assets/beads.jpg';
import woodenCrafts from '../../assets/clayCrafts.jpg';
import clayCrafts from '../../assets/woodencrafts.jpg';


const ShowCase = () => {
  return (
    <div className="flex justify-center items-center flex-wrap min-h-[100vh] py-32">
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mx-2 my-2">
        <img src={beads} alt="Large" className="rounded-full shadow-lg w-full" />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mx-2 my-2">
        <img src={woodenCrafts} alt="Mid" className="rounded-full shadow-lg w-full" />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mx-2 my-2">
        <img src={clayCrafts} alt="Small" className="rounded-full shadow-lg w-full" />
      </div>
    </div>
  );
};

export default ShowCase;
