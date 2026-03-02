import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import OtpPanel from "../components/OtpPanel";

const RideConfirmation = () => {

  const [otppanel, setOtpPanle] = useState(false);

  // const Gotopickup = () => {
  //     // Logic to navigate to the pickup page
  //     navigate('/getotp');

  // }

  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <div className="mb-5">
        <i className="absolute top-4 left-4 text-3xl  ri-arrow-left-long-line"></i>
        <i className="absolute text-center top-4 w-full text-3xl text-gray-700 ri-arrow-down-wide-line"></i>
      </div>
      <br className="text-black mb-3"></br>
      <div className="border-b-2 border-gray-300 mt-5"></div>
      <div className="bg-white m-3">
        <div className="flex items-center w-full bg-gray-50 justify-between">
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
        <div className="border-b-2 border-gray-100 mt-3 w-full"></div>
        {/* Stats Grid - Fixed alignment and equal spacing */}
        <div className=" pt-5">
          <div className="flex items-center gap-3 text-bold ml-3 border-b-2 border-gray-200 pb-3 mb-3">
            <h4 className="text-gray-300"> PICK UP</h4>
            <i className="ri-map-pin-2-line"></i>
            <div>
              <h3 className="text-sm">564/11-A</h3>
              <p className="text-xs">Kaikondrahailli Bangluru, Karnataka</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-bold ml-3 border-b-2 border-gray-200 pb-3 mb-3 ">
            <h4 className="text-gray-300"> DROP OFF</h4>
            <i className="ri-map-pin-2-line"></i>
            <div>
              <h3 className="text-sm">123/31-C</h3>
              <p className="text-xs">Kishanpura Bhopal, MP</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-bold ml-3 border-b-2 border-gray-200 pb-5 ">
            <h4 className="text-gray-300"> NOTED </h4>
            <div>
              <p className="text-xs text-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-bold ml-3 border-b-2 border-gray-200 pb-5">
            <h4 className="text-gray-300">TRIP FARE</h4>
            <div className="flex justify-between items-center">
              <p className="text-sm px-3">Pay</p>
              <span className="text-sm mr-5 ">$15.00</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm px-3">Discount</p>
              <span className="text-sm mr-5 ">$10.00</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm px-3">Pain amount</p>
              <span className="text-sm mr-5 ">$25.00</span>
            </div>
          </div>
          <div className="flex justify-center items-center m-3 gap-10">
            <Link>
              {" "}
              <i className="flex flex-col bg-green-200 px-6 py-2 rounded-lg ri-phone-fill">
                Call
              </i>{" "}
            </Link>
            <Link>
              <i className="flex flex-col bg-blue-200 px-3 py-2 rounded-lg ri-message-2-line">
                Message
              </i>
            </Link>
            <Link>
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
            //  gotopickup();
            setOtpPanle(true);
          }}
          className="w-full h-20 bottom-5 bg-yellow-300 text-black font-medium  text-lg "
        >
          GO TO PICK UP
        </button>
      </div>
      {otppanel && <OtpPanel onClose={() => setOtpPanle(false)} />}
    </div>
  );
};

export default RideConfirmation;
