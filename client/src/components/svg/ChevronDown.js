import React from "react";

export const ChevronDown = ({ width, height, fill }) => {
  return (
    <svg width={width || "20"} height={height || "20"} viewBox="0 0 24 24">
      <path fill={fill || "#777777"} d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </svg>
  );
};
