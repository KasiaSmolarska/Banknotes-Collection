import React from "react";
import eng from "./languages/eng";
import PropTypes from "prop-types";

class TranslateProvider extends React.Component {
  constructor(props) {
    super(props);
    this.translate = this.translate.bind(this);
  }
  getChildContext() {
    return {
      language: eng,
      translate: this.translate
    };
  }
  translate(languageKey) {
    if (!eng[languageKey]) {
      return languageKey;
    }
    return eng[languageKey];
  }
  render() {
    return this.props.children;
  }
}

export default TranslateProvider;

TranslateProvider.childContextTypes = {
  language: PropTypes.object,
  translate: PropTypes.func
};
