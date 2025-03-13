"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IClientStateContext } from "./context";
import { ClientActionEnums } from "./actions";

export const ClientReducer = handleActions<IClientStateContext, IClientStateContext>(
  {
    [ClientActionEnums.createClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.createClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.createClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);