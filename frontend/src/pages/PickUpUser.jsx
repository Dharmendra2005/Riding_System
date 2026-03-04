import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
// Import useLocation from react-router-dom
import { Link, useLocation } from "react-router-dom";
import TimelinePanel from "../components/TimeLinePanel";
import mapImg from "../assets/map.png";

const PickUpUser = () => {
  const location = useLocation();
  const rideData = location.state?.rideData;

  const [timeLine, setTimeLine] = useState(false);
  const timeLineRef = useRef(null);

  // Extract user info from ride data
  const userName = rideData?.user
    ? `${rideData.user.fullName?.firstName || ""} ${rideData.user.fullName?.lastName || ""}`.trim()
    : "User";
  const pickupLocation = rideData?.pickupLocation || "Pickup location";
  const dropoffLocation = rideData?.dropoffLocation || "Dropoff location";
  const fare = rideData?.fare?.toFixed(2) || "0.00";
  const distance = rideData?.distance
    ? `${(rideData.distance / 1000).toFixed(1)} KM`
    : "N/A";

  const Timelineshow = () => {
    setTimeLine(true);
  };

  useGSAP(() => {
    if (timeLineRef.current) {
      if (timeLine) {
        gsap.to(timeLineRef.current, {
          y: "0%",
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(timeLineRef.current, {
          y: "100%",
          duration: 0.5,
          ease: "power3.in",
        });
      }
    }
  }, [timeLine]);

  if (!rideData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-lg mb-4">No ride data available</p>
        <Link to="/captain-home" className="text-blue-500 underline">
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden h-screen relative">
      <div className="mb-5">
        <Link to="/captain-home" className="absolute top-4 left-4 z-10">
          <i className="text-3xl ri-arrow-left-long-line"></i>
        </Link>
        <h4 className="absolute text-center top-4 w-full text-xl font-medium">
          Pick up {userName}
        </h4>
      </div>

      <div className="border-b-2 border-gray-300 mt-10"></div>

      <div className="flex bg-orange-400">
        <i className="px-5 flex items-center text-xl h-16 font-semibold ri-corner-up-right-line">
          <p>{distance}</p>
        </i>
        <p className="flex items-center text-sm font-semibold">
          going to {dropoffLocation}
        </p>
      </div>

      <div className="w-full relative">
        <img className="w-full h-3/4" src={mapImg} alt="map" />
        <i className="flex items-center justify-center text-bold text-xl font-medium ri-arrow-up-wide-line"></i>
        <div
          onClick={() => {
            Timelineshow();
          }}
          className="w-full rounded-lg bg-white absolute"
        >
          <div className="flex items-center gap-3  font-bold ml-3 border-b-2 border-gray-200 pb-3">
            <h4 className="text-gray-600">PICK UP</h4>
            <i className="ri-map-pin-2-line"></i>
            <div>
              <h3 className="text-lg">{userName}</h3>
              <p className="text-sm">{pickupLocation}</p>
            </div>
          </div>
        </div>
        <div
          ref={timeLineRef}
          className="fixed bottom-0 left-0 w-full h-[85%] bg-white rounded-t-3xl shadow-2xl"
          style={{ transform: "translateY(100%)" }}
        >
          <div onClick={() => setTimeLine(false)}>
            <i
              onClick={() => {
                Timelineshow();
              }}
              className="flex items-center justify-center text-bold text-xl mt-3 font-medium ri-arrow-down-wide-line"
            ></i>
            <div className="flex items-center justify-center gap-3 mt-3 font-bold border-b-2 border-gray-200 pb-3">
              <h4 className="text-gray-300 px-6">DROP OFF</h4>
              <i className="ri-map-pin-2-line"></i>
              <div>
                <h3 className="text-lg">₹{fare}</h3>
                <p className="text-sm">{dropoffLocation}</p>
              </div>
            </div>
          </div>
          <TimelinePanel setTimeLine={setTimeLine} rideData={rideData} />
        </div>
      </div>
    </div>
  );
};

export default PickUpUser;
