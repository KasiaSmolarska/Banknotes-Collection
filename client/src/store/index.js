import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import banknoteReducer from "./reducers/banknotesReducer";
import { reducer as formReducer } from "redux-form";
import alertReducer from "./reducers/alertReducer";

export default combineReducers({
  auth: authReducer,
  banknote: banknoteReducer,
  form: formReducer,
  alert: alertReducer
});
