import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TimelinePanel = ({ rideData}) => {
  const pickupLocation = rideData?.pickupLocation || "Pickup location";
  const dropoffLocation = rideData?.dropoffLocation || "Dropoff location";
  const userName = rideData?.user
    ? `${rideData.user.fullName?.firstName || ""} ${rideData.user.fullName?.lastName || ""}`.trim()
    : "User";
  const distance = rideData?.distance
    ? `${(rideData.distance / 1000).toFixed(1)} KM`
    : "N/A";
  const duration = rideData?.duration
    ? `${(rideData.duration / 60).toFixed(0)} min`
    : "N/A";

  const navigate = useNavigate();

  //for completing the ride and navigating to captain home and also send message to user that ride is completed and also update the ride status in database to completed
  async function CompleteRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: rideData._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("captainToken")}`,
        },
      },
    );
    console.log("Ride ended:", response.data);
    if (response.status === 200) {
      navigate("/captain-home");
    }
  }

  return (
    <div>
      <div className="flex flex-col px-7">
        <div className="flex items-center gap-3 m-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
          <i className="ri-user-line text-green-600"></i>
          <div>
            <h3 className="text-lg font-semibold">{userName}</h3>
            <p className="text-gray-500">Passenger</p>
          </div>
        </div>
        <div className="flex items-center gap-3 m-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
          <i className="ri-map-pin-2-line text-blue-600"></i>
          <div>
            <h3 className="text-sm text-gray-400">PICKUP</h3>
            <p>{pickupLocation}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 m-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
          <i className="ri-map-pin-fill text-red-600"></i>
          <div>
            <h3 className="text-sm text-gray-400">DROP OFF</h3>
            <p>{dropoffLocation}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 m-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
          <i className="ri-route-line text-orange-600"></i>
          <div>
            <h3 className="text-sm text-gray-400">DISTANCE & TIME</h3>
            <p>
              {distance} • {duration}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 m-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
          <i className="ri-shut-down-line"></i>

          <div className="flex gap-3">
            <h3 className="text-xl text-gray-400">Complete Your Ride</h3>
            <button
              onClick={() => {
                CompleteRide();
              }}
              className="text-xl bg-green-700 p-2 w-full rounded "
            >
              Complete Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePanel;
