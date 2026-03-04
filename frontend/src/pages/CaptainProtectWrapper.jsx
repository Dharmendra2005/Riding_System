import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainDataContext";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("captainToken");
  const navigate = useNavigate();
  const { setCaptain, isLoading, setIsLoading } =
    useContext(CaptainDataContext);

  // Check if the token exists, if not redirect to login page
  useEffect(() => {
    setIsLoading(true);
    if (!token) {
      navigate("/captain-login");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setCaptain(response.data.captain);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error(
            "Error fetching captain profile:",
            error.response?.data || error.message,
          );
          navigate("/captain-login");
          setIsLoading(false);
        });
    }
  }, [token, navigate, setCaptain, setIsLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default CaptainProtectWrapper;
