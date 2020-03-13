import React, { useEffect } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Checkboxes } from "./filters/Checkboxes";
import actions from "../store/actions";
import PropTypes from "prop-types";
import Translate from "../translate/Translate";
import Range from "./form/Range";
import { Field } from "redux-form";

const checkIfStatisticsAreFilled = stats => {
  let isFilled = true;
  for (let i = 0; i < Object.values(stats).length; i++) {
    const stat = Object.values(stats)[i];

    if (stat.length < 2) {
      isFilled = false;
      break;
    }
  }
  return isFilled;
};

class Filters extends React.Component {
  render() {
    const { banknote } = this.props.statistics;
    const filters = this.props.filters;

    const { countries, currencies, continents, values, issueYears } = banknote;

    return (
      <div>
        <form
          className="form form--filters"
          encType="multipart/form-data"
          onSubmit={e => {
            const callback = this.props.handleSubmit(values => {
              this.props.filterBanknotes(values);
              // this.props.reset();
            });
            callback(e);
          }}>
          {values && values.length > 1 && (
            <div className="form--filters__container">
              <Field component={Range} min={0.1} name="value" id="value" max={values[0]._id} />
            </div>
          )}
          {issueYears && issueYears.length > 1 && (
            <div className="form--filters__container">
              <Field component={Range} name="issueYear" id="issueYear" min={issueYears[issueYears.length - 1]._id} max={issueYears[0]._id} step={2} />
            </div>
          )}

          {countries && countries.length > 1 && <Checkboxes name="country" trigger="countries" data={countries.map(country => country._id).sort()} shortcut={true} />}

          {currencies && currencies.length > 1 && <Checkboxes name="currency" trigger="currencies" data={currencies.map(currency => currency._id).sort()} shortcut={true} />}

          {continents && continents.length > 1 && <Checkboxes name="continent" trigger="continents" data={continents ? continents.map(continent => continent._id).sort() : []} shortcut={false} />}

          {!checkIfStatisticsAreFilled(banknote) ? (
            <div className="form--filters__container">
              <div className="text"><Translate name="filter.noFilterInfo" /></div>
            </div>
          ) : null}

          {Object.keys(filters).length ? (
            <button type="submit" className="modal__foter-submit btn btn--blue">
              <Translate name="button.submit" />
            </button>
          ) : null}
        </form>
      </div>
    );
  }
}

function mapStateToProps({ form: { filtersForm }, banknote: { filters }, statistics }) {
  return {
    form: filtersForm,
    statistics,
    filters
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
