import React from "react";
import { Link } from "react-router-dom";
import banner from "../../assets/banner2.png";
import PropTypes from "prop-types";

export const Banner = (props, context) => {
  return (
    <div className="landing-banner__container">
      <div className="landing-banner-text">
        <h1>
          <div className="heading-1 heading-1--light">{context.translate("landing.banner.textTop1")}</div>
          <div className="heading-1 heading-1--bold">{context.translate("landing.banner.textTop2")}</div>
        </h1>
        <div className="landing-banner-text-bottom">{context.translate("landing.banner.textBottom")}</div>

        <Link to="/login" className=" nav__element--button btn btn--primary">
          {context.translate("button.getStarted")}
        </Link>
      </div>

      <div className="landing-banner">
        <img src={banner} alt="" />
      </div>
    </div>
  );
};

Banner.contextTypes = {
  translate: PropTypes.func
};
