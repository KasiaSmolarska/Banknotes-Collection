import { SET_ALERT, REMOVE_ALERT } from "../../actions/types";

export type Alert = { id: number; msg: string; type: string };

export interface AlertState {
  alerts: Alert[];
}

export interface SetAlert {
  type: typeof SET_ALERT;
  payload: Alert;
}

export interface RemoveAlert {
  type: typeof REMOVE_ALERT;
  payload: number;
}
