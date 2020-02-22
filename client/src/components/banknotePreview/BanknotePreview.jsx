import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../store/actions";
import { Link } from "react-router-dom";
import { Spinner } from "../Spinner";
import { BanknoteActions } from "./BanknoteActions";
import { Slider } from "../Slider";

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

export const BanknotePreview = ({ match, history }) => {
  const { banknoteId } = match.params;
  const dispatch = useDispatch();

  const { banknote, loading } = useSelector(getBanknote);

  useEffect(() => {
    dispatch(actions.clearBanknoteData());
    dispatch(actions.fetchBanknoteById(banknoteId, history));
  }, []);

  return (
    <div>
      <div>
        <Link className="btn" to="/dashboard">
          Go back
        </Link>
      </div>

      {Object.keys(banknote).length > 0 && !loading ? (
        <div className="preview">
          <div className="preview__container">
            <Slider images={[`/api/upload/image/${banknote.imageFront}`, `/api/upload/image/${banknote.imageReverse}`]} />
            <h1 className="preview__title"> {banknote.title}</h1>
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
                          <span className="hidden-xs">{key}:</span>
                          <span className="preview__element-value">{value}</span>
                        </div>
                      </div>
                    );
                  }
                });
              })}
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
