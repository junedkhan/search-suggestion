import React, { useState, useEffect, useMemo, useCallback } from "react";

import SuggestionsList from "./suggestionsList";
import data from "../data";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const SearchModal = ({ closeModal }) => {
  const [inputText, setInputText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const debouncedSearch = debounce(setSearchTerm, 300);
    debouncedSearch(inputText);
  }, [inputText]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return [];
    return data.users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) =>
          prev < filteredUsers.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredUsers.length - 1
        );
      } else if (e.key === "Enter" && selectedIndex !== -1) {
        handleSelect(filteredUsers[selectedIndex]);
      }
    },
    [filteredUsers, selectedIndex, isOpen]
  );

  const handleSelect = (user) => {
    setInputText(user.name);
    setIsOpen(false);
  };

  const onChangeInput = (event) => {
    setInputText(event.target.value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const onInputFocus = () => setIsOpen(true);

  return (
    <div onClick={closeModal} className="modal-container">
      <div onClick={(e) => e.stopPropagation()} className="modal">
        <div
          style={{ position: "relative", width: "100%" }}
          onKeyDown={handleKeyDown}
        >
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={inputText}
            onChange={onChangeInput}
            onFocus={onInputFocus}
          />
          {isOpen && filteredUsers.length > 0 && (
            <>
              <div>{`Results(${filteredUsers.length})`}</div>
              <SuggestionsList
                data={filteredUsers}
                selectedIndex={selectedIndex}
                handleSelect={handleSelect}
                onSelectIndex={(index) => setSelectedIndex(index)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
