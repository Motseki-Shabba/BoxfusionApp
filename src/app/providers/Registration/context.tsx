
"use client";
import { createContext } from "react";

// Interface defining the shape of a Trainer object
export interface ITrainer {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  role: string;
  contactNumber: string;
  planType: string;
  activeState: boolean;
  trial: boolean;
  policiesAccepted: boolean;
  date?: string;
}

// Interface defining the state shape for our context
export interface ITrainerStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  trainer?: ITrainer;
  trainers?: ITrainer[];
  message?: string;
}

// Interface defining all the actions that can be performed
export interface ITrainerActionContext {
  registerTrainer: (trainer: ITrainer) => void;
}

// Initial state object
export const INITIAL_STATE: ITrainerStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Create two separate contexts
export const TrainerStateContext = createContext<ITrainerStateContext>(INITIAL_STATE);
export const TrainerActionContext = createContext<ITrainerActionContext>({
  registerTrainer: () => {},
});