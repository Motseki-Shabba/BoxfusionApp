"use client";
import { createContext } from "react";

// Interface defining the shape of a User object
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  contactNumber: string;
  activeState: boolean;
  planType: string;
  trial: boolean;
  date: string;
}

// Interface defining the state shape for our context
export interface IUserStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  user?: IUser;
  message?: string;
}

// Interface defining all the actions that can be performed
export interface IUserActionContext {
  getCurrentUser: () => Promise<void>;
}

// Initial state object
export const INITIAL_STATE: IUserStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Create two separate contexts
export const UserStateContext = createContext<IUserStateContext>(INITIAL_STATE);
export const UserActionContext = createContext<IUserActionContext>({
  getCurrentUser: async () => {},
});