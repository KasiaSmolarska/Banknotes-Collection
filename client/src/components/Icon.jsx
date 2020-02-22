import React from "react";
import { svgList } from "./svg/index";

export const Icon = ({ icon }) => {
  return <>{svgList[icon] || null}</>;
};
