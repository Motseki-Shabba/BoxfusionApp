"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IClientStateContext } from "../GetClientsForTrainer/context";
import { ClientActionEnums } from "../GetClientsForTrainer/actions";

export const ClientReducer = handleActions<IClientStateContext, IClientStateContext>(
  {
    [ClientActionEnums.getTrainerClientsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getTrainerClientsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getTrainerClientsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);