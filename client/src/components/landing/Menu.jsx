import React from "react";
import { Link } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";
import PropTypes from "prop-types";
import { Icon } from "../Icon";
import { Flags } from "../Flags";

import Dropdown, { DropdownTrigger, DropdownContent } from "react-simple-dropdown";

const MenuElements = (props, context) => {
  return (
    <>
      <li className="header__link-container nav__element">
        <Link className="nav__element" to="/">
          Home
        </Link>
      </li>
      <li className="header__link-container nav__element">
        <Link className="nav__element" to="/login">
          {context.translate("button.logIn")}
        </Link>
      </li>
    </>
  );
};

MenuElements.contextTypes = {
  translate: PropTypes.func
};

export const Menu = (props, context) => {
  return (
    <div className="nav">
      <ul className="column nav__container">
        <li className="header__link-container">
          <Link to="/" className="logo__container nav__logo">
            {/* <img src={logo} alt="ff" /> */}
            <div className="logo">
              <span>P</span>
            </div>
            angea
          </Link>
        </li>
        {useMedia() !== "lg" ? (
          <li className="header__link-container nav__element">
            <Dropdown title={context.translate("button.account")}>
              <DropdownTrigger style={{ display: "flex" }}>
                <Icon icon="MenuIcon" />
              </DropdownTrigger>
              <DropdownContent className={`"dropdown__content dropdown__content--center p-1`}>
                <ul>
                  <MenuElements />
                </ul>
              </DropdownContent>
            </Dropdown>
          </li>
        ) : (
          <MenuElements />
        )}
        <li className="header__link-container">
          <Flags />
        </li>
      </ul>
      <Link to="/login" className="nav__element--button btn btn--primary hidden-xs">
        {" "}
        {context.translate("button.getStarted")}
      </Link>
    </div>
  );
};

Menu.contextTypes = {
  translate: PropTypes.func
};
