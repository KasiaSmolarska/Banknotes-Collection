import React from "react";
import PropTypes from "prop-types";
import languages, {LangKey} from "../utils/languages";

interface TranslateProviderPropsTypes {
  children: React.ReactNode;
}

interface TranslateProviderState {
  language: LangKey;
}

export interface TranslateContextTypes {
  language: {[key: string] : string};
  translate: (languageKey: string, variables?: { [key: string]: string } ) => string;
  setLanguage: (lang: LangKey) => void;
}

class TranslateProvider extends React.Component<TranslateProviderPropsTypes, TranslateProviderState> {
  static childContextTypes = {
    language: PropTypes.object,
    translate: PropTypes.func,
    setLanguage: PropTypes.func,
  };
  constructor(props: TranslateProviderPropsTypes) {
    super(props);

    this.state = {
      language: (localStorage.getItem("language") || "pl") as LangKey,
    };
  }
  getChildContext(): TranslateContextTypes {
    return {
      language: languages[this.state.language],
      translate: this.translate.bind(this),
      setLanguage: this.setLanguage.bind(this),
    };
  }

  setLanguage(lang: LangKey) {
    localStorage.setItem("language", lang);
    this.setState({ language: lang });
  }

  translate(languageKey: string, variables: { [key: string]: string } = {}) {
    const regExp = /\$\(([a-z]+)\)/g;
    if (!languages[this.state.language][languageKey]) {
      return languageKey;
    }
    return languages[this.state.language][languageKey].replace(regExp, (match, group) => {
      return variables[group];
    });
  }
  render() {
    return this.props.children;
  }
}
export default TranslateProvider;
