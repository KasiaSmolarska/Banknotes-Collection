import React from "react";
import PropTypes from "prop-types";

interface TranslateProps {
  name: string;
}

class Translate extends React.Component<TranslateProps> {
  static contextTypes = {
    translate: PropTypes.func,
  };

  render() {
    if (typeof this.context.translate !== "function") {
      return this.props.name;
    }
    const translateText = this.context.translate(this.props.name);
    return translateText.toString();
  }
}

export default Translate;
