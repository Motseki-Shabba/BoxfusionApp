"use client";
import * as reduxActions from "redux-actions";
import { IUser, IUserStateContext } from "./context";

// Action types enum
export enum UserActionEnums {
  getCurrentUserPending = "GET_CURRENT_USER_PENDING",
  getCurrentUserSuccess = "GET_CURRENT_USER_SUCCESS",
  getCurrentUserError = "GET_CURRENT_USER_ERROR"
}

// Get current user actions
export const getCurrentUserPending = reduxActions.createAction<IUserStateContext>(
  UserActionEnums.getCurrentUserPending,
  () => ({ 
    isPending: true, 
    isSuccess: false, 
    isError: false 
  })
);

export const getCurrentUserSuccess = reduxActions.createAction<
  IUserStateContext,
  { user: IUser; message: string }
>(
  UserActionEnums.getCurrentUserSuccess,
  ({ user, message }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    user,
    message
  })
);

export const getCurrentUserError = reduxActions.createAction<
  IUserStateContext,
  string
>(
  UserActionEnums.getCurrentUserError,
  (message: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  })
);