"use client";
import { useContext, useReducer } from "react";
import axios from "axios";
import { INITIAL_STATE, IClient, ClientStateContext, ClientActionContext } from "./context";
import { ClientReducer } from "./reducer";
import { 
  createClientPending, 
  createClientSuccess, 
  createClientError
} from "./actions";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://body-vault-server-b9ede5286d4c.herokuapp.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ClientReducer, INITIAL_STATE);
  
  const createClient = async (clientData: IClient) => {
    dispatch(createClientPending());
    
    // Get token from sessionStorage
    const token = sessionStorage.getItem('authToken');
    
    if (!token) {
      dispatch(createClientError("No authentication token found"));
      return;
    }
    
    // Set authorization header
    axiosInstance.defaults.headers.common['Authorization'] = token;
    
    try {
      const response = await axiosInstance.post('/api/client', clientData);
      const responseData = response.data as { status?: number; message?: string };
      
      if (response.status === 201 || responseData.status === 201) {
        dispatch(createClientSuccess({
          client: clientData,
          message: responseData.message || "Client created successfully"
        }));
      } else {
        const errorMessage = responseData.message || "Failed to create client";
        dispatch(createClientError(errorMessage));
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Failed to create client";
      dispatch(createClientError(errorMessage));
      
      // If unauthorized (401), clear token
      if (error.response?.status === 401) {
        sessionStorage.removeItem('authToken');
      }
    }
  };

  return (
    <ClientStateContext.Provider value={state}>
      <ClientActionContext.Provider value={{ createClient }}>
        {children}
      </ClientActionContext.Provider>
    </ClientStateContext.Provider>
  );
};

export const useClientState = () => {
  const context = useContext(ClientStateContext);
  if (!context) {
    throw new Error("useClientState must be used within a ClientProvider");
  }
  return context;
};

export const useClientActions = () => {
  const context = useContext(ClientActionContext);
  if (!context) {
    throw new Error("useClientActions must be used within a ClientProvider");
  }
  return context;
};