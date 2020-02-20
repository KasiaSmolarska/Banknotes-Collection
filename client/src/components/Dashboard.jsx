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
        {this.props.showedModalToAddBanknote && <BanknoteForm />}
      </div>
    ) : (
      <Spinner />
    );
  }
}

function mapStateToProps({ banknote: { showedModalToAddBanknote, loading } }) {
  return {
    showedModalToAddBanknote,
    loading
  };
}

const mapDispatchToProps = dispatch => ({
  fetchBanknoteModel: () => dispatch(actions.fetchBanknoteModel())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
