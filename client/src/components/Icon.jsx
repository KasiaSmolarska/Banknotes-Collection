import React from "react";
import { svgList } from "./svg/index";

export const Icon = ({ icon }) => {
  return <span>{svgList[icon] || null}</span>;
};
