"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IClientRegistrationStateContext } from "./context";
import { ClientRegistrationActionEnums } from "./actions";

export const ClientRegistrationReducer = handleActions<IClientRegistrationStateContext, IClientRegistrationStateContext>(
  {
    [ClientRegistrationActionEnums.registerClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientRegistrationActionEnums.registerClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientRegistrationActionEnums.registerClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);