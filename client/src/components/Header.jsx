import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import actions from "../store/actions";

class Header extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.logOutUser();
  };

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Link className="btn btn--blue" to="/login">
            Log in / sign in
          </Link>
        );
      default:
        return (
          <button className="btn btn--blue" onClick={this.handleClick}>
            Log out
          </button>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav nav__wrapper row">
          <a className="nav__logo column" href="*" style={{ paddingLeft: "15px" }}>
            Banknotes Collection
          </a>
          <ul className="text-right column">
            <li>{this.renderContent()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps, actions)(Header);
