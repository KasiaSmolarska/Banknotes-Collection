import React, { useState } from "react";
import { Icon } from "../Icon";
import PropTypes from "prop-types";
import { TranslateContextTypes } from "../../translate/TranslateProvider";

interface CollapseProps {
  trigger: string;
  children: React.ReactNode;
  className: string;
  open?: boolean;
}

export const Collapse = ({ trigger, children, className, open = false }: CollapseProps, context: TranslateContextTypes) => {
  const [isOpen, setOpen] = useState(open);
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
  translate: PropTypes.func,
};
