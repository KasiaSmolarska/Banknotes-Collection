import React from "react";
import { Field } from "redux-form";
import { Collapse } from "../collapse/Collapse";
import Checkbox from "../form/Checkbox";
import { getCountryName, CountriesKeys } from "../../utils/countriesCodes";
import { getCurrencyName, CurrenciesKeys } from "../../utils/currenciesCodes";
import PropTypes from "prop-types";
import { TranslateContextTypes } from "../../translate/TranslateProvider";

// type Elem = {trigger: "countries", elem : CountriesKeys} | {trigger: "currencies", elem: CurrenciesKeys}

interface TriggerToElement {
  countries: CountriesKeys;
  currencies: CurrenciesKeys;
  continents: string;
}

function getLabels<T extends keyof TriggerToElement> (trigger: T, elem:TriggerToElement[T], context: TranslateContextTypes): string {
  switch (trigger) {
    case "countries":
      return getCountryName(elem as CountriesKeys);
    case "currencies":
      return getCurrencyName(elem as CurrenciesKeys);
    case "continents":
      return context.translate(`continent.${elem.replace(/ /g, "")}`);

    default:
      return elem;
  }
};

interface CheckboxesProps {
  data: string[];
  name: string;
  trigger: keyof TriggerToElement;
  shortcut: string;
}

export const Checkboxes = ({ data, name, trigger, shortcut, ...props }: CheckboxesProps, context: TranslateContextTypes) => {
  return (
    <div>
      <Collapse trigger={trigger} className="collapse--checkboxes">
        {data && data.map((elem) => <Field key={elem} name={name + "[" + elem + "]"} id={elem} component={Checkbox} type="checkbox" data={getLabels(trigger, elem, context)} shortcut={shortcut ? elem : null} />)}
      </Collapse>
    </div>
  );
};

Checkboxes.contextTypes = {
  translate: PropTypes.func,
};
