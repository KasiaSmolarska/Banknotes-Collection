import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import actions from "../../store/actions";
import { Spinner } from "../Spinner";
import { BanknoteActions } from "./BanknoteActions";
import { Slider } from "../Slider";
import { Icon } from "../Icon";
import { getCountryName } from "../../utils/countriesCodes";
import { getCurrencyName } from "../../utils/currenciesCodes";

const getBanknote = state => state.banknote;

const listPreviewElements = [
  "issueYear",
  "issueBank",
  "continent",
  "country",
  "pickNumber",
  "tbbPickNumber",
  "countryPickNumber",
  "series",
  "observe",
  "reverse",
  "textOnNote",
  "type",
  "width",
  "height",
  "signatures",
  "serialNumber",
  "condition",
  "purchaseDate",
  "pricePaid",
  "currencyPaid"
];

export const BanknotePreview = ({ match, history }, context) => {
  const { banknoteId } = match.params;
  const dispatch = useDispatch();

  const { banknote, loading, model } = useSelector(getBanknote);

  useEffect(() => {
    dispatch(actions.clearBanknoteData());
    dispatch(actions.fetchBanknoteById(banknoteId, history));
  }, [dispatch, banknoteId, history]);


  useEffect(() => {
    if(model === null){
      dispatch(actions.fetchBanknoteModel())
    }
  }, [dispatch, model]);

  return (
    <div>
      <div>
        <span className="btn" onClick={() => history.goBack()}>
          {context.translate("button.goBack")}
        </span>
      </div>

      {Object.keys(banknote).length > 0 && !loading ? (
        <div className="preview">
          <div className="preview__container">
            <Slider images={[`/api/upload/image/${banknote.imageFront}`, `/api/upload/image/${banknote.imageReverse}`]} />
            <h1 className="preview__title"> {banknote.title}</h1>
            <div className="preview__countryFullName">
              {getCountryName(banknote.country)} - {banknote.value} {getCurrencyName(banknote.currency)}
            </div>
            <div className="preview__value py-1">
              {banknote.value} {banknote.currency}
            </div>
            <div className="preview__divider"></div>
            {banknote.userNotes && (
              <>
                <div className="preview__description">{banknote.userNotes}</div>
                <div className="preview__divider"></div>
              </>
            )}

            <div className="preview__specification py-1">
              {Object.entries(banknote).map(([key, value]) => {
                return listPreviewElements.map(row => {
                  if (row === key) {
                    return (
                      <div key={key} className={`preview__row preview__${key}`}>
                        <div className="preview__label">
                          <span className="hidden-xs">{context.translate(`label.banknoteForm.${key}`)}:</span>
                          <span className="preview__element-value">{value}</span>
                        </div>
                      </div>
                    );
                  }
                  return false;
                });
              })}
            </div>
            <div className="preview__divider"></div>
            <div className="preview__own">
              <div className="preview__label preview__label--own">
                <span>{context.translate(`label.banknoteForm.own`)}:</span>
                {banknote.own ? (
                  <span className="preview__element-value preview__element-value--owned">
                    <Icon icon="CheckMarkIcon" /> {context.translate(`label.banknoteForm.own.true`)}
                  </span>
                ) : (
                  <span className="preview__element-value preview__element-value--not-owned">
                    <Icon icon="CrossIcon" /> {context.translate(`label.banknoteForm.own.false`)}
                  </span>
                )}
              </div>
            </div>
            <div className="preview__divider"></div>
            <BanknoteActions id={banknote._id} title={banknote.title} favorite={banknote.favorite} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

BanknotePreview.contextTypes = {
  translate: PropTypes.func
};
