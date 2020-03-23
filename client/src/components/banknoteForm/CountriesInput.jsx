import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";
import { currentLang } from "../../utils/languages";
import { isoCountries } from "../../utils/countriesCodes";

const CountriesInput = ({ input, meta: { touched, error, form }, data }, { translate }) => {
  const [foundedCountries, setFoundedCountries] = React.useState([]);
  const countriesList = isoCountries[currentLang()];

  const getCountries = search => {
    const searchedCountry = new RegExp(`.*${search}.*`, "i");
    setFoundedCountries(
      Object.entries(countriesList)
        .filter(([key, value]) => {
          if (value.match(searchedCountry)) {
            return true;
          }
        })
        .map(([key, value]) => ({
          code: key,
          name: value
        }))
    );
  };

  return (
    <div className="form__control">
      <input
        onKeyUp={evt => {
          getCountries(evt.target.value);
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
        {foundedCountries.length &&
          foundedCountries.map(country => {
            return (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            );
          })}
      </datalist>
    </div>
  );
};

export default CountriesInput;

CountriesInput.contextTypes = {
  translate: PropTypes.func
};
