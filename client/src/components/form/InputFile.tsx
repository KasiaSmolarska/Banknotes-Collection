import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Translate from "../../translate/Translate";
import { WrappedFieldProps } from "redux-form";
import { BanknoteType } from "../../store/reducers/interfaces/banknoteInterface";
import { RootState } from "../../store";

interface CheckboxProps extends WrappedFieldProps {
  banknote: BanknoteType;
  showedModalToEditBanknote: boolean;
}

class InputFile extends React.Component<CheckboxProps> {
  static contextTypes = {
    translate: PropTypes.func,
  };

  constructor(props: CheckboxProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  state = {
    url: "no-photo.jpg",
  };

  componentDidMount() {
    const { showedModalToEditBanknote, banknote, input } = this.props;
    if (!showedModalToEditBanknote) {
      return;
    }
    // @ts-ignore
    if (!banknote[input.name]) {
      return;
    }
    // @ts-ignore
    this.setState({ url: banknote[input.name] });
  }

  onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { input } = this.props;
    const targetFile = e?.target?.files?.[0];

    if (targetFile) {
      var data = new FormData();
      data.append("file", targetFile);
      fetch("/api/upload/image", {
        method: "POST",
        body: data,
      })
        .then((val) => {
          return val
            .text()
            .then((photoName) => {
              input.onChange(photoName);
              this.setState({ url: `thumb-${photoName}` });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      input.onChange(null);
    }
  };

  render() {
    const {
      input,
      meta: { touched, error, form },
      showedModalToEditBanknote,
      banknote,
    } = this.props;
    return (
      <div className="form__control form__control--file">
        <div className="form__image">
          <img className="form__image-file" src={"/api/upload/image/" + this.state.url} alt={this.state.url} />
        </div>
        <input name={input.name} onChange={this.onChange} accept=".jpg, .png, .jpeg" className="form__input" type="file" />
        <label className="form__label form__label--file">
          {/* 
            // @ts-ignore */}
          {showedModalToEditBanknote && banknote[input.name] ? <Translate name={`label.${form}.${input.name}.change`} /> : <Translate name={`label.${form}.${input.name}`} />}
        </label>

        <div className="form__alert" style={{ height: "1rem", marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ banknote }: RootState) => ({
  showedModalToEditBanknote: banknote.showedModalToEditBanknote,
  banknote: banknote.banknote,
});
export default connect(mapStateToProps)(InputFile);
