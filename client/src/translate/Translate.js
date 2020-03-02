import React from "react";
import PropTypes from "prop-types";

class Translate extends React.Component {
  render() {
    if (typeof this.context.translate !== "function") {
      return this.props.name;
    }
    const translateText = this.context.translate(this.props.name);
    return translateText.toString();
  }
}

Translate.contextTypes = {
  translate: PropTypes.func
};

export default Translate;
