import React, { useState } from "react";
import { Field } from "redux-form";
import { Collapse } from "../collapse/Collapse";
import Checkbox from "../form/Checkbox";
import Input from "../form/Input";
import { getCountryName } from "../../utils/countriesCodes";

const getLabels = (trigger, elem) => {
  switch (trigger) {
    case "countries":
      return getCountryName(elem);

    default:
      return elem;
  }
};

export const Checkboxes = ({ data, name, trigger, ...props }) => {
  return (
    <div>
      <Collapse trigger={trigger} className="collapse--checkboxes">
        {data && data.map(elem => <Field key={elem} name={name + "[" + elem + "]"} id={elem} component={Checkbox} type="checkbox" data={getLabels(trigger, elem)} shortcut={elem}/>)}
      </Collapse>
    </div>
  );
};
