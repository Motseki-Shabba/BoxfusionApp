"use client";
import { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { INITIAL_STATE, ILoginCredentials, IUser, LoginStateContext, LoginActionContext } from "./context";
import { LoginReducer } from "./reducer";
import { 
  loginUserPending, 
  loginUserSuccess, 
  loginUserError,
  logoutUser
} from "./actions";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://body-vault-server-b9ede5286d4c.herokuapp.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE);
  
  // Check if user is already logged in on initial load
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const userStr = sessionStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as IUser;
        dispatch(loginUserSuccess({
          user: {
            ...user,
            token
          },
          message: "Authentication restored"
        }));
        
        // Set authorization header for future requests
        axiosInstance.defaults.headers.common['Authorization'] = token;
      } catch (error) {
        // If there's an error parsing the stored user, clear local storage
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
      }
    }
  }, []);
  
  const loginUser = async (credentials: ILoginCredentials) => {
    dispatch(loginUserPending());
    const endpoint = "/api/users/login";
    
    try {
      const response = await axiosInstance.post(endpoint, credentials);
      const responseData = response.data as { status: number; data: { token: string }; message?: string };
      
      if (responseData.status === 200 && responseData.data.token) {
        // Extract token from response
        const token = responseData.data.token;
        
        // Create user object
        const user: IUser = {
          email: credentials.email,
          token: token
        };
        
        // Store in sessionStorage for persistence
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        
        // Set authorization header for future requests
        axiosInstance.defaults.headers.common['Authorization'] = token;
        
        dispatch(loginUserSuccess({
          user,
          message: responseData.message || "Login successful"
        }));
      } else {
        const errorMessage = responseData.message || "Login failed";
        dispatch(loginUserError(errorMessage));
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Login failed";
      dispatch(loginUserError(errorMessage));
    }
  };
  
  const logoutUserAction = () => {
    // Remove token from sessionStorage
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    
    // Remove authorization header
    delete axiosInstance.defaults.headers.common['Authorization'];
    
    dispatch(logoutUser());
  };

  return (
    <LoginStateContext.Provider value={state}>
      <LoginActionContext.Provider value={{ loginUser, logoutUser: logoutUserAction }}>
        {children}
      </LoginActionContext.Provider>
    </LoginStateContext.Provider>
  );
};

export const useLoginState = () => {
  const context = useContext(LoginStateContext);
  if (!context) {
    throw new Error("useLoginState must be used within a LoginProvider");
  }
  return context;
};

export const useLoginActions = () => {
  const context = useContext(LoginActionContext);
  if (!context) {
    throw new Error("useLoginActions must be used within a LoginProvider");
  }
  return context;
};