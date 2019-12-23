import React from "react";
import { connect } from "react-redux";

import actions from "../store/actions/index";

const BanknotesList = props => {
  React.useEffect(() => {
    props.fetchBanknotes();
  }, [props.banknotes]);
  return <div>banknotes List</div>;
};

function mapStateToProps({ banknote }) {
  return {
    banknote
  };
}
export default connect(mapStateToProps, actions)(BanknotesList);
