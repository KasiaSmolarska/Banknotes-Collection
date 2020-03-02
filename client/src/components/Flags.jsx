import React, { useState } from "react";
import languages from "../utils/languages";
import { Icon } from "./Icon";
import Dropdown, { DropdownTrigger, DropdownContent } from "react-simple-dropdown";

import { currentLang } from "../utils/languages";

import PropTypes from "prop-types";

const flagIcons = {
  eng: <Icon icon="EnglandIcon" />,
  pl: <Icon icon="PolandIcon" />
};

export const Flags = (props, context) => {
  const [lang, setLang] = useState(currentLang);
  return (
    <Dropdown>
      <DropdownTrigger title={context.translate(`flags.title.${lang}`)} style={{ display: "flex", marginLeft: "3px" }}>
        {flagIcons[lang]}
      </DropdownTrigger>
      <DropdownContent className="dropdown__content dropdown__content--center">
        {Object.keys(languages).map(lang => (
          <span
            className="flags__link"
            onClick={() => {
              context.setLanguage(lang);
              setLang(lang);
            }}
            title={context.translate(`flags.title.${lang}`)}
            key={lang}>
            {flagIcons[lang]}
          </span>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};

Flags.contextTypes = {
  translate: PropTypes.func,
  setLanguage: PropTypes.func
};
