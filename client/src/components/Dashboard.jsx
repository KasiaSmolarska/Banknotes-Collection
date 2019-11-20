import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../store/actions";
import BanknoteForm from "./banknoteForm/BanknoteForm";

class Dashboard extends Component {
  state = {
    showWindow: false
  };
  componentDidMount() {
    this.props.fetchBanknoteModel();
  }
  render() {
    return (
      <div>
        <h1 className="text-center">Add new banknote!</h1>
        <button className="btn btn--primary" onClick={() => this.setState({ showWindow: true })}>
          Add new banknote
        </button>
        {this.state.showWindow && <BanknoteForm closeWindow={() => this.setState({ showWindow: false })} data={this.props.model} />}
      </div>
    );
  }
}

function mapStateToProps({ banknote: { model } }) {
  return {
    model: model
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
