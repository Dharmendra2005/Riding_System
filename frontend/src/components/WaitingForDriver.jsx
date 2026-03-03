import React from "react";

const WaitingForDriver = (props) => {
  const { pickup, destination, fare, selectedVehicle, ride } = props;

  // Vehicle configuration
  const vehicleConfig = {
    car: {
      name: "UberGo",
      image:
        "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MDM0YzIwMC1jZTI5LTQ5ZjEtYmYzNS1lOWQyNTBlODIxN2EucG5n",
    },
    auto: {
      name: "UberAuto",
      image:
        "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
    },
    bike: {
      name: "Moto",
      image:
        "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mY2RkZWNhYS0yZWVlLTQ4ZmUtODdmMC02MTRhYTdjZWU3ZDMucG5n",
    },
  };

  const currentVehicle = selectedVehicle && vehicleConfig[selectedVehicle];
  const currentFare = fare && selectedVehicle ? fare[selectedVehicle] : 0;

  // Get captain info from ride data
  const captain = ride?.captain;
  const captainName = captain
    ? `${captain.fullName?.firstName || ""} ${captain.fullName?.lastName || ""}`.trim()
    : "Captain";
  const vehiclePlate = captain?.vehicle?.plate || "Plate Number";
  const vehicleColor = captain?.vehicle?.color || "Vehicle";
  const vehicleCapacity = captain?.vehicle?.capacity || "";
  const vehicleType = captain?.vehicle?.vehicleType || "Vehicle";
  const otp = ride?.otp || "OTP";
  

  return (
    <>
      <div className="w-full">
        <h5
          className="absolute p-1 text-center w-[90%] top-0"
          onClick={() => {
            props.WaitingForDriver(false);
          }}
        >
          <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className="text-xl font-semibold pb-8 text-center">
          Waiting for Driver{" "}
        </h3>
        <div className="flex flex-col justify-between items-center w-full">
          <div className="flex w-full justify-between">
            <div className="flex ">
              {currentVehicle && (
                <img
                  className="h-15 rounded full "
                  src={currentVehicle.image}
                  alt={currentVehicle.name}
                />
              )}
              <img
                className="h-15  rounded full "
                src="https://cdn-icons-png.flaticon.com/512/5283/5283021.png"
                alt=""
              />
            </div>
            <div className="text-right pb-3">
              <h2 className="text-lg font-semibold">{captainName}</h2>
              <h4 className="text-xl font-medium">{vehiclePlate}</h4>
              <p className="text-sm text-gray-600">
                {vehicleColor}{" "}
                {vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}
                {vehicleCapacity && ` • ${vehicleCapacity} seats`}
              </p>
              <h4 className="text-xl font-medium">{`OTP : ${otp}`}</h4>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center gap-3 mb-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
              <i className="ri-map-pin-2-line"></i>
              <div>
                <h3 className="text-lg font-semibold">Pickup</h3>
                <p className="text-gray-600">
                  {pickup || "Add pickup location"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
              <i className="ri-map-pin-fill"></i>
              <div>
                <h3 className="text-lg font-semibold">Destination</h3>
                <p className="text-gray-600">
                  {destination || "Add destination"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3 text-bold ml-3">
              <i className="ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className="text-lg font-semibold">₹{currentFare}</h3>
                <p className="text-gray-600">Cash Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingForDriver;
