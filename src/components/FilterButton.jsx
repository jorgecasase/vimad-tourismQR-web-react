import React, { useState } from "react";
import "./FilterButtonCSS.css"; // Archivo CSS separado

function FilterButton({ label, onToggle }){
  const [isSelected, setIsSelected] = useState(false);

  function handleClick(){
    setIsSelected(!isSelected);
    if (onToggle) {
      onToggle(!isSelected);
    }
  };

  return (
    <button
      className={`filter-button ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
      style={{ margin: "10px" }}
    >
      {label}
    </button>
  );
};

export default FilterButton;
