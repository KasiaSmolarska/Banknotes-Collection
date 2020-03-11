import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";


const Range = ({ input, meta: { form }, min, max }) => {
  return (
    <div className="form__control">
       <InputRange
        maxValue={max}
        minValue={min || 0}
        step={10}
        value={input.value || {min: min, max: max}}
        onChange={value => input.onChange(value)} />
      <label className="form__label form__label--range">
        <Translate name={`label.${form}.${input.name}`} />
      </label>
    </div>
  );
};

export default Range;

Range.contextTypes = {
  translate: PropTypes.func
};
