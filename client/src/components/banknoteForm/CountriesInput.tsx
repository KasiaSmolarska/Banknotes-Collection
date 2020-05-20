import React from "react";
import { useDispatch } from "react-redux";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";
import { currentLang } from "../../utils/languages";
import { isoCountries, CountriesKeys } from "../../utils/countriesCodes";
import { getContinentName } from "../../utils/country-continent";
import { change, WrappedFieldProps } from "redux-form";
import { TranslateContextTypes } from "../../translate/TranslateProvider";
import { DataType } from "../form/Input";

interface CountriesInputProps extends WrappedFieldProps {
  data: DataType;
}

const CountriesInput = ({ input, meta: { touched, error, form }, data }: CountriesInputProps, { translate }: TranslateContextTypes) => {
  const [foundedCountries, setFoundedCountries] = React.useState<{ code: string; name: string }[]>([]);
  const countriesList = isoCountries[currentLang()];
  const dispatch = useDispatch();
  const getCountries = (search: string) => {
    const searchedCountry = new RegExp(`.*${search}.*`, "i");
    setFoundedCountries(
      Object.entries(countriesList)
        .filter(([key, value]) => {
          if (value.match(searchedCountry)) {
            return true;
          }
          return false;
        })
        .map(([key, value]) => ({
          code: key,
          name: value,
        }))
    );
  };

  return (
    <div className="form__control">
      <input
        onKeyUp={(evt: React.KeyboardEvent<HTMLInputElement>) => {
          getCountries(evt.currentTarget.value);
        }}
        autoComplete="off"
        list={input.name}
        pattern={data.validate}
        placeholder={translate(`label.${form}.${input.name}`)}
        className="form__input"
        type="text"
        {...input}
        onInput={(e: React.FormEvent<HTMLInputElement>) => dispatch(change("banknoteForm", "continent", getContinentName(e.currentTarget.value as CountriesKeys), true))}
      />
      <label className="form__label">
        <Translate name={`label.${form}.${input.name}`} />
      </label>
      <div className="form__alert" style={{ height: "1rem", marginBottom: "20px" }}>
        {touched && error}
      </div>
      <datalist id={input.name}>
        {foundedCountries.length &&
          foundedCountries.map((country) => {
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
  translate: PropTypes.func,
};
