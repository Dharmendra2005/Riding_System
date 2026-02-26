import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import "remixicon/fonts/remixicon.css"; //for icons
import LocalSearchPanel from "../components/LocationSearchPanel";
import VehiclePanelOpen from "../components/VehiclePanelOpen";
import ConfirmRidePanel from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";


const UserHomePage = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const vehiclepanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelcloseRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclepanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);


  const submitHandler = (e) => {
    e.preventDefault();

    setPickup("");
    setDestination("");
  };
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: "70%" });
      gsap.to(panelcloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: "0%" });
      gsap.to(panelcloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if(vehiclepanelOpen){
        gsap.to(vehiclepanelRef.current, {transform:`translateY(0)`})
    }else{
        gsap.to(vehiclepanelRef.current, {transform:`translateY(100%)`})
    }
  }, [vehiclepanelOpen]);

  useGSAP(() => {
    if(confirmRidePanelOpen){
        gsap.to(confirmRidePanelRef.current, {transform:`translateY(0)`})
    }else{
        gsap.to(confirmRidePanelRef.current, {transform:`translateY(100%)`})
    }
  }, [confirmRidePanelOpen]);

  useGSAP(() => {
    if(vehicleFound){
        gsap.to(vehicleFoundRef.current, {transform:`translateY(0)`})
    }else{
        gsap.to(vehicleFoundRef.current, {transform:`translateY(100%)`})
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if(waitingForDriver){
        gsap.to(waitingForDriverRef.current, {transform:`translateY(0)`})
    }else{
        gsap.to(waitingForDriverRef.current, {transform:`translateY(100%)`})
    }
  }, [waitingForDriver]);
return (
    <div className="h-screen w-full relative">
        <img
            src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
            alt="Uber"
            className="w-20 absolute top-7 left-6 z-10"
        />

        <div className="h-screen w-full">
            <img
                src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif"
                alt="Ride"
                className="h-full w-full object-cover"
            />
        </div>
        <div className="h-screen flex flex-col absolute justify-end w-full bottom-0">
            <div className="h-[30%] bg-white p-6 relative">
                <h3
                    ref={panelcloseRef}
                    onClick={() => {
                        setpanelOpen(false);
                    }}
                    className="absolute opacity-0 top-6 right-6 text-2xl"
                >
                    <i className="ri-arrow-down-wide-line"></i>
                </h3>
                <h4 className="text-2xl font-semibold">Find a trip</h4>
                <form
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                >
                    <div className="relative">
                        <div className="line absolute h-16 w-1 top-[30%] left-5 bg-black"></div>
                        <input
                            className="bg-[#eee] px-12 py-2 rounded-lg text-lg w-full mt-5"
                            type="text"
                            placeholder="Add a pick-up location"
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            onClick={() => {
                                setpanelOpen(true);
                            }}
                        />
                        <input
                            className="bg-[#eee] px-12 py-2 rounded-lg text-lg w-full mt-3"
                            type="text"
                            placeholder="Enter your destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            onClick={() => {
                                setpanelOpen(true);
                            }}
                        />
                    </div>
                </form>
            </div>
            <div ref={panelRef} className="h-[0%] bg-white overflow-hidden">
                <LocalSearchPanel setpanelOpen = {setpanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
                {/* when somebody choose location after here we will show the available vehicles */}
            </div>
            <div ref={vehiclepanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-8">
                    <VehiclePanelOpen  setVehiclePanelOpen={setVehiclePanelOpen} setConfirmRidePanelOpen={setConfirmRidePanelOpen} />
            </div>
            <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-8">
                    <ConfirmRidePanel setConfirmRidePanelOpen={setConfirmRidePanelOpen} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-8">
                    <LookingForDriver setVehicleFound={setVehicleFound}/>
            </div>
            <div ref={waitingForDriverRef} className="fixed w-full z-10 bg-white p-3 py-8">
                    <WaitingForDriver waitingForDriver={waitingForDriver}/>
            </div>
        </div>
    </div>
);
};

export default UserHomePage;
