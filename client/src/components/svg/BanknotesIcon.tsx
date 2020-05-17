import React from "react";
import {IconPropsTypes} from "./index";

export const BanknotesIcon = ({ width, height, fill }: IconPropsTypes) => {
  return (
    <svg width={width || "25"} height={height || "25"} viewBox="0 0 24 24">
      <path fill={fill || "#fff"} d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z" />
    </svg>
  );
};