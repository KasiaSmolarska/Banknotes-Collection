import React from "react";
import { Field } from "redux-form";
import { Collapse } from "../collapse/Collapse";
import Checkbox from "../form/Checkbox";
import { getCountryName } from "../../utils/countriesCodes";
import { getCurrencyName } from "../../utils/currenciesCodes";
import PropTypes from "prop-types";

const getLabels = (trigger, elem, context) => {
  switch (trigger) {
    case "countries":
      return getCountryName(elem);
    case "currencies":
      return getCurrencyName(elem);
    case "continents":
      return context.translate(`continent.${elem.replace(/ /g, "")}`);

    default:
      return elem;
  }
};

export const Checkboxes = ({ data, name, trigger, shortcut, ...props }, context) => {
  return (
    <div>
      <Collapse trigger={trigger} className="collapse--checkboxes">
        {data && data.map(elem => <Field key={elem} name={name + "[" + elem + "]"} id={elem} component={Checkbox} type="checkbox" data={getLabels(trigger, elem, context)} shortcut={shortcut  ? elem : null} />)}
      </Collapse>
    </div>
  );
};

Checkboxes.contextTypes = {
  translate: PropTypes.func
}