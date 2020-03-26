import React from "react";

import TooltipTrigger from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";

const Dropdown = ({ tooltip, children, placement, ...props }) => (
  <TooltipTrigger
    {...props}
    placement={placement || "right"}
    trigger="click"
    tooltip={({ getTooltipProps, getArrowProps, tooltipRef, arrowRef, placement }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: "tooltip-container"
        })}>
        <div
          {...getArrowProps({
            ref: arrowRef,
            "data-placement": placement,
            className: "tooltip-arrow"
          })}
        />
        {tooltip}
      </div>
    )}>
    {({ getTriggerProps, triggerRef }) => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
          className: "dropdown__trigger"
        })}>
        {children}
      </span>
    )}
  </TooltipTrigger>
);

export default Dropdown;
