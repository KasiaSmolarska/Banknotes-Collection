import React, { useState } from "react";

export const Dropdown2 = (Component, Icon) => {
  const WrappedComponent = props => {
    const [open, setstate] = useState(false);
    const handleClick = () => {
      setstate(!open);
    };
    return (
      <>
        <div className="dropdown__button" onClick={handleClick}>
          <Icon />
        </div>
        <div className={`dropdown__container  ${open && "dropdown__container--visible"}`}>
          <Component {...props} />
        </div>
      </>
    );
  };
  WrappedComponent.staticMethod = Component.staticMethod;
  return WrappedComponent;
};
