import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper green lighten-1">
          <a className="left brand-logo" href="*" style={{ paddingLeft: "15px" }}>
            Banknotes Collection
          </a>
          <ul className="right">
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
            <li>
              <a href="/auth/facebook">Login with Facebook</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
