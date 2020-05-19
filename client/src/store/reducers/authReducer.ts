import { FETCH_USER, LOG_OUT_USER, DELETE_ACCOUNT } from "../actions/types";
import { FetchUser, DeleteAccount, AuthState, LogOutUser } from "./interfaces/authInterface";

const initial_state = {
  user: null,
  loading: true,
};


export type AuthActionTypes = FetchUser | DeleteAccount | LogOutUser;

export default function (state: AuthState = initial_state, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload.user ? action.payload.user : false,
        loading: false,
      };
    case DELETE_ACCOUNT:
    case LOG_OUT_USER:
      return {
        ...state,
        user: false,
        loading: false,
      };
    default:
      return state;
  }
}
