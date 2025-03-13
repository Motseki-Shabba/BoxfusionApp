"use client";
import { useContext, useReducer } from "react";
import axios from "axios";
import { INITIAL_STATE, IUser, UserStateContext, UserActionContext } from "./context";
import { UserReducer } from "./reducer";
import { 
  getCurrentUserPending, 
  getCurrentUserSuccess, 
  getCurrentUserError
} from "./actions";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://body-vault-server-b9ede5286d4c.herokuapp.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  
  const getCurrentUser = async () => {
    dispatch(getCurrentUserPending());
    
    // Get token from sessionStorage
    const token = sessionStorage.getItem('authToken');
    
    if (!token) {
      dispatch(getCurrentUserError("No authentication token found"));
      return;
    }
    
    // Set authorization header
    axiosInstance.defaults.headers.common['Authorization'] = token;
    
    try {
      const response = await axiosInstance.get('/api/user/current');
      const responseData = response.data as { status: number; data: IUser; message?: string };
      
      if (responseData.status === 200 && responseData.data) {
        const userData: IUser = responseData.data;
        
        dispatch(getCurrentUserSuccess({
          user: userData,
          message: responseData.message || "User data retrieved successfully"
        }));
      } else {
      
        const errorMessage = responseData.message || "Failed to retrieve user data";
        dispatch(getCurrentUserError(errorMessage));
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Failed to retrieve user data";
      dispatch(getCurrentUserError(errorMessage));
      
      // If unauthorized (401), clear token
      if (error.response?.status === 401) {
        sessionStorage.removeItem('authToken');
      }
    }
  };

  return (
    <UserStateContext.Provider value={state}>
      <UserActionContext.Provider value={{ getCurrentUser }}>
        {children}
      </UserActionContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
};

export const useUserActions = () => {
  const context = useContext(UserActionContext);
  if (!context) {
    throw new Error("useUserActions must be used within a UserProvider");
  }
  return context;
};