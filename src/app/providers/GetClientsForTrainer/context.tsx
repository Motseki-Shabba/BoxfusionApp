"use client";
import { createContext } from "react";

// Interface defining the shape of a Client object
export interface IClient {
  _id: string;
  fullName: string;
  nickname: string;
  email: string;
  contactNumber: string;
  sex: string;
  dateOfBirth: string;
  activeState: boolean;
  hasOnboarded: boolean;
  date: string;
  trainer: string;
  uniqueTrainerCode: string;
  preferences: {
    mediaStorage: boolean;
    existingInjuries: string[];
    hereditaryConditions: string[];
    workoutDays: string[];
    gymEquipment: string[];
    foodAllergies: string[];
  };
  invoice: {
    invoice: {
      date: string;
    };
    invoiceHistory: any[];
  };
}

// Interface defining the state shape for our client context
export interface IClientStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  clients: IClient[];
  message?: string;
}

// Interface defining all the actions that can be performed
export interface IClientActionContext {
  getTrainerClients: () => Promise<void>;
}

// Initial state object
export const INITIAL_STATE: IClientStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  clients: []
};

// Create two separate contexts
export const ClientStateContext = createContext<IClientStateContext>(INITIAL_STATE);
export const ClientActionContext = createContext<IClientActionContext>({
  getTrainerClients: async () => {},
});