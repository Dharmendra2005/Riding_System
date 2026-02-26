import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext}  from "../context/UserContext"

const UserSignup = () => { 
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [userData, setUserData] = useState([]);

    const navigate = useNavigate();

    const {user, setUser} = React.useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
          fullName: 
            {
              firstName: firstName,
              lastName: lastName
            },
            email: email,
            password: password
        }
        //to send the data to the backend
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if(response.status === 201){
          const data = response.data;

          setUser(data.user);
          localStorage.setItem("token", data.token);

          navigate("/user-home");

        }
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }
  return (
   <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img 
          className='w-20 mb-8' 
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png" 
          alt="Uber"
        /> 

        <form onSubmit={(e) => {
            submitHandler(e);
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your Name</h3>

          <div className="flex gap-2 mb-5">
          <input
            className='bg-[#eeeeee] rounded px-4 py-2 border w-[50%]  text-lg placeholder:text-base'
            type="firstname"
            placeholder='firstname'
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className='bg-[#eeeeee] rounded px-4 py-2 border w-[50%] text-lg placeholder:text-base'
            type="lastname"
            placeholder='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            className='bg-[#eeeeee] mb-5 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            required
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-5 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password" // 2. Changed from default (text) to password
            placeholder='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit"
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >
            Create account
          </button>
        </form>
         <p className='text-center'>
                  Already have account ? <Link to='/login' className='text-blue-600'>Login here</Link>
                </p>
      </div>
      <div>
        {/* <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg'
        >
          Sign in as Captain
        </Link> */}
      </div>
      <p className="text-[12px] text-center">By proceeding, you constent to get calls , WhatsApp or SMS message, including by automated means, from Uber and its affilites to the number provided.</p>
    </div>
);
};

export default UserSignup;
