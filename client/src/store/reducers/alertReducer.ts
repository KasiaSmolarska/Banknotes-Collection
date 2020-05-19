import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
import { ActionTypes } from "../index";

const initialState = {
  alerts: [],
};

interface AlertState {
  alerts: { id: number }[];
}

const alertReducer = (state: AlertState = initialState, action: ActionTypes) => {
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
