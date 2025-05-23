import React from "react";
import "./Loading.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface MarginProps {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}
interface LoadingProps {
  margin?: MarginProps;
  size?: string;
}

const Loading: React.FC<LoadingProps> = ({ margin, size }) => {
  const style: React.CSSProperties = {
    marginTop: margin?.top,
    marginRight: margin?.right,
    marginBottom: margin?.bottom,
    marginLeft: margin?.left,
    fontSize: size,
    width: size,
    height: size,
  };

  return (
    <div className="loading-component" style={style}>
      <AiOutlineLoading3Quarters />
    </div>
  );
};

export { Loading };
