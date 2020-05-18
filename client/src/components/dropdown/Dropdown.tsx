import React from "react";

import TooltipTrigger from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";

interface DropdownProps {
  tooltip: string | React.ReactNode;
  children: React.ReactNode;
  placement: "right" | "auto-start" | "auto" | "auto-end" | "top-start" | "top" | "top-end" | "right-start" | "right-end" | "bottom-end" | "bottom" | "bottom-start" | "left-end" | "left" | "left-start" | undefined;
  props: any;
}

const Dropdown = ({ tooltip, children, placement, ...props }: DropdownProps): React.ReactNode => (
  <TooltipTrigger
    {...props}
    placement={placement || "right"}
    trigger="click"
    tooltip={({ getTooltipProps, getArrowProps, tooltipRef, arrowRef, placement }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: "tooltip-container",
        })}>
        <div
          {...getArrowProps({
            ref: arrowRef,
            "data-placement": placement,
            className: "tooltip-arrow",
          })}
        />
        {tooltip}
      </div>
    )}>
    {({ getTriggerProps, triggerRef }) => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
          className: "dropdown__trigger",
        })}>
        {children}
      </span>
    )}
  </TooltipTrigger>
);

export default Dropdown;
