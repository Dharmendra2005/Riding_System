import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainDataContext";
import CaptainHomePage from "./CaptainHomePage";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();

  const {setCaptain} = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newCaptain,
      );
      if (response.status === 201) {
        const data = response.data;

        // setCaptain(data.user);
        setCaptain(data.captain);

        localStorage.setItem("token", data.token);

        navigate("/captain-home");
      }
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message,
      );
    }
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        {/* here logo for the fleet drivers */}
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber"
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">
            What's our captain's name
          </h3>
          <div className="flex gap-2 mb-5">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-[50%]  text-lg placeholder:text-base"
              type="firstname"
              placeholder="firstname"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-[50%] text-lg placeholder:text-base"
              type="lastname"
              placeholder="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">
            What's our captain's email
          </h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>

          <div className="flex gap-2 mb-5">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-[50%] text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-[50%] text-lg placeholder:text-base"
              type="text"
              placeholder="License Plate"
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mb-7">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-[50%] text-lg placeholder:text-base"
              type="number"
              placeholder="Capacity"
              required
              min="1"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              className="bg-[#eeeeee] rounded px-4 py-2 border w-[50%] text-sm placeholder:text-base"
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have account ?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>

        {/* <p className='text-center'>
          Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as Captain</Link>
        </p> */}
      </div>

      {/* 3. Added a secondary button at the bottom to justify the 'justify-between' class */}
      <div>
        {/* <Link
          to='/login'
          className='bg-[#d5662d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg'
        >
          Sign in as User
        </Link> */}
        <p className="text-[12px] text-center">
          This site is protected by the reCAPTCHA and the{" "}
          <span className="underline">Google service Policy</span> and{" "}
          <span className="underline"> Terms and Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
