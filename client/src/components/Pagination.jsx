import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../store/actions";

const getBanknote = state => state.banknote;

const PaginationButton = ({ index, onClick, classClicked }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(actions.setPaginationSkip(ref.current.dataset.value));
        onClick();
      }}
      ref={ref}
      data-value={index}
      className={`btn btn--small ${classClicked}`}>
      {index + 1}
    </div>
  );
};

export const Pagination = () => {
  const { limit, numberOfProduct } = useSelector(getBanknote);

  const [buttonClicked, setButtonClicked] = useState(0);

  const numberOfButtons = Array.from(Array(Math.ceil(numberOfProduct / limit)).keys());
  return (
    <div className="pagination">
      {numberOfButtons.map(index => (
        <PaginationButton classClicked={index === buttonClicked ? "btn--blue" : ""} onClick={() => setButtonClicked(index)} index={index} key={index} />
      ))}
    </div>
  );
};
