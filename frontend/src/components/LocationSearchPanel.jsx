import React from "react";

const LocalSearchPanel = (props) => {
  // Display active field suggestions
  const suggestions =
    props.activeField === "pickup"
      ? props.pickupSuggestions
      : props.destinationSuggestions;

  return (
    <div className="flex flex-col gap-4 p-4 max-h-96 overflow-y-auto">
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((location, index) => (
          <div
            onClick={() => {
              props.onSuggestionClick(location);
            }}
            key={index}
            className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg active:border-black cursor-pointer hover:bg-gray-100"
          >
            <i className="ri-map-pin-line text-xl text-gray-600"></i>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium">{location.name}</h4>
              <p className="text-xs text-gray-500">{location.description}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400 py-8">
          <p>No suggestions found</p>
        </div>
      )}
    </div>
  );
};

export default LocalSearchPanel;
