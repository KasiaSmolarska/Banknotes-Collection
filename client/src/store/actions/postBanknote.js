import axios from "axios";

const postBanknote = values => async dispatch => {
  await axios.post("/api/banknote", values);
};

export default postBanknote;
