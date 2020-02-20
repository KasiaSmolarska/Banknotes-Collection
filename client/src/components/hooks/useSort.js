import React, { useState } from "react";
import { useDispatch } from "react-redux";

import actions from "../../store/actions";

export const useSort = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("title");
  const [sortDirection, setSortDirection] = useState("ASC");

  React.useEffect(() => {
    dispatch(actions.sortBanknotes(sortBy, sortDirection));
  }, [sortBy, sortDirection]);

  return {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection
  };
};
