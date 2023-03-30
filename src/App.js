import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import countries from "./countries.json";

function App() {
  const [checkboxes, setCheckboxes] = useState(countries);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyChecked, setShowOnlyChecked] = useState(false);

  const handleCheckboxChange = (id) => {
    const newCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === id) {
        return { ...checkbox, checked: !checkbox.checked };
      }
      return checkbox;
    });
    setCheckboxes(newCheckboxes);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = checkboxes.filter((item) => {
    if (searchQuery == "") {
      return item;
    } else {
      return item.label.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  const onClear = () => {
    const newCheckboxes = checkboxes.map((checkbox) => {
      return { ...checkbox, checked: false };
    });
    setCheckboxes(newCheckboxes);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="search">
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="searchTag"
            placeholder="Search"
          />
        </div>
        <div className="showSelected">
          <div className="showSwitch">
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => {
                  setShowOnlyChecked(!showOnlyChecked);
                }}
              />
              <span className="slider round"></span>
            </label>
            <div className="showP">Show selected only</div>
          </div>
          <div className="clearSelects" onClick={onClear}>
            Clear All
          </div>
        </div>
        <div className="scroll">
          {filteredItems.map((checkbox) =>
            showOnlyChecked && !checkbox.checked ? null : (
              <div className="checkList" key={checkbox.id}>
                <input
                  type="checkbox"
                  className="countryCheck"
                  checked={checkbox.checked}
                  onChange={() => handleCheckboxChange(checkbox.id)}
                />
                {checkbox.label}
              </div>
            )
          )}
        </div>
        <div className="footer">
          <button className="button">Save</button>
        </div>
      </div>
    </div>
  );
}

export default App;
