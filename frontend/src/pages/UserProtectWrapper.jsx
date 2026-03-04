import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserProtectWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useContext(UserDataContext);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  // Check if the token exists, if not redirect to login page
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data.user);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error(
            "Error fetching user profile:",
            error.response?.data || error.message,
          );
          navigate("/login");
          setIsLoading(false);
        });
    }
  }, [token, navigate, setUser]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default UserProtectWrapper;
