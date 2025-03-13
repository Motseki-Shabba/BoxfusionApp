"use client";
import * as reduxActions from "redux-actions";
import { IClientRegistrationStateContext, IRegisteredClient } from "./context";

// Action types enum
export enum ClientRegistrationActionEnums {
  registerClientPending = "REGISTER_CLIENT_PENDING",
  registerClientSuccess = "REGISTER_CLIENT_SUCCESS",
  registerClientError = "REGISTER_CLIENT_ERROR"
}

// Register client actions
export const registerClientPending = reduxActions.createAction<IClientRegistrationStateContext>(
  ClientRegistrationActionEnums.registerClientPending,
  () => ({ 
    isPending: true, 
    isSuccess: false, 
    isError: false 
  })
);

export const registerClientSuccess = reduxActions.createAction<
  IClientRegistrationStateContext,
  { registeredClient: IRegisteredClient; message: string }
>(
  ClientRegistrationActionEnums.registerClientSuccess,
  ({ registeredClient, message }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    registeredClient,
    message
  })
);

export const registerClientError = reduxActions.createAction<
  IClientRegistrationStateContext,
  string
>(
  ClientRegistrationActionEnums.registerClientError,
  (message: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  })
);
