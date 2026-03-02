import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import UserRequestPoppup from "../components/PopPup";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const CaptainHomePage = () => {
  const requestPanelRef = useRef(null);
  const [requestPanel, setRequestPanel] = useState(true);

  useGSAP(() => {
    if (requestPanel) {
      gsap.to(requestPanelRef.current, { transform: `translateY(0)` });
      console.log("Request Popup Shown");
    }else{
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
          to={"/user-home"}
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
      {/* Captain Details Section - Updated shadow and padding */}
      <div className="bg-white p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] rounded-t-3xl">
        <CaptainDetails />
      </div>
      <div ref={requestPanelRef} className="bg-white-300 translate-y-full fixed bottom-0 ">
        <UserRequestPoppup setRequestPanel={setRequestPanel} />
      </div>
    </div>
  );
};

export default CaptainHomePage;
