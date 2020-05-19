import { FETCH_USER, LOG_OUT_USER, DELETE_ACCOUNT } from "../../actions/types";

type User = {
  _id?: string;
  googleId?: string;
  picture?: string;
  familyName?: string;
  given_name?: string;
};

export interface AuthState {
  user: User | null | boolean;
  loading: Boolean;
}

export interface FetchUser {
  type: typeof FETCH_USER;
  payload: {
    user: User;
  };
}

export interface DeleteAccount {
  type: typeof DELETE_ACCOUNT;
}

export interface LogOutUser {
  type: typeof LOG_OUT_USER;
}
