import React, { Component } from "react";

class FormProvider extends Component {
  render() {
    return <form className="form">{this.props.children}</form>;
  }
}

export default FormProvider;
