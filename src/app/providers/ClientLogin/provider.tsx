"use client";
import { useContext, useReducer } from "react";
import axios from "axios";
import { 
  INITIAL_STATE, 
  IClientLogin,
  ClientLoginStateContext, 
  ClientLoginActionContext 
} from "./context";
import { ClientLoginReducer } from "./reducer";
import { 
  loginClientPending, 
  loginClientSuccess, 
  loginClientError,
  logoutClient
} from "./actions";

const axiosInstance = axios.create({
  baseURL: 'https://body-vault-server-b9ede5286d4c.herokuapp.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const ClientLoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ClientLoginReducer, INITIAL_STATE);
  
  const loginClient = async (loginData: IClientLogin) => {
    dispatch(loginClientPending());
    
    try {
      const response = await axiosInstance.post('/api/users/login', loginData);
      const responseData = response.data as { token: string, user: { id: string, email: string, name: string }, message?: string };
      
      if (response.status === 200 && responseData.token) {
        const client = {
          id: responseData.user.id,
          email: responseData.user.email,
          name: responseData.user.name,
          token: responseData.token
        };
        
        // Store token in sessionStorage
        sessionStorage.setItem('authToken', responseData.token);
        
        dispatch(loginClientSuccess({
          client,
          message: "Login successful"
        }));
      } else {
        dispatch(loginClientError(responseData.message || "Login failed"));
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || "Login failed";
      dispatch(loginClientError(errorMessage));
    }
  };

  const logoutClientHandler = () => {
    sessionStorage.removeItem('authToken');
    dispatch(logoutClient());
  };

  return (
    <ClientLoginStateContext.Provider value={state}>
      <ClientLoginActionContext.Provider value={{ 
        loginClient,
        logoutClient: logoutClientHandler
      }}>
        {children}
      </ClientLoginActionContext.Provider>
    </ClientLoginStateContext.Provider>
  );
};

export const useClientLoginState = () => {
  const context = useContext(ClientLoginStateContext);
  if (!context) {
    throw new Error("useClientLoginState must be used within a ClientLoginProvider");
  }
  return context;
};

export const useClientLoginActions = () => {
  const context = useContext(ClientLoginActionContext);
  if (!context) {
    throw new Error("useClientLoginActions must be used within a ClientLoginProvider");
  }
  return context;
};