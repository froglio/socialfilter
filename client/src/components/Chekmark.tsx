import React from "react";
import "./Checkmark.css";

interface CheckmarkProps {
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Checkmark: React.FC<CheckmarkProps> = ({ isSelected, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e);
  };

  return (
    <button className="checkmark" onClick={handleClick}>
      <div className={`circle ${isSelected ? "checked" : ""}`}>
        {isSelected && <div className="check-icon">&#10003;</div>}
      </div>
    </button>
  );
};

export default Checkmark;
