import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
import { SetAlert, RemoveAlert, AlertState } from "./interfaces/alertInterface";

const initialState = {
  alerts: [],
};

export type AlertActionTypes = SetAlert | RemoveAlert;

const alertReducer = (state: AlertState = initialState, action: AlertActionTypes): AlertState => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    default:
      return state;
  }
};

export default alertReducer;
