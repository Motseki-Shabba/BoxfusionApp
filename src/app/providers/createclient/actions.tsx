"use client";
import * as reduxActions from "redux-actions";
import { IClient, IClientStateContext } from "./context";

// Action types enum
export enum ClientActionEnums {
  createClientPending = "CREATE_CLIENT_PENDING",
  createClientSuccess = "CREATE_CLIENT_SUCCESS",
  createClientError = "CREATE_CLIENT_ERROR"
}

// Create client actions
export const createClientPending = reduxActions.createAction<IClientStateContext>(
  ClientActionEnums.createClientPending,
  () => ({ 
    isPending: true, 
    isSuccess: false, 
    isError: false 
  })
);

export const createClientSuccess = reduxActions.createAction<
  IClientStateContext,
  { client: IClient; message: string }
>(
  ClientActionEnums.createClientSuccess,
  ({ client, message }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    message
  })
);

export const createClientError = reduxActions.createAction<
  IClientStateContext,
  string
>(
  ClientActionEnums.createClientError,
  (message: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  })
);