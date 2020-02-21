import React from "react";

export const MenuIcon = ({ fill, width, height }) => {
  return (
    <svg width={width || "20"} height={height || "20"} x="0px" y="0px" viewBox="0 0 512 512">
      <circle fill={fill || "black"} cx="256" cy="256" r="64" />
      <circle fill={fill || "black"} cx="256" cy="448" r="64" />
      <circle fill={fill || "black"} cx="256" cy="64" r="64" />
    </svg>
  );
};
