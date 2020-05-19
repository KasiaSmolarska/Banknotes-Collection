import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import banknoteReducer from "./reducers/banknotesReducer";
import { reducer as formReducer } from "redux-form";
import alertReducer from "./reducers/alertReducer";
import statisticsReducer from "./reducers/statisticsReducer";
import { AuthState } from "./reducers/interfaces/authInterface";
import { BanknotesState } from "./reducers/interfaces/banknoteInterface";
import { AlertState } from "./reducers/interfaces/alertInterface";
import { StatisticsState } from "./reducers/interfaces/statisticsInterface";

export default combineReducers({
  auth: authReducer,
  banknote: banknoteReducer,
  form: formReducer,
  alert: alertReducer,
  statistics: statisticsReducer,
});

export interface RootState {
  auth: AuthState;
  banknote: BanknotesState;
  form: any;
  alert: AlertState;
  statistics: StatisticsState;
}
