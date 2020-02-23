import React from "react";
import { svgList } from "./svg/index";

export const Icon = ({ icon, ...props }) => {
  const Component = svgList[icon] || (() => {});

  return (
    <>
      <Component {...props} />
    </>
  );
};
