"use client";
import * as reduxActions from "redux-actions";
import { IFood, IFoodStateContext } from "./context";

// Action types enum
export enum FoodActionEnums {
  getFoodItemsPending = "GET_FOOD_ITEMS_PENDING",
  getFoodItemsSuccess = "GET_FOOD_ITEMS_SUCCESS",
  getFoodItemsError = "GET_FOOD_ITEMS_ERROR",
  addFoodItemPending = "ADD_FOOD_ITEM_PENDING",
  addFoodItemSuccess = "ADD_FOOD_ITEM_SUCCESS",
  addFoodItemError = "ADD_FOOD_ITEM_ERROR"
}

// Get food items actions
export const getFoodItemsPending = reduxActions.createAction<IFoodStateContext>(
  FoodActionEnums.getFoodItemsPending,
  () => ({ 
    isPending: true, 
    isSuccess: false, 
    isError: false,
    foodItems: [] 
  })
);

export const getFoodItemsSuccess = reduxActions.createAction<
  IFoodStateContext,
  { foodItems: IFood[]; message: string }
>(
  FoodActionEnums.getFoodItemsSuccess,
  ({ foodItems, message }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    foodItems,
    message
  })
);

export const getFoodItemsError = reduxActions.createAction<
  IFoodStateContext,
  string
>(
  FoodActionEnums.getFoodItemsError,
  (message: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    foodItems: [],
    message
  })
);

// Add food item actions
export const addFoodItemPending = reduxActions.createAction<IFoodStateContext>(
  FoodActionEnums.addFoodItemPending,
  () => ({ 
    isPending: true, 
    isSuccess: false, 
    isError: false,
    foodItems: [] 
  })
);

export const addFoodItemSuccess = reduxActions.createAction<
  IFoodStateContext,
  { foodItem: IFood; message: string; existingItems: IFood[] }
>(
  FoodActionEnums.addFoodItemSuccess,
  ({ foodItem, message, existingItems }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    foodItems: [...existingItems, foodItem],
    message
  })
);

export const addFoodItemError = reduxActions.createAction<
  IFoodStateContext,
  string
>(
  FoodActionEnums.addFoodItemError,
  (message: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    foodItems: [],
    message
  })
);