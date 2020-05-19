import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { WrappedFieldProps } from "redux-form";

interface RangeProps extends WrappedFieldProps {
  min: number;
  max: number;
  step: number;
}

const Range = ({ input, meta: { form }, min, max, step }: RangeProps): React.ReactNode => {
  return (
    <div className="form__control form__control--range">
      <label className="form__label form__label--range">
        <Translate name={`label.${form}.${input.name}`} />
      </label>
      <InputRange maxValue={max} minValue={min || 1} step={step || 10} value={input.value || { min: min, max: max }} onChange={(value) => input.onChange(value)} />
    </div>
  );
};

export default Range;

Range.contextTypes = {
  translate: PropTypes.func,
};
