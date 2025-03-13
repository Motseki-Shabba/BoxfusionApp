"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IUserStateContext } from "./context";
import { UserActionEnums } from "./actions";

export const UserReducer = handleActions<IUserStateContext, IUserStateContext>(
  {
    [UserActionEnums.getCurrentUserPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [UserActionEnums.getCurrentUserSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [UserActionEnums.getCurrentUserError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);