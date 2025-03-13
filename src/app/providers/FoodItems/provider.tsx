"use client";
import React, { useReducer, useCallback } from "react";
import axios from "axios";
import { FoodStateContext, FoodActionContext, INITIAL_STATE, IFood, INewFood } from "./context";
import { FoodReducer } from "./reducer";
import { 
  getFoodItemsPending, 
  getFoodItemsSuccess, 
  getFoodItemsError,
  addFoodItemPending,
  addFoodItemSuccess,
  addFoodItemError
} from "./actions";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://body-vault-server-b9ede5286d4c.herokuapp.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const FoodItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(FoodReducer, INITIAL_STATE);

  // Get token and set headers helper
  const setupAuthHeader = () => {
    const token = sessionStorage.getItem('authToken');
    
    if (!token) {
      throw new Error("No authentication token found");
    }
    
    axiosInstance.defaults.headers.common['Authorization'] = token;
  };

  // Get Food Items
  const getFoodItems = useCallback(async () => {
    dispatch(getFoodItemsPending());
    
    try {
      setupAuthHeader();
      const response = await axiosInstance.get('/api/food');
      
      // Type assertion to ensure the response data is an array of IFood
      const foodItems = response.data as IFood[];
      
      dispatch(getFoodItemsSuccess({ 
        foodItems, 
        message: "Food items retrieved successfully" 
      }));
    } catch (error: any) {
      console.error("Error fetching food items:", error);
      
      if (error.response?.status === 401) {
        sessionStorage.removeItem('authToken');
      }
      
      dispatch(getFoodItemsError(error.message || "Failed to fetch food items"));
    }
  }, []);

  // Add Food Item
  const addFoodItem = useCallback(async (newFood: INewFood): Promise<IFood | void> => {
    dispatch(addFoodItemPending());
    
    try {
      setupAuthHeader();
      const response = await axiosInstance.post('/api/food', newFood);
      
      // Type assertion to treat the response data as IFood
      const addedFood = response.data as IFood;
      
      dispatch(addFoodItemSuccess({
        foodItem: addedFood,
        message: "Food item created successfully",
        existingItems: state.foodItems
      }));
      
      return addedFood;
    } catch (error: any) {
      console.error("Error adding food item:", error);
      
      if (error.response?.status === 401) {
        sessionStorage.removeItem('authToken');
      }
      
      dispatch(addFoodItemError(error.message || "Failed to add food item"));
    }
  }, [state.foodItems]);

  return (
    <FoodStateContext.Provider value={state}>
      <FoodActionContext.Provider value={{ getFoodItems, addFoodItem }}>
        {children}
      </FoodActionContext.Provider>
    </FoodStateContext.Provider>
  );
};