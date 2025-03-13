"use client";
import * as reduxActions from "redux-actions";
import { IUser, ILoginStateContext } from "./context";

// Action types enum
export enum LoginActionEnums {
  loginUserPending = "LOGIN_USER_PENDING",
  loginUserSuccess = "LOGIN_USER_SUCCESS",
  loginUserError = "LOGIN_USER_ERROR",
  logoutUser = "LOGOUT_USER"
}

// Login user actions
export const loginUserPending = reduxActions.createAction<ILoginStateContext>(
  LoginActionEnums.loginUserPending,
  () => ({ 
    isPending: true, 
    isSuccess: false, 
    isError: false,
    isAuthenticated: false 
  })
);

export const loginUserSuccess = reduxActions.createAction<
  ILoginStateContext,
  { user: IUser; message: string }
>(
  LoginActionEnums.loginUserSuccess,
  ({ user, message }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    isAuthenticated: true,
    user,
    message
  })
);

export const loginUserError = reduxActions.createAction<
  ILoginStateContext,
  string
>(
  LoginActionEnums.loginUserError,
  (message: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    isAuthenticated: false,
    message
  })
);

export const logoutUser = reduxActions.createAction<ILoginStateContext>(
  LoginActionEnums.logoutUser,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: false,
    isAuthenticated: false,
    user: undefined,
    message: "Logged out successfully"
  })
);