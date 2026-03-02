import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import TimelinePanel from "../components/TimeLinePanel";
import mapImg from "../assets/map.png";


const PickUpUser = () => {
  const [timeLine, setTimeLine] = useState(false);
  const timeLineRef = useRef(null);

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

  return (
    <div className="flex flex-col overflow-hidden h-screen relative">
      <div className="mb-5">
        <Link to="/requests" className="absolute top-4 left-4 z-10">
  <i className="text-3xl ri-arrow-left-long-line"></i>
</Link>
        <h4 className="absolute text-center top-4 w-full text-xl font-medium">
          Pick up
        </h4>
      </div>

      <div className="border-b-2 border-gray-300 mt-10"></div>

      <div className="flex bg-orange-400">
        <i className="px-5 flex items-center text-xl h-16 font-semibold ri-corner-up-right-line">
          <p>450m</p>
        </i>
        <p className="flex items-center text-sm font-semibold">
          Turn right at 105 William st chicago
        </p>
      </div>

      <div className="w-full relative">
        <img className="w-full h-3/4" src={mapImg} alt="map" />
        <i
          className="flex items-center justify-center text-bold text-xl font-medium ri-arrow-up-wide-line"
        ></i>
        <div onClick={() => {
            Timelineshow();
          }} className="w-full rounded-lg bg-white absolute">
          <div className="flex items-center gap-3  font-bold ml-3 border-b-2 border-gray-200 pb-3">
            <h4 className="text-gray-600">PICK UP</h4>
            <i className="ri-map-pin-2-line"></i>
            <div>
              <h3 className="text-lg">564/11-A</h3>
              <p className="text-sm">Kaikondrahalli Bengaluru, Karnataka</p>
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
              <h4 className="text-gray-300 px-6">PICKED UP</h4>
              <i className="ri-map-pin-2-line"></i>
              <div>
                <h3 className="text-lg">564/11-A</h3>
                <p className="text-sm">Kaikondrahalli Bengaluru, Karnataka</p>
              </div>
            </div>
          </div>
          <TimelinePanel setTimeLine={setTimeLine} />
        </div>
      </div>
    </div>
  );
};

export default PickUpUser;
