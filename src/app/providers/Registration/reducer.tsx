"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, ITrainerStateContext } from "./context";
import { TrainerActionEnums } from "./actions";

export const TrainerReducer = handleActions<ITrainerStateContext, ITrainerStateContext>(
  {
    [TrainerActionEnums.registerTrainerPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.registerTrainerSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TrainerActionEnums.registerTrainerError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);