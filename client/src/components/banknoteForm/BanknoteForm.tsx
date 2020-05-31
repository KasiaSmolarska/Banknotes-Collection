import React, { Component } from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { connect } from "react-redux";
import FormGroup from "../form/FormGroup";
import PropTypes from "prop-types";
import { Modal } from "../Modal";

import postBanknote from "../../store/actions/postBanknote";
import show_modal_to_add_new_banknote from "../../store/actions/show_modal_to_add_new_banknote";
import { DataType } from "../form/Input";
import { AppDispatch } from "../../store/actions";
import { BanknoteType } from "../../store/reducers/interfaces/banknoteInterface";
import { RootState } from "../../store";

const BANKNOTE_FORM_GROUPS: { [key: string]: string[] } = {
  elementary: ["title", "value", "currency", "own"],
  geolocation: ["country", "continent"],
  specification: ["pickNumber", "tbbPickNumber", "countryPickNumber", "serialNumber", "issueBank", "issueYear", "condition", "series", "type"],
  appearance: ["imageFront", "imageReverse", "observe", "reverse", "width", "height", "signatures", "textOnNote"],
  purchase: ["purchaseDate", "pricePaid", "currencyPaid", "userNotes"],
};

let data: Data | null = null;

export interface Data {
  [key: string]: DataType;
}

interface BanknoteFormComponentProps {
  data: Data | null;
  show_modal_to_add_new_banknote: () => void;
  postBanknote: (values: BanknoteType) => Promise<void>;
}

class BanknoteFormComponent extends Component<InjectedFormProps<any, BanknoteFormComponentProps> & BanknoteFormComponentProps> {
  static contextTypes = {
    translate: PropTypes.func,
  };
  renderFormGroup() {
    return Object.entries(BANKNOTE_FORM_GROUPS).map(([key, value]) => {
      return <FormGroup key={key} name={key} inputsName={value} data={this.props.data} />;
    });
  }

  render() {
    data = this.props.data;

    return (
      <form className="form form--banknote" encType="multipart/form-data">
        <Modal
          title="header.banknoteForm"
          submitText="button.submit"
          onClose={() => this.props.show_modal_to_add_new_banknote()}
          onSubmit={this.props.handleSubmit((values) => {
            this.props.postBanknote(values as BanknoteType).then(() => this.props.show_modal_to_add_new_banknote());
            this.props.reset();
          })}>
          {this.renderFormGroup()}
        </Modal>
      </form>
    );
  }
}

function validateInputs(values: { [key: string]: string }) {
  const errors: { [key: string]: string } = {};
  console.log(errors);
  if (data) {
    Object.keys(data).forEach((key) => {
      if (!values[key]) {
        if (data?.[key].required) {
          errors[key] = `You must provide ${key}`;
        }
      }
    });
  }

  return errors;
}

function mapStateToProps({ form: { banknoteForm }, banknote: { model } }: RootState) {
  return {
    form: banknoteForm,
    data: model,
  };
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  postBanknote: (banknote: BanknoteType) => dispatch(postBanknote(banknote)),
  show_modal_to_add_new_banknote: () => dispatch(show_modal_to_add_new_banknote()),
});

const BanknoteForm = connect(mapStateToProps, mapDispatchToProps)(BanknoteFormComponent);

export default reduxForm<any, BanknoteFormComponentProps>({
  form: "banknoteForm",
  validate: validateInputs,
  destroyOnUnmount: true,
})(BanknoteForm);
