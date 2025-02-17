import React from "react";
import SuggestionItem from "./suggestionItem";

const SuggestionsList = ({
  data,
  selectedIndex,
  onSelectIndex,
  handleSelect,
}) => {
  return (
    <ul className="suggestions">
      {data.map((user, index) => (
        <SuggestionItem
          key={user.id}
          item={user}
          isActive={selectedIndex === index}
          onMouseEnter={() => onSelectIndex(index)}
          onClick={() => handleSelect(user)}
        />
      ))}
    </ul>
  );
};

export default SuggestionsList;
