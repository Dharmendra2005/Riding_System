import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

const OtpPanel = ({ onClose }) => {
  const panelRef = useRef();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  useGSAP(() => {
    gsap.from(panelRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div
        ref={panelRef}
        className="bg-white w-96 max-w-[90%] rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Pickup</h2>

        <form className="text-sm text-gray-600 mb-6"
        >
          <div>
            <input
              className="m-5 px-8 py-3 border-2 border-gray-300"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="w-1/2 py-3 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={otp.trim() === ""}
                onClick={() => navigate("/pickup")}
                className={`w-1/2 py-3 rounded-lg font-medium ${
                  otp.trim() === ""
                    ? "bg-yellow-200 cursor-not-allowed"
                    : "bg-yellow-300"
                }`}
              >
                Yes, Go
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpPanel;
// const OtpPanel = () => {
//     return (
//         <div>
//              <h1>Enter Your Customer's OTP</h1>
//             <form action="">
//                 <input type="text" placeholder="Enter OTP" />
//                  <input type="submit" />
//             </form>
//         </div>
//     )
// }
// export default OtpPanel;
