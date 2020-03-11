import React, { useEffect } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Checkboxes } from "./filters/Checkboxes";
import actions from "../store/actions";
import PropTypes from "prop-types";
import Translate from "../translate/Translate";
import Range from "./form/Range";
import { Field } from "redux-form";

class Filters extends React.Component {
  render() {
    const {
      banknote: { countries, currencies, continents, values }
    } = this.props.statistics;

    return (
      <div>
        <form
          className="form form--filters"
          encType="multipart/form-data"
          onSubmit={e => {
            const callback = this.props.handleSubmit(values => {
              this.props.filterBanknotes(values);
              // this.props.reset();
              console.log(values);
            });
            callback(e);
          }}>

         {values && <div className="form--filters__container"><Field component={Range} name="value" id="value" max={values[0]._id} /></div> }
          
          <Checkboxes name="country" trigger="countries" data={countries ? countries.map(country => country._id) : []} shortcut={true} />

          <Checkboxes name="currency" trigger="currencies" data={currencies ? currencies.map(currency => currency._id) : []} shortcut={true} />

          <Checkboxes name="continent" trigger="continents" data={continents ? continents.map(continent => continent._id) : []} shortcut={false} />

          <button type="submit" className="modal__foter-submit btn btn--blue">
            <Translate name="button.submit" />
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
  filterBanknotes: query => dispatch(actions.filterBanknotes(query))
});

Filters = connect(mapStateToProps, mapDispatchToProps)(Filters);

export default reduxForm({
  form: "filtersForm",
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false
})(Filters);

Filters.contextTypes = {
  translate: PropTypes.func
};
