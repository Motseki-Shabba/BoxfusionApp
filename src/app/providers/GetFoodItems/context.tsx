"use client";
import { createContext } from "react";

// Interface defining the shape of a Food object
export interface IFood {
  _id: string;
  name: string;
  category: string;
  servingSize: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  fiber: number;
  sodium: number;
  potassium: number;
  cholesterol: number;
  energy: number;
  date: string;
}

// Interface defining the state shape for our food context
export interface IFoodStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  foodItems: IFood[];
  message?: string;
}

// Interface defining all the actions that can be performed
export interface IFoodActionContext {
  getFoodItems: () => Promise<void>;
}

// Initial state object
export const INITIAL_STATE: IFoodStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  foodItems: []
};

// Create two separate contexts
export const FoodStateContext = createContext<IFoodStateContext>(INITIAL_STATE);
export const FoodActionContext = createContext<IFoodActionContext>({
  getFoodItems: async () => {},
});