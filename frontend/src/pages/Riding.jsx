import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  const rideData = {
    driverName: "Dharm Gora",
    vehicleNumber: "RJ21 2433",
    carModel: "Maruti Suzuki Alto",
    pickupTitle: "564/11-A",
    pickupAddress: "Kaikondrahalli Bengaluru, Karnataka",
    dropTitle: "123/31-C",
    dropAddress: "Kishanpura Bhopal, MP",
    price: 193.2,
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-white overflow-hidden">
        <img
            src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
            alt="Uber"
            className="w-20 absolute top-7 left-6 z-10"
        />
      <Link to={"/user-home"} className="fixed h-8 w-8 bg-white flex items-center justify-center rounded-full right-2 top-3">
        <i className=" text-lg font-medium ri-home-5-line"></i>
      </Link>
      {/* Top Animation Section */}
      <div className="h-1/2">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif"
          alt="Riding Animation"
        />
      </div>

      {/* Ride Details Section */}
      <div className="flex flex-col justify-between items-center pt-5 flex-grow">

        {/* Driver Info */}
        <div className="flex justify-between items-center w-full px-4 mb-2">
          <div className="flex gap-3">
            <img
              className="h-14 w-14 rounded-full object-cover"
              src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MDM0YzIwMC1jZTI5LTQ5ZjEtYmYzNS1lOWQyNTBlODIxN2EucG5n"
              alt="Car"
            />
            <img
              className="h-14 w-14 rounded-full object-cover"
              src="https://cdn-icons-png.flaticon.com/512/5283/5283021.png"
              alt="Driver"
            />
          </div>

          <div className="text-right mr-5">
            <h2 className="text-sm font-semibold">
              {rideData.driverName}
            </h2>
            <h4 className="text-lg font-medium">
              {rideData.vehicleNumber}
            </h4>
            <p className="text-sm text-gray-600">
              {rideData.carModel}
            </p>
          </div>
        </div>

        {/* Ride Locations */}
        <div className="w-full space-y-8 px-4 ">
          {/* Drop */}
          <div className="flex items-start gap-3 border-b border-gray-200 ">
            <i className="ri-map-pin-2-line text-lg text-gray-700"></i>
            <div>
              <h3 className="text-sm font-semibold">
                {rideData.dropTitle}
              </h3>
              <p className="text-gray-600">
                {rideData.dropAddress}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-start gap-3">
            <i className="ri-money-rupee-circle-fill text-lg text-gray-700"></i>
            <div>
              <h3 className="text-sm font-semibold">
                ₹{rideData.price.toFixed(2)}
              </h3>
              <p className="text-gray-600">
                Cash Payment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="p-4">
        <button className="w-full bg-green-700 hover:bg-green-800 transition-all duration-200 text-white font-semibold py-3 rounded-xl shadow-md">
          Make a Payment
        </button>
      </div>

    </div>
  );
};

export default Riding;