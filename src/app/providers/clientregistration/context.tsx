"use client";
import { createContext } from "react";

// Interface defining the shape of a client registration
export interface IClientRegistration {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  contactNumber: string;
  policiesAccepted: boolean;
}

// Interface for the registered client response
export interface IRegisteredClient {
  _id: string;
  email: string;
  name: string;
  contactNumber: string;
  dateOfBirth: string | null;
  role: string;
  planType: string | null;
  plan: string | null;
  trial: boolean | null;
  policiesAccepted: boolean;
  date: string;
}

// Interface defining the state shape for our context
export interface IClientRegistrationStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  registeredClient?: IRegisteredClient;
  message?: string;
}

// Interface defining all the actions that can be performed
export interface IClientRegistrationActionContext {
  registerClient: (clientData: IClientRegistration) => Promise<void>;
}

// Initial state object
export const INITIAL_STATE: IClientRegistrationStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Create two separate contexts
export const ClientRegistrationStateContext = createContext<IClientRegistrationStateContext>(INITIAL_STATE);
export const ClientRegistrationActionContext = createContext<IClientRegistrationActionContext>({
  registerClient: async () => {},
});
