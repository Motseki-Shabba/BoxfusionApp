"use client";
import { createContext } from "react";

export interface IClientLogin {
  email: string;
  password: string;
}

export interface ILoggedInClient {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface IClientLoginStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  client?: ILoggedInClient;
  message?: string;
}

export interface IClientLoginActionContext {
  loginClient: (loginData: IClientLogin) => Promise<void>;
  logoutClient: () => void;
}

export const INITIAL_STATE: IClientLoginStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const ClientLoginStateContext = createContext<IClientLoginStateContext>(INITIAL_STATE);
export const ClientLoginActionContext = createContext<IClientLoginActionContext>({
  loginClient: async () => {},
  logoutClient: () => {},
});