import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import banknoteReducer from "./reducers/banknotesReducer";
import { reducer as formReducer } from "redux-form";
import alertReducer from "./reducers/alertReducer";
import statisticsReducer from "./reducers/statisticsReducer"

export interface ActionTypes {
  type: string;
  payload: any;
}

export default combineReducers({
  auth: authReducer,
  banknote: banknoteReducer,
  form: formReducer,
  alert: alertReducer,
  statistics: statisticsReducer
});
