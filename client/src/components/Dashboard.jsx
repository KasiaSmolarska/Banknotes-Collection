import React, { Component } from "react";
import { connect } from "react-redux";
import { Search } from "./Search";

import actions from "../store/actions";
import BanknoteForm from "./banknoteForm/BanknoteForm";
import BanknotesList from "./BanknotesList";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchBanknoteModel();
  }
  render() {
    return (
      <div>
        <Search />
        <BanknotesList />
        {this.props.showedModalToAddBanknote && <BanknoteForm closeWindow={() => this.setState({ showWindow: false })} data={this.props.model} />}
      </div>
    );
  }
}

function mapStateToProps({ banknote: { model, showedModalToAddBanknote } }) {
  return {
    model: model,
    showedModalToAddBanknote
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
