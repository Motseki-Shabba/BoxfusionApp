"use client";
import { createContext } from "react";

// Interface defining the login credentials
export interface ILoginCredentials {
  email: string;
  password: string;
}

// Interface defining the user after login
export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  role?: string;
  token: string;
}

// Interface defining the state shape for our context
export interface ILoginStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  isAuthenticated: boolean;
  user?: IUser;
  message?: string;
}

// Interface defining all the actions that can be performed
export interface ILoginActionContext {
  loginUser: (credentials: ILoginCredentials) => Promise<void>;
  logoutUser: () => void;
}

// Initial state object
export const INITIAL_STATE: ILoginStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  isAuthenticated: false,
};

// Create two separate contexts
export const LoginStateContext = createContext<ILoginStateContext>(INITIAL_STATE);
export const LoginActionContext = createContext<ILoginActionContext>({
  loginUser: async () => {},
  logoutUser: () => {},
});