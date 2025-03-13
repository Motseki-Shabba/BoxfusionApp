"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IFoodStateContext } from "./context";
import { FoodActionEnums } from "./actions";

export const FoodReducer = handleActions<IFoodStateContext, IFoodStateContext>(
  {
    [FoodActionEnums.getFoodItemsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getFoodItemsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getFoodItemsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);