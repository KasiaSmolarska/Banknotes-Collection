import React from "react";
import { IconPropsTypes } from "./index";

export const HeartIcon = ({ width, height, fill }: IconPropsTypes) => {
  return (
    <svg width={width || "20"} height={height || "20"} x="0px" y="0px" viewBox="0 0 418.375 418.375">
      <path
        fill={fill || "#FF4979"}
        d="M367.305,42.599c-41.36-26.88-107.2-33.36-154,16l-4,4l-4-4c-46.8-49.28-112.68-42.76-154.04-16
	c-47.28,30.76-63.56,84.48-41.68,137.4c18.8,45.36,68.6,86.28,112.56,122.24c42.12,34.48,87.04,67.12,87.04,94.24
	c0-27.2,44.92-59.76,87.04-94.24c44-36,93.76-76.72,112.56-122.24C430.665,127.079,414.385,73.359,367.305,42.599z"
      />
    </svg>
  );
};
