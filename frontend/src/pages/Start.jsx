import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="h-screen bg-cover bg-center bg-[url(https://unsplash.com/photos/black-car-on-road-during-night-time-ZNyMIS3lL5I)] w-full flex justify-between flex-col bg-red-400">
        <img src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png" alt="Uber" className="w-20 mt-7 ml-6" />
      <div className="bg-white pb-7 py-4 px-4 ">
        <h2 className="text-[30px] fond-bold text-center">Get started with uber</h2>
        <Link to='/login' className="w-full flex item-center justify-center bg-black text-white py-5 rounded mt-4 ">Continue</Link>
      </div>
    </div>
  );
};

export default Start;
