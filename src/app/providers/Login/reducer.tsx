"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, ILoginStateContext } from "./context";
import { LoginActionEnums } from "./actions";

export const LoginReducer = handleActions<ILoginStateContext, ILoginStateContext>(
  {
    [LoginActionEnums.loginUserPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LoginActionEnums.loginUserSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LoginActionEnums.loginUserError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LoginActionEnums.logoutUser]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);