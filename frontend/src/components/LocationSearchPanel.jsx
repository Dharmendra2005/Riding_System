import React from "react";

const LocalSearchPanel = (props) => {
    console.log(props);
    const [locations, setLocations] = React.useState([
        "24B, Capoor's Cafe Rashi form House, ittigati road Hubli",
        "123 Main Street, Downtown Area",
        "456 Park Avenue, Suburban Zone"
    ]);

    return (
        <div className="flex flex-col gap-4 p-4">
            {locations.map((location, index) => (
                <div onClick={() => {
                    props.setVehiclePanelOpen(true)
                    props.setpanelOpen(false);
                }} key={index} className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg active:border-black">
                    <i className="ri-map-pin-line text-xl text-black-500"></i>
                    <h4 className="text-sm">{location}</h4>
                </div>
            ))}
        </div>
    );
}
export default LocalSearchPanel;