import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import UserIcon from "./svg/UserIcon";
import LogOutIcon from "./svg/LogOutIcon";
import AddBanknoteIcon from "./svg/AddBanknoteIcon";
import { ReactComponent as RemoveBanknoteIcon } from "./svg/RemoveBanknoteIcon.svg";

import PropTypes from "prop-types";

import actions from "../store/actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.showMenu = this.showMenu.bind(this);
  }
  handleClick = e => {
    e.preventDefault();
    this.props.logOutUser();
  };

  state = {
    showedMenu: false
  };

  showMenu() {
    this.setState({
      showedMenu: !this.state.showedMenu
    });
  }

  renderContent() {
    switch (this.props.auth.user) {
      case null:
        return;
      case false:
        return (
          <ul className="text-right column">
            <li>
              <Link className="btn btn--blue" to="/login">
                Log in / sign in
              </Link>
            </li>
          </ul>
        );
      default:
        return (
          <ul className="text-right column flex-container">
            <li title={this.context.translate(!this.props.showedModalToAddBanknote ? "button.addNewBanknote" : "button.closeModal")} onClick={this.props.show_modal_to_add_new_banknote}>
              {this.props.showedModalToAddBanknote ? <RemoveBanknoteIcon /> : <AddBanknoteIcon />}
            </li>
            <li>
              <div className="nav__account dropdown">
                <div className="dropdown__button" onClick={this.showMenu}>
                  <UserIcon />
                </div>
                <div className={`dropdown__container dropdown__container--left ${this.state.showedMenu && "dropdown__container--visible"}`}>
                  <button className="btn btn--text" onClick={this.handleClick}>
                    <LogOutIcon color="#7a18e3" /> Log out
                  </button>
                </div>
              </div>
            </li>
          </ul>
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
          {this.renderContent()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth, banknote: { showedModalToAddBanknote } }) {
  return {
    auth,
    showedModalToAddBanknote
  };
}

Header.contextTypes = {
  translate: PropTypes.func
};

export default connect(mapStateToProps, actions)(Header);
