import React from "react";
import PropTypes from "prop-types";

import Translate from "../../translate/Translate";

class InputFile extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = async e => {
    const { input } = this.props;
    const targetFile = e.target.files[0];

    if (targetFile) {
      var data = new FormData();
      data.append("file", targetFile);
      fetch("/api/upload/image", {
        method: "POST",
        body: data
      })
        .then(function(val) {
          val
            .json()
            .then(val => {
              input.onChange(val);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } else {
      input.onChange(null);
    }
  };

  render() {
    const {
      input,
      meta: { touched, error, form }
    } = this.props;
    return (
      <div className="form__control">
        <input name={input.name} onChange={this.onChange} accept=".jpg, .png, .jpeg" className="form__input" type="file" />
        <label className="form__label">
          <Translate name={`label.${form}.${input.name}`} />
        </label>
        <div className="form__alert" style={{ height: "1rem", marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  }
}

export default InputFile;

InputFile.contextTypes = {
  translate: PropTypes.func
};
