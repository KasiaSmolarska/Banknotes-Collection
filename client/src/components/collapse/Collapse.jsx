import React, { useState } from "react";
import { Icon } from "../Icon";
import PropTypes from "prop-types";

export const Collapse = ({ trigger, children, className }, context) => {
  const [isOpen, setOpen] = useState(false);
  console.log(context)
  return (
    <div className={className ? "collapse__container " + className : "collapse__container"}>
      <div className="collapse__trigger" onClick={() => setOpen(!isOpen)}>
        {context.translate(`collapse.trigger.${trigger}`)}
        <span className={`collapse__icon ${isOpen ? "collapse__icon--rotated" : ""}`}>
          <Icon icon="ChevronDown" />
        </span>
      </div>
      <div className={`collapse__body ${isOpen ? "collapse__body--collapsed" : ""}`}>{children}</div>
    </div>
  );
};

Collapse.contextTypes = {
  translate: PropTypes.func
};
