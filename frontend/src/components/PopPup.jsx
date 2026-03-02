import React from "react";
import { Link } from "react-router-dom";

const UserRequestPoppup = (props) => {
  return (
    <div className="flex flex-col">
     
        <i onClick={() => {
          props.setRequestPanel(false);
        }} className="absolute p-1 text-center pt-3 top-0 w-full text-3xl text-gray-700 ri-arrow-down-wide-line"></i>
    
      <div className="p-8 bg-white bottom-5 m-3 shadow-[5px_5px_px5_5px] rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              className="h-16 w-16 rounded-full object-cover border-2 border-gray-100"
              src="https://i.pinimg.com/736x/4c/f4/db/4cf4db95352a1c277296db71bc625882.jpg"
              alt="profile"
            />
            <div>
              <h2 className="text-lg font-semibold">Shyaam Lakhan</h2>
              <div className="flex text-xs gap-3 mt-1">
                <p className="bg-yellow-300 rounded-lg p-1">Payble</p>
                <p className="bg-yellow-300 rounded-lg p-1">Discount</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-lg font-semibold">₹295.30</h4>
            <p className="text-xs  font-medium">2.2KM</p>
          </div>
        </div>

        {/* Stats Grid - Fixed alignment and equal spacing */}
        <div className="w-full p-5">
          <div className="flex items-center gap-3 mb-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
            <h4 className="text-gray-300"> PICK UP</h4>
            <i className="ri-map-pin-2-line"></i>
            <div>
              <h3 className="text-sm">564/11-A</h3>
              <p className="text-xs">Kaikondrahailli Bangluru, Karnataka</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
            <h4 className="text-gray-300"> DROP OFF</h4>
            <i className="ri-map-pin-2-line"></i>
            <div>
              <h3 className="text-sm">123/31-C</h3>
              <p className="text-xs">Kishanpura Bhopal, MP</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5 gap-3">
          <div className=" bg-gray-400 rounded-lg text-white text-center px-10 py-2">
            <button onClick={() => {
              props.setRequestPanel(false);
            }}>Ignore</button>
          </div>
          <div className=" bg-yellow-300 rounded-lg text-white text-center px-10 py-2">
            <Link to={"/RideConfirmation"} onClick={() => {
            }}>Accept</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRequestPoppup;
