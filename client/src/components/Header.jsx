import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Flags } from "./Flags";

import Dropdown, { DropdownTrigger, DropdownContent } from "react-simple-dropdown";
import { Icon } from "./Icon";
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
            <li className="header__link-container">
              <Link className="btn btn--blue" to="/login">
                Log in / sign in
              </Link>
            </li>
          </ul>
        );
      default:
        return (
          <ul className="text-right column flex-container">
            <li className="header__link-container">
              <Link style={{ display: "inline-flex", marginRight: "4px" }} title={this.context.translate("button.dashboard")} className="header__link" to="/dashboard">
                <Icon icon="ScreenIcon" />
              </Link>
            </li>
            <li className="header__link-container" style={{ marginRight: "4px" }}>
              <Link className="header__link" to="/banknotes" title={this.context.translate("button.banknotesList")}>
                <Icon fill="#fff" icon="BanknotesIcon" />
              </Link>
            </li>
            <li className="header__link-container" title={this.context.translate(!this.props.showedModalToAddBanknote ? "button.addNewBanknote" : "button.closeModal")} onClick={this.props.show_modal_to_add_new_banknote}>
              {this.props.showedModalToAddBanknote ? <RemoveBanknoteIcon /> : <Icon icon="AddBanknoteIcon" />}
            </li>
            <li className="header__link-container">
              <Flags />
            </li>
            <li className="header__link-container">
              <Dropdown title={this.context.translate("button.account")}>
                <DropdownTrigger style={{ display: "flex" }}>
                  <Icon icon="UserIcon" />
                </DropdownTrigger>
                <DropdownContent className={`dropdown__content dropdown__content--left p-1`}>
                  <Link className="btn btn--text" to="/profile">
                    {this.context.translate("button.yourProfile")}
                  </Link>
                  <button className="btn btn--text" onClick={this.handleClick}>
                    <Icon icon="LogOutIcon" fill="#7a18e3" /> {this.context.translate("button.logOut")}
                  </button>
                </DropdownContent>
              </Dropdown>
            </li>
          </ul>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav nav__wrapper row">
          <Link to={this.props.auth.user ? "/dashboard" : "/"} className="header__link-container logo__container nav__logo logo__container--inverse logo__container--autoFit" style={{ paddingLeft: "15px" }}>
            <div className="logo logo--inverse logo--autoFit">
              <span>P</span>
            </div>
            angea
          </Link>
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
