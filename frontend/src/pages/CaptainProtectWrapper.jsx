import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({children}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if the token exists, if not redirect to login page
    useEffect(() => {
        if(!token){
            navigate("/captain-login");
        } else {
            axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    setCaptain(response.data);
                    setIsLoading(false);
                }
            }).catch((error) => {
                console.error("Error fetching captain profile:", error.response?.data || error.message);
                navigate("/captain-login");
                setIsLoading(false);
            });
        }
    }, [token, navigate]);

    if(isLoading){
        return <div>Loading...</div>
    }
    return (
        <>
        {children}
        </>
    )
}

export default CaptainProtectWrapper;