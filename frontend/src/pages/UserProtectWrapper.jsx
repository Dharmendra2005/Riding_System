import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({children}) => {
    const  [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    // Check if the token exists, if not redirect to login page
    useEffect(() => {
        if(!token){
        navigate("/login");
    }else {
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers:{
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            setUser(response.data);
            setIsLoading(false);
        }
    }).catch((error) => {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        navigate("/login");
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

export default UserProtectWrapper;