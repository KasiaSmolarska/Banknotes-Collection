import React, { useState } from "react";
import languages, { LangKey } from "../utils/languages";
import { Icon } from "./Icon";
// @ts-ignore
import Dropdown, { DropdownTrigger, DropdownContent } from "react-simple-dropdown";
import {TranslateContextTypes} from "../translate/TranslateProvider";

import { currentLang } from "../utils/languages";

import PropTypes from "prop-types";

const flagIcons = {
  eng: <Icon icon="EnglandIcon" width="24" height="24" />,
  pl: <Icon icon="PolandIcon" width="24" height="24" />
};

interface FlagsProps {}

export const Flags = (props: FlagsProps, context: TranslateContextTypes) => {
  const [lang, setLang] = useState<LangKey>(currentLang);
  return (
    <Dropdown>
      <DropdownTrigger title={context.translate(`flags.title.${lang}`)} style={{ display: "flex", marginLeft: "3px" }}>
        {flagIcons[lang]}
      </DropdownTrigger>
      <DropdownContent className="dropdown__content dropdown__content--center">
        {(Object.keys(languages) as LangKey[]).map((lang) : React.ReactNode => (
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
