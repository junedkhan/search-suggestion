import React from "react";

const SuggestionItem = ({ item, onMouseEnter, isActive, onClick }) => {
  return (
    <li
      className="suggestion"
      style={{
        backgroundColor: isActive ? "#f0f0f0" : "white",
      }}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {item.name} : {item.email}
    </li>
  );
};

export default SuggestionItem;
