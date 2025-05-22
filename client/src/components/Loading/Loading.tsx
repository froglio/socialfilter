import React from "react";
import "./Loading.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading: React.FC = () => {
  return (
    <div className="loading-component">
      <AiOutlineLoading3Quarters />
    </div>
  );
};

export { Loading };
