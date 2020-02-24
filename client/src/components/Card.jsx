import React from "react";
import Translate from "../translate/Translate";
import PropTypes from "prop-types";

export const Card = ({ header, title, children, className, mod, ...props }) => {
  return (
    <div className={`card-container ${mod ? "card-container--" + mod : ""}`} {...props}>
      <div className={`card ${className ? className : ""}`}>
        <div className="card__top">
          <div className="truncate">
            <h2>{header && header}</h2>
            {title && (
              <div className="card__title">
                <Translate name={title} />
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

Card.contextTypes = {
  translate: PropTypes.func
};
