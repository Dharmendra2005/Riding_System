import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CaptainDetails from "../components/CaptainDetails";
import UserRequestPoppup from "../components/PopPup";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainDataContext";

const CaptainHomePage = () => {
  const requestPanelRef = useRef(null);
  const [requestPanel, setRequestPanel] = useState(false);
  const [rideData, setRideData] = useState(null);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (captain?._id) {
      socket.emit("join", { userType: "captain", userId: captain._id });
    }

    //to set interval to update captain location every 15 seconds
    const updateLocation = () => {
      if (!captain?._id) {
        console.log("Captain data not loaded yet");
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log({
            captainId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });

          socket.emit("updateCaptainLocation", {
            captainId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    if (captain?._id) {
      const intervalId = setInterval(updateLocation, 15000);
      updateLocation();

      const handleNewRideRequest = (ride) => {
        console.log("New ride request received:", ride);
        if (ride) {
          setRideData(ride);
          setRequestPanel(true);
        } else {
          console.error("Received null ride data");
        }
      };

      socket.on("newriderequest", handleNewRideRequest);

      return () => {
        clearInterval(intervalId);
        socket.off("newriderequest", handleNewRideRequest);
      };
    }
  }, [captain, socket]);

  const confirmRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`,
        { rideId: rideData._id,
          captainId: captain._id
         },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captainToken")}`,
          },
        },
      );
      console.log("Ride confirmed:", response.data);
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  };

  useGSAP(() => {
    if (requestPanel) {
      gsap.to(requestPanelRef.current, { transform: `translateY(0)` });
      console.log("Request Popup Shown");
    } else {
      gsap.to(requestPanelRef.current, { transform: `translateY(100%)` });
    }
  }, [requestPanel]);
  return (
    <div className="flex flex-col justify-between h-screen overflow-hidden">
      <div className="flex">
        <img
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
          alt="Uberlogo"
          className="w-20 absolute top-5 left-4 z-10"
        />

        <div className="flex flex-col">
          <Link
            to={"/captain-login"}
            className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-4 top-5 shadow-md z-10"
          >
            <i className="text-xl font-medium ri-logout-box-r-line"></i>
          </Link>
          <Link
            to={"/requests"}
            className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-4 top-20 shadow-md z-10"
          >
            <i className="ri-chat-unread-fill"></i>
          </Link>
        </div>
      </div>

      {/* Top Animation Section */}
      <div className="h-3/5 w-full">
        <img
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif"
          alt="Riding Animation"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="bg-white p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] rounded-t-3xl">
        <CaptainDetails />
      </div>
      <div
        ref={requestPanelRef}
        className="bg-white-300 translate-y-full fixed bottom-0 "
      >
        <UserRequestPoppup
          rideData={rideData}
          setRequestPanel={setRequestPanel}
          confirmRide={confirmRide}
        />
      </div>
    </div>
  );
};

export default CaptainHomePage;
