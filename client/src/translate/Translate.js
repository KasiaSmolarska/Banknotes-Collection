import React from "react";
import PropTypes from "prop-types";

class Translate extends React.PureComponent {
  render() {
    if (typeof this.context.translate !== "function") {
      return this.props.name;
    }
    const translateText = this.context.translate(this.props.name);
    console.log(typeof translateText)
    return translateText.toString();
  }
}

Translate.contextTypes = {
  translate: PropTypes.func
};

export default Translate;
