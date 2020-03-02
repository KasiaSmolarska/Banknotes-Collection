import React from "react";
import PropTypes from "prop-types";
import languages from "../utils/languages";

class TranslateProvider extends React.Component {
  constructor(props) {
    super(props);
    this.translate = this.translate.bind(this);
    this.setLanguage = this.setLanguage.bind(this);

    this.state = {
      language: localStorage.getItem("language") || "pl"
    };
  }
  getChildContext() {
    return {
      language: languages[this.state.language],
      translate: this.translate,
      setLanguage: this.setLanguage
    };
  }

  setLanguage(lang) {
    localStorage.setItem("language", lang);
    this.setState({ language: lang });
  }

  translate(languageKey) {
    if (!languages[this.state.language][languageKey]) {
      return languageKey;
    }
    return languages[this.state.language][languageKey];
  }
  render() {
    return this.props.children;
  }
}
export default TranslateProvider;

TranslateProvider.childContextTypes = {
  language: PropTypes.object,
  translate: PropTypes.func,
  setLanguage: PropTypes.func
};
