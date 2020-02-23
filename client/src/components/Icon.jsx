import React from "react";
import { svgList } from "./svg/index";

export const Icon = ({ icon, ...props }) => {
  const Component = svgList[icon] || (() => null);

  return (
    <>
      <Component {...props} />
    </>
  );
};
