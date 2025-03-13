"use client";
import * as reduxActions from "redux-actions";
import { IClientLoginStateContext, ILoggedInClient, INITIAL_STATE } from "./context";

export enum ClientLoginActionEnums {
  loginClientPending = "LOGIN_CLIENT_PENDING",
  loginClientSuccess = "LOGIN_CLIENT_SUCCESS",
  loginClientError = "LOGIN_CLIENT_ERROR",
  logoutClient = "LOGOUT_CLIENT"
}

export const loginClientPending = reduxActions.createAction<IClientLoginStateContext>(
  ClientLoginActionEnums.loginClientPending,
  () => ({ 
    isPending: true, 
    isSuccess: false, 
    isError: false 
  })
);

export const loginClientSuccess = reduxActions.createAction<
  IClientLoginStateContext,
  { client: ILoggedInClient; message: string }
>(
  ClientLoginActionEnums.loginClientSuccess,
  ({ client, message }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    client,
    message
  })
);

export const loginClientError = reduxActions.createAction<
  IClientLoginStateContext,
  string
>(
  ClientLoginActionEnums.loginClientError,
  (message: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  })
);

export const logoutClient = reduxActions.createAction(
  ClientLoginActionEnums.logoutClient,
  () => INITIAL_STATE
);