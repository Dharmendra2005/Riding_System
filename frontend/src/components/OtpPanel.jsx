import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const OtpPanel = ({ onClose, rideData }) => {
  const panelRef = useRef();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useGSAP(() => {
    gsap.from(panelRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  //when a captain gets otp and that otp is correct then navigate to pickup page
  const SubmitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: rideData._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captainToken")}`,
          },
        }
      );
      
      if (response.status === 200) {
        navigate("/pickup", { state: { rideData: response.data.ride } });
      }
    } catch (err) {
      console.error("Error starting ride:", err);
      setError(err.response?.data?.error || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div
        ref={panelRef}
        className="bg-white w-96 max-w-[90%] rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Pickup</h2>

        <form onSubmit={SubmitHandler} className="text-sm text-gray-600 mb-6">
          <div>
            <input
              className="m-5 px-8 py-3 border-2 border-gray-300 rounded-lg"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
            {error && (
              <p className="text-red-500 text-center mb-3">{error}</p>
            )}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={otp.trim().length !== 6 || loading}
                className={`w-1/2 py-3 rounded-lg font-medium ${
                  otp.trim().length !== 6 || loading
                    ? "bg-yellow-200 cursor-not-allowed"
                    : "bg-yellow-300"
                }`}
              >
                {loading ? "Verifying..." : "Yes, Go"}
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
