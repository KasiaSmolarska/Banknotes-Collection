import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../store/actions";
import BanknoteForm from "./banknoteForm/BanknoteForm";

class BanknoteNew extends Component {
  componentDidMount() {
    this.props.fetchBanknoteModel();
  }
  render() {
    return (
      <div>
        add new <BanknoteForm data={this.props.model} />
      </div>
    );
  }
}

function mapStateToProps({ banknote: { model } }) {
  return {
    model: model
  };
}

export default connect(mapStateToProps, actions)(BanknoteNew);
