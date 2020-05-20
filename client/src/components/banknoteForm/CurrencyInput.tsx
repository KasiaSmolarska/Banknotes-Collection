import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";
import { currentLang } from "../../utils/languages";
import { isoCurriencies } from "../../utils/currenciesCodes";
import { WrappedFieldProps } from "redux-form";
import { DataType } from "../form/Input";
import { TranslateContextTypes } from "../../translate/TranslateProvider";

interface CurrencyInputProps extends WrappedFieldProps {
  data: DataType;
}

const CurrencyInput = ({ input, meta: { touched, error, form }, data }: CurrencyInputProps, { translate }: TranslateContextTypes) => {
  const [foundedCurriencies, setFoundedCurriencies] = React.useState<{ code: string; name: string }[]>([]);
  const currienciesList = isoCurriencies[currentLang()];

  const getCurriencies = (search: string) => {
    const searchedCountry = new RegExp(`.*${search}.*`, "i");
    setFoundedCurriencies(
      Object.entries(currienciesList)
        .filter(([key, value]) => {
          if (value.name.match(searchedCountry)) {
            return true;
          }
          return false;
        })
        .map(([key, value]) => ({
          code: key,
          name: value.name,
        }))
    );
  };

  return (
    <div className="form__control">
      <input
        onKeyUp={(evt) => {
          getCurriencies(evt.currentTarget.value);
        }}
        autoComplete="off"
        list={input.name}
        pattern={data.validate}
        placeholder={translate(`label.${form}.${input.name}`)}
        className="form__input"
        type="text"
        {...input}
      />
      <label className="form__label">
        <Translate name={`label.${form}.${input.name}`} />
      </label>
      <div className="form__alert" style={{ height: "1rem", marginBottom: "20px" }}>
        {touched && error}
      </div>
      <datalist id={input.name}>
        {foundedCurriencies.length &&
          foundedCurriencies.map((currency) => {
            return (
              <option key={currency.code} value={currency.code}>
                {currency.name}
              </option>
            );
          })}
      </datalist>
    </div>
  );
};

export default CurrencyInput;

CurrencyInput.contextTypes = {
  translate: PropTypes.func,
};
