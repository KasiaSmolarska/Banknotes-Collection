import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Header.scss";

import actions from "../store/actions";

class Header extends Component {
  renderContent() {
    return <div>content</div>;
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper green lighten-1">
          <a className="left brand-logo" href="*" style={{ paddingLeft: "15px" }}>
            Banknotes Collection
          </a>
          <ul className="right">
            <li>
              <Link to="/login">Log in / sign in</Link>
            </li>
          </ul>
          <div>{this.renderContent()}</div>
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
