import React from "react";
import { Link } from "react-router-dom";

const CustomerRequests = () => {
    const removeRequest = () => {
        // Logic to remove the request from the list
    }
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        {/* Left Arrow */}
        <Link to ="/captain-home"><i className="text-2xl ri-arrow-left-long-line cursor-pointer"></i></Link>

        {/* Center Title */}
        <h4 className="text-xl font-medium text-center flex-1">Requests</h4>

        {/* Right Icon */}
        <img
          className="h-8 w-8 cursor-pointer mt-3"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjE2IDQuMjhhLjc1Ljc1IDAgMSAxIDEuMDYtMS4wNmwzLjI1IDMuMjVMMTYgN2wtLjUzLjUzLTMuMjUgMy4yNWEuNzUuNzUgMCAwIDEtMS4wNi0xLjA2bDEuOTctMS45N0gzLjI1YTEuNzUgMS43NSAwIDEgMCAwIDMuNWgyYS43NS43NSAwIDAgMSAwIDEuNWgtMmEzLjI1IDMuMjUgMCAwIDEgMC02LjVoOS44OHoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
          alt="leave"
        />
      </div>

      <div className="flex flex-col">
        <div className="p-3 bottom-5 m-3 rounded-2xl">
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
          <div className="w-full mt-3">
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
          <div className="flex items-center justify-between mt-5 gap-1">
            <div className=" bg-gray-400 rounded-lg text-white text-center px-5 py-2">
              <button
                onClick={() => {
                  removeRequest();
                }}
              >
                Ignore
              </button>
            </div>
            <div className=" bg-yellow-300 rounded-lg text-white text-center px-5 p-5 py-2">
              <Link to={"/RideConfirmation"} onClick={() => {}}>
                Accept
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-1 bg-gray-300"></div>

      <div className="flex flex-col">
        <div className="p-3 bottom-5 m-3 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                className="h-16 w-16 rounded-full object-cover border-2 border-gray-100"
                src="https://i.pinimg.com/736x/5f/3c/02/5f3c02f91c4043573009d93a8d312e12.jpg"
                alt="profile"
              />
              <div>
                <h2 className="text-lg font-semibold">Gunjan</h2>
                <div className="flex text-xs gap-3 mt-1">
                  <p className="bg-yellow-300 rounded-lg p-1">Payble</p>
                  <p className="bg-yellow-300 rounded-lg p-1">Discount</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <h4 className="text-lg font-semibold">₹163.32</h4>
              <p className="text-xs  font-medium">1.2KM</p>
            </div>
          </div>

          {/* Stats Grid - Fixed alignment and equal spacing */}
          <div className="w-full mt-3">
            <div className="flex items-center gap-3 mb-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
              <h4 className="text-gray-300"> PICK UP</h4>
              <i className="ri-map-pin-2-line"></i>
              <div>
                <h3 className="text-sm">234/21-B</h3>
                <p className="text-xs">Panji Goa, India</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
              <h4 className="text-gray-300"> DROP OFF</h4>
              <i className="ri-map-pin-2-line"></i>
              <div>
                <h3 className="text-sm">243/51-S</h3>
                <p className="text-xs">Massuer Goa, India</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5 gap-1">
            <div className=" bg-gray-400 rounded-lg text-white text-center px-5 py-2">
              <button
                onClick={() => {
                  removeRequest();
                }}
              >
                Ignore
              </button>
            </div>
            <div className=" bg-yellow-300 rounded-lg text-white text-center px-5 p-5 py-2">
              <Link to={"/RideConfirmation"} onClick={() => {}}>
                Accept
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-1 bg-gray-300"></div>
    </div>
  );
};

export default CustomerRequests;
