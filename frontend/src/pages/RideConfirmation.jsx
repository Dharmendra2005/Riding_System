import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import OtpPanel from "../components/OtpPanel";

const RideConfirmation = () => {
  const location = useLocation();
  const rideData = location.state?.rideData;

  console.log("RideConfirmation - location.state:", location.state);
  console.log("RideConfirmation - rideData:", rideData);

  const [otppanel, setOtpPanle] = useState(false);
  if (!rideData) {
    return (
      <div className="p-5">
        <p>No ride data available</p>
        <Link to="/captain-home" className="text-blue-500 underline">Go back to home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <div className="mb-3">
        <Link to="/captain-home">
          <i className="absolute top-3 left-4 text-3xl ri-arrow-left-long-line"></i>
        </Link>
        <i className="absolute text-center top-3 w-full text-3xl text-gray-700 ri-arrow-down-wide-line"></i>
      </div>
      <br className="text-black mb-3"></br>
      <div className="border-b-2 border-gray-300 mt-4"></div>
      <div className="bg-white m-2">
        <div className="flex items-center w-full bg-gray-50 justify-between">
          <div className="flex items-center gap-4">
            <img
              className="h-16 w-16 rounded-full object-cover border-2 border-gray-100"
              src="https://i.pinimg.com/736x/4c/f4/db/4cf4db95352a1c277296db71bc625882.jpg"
              alt="profile"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {rideData.user?.fullName?.firstName || 'User'} {rideData.user?.fullName?.lastName || ''}
              </h2>
              <div className="flex text-xs gap-3 mt-1">
                <p className="bg-yellow-300 rounded-lg p-1">{rideData.vehicleType}</p>
                <p className="bg-green-300 rounded-lg p-1">{rideData.status}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-lg font-semibold">₹{rideData.fare?.toFixed(2)}</h4>
            <p className="text-xs font-medium">
              {rideData.distance ? `${(rideData.distance / 1000).toFixed(1)} KM` : 'N/A'}
            </p>
            <p className="text-xs text-gray-500">
              {rideData.duration ? `${(rideData.duration / 60).toFixed(0)} min` : ''}
            </p>
          </div>
        </div>
        <div className="border-b-2 border-gray-100 mt-3 w-full"></div>
        {/* Stats Grid - Fixed alignment and equal spacing */}
        <div className=" pt-5">
          <div className="flex items-center gap-3 text-bold ml-3 border-b-2 border-gray-200 pb-3 mb-3">
            <h4 className="text-gray-300">PICK UP</h4>
            <i className="ri-map-pin-2-line"></i>
            <div>
              <p className="text-sm font-medium">{rideData.pickupLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-bold ml-3 border-b-2 border-gray-200 pb-3 mb-3 ">
            <h4 className="text-gray-300">DROP OFF</h4>
            <i className="ri-map-pin-2-line"></i>
            <div>
              <p className="text-sm font-medium">{rideData.dropoffLocation}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-bold ml-3 border-b-2 border-gray-200 pb-5">
            <h4 className="text-gray-300">USER INFO</h4>
            <div className="flex justify-between items-center">
              <p className="text-sm px-3">Email</p>
              <span className="text-sm mr-5">{rideData.user?.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm px-3">Phone</p>
              <span className="text-sm mr-5">{rideData.user?.phone || 'N/A'}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-bold ml-3 border-b-2 border-gray-200 pb-5">
            <h4 className="text-gray-300">TRIP FARE</h4>
            <div className="flex justify-between items-center">
              <p className="text-sm px-3">Total Fare</p>
              <span className="text-sm mr-5 font-semibold">₹{rideData.fare?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm px-3">Distance</p>
              <span className="text-sm mr-5">
                {rideData.distance ? `${(rideData.distance / 1000).toFixed(1)} KM` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm px-3">Duration</p>
              <span className="text-sm mr-5">
                {rideData.duration ? `${(rideData.duration / 60).toFixed(0)} min` : 'N/A'}
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center m-3 gap-10">
            <Link>
              <i className="flex flex-col bg-green-200 px-6 py-2 rounded-lg ri-phone-fill">
                Call
              </i>
            </Link>
            <Link>
              <i className="flex flex-col bg-blue-200 px-3 py-2 rounded-lg ri-message-2-line">
                Message
              </i>
            </Link>
            <Link to="/captain-home">
              <i className="flex flex-col bg-gray-200 px-4 py-2 rounded-lg ri-delete-bin-6-line">
                Cancel
              </i>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setOtpPanle(true);
          }}
          className="w-full h-20 bottom-5 bg-yellow-300 text-black font-medium  text-lg "
        >
          GO TO PICK UP
        </button>
      </div>
      {otppanel && <OtpPanel onClose={() => setOtpPanle(false)} rideData={rideData} />}
    </div>
  );
};

export default RideConfirmation;
