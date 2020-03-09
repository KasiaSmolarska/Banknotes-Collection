import React, { useState } from "react";

export const Collapse = ({ trigger, children, className }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={className ? "collapse__container " + className : "collapse__container"}>
      <div className="collapse__trigger" onClick={() => setOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && <div className="collapse__body">{children}</div>}
    </div>
  );
};
