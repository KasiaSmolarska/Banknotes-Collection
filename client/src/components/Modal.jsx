import React from "react";
import { Icon } from "./Icon";
import Translate from "../translate/Translate";
import PropTypes from "prop-types";

export const Modal = ({ onClose, onSubmit, title, submitText, children }, context) => {
  return (
    <div className="modal__background">
      <div className="modal">
        <div className="modal__header">
          <h5 className="modal__header-title">
            <Translate name={title} />
          </h5>
          <div className="modal__header-close" onClick={onClose} title={context.translate("button.close")}>
            <Icon icon="CrossIcon" />
          </div>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__footer">
          <button className="modal__footer-close btn" onClick={onClose}>
            <Translate name="button.close" />
          </button>
          <button type="submit" className="modal__foter-submit btn btn--blue" onClick={onSubmit}>
            <Translate name={submitText} />
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.contextTypes = {
  translate: PropTypes.func
};
