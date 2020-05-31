import React from "react";
import { Icon } from "./Icon";
import Translate from "../translate/Translate";
import PropTypes from "prop-types";
import { TranslateContextTypes } from "../translate/TranslateProvider";

interface ModalProps {
  onClose: () => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  title?: string;
  submitText?: string;
  children: JSX.Element | JSX.Element[];
  type?: string;
}

export const Modal = ({ onClose, onSubmit, title, submitText, children, type = "" }: ModalProps, context: TranslateContextTypes): JSX.Element => {
  return (
    <div className="modal__background">
      <div className={`modal ${type ? "modal--" + type : ""}`}>
        <div className="modal__header">
          <h5 className="modal__header-title">{title && <Translate name={title} />}</h5>
          <div className="modal__header-close" onClick={onClose} title={context.translate("button.close")}>
            <Icon icon="CancelIcon" width="16" height="16" fill="#4a4a4a" />
          </div>
        </div>
        <div className={`modal__body ${type ? "modal__body--" + type : ""}`}>{children}</div>
        {onSubmit && (
          <div className="modal__footer">
            <button className="modal__footer-close btn" onClick={onClose}>
              <Translate name="button.close" />
            </button>

            <button type="submit" className="modal__foter-submit btn btn--blue" onClick={onSubmit}>
              {submitText && <Translate name={submitText} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Modal.contextTypes = {
  translate: PropTypes.func,
};
