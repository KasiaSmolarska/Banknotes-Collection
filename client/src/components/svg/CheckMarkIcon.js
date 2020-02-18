import React from "react";

export const CheckMarkIcon = ({ width, height, fill1, fill2 }) => {
  return (
    <svg width={width || "20"} height={height || "20"} x="0px" y="0px" viewBox="0 0 511.999 511.999">
      <path
        fill={fill1 || "#B7E183"}
        d="M502.87,75.474c-12.201-12.204-31.952-12.205-44.154-0.001L163.89,370.299L53.284,259.693
	c-12.201-12.204-31.952-12.205-44.154-0.001c-12.173,12.174-12.173,31.981,0,44.153L141.814,436.53
	c12.199,12.198,31.953,12.2,44.153,0L502.87,119.626C515.042,107.453,515.042,87.645,502.87,75.474z"
      />
      <path
        fill={fill2 || "#71DE56"}
        d="M502.87,75.474c-12.201-12.204-31.952-12.205-44.154-0.001L243.511,290.678v88.306L502.87,119.626
	C515.042,107.453,515.042,87.645,502.87,75.474z"
      />
    </svg>
  );
};
