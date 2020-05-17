import React from "react";
import { svgList, IconPropsTypes, MaterialIconPropsTypes } from "./svg/index";

interface IconProps extends IconPropsTypes, MaterialIconPropsTypes {
  icon: keyof typeof svgList;
}

export const Icon = ({ icon, ...props }: IconProps) => {
  const Component = svgList[icon];

  return (
    <>
      <Component {...props} />
    </>
  );
};
