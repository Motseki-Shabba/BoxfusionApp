"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IClientLoginStateContext } from "./context";
import { ClientLoginActionEnums } from "./actions";

export const ClientLoginReducer = handleActions<IClientLoginStateContext, IClientLoginStateContext>(
  {
    [ClientLoginActionEnums.loginClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientLoginActionEnums.loginClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientLoginActionEnums.loginClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientLoginActionEnums.logoutClient]: () => INITIAL_STATE,
  },
  INITIAL_STATE
);