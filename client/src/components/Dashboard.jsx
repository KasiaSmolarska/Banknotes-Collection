import React, { Component } from "react";
import { connect } from "react-redux";
import { Search } from "./Search";
import { Spinner } from "./Spinner";

import actions from "../store/actions";
import BanknoteForm from "./banknoteForm/BanknoteForm";
import BanknotesList from "./BanknotesList";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchBanknoteModel();
  }
  render() {
    return !this.props.loading ? (
      <div>
        <Search />
        <BanknotesList />
        {this.props.showedModalToAddBanknote && <BanknoteForm closeWindow={() => this.setState({ showWindow: false })} data={this.props.model} />}
      </div>
    ) : (
      <Spinner />
    );
  }
}

function mapStateToProps({ banknote: { model, showedModalToAddBanknote, loading } }) {
  return {
    model: model,
    showedModalToAddBanknote,
    loading
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
