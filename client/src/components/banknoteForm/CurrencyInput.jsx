import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";
import { currentLang } from "../../utils/languages";
import { isoCurriencies, getCurrencyName } from "../../utils/currenciesCodes";

const CurrencyInput = ({ input, meta: { touched, error, form }, data }, { translate }) => {
  const [foundedCurriencies, setFoundedCurriencies] = React.useState([]);
  const currienciesList = isoCurriencies[currentLang()];

  const getCurriencies = search => {
    const searchedCountry = new RegExp(`.*${search}.*`, "i");
    setFoundedCurriencies(
      Object.entries(currienciesList)
        .filter(([key, value]) => {
          if (value.name.match(searchedCountry)) {
            return true;
          }
        })
        .map(([key, value]) => ({
          code: key,
          name: value.name
        }))
    );
  };

  return (
    <div className="form__control">
      <input
        onKeyUp={evt => {
          getCurriencies(evt.target.value);
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
          foundedCurriencies.map(currency => {
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
  translate: PropTypes.func
};
