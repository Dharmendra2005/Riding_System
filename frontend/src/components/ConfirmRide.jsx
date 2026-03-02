import React from "react";

const ConfirmRide = (props) => {
  const { pickup, destination, fare, selectedVehicle } = props;

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

  return (
    <>
      <div>
        <h5
          className="absolute p-1 text-center w-[90%] top-0"
          onClick={() => {
            props.setConfirmRidePanelOpen(false);
          }}
        >
          <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className="text-2xl font-semibold pb-4 text-center">
          Confirm your Ride{" "}
        </h3>
        <div className="flex flex-col gap-3 justify-between items-center">
          {currentVehicle && (
            <img
              className="h-20"
              src={currentVehicle.image}
              alt={currentVehicle.name}
            />
          )}
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
          <div className="w-full mt-3 bg-green-700 rounded-lg text-white text-center p-3">
            <button
              onClick={() => {
                props.setVehicleFound(true);
                props.setConfirmRidePanelOpen(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmRide;
