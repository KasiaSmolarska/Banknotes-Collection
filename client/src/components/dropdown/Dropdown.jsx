import React, { useState } from "react";
import PropTypes from "prop-types";

import { svgList } from "../svg/index";

const Icon = ({ icon }) => {
  return svgList[icon] || null;
};

export const Dropdown = ({ children, classList, icon, title }, contex) => {
  const [open, setstate] = useState(false);
  const handleClick = () => {
    setstate(!open);
  };
  return (
    <div className="dropdown">
      <div className="dropdown__button" onClick={handleClick} title={contex.translate({title})}>
        <Icon icon={icon} />
      </div>
      <div className={`dropdown__container ${classList && classList} ${open && "dropdown__container--visible"}`}>{children}</div>
    </div>
  );
};

Dropdown.