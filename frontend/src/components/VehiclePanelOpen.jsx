import React from "react";

const VehiclePanelOpen = (props) => {
    console.log(props);
    return (
        <div>
            <h5 className="absolute p-1 text-center w-[90%] top-0"><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
                    <h3 className="text-2xl font-semibold pb-4 text-center">Choose a vehicle </h3>
                <div onClick={() => {
                    props.setConfirmRidePanelOpen(true);
                    props.setVehiclePanelOpen(false);
                }} className="flex border-2 border-gray-200  active:border-black rounded-lg items-center justify-between w-full mb-3 p-3">
                    <img
                        className="h-20 w-30"
                        src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MDM0YzIwMC1jZTI5LTQ5ZjEtYmYzNS1lOWQyNTBlODIxN2EucG5n"
                        alt="car"
                    />
                    <div className="bw-1/2">
                        <h4 className="font-medium text-sm">
                            UberGo
                            <span className="ml-2">
                                <i className="ri-user-3-fill">4</i>
                            </span>
                        </h4>
                        <h5 className="font-medium text-sm">2 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
                    </div>
                    <h2 className="font-semibold text-xl">193.45</h2>
                </div>
                 <div onClick={() => {
                    props.setConfirmRidePanel(true);
                }} className="flex border-2 border-gray-200 active:border-black rounded-lg items-center justify-between w-full p-3 mb-3">
                    <img
                        className="h-20"
                        src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NWEwNTUzOC05MThiLTQyZDgtYWZlNy0zYzkyMzI1ZjJmZDQucG5n"
                        alt="car"
                    />
                    <div className="bw-1/2">
                        <h4 className="font-medium text-sm">
                            PremiumUberGo
                            <span className="ml-2">
                                <i className="ri-user-3-fill">4</i>
                            </span>
                        </h4>
                        <h5 className="font-medium text-sm">1 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable, vip rides</p>
                    </div>
                    <h2 className="font-semibold text-xl">260.49</h2>
                </div>
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                }} className="flex border-2 border-gray-200 active:border-black rounded-lg items-center justify-between w-full p-3 mb-3">
                    <img
                        className="h-20"
                        src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mY2RkZWNhYS0yZWVlLTQ4ZmUtODdmMC02MTRhYTdjZWU3ZDMucG5n"
                        alt="car"
                    />
                    <div className="bw-1/2">
                        <h4 className="font-medium text-sm">
                            Moto
                            <span className="ml-2">
                                <i className="ri-user-3-fill">2</i>
                            </span>
                        </h4>
                        <h5 className="font-medium text-sm">3 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable, motorcycle rides</p>
                    </div>
                    <h2 className="font-semibold text-xl">123.50</h2>
                </div>
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                }} className="flex border-2 border-gray-200 active:border-black rounded-lg items-center justify-between w-full p-3 mb-3">
                    <img
                        className="h-20"
                        src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
                        alt="car"
                    />
                    <div className="bw-1/2">
                        <h4 className="font-medium text-sm">
                            UberAuto
                            <span className="ml-2">
                                <i className="ri-user-3-fill">3</i>
                            </span>
                        </h4>
                        <h5 className="font-medium text-sm">5 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable, auto rides</p>
                    </div>
                    <h2 className="font-semibold text-xl">143.25</h2>
                </div>
        </div>
    )
}

export default VehiclePanelOpen;