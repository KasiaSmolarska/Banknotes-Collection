import React, { useEffect } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Checkboxes } from "./filters/Checkboxes";
import actions from "../store/actions"

class Filters extends React.Component {
  render() {
    const {
      banknote: { countries }
    } = this.props.statistics;
    return (
      <div>
        <form className="form form--filters" encType="multipart/form-data" onSubmit={e => {
            const callback = this.props.handleSubmit(values => {
              this.props.filterBanknotes(values);
              // this.props.reset();
              console.log(values)
            });
            callback(e);
          }}>
          <Checkboxes name="country" trigger="countries" data={countries ? countries.map(country => country._id) : []} />

          <button type="submit" className="modal__foter-submit btn btn--blue">
             wyślij
            </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ form: { filtersForm }, banknote: { model, banknote }, statistics }) {
  return {
    form: filtersForm,
    statistics
  };
}

const mapDispatchToProps = dispatch => ({
  filterBanknotes: (query) => dispatch(actions.filterBanknotes(query)),
});

Filters = connect(mapStateToProps, mapDispatchToProps)(Filters);

export default reduxForm({
  form: "filtersForm",
  destroyOnUnmount: true
})(Filters);
