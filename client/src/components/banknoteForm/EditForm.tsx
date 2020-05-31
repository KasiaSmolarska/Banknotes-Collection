import React, { Component } from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { connect } from "react-redux";

import FormGroup from "../form/FormGroup";
import PropTypes from "prop-types";

import updateBanknote from "../../store/actions/updateBanknote";
import show_modal_to_edit_banknote from "../../store/actions/show_modal_to_edit_banknote";
import fetchBanknoteModel from "../../store/actions/fetchBanknoteModel";
import fetchBanknotes from "../../store/actions/fetchBanknotes";
import fetchBanknoteById from "../../store/actions/fetchBanknoteById";

import { Modal } from "../Modal";
import { Data } from "./BanknoteForm";
import { BanknoteType } from "../../store/reducers/interfaces/banknoteInterface";
import { RootState } from "../../store";
import { AppDispatch } from "../../store/actions";

const BANKNOTE_FORM_GROUPS = {
  elementary: ["title", "value", "currency", "own"],
  geolocation: ["country", "continent"],
  specification: ["pickNumber", "tbbPickNumber", "countryPickNumber", "serialNumber", "issueBank", "issueYear", "condition", "series", "type"],
  appearance: ["imageFront", "imageReverse", "observe", "reverse", "width", "height", "signatures", "textOnNote"],
  purchase: ["purchaseDate", "pricePaid", "currencyPaid", "userNotes"],
};

let data: Data | null = null;

interface EditFormComponentProps {
  data: Data | null;
  fetchBanknoteModel: () => void;
  fetchBanknotes: () => Promise<void>;
  fetchBanknoteById: (id: string) => void;
  updateBanknote: (id: string, values: BanknoteType) => Promise<void>;
  show_modal_to_edit_banknote: () => void;
  banknote: BanknoteType;
  form: {
    values: {
      _id: string;
    };
  };
}

class EditFormComponent extends Component<InjectedFormProps<any, EditFormComponentProps> & EditFormComponentProps> {
  static contextTypes = {
    translate: PropTypes.func,
  };

  renderFormGroup() {
    return Object.entries(BANKNOTE_FORM_GROUPS).map(([key, value]) => {
      return <FormGroup key={key} name={key} inputsName={value} data={this.props.data} />;
    });
  }

  componentDidMount() {
    this.props.fetchBanknoteModel();
  }

  fetchData(): Promise<void> {
    if (this.props.banknote && this.props.banknote._id) {
      const regEx: RegExp = new RegExp((this.props?.banknote?._id).toString());
      const pathName: string = window.location.pathname;
      const result: boolean = regEx.test(pathName);
      if (result) {
        this.props.fetchBanknoteById(this.props.banknote._id);
      }
    }

    return this.props.fetchBanknotes();
  }

  render() {
    data = this.props.data;

    return (
      <form className="form form--banknote" encType="multipart/form-data">
        <Modal
          title="header.editForm"
          submitText="button.update"
          onClose={() => this.props.show_modal_to_edit_banknote()}
          onSubmit={(e: React.SyntheticEvent) => {
            const callback = this.props.handleSubmit((values) => {
              this.props
                .updateBanknote(this.props.form.values._id, values)
                .then(() => this.fetchData())
                .then(() => this.props.show_modal_to_edit_banknote());
              this.props.reset();
            });
            callback(e);
          }}>
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

function mapStateToProps({ form: { editForm }, banknote: { model, banknote } }: RootState) {
  return {
    form: editForm,
    data: model,
    banknote,
  };
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateBanknote: (id: string, banknote: BanknoteType) => dispatch(updateBanknote(id, banknote)),
  show_modal_to_edit_banknote: () => dispatch(show_modal_to_edit_banknote()),
  fetchBanknoteModel: () => dispatch(fetchBanknoteModel()),
  fetchBanknotes: () => dispatch(fetchBanknotes()),
  fetchBanknoteById: (id: string) => dispatch(fetchBanknoteById(id)),
});

const EditForm = connect(mapStateToProps, mapDispatchToProps)(EditFormComponent);

export default reduxForm<any, EditFormComponentProps>({
  form: "editForm",
  validate: validateInputs,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: true,
})(EditForm);
