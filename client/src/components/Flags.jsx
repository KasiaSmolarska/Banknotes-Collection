import React from "react";
import languages from "../utils/languages";
import { Icon } from "./Icon";

import PropTypes from "prop-types";

const flagIcons = {
  eng: <Icon icon="EnglandIcon" />,
  pl: <Icon icon="PolandIcon" />
};

export const Flags = (props, context) => {
  return Object.keys(languages).map(lang => (
    <span onClick={() => context.setLanguage(lang)} key={lang}>
      {flagIcons[lang]}
    </span>
  ));
};

Flags.contextTypes = {
  translate: PropTypes.func,
  setLanguage: PropTypes.func
};
