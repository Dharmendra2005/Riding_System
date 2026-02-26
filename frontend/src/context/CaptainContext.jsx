import React, { useState } from "react";
import { createContext } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isloading, issetLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  const value = {
    captain,
    isloading,
    issetLoading,
    error,
    setError,
    updateCaptain,
  };
  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext ;
