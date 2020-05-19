import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";
import { Icon } from "../Icon";
import { WrappedFieldProps } from "redux-form";
import { TranslateContextTypes } from "../../translate/TranslateProvider";

interface CheckboxProps extends WrappedFieldProps {
  data: string;
  shortcut: string;
}

const Checkbox = ({ input, data, shortcut, meta: { form } }: CheckboxProps, { translate }: TranslateContextTypes) => {
  return (
    <div className="form__control form__control--checkbox">
      <input className="form__input form__input--checkbox" type="checkbox" {...input} />
      <span className="checkbox">
        <span className="checkbox--check">
          <Icon fill1="#fff" fill2="#fff" icon="CheckMarkIcon" />
        </span>
      </span>
      <label className="form__label form__label--checkbox">
        <span style={{ display: "none" }}>
          <Translate name={`label.${form}.${input.name}`} />
        </span>
        {data} {shortcut && `(${shortcut})`}
      </label>
    </div>
  );
};

export default Checkbox;

Checkbox.contextTypes = {
  translate: PropTypes.func,
};
