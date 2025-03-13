"use client";
import React, { useReducer, useCallback, ReactNode } from 'react';
import { 
  FoodStateContext, 
  FoodActionContext, 
  INITIAL_STATE 
} from './context';
import { FoodReducer } from './reducer';
import { 
  getFoodItemsPending, 
  getFoodItemsSuccess, 
  getFoodItemsError 
} from './actions';
import { fetchFoodItems } from './provider';

interface FoodProviderProps {
  children: ReactNode;
}

const FoodProvider: React.FC<FoodProviderProps> = ({ children }) => {
  // Set up reducer
  const [state, dispatch] = useReducer(FoodReducer, INITIAL_STATE);
  
  // Define the action to get food items
  const getFoodItems = useCallback(async () => {
    try {
      // Dispatch pending action
      dispatch(getFoodItemsPending());
      
      // Fetch food items
      const response = await fetchFoodItems();
      const typedResponse = response as { status: number; data: any; message: string };
      
      // Check for successful response
      if (typedResponse.status === 200) {
        dispatch(getFoodItemsSuccess({
          foodItems: typedResponse.data,
          message: typedResponse.message
        }));
      } else {
        const errorResponse = response as { message: string };
        dispatch(getFoodItemsError(errorResponse.message || 'Failed to fetch food items'));
      }
    } catch (error: any) {
      dispatch(getFoodItemsError(error.message || 'Unknown error occurred'));
    }
  }, []);
  
  return (
    <FoodStateContext.Provider value={state}>
      <FoodActionContext.Provider value={{ getFoodItems }}>
        {children}
      </FoodActionContext.Provider>
    </FoodStateContext.Provider>
  );
};

export default FoodProvider;