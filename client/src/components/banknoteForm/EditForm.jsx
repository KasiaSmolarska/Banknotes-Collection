import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import Translate from "../../translate/Translate";
import FormGroup from "../form/FormGroup";
import PropTypes from "prop-types";

import updateBanknote from "../../store/actions/updateBanknote";
import show_modal_to_edit_banknote from "../../store/actions/show_modal_to_edit_banknote";
import fetchBanknoteModel from "../../store/actions/fetchBanknoteModel";
import fetchBanknotes from "../../store/actions/fetchBanknotes";
import fetchBanknoteById from "../../store/actions/fetchBanknoteById";

const BANKNOTE_FORM_GROUPS = {
  elementary: ["title", "value", "currency", "own"],
  geolocation: ["country", "continent"],
  specification: ["pickNumber", "tbbPickNumber", "countryPickNumber", "serialNumber", "issueBank", "issueYear", "condition", "series", "type"],
  appearance: ["imageFront", "imageReverse", "observe", "reverse", "width", "height", "signatures", "textOnNote"],
  purchase: ["purchaseDate", "pricePaid", "currencyPaid", "userNotes"]
};

let data = {};

class EditForm extends Component {
  renderFormGroup() {
    return Object.entries(BANKNOTE_FORM_GROUPS).map(([key, value]) => {
      return <FormGroup key={key} name={key} inputsName={value} data={this.props.data} />;
    });
  }

  componentDidMount() {
    this.props.fetchBanknoteModel();
  }

  fetchData() {
    const regEx = new RegExp(this.props.banknote._id.toString());

    const pathName = window.location.pathname;
    const result = regEx.test(pathName);

    if (result) {
      this.props.fetchBanknoteById(this.props.banknote._id);
    }

    return this.props.fetchBanknotes();
  }

  render() {
    {
      data = this.props.data;
    }
    return (
      <div className="add-new-banknote">
        <form
          className="form form--banknote"
          encType="multipart/form-data"
          onSubmit={e => {
            const callback = this.props.handleSubmit(values => {
              this.props
                .updateBanknote(this.props.form.values._id, values)
                .then(() => this.fetchData())
                .then(this.props.show_modal_to_edit_banknote());
              this.props.reset();
            });
            callback(e);
          }}>
          <div className="form--banknote__header">
            <h1>
              <Translate name="header.editForm" />
            </h1>
            <button className="btn" type="submit">
              <Translate name="button.submit" />
            </button>
          </div>

          {this.renderFormGroup()}
        </form>
      </div>
    );
  }
}

function validateInputs(values) {
  const errors = {};
  console.log(errors);
  if (data) {
    Object.keys(data).forEach(key => {
      if (!values[key]) {
        if (data[key].required) {
          return (errors[key] = `You must provide ${key}`);
        }
      }
    });
  }

  return errors;
}

function mapStateToProps({ form: { editForm }, banknote: { model, banknote } }) {
  return {
    form: editForm,
    data: model,
    banknote
  };
}

const mapDispatchToProps = dispatch => ({
  updateBanknote: (id, banknote) => dispatch(updateBanknote(id, banknote)),
  show_modal_to_edit_banknote: () => dispatch(show_modal_to_edit_banknote()),
  fetchBanknoteModel: () => dispatch(fetchBanknoteModel()),
  fetchBanknotes: () => dispatch(fetchBanknotes()),
  fetchBanknoteById: id => dispatch(fetchBanknoteById(id))
});

EditForm = connect(mapStateToProps, mapDispatchToProps)(EditForm);

export default reduxForm({
  form: "editForm",
  validate: validateInputs,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: true
})(EditForm);

EditForm.contextTypes = {
  translate: PropTypes.func
};
