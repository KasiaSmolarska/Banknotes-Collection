import React from "react";

export const PolandIcon = ({ width, height }) => {
  return (
    <svg width={width || "20"} height={height || "20"} x="0px" y="0px" viewBox="0 0 512 512">
      <path
        fill="#FF4B55"
        d="M0,385.379c0,21.177,17.167,38.345,38.345,38.345h435.31c21.177,0,38.345-17.167,38.345-38.345V256H0
	V385.379z"
      />
      <path
        fill="#F5F5F5"
        d="M473.655,88.276H38.345C17.167,88.276,0,105.443,0,126.621V256h512V126.621
	C512,105.443,494.833,88.276,473.655,88.276z"
      />
    </svg>
  );
};
