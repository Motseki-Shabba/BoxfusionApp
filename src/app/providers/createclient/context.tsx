"use client";
import { createContext } from "react";

// Interface defining the shape of a Client object
export interface IClient {
  id?: string;
  fullName: string;
  email: string;
  contactNumber: string;
  sex: string;
  dateOfBirth: string;
  activeState: boolean;
  trainerId: string;
}

// Interface defining the state shape for our context
export interface IClientStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  clients?: IClient[];
  message?: string;
}

// Interface defining all the actions that can be performed
export interface IClientActionContext {
  createClient: (client: IClient) => Promise<void>;
}

// Initial state object
export const INITIAL_STATE: IClientStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Create two separate contexts
export const ClientStateContext = createContext<IClientStateContext>(INITIAL_STATE);
export const ClientActionContext = createContext<IClientActionContext>({
  createClient: async () => {},
});