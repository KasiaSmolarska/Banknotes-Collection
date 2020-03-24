import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../store/actions";

const getBanknote = state => state.banknote;

const PaginationButton = ({ index, onClick, classClicked }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { limit, skip } = useSelector(getBanknote);

  return (
    <div
      onClick={() => {
        dispatch(actions.setPaginationSkip(ref.current.dataset.value));
      }}
      ref={ref}
      data-value={index}
      className={`btn btn--round-small btn--pagination ${skip / limit === index ? "btn--blue" : ""}`}>
      {index + 1}
    </div>
  );
};

export const Pagination = () => {
  const { limit, numberOfProduct } = useSelector(getBanknote);

  const numberOfButtons = Array.from(Array(Math.ceil(numberOfProduct / limit)).keys());
  return (
    <div className="pagination">
      {numberOfButtons.map(index => (
        <PaginationButton index={index} key={index} />
      ))}
    </div>
  );
};
