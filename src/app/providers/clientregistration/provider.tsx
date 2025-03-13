"use client";
import { useContext, useReducer } from "react";
import axios from "axios";
import {
  INITIAL_STATE,
  IClientRegistration,
  ClientRegistrationStateContext,
  ClientRegistrationActionContext,
} from "./context";
import { ClientRegistrationReducer } from "./reducer";
import {
  registerClientPending,
  registerClientSuccess,
  registerClientError,
} from "./actions";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "https://body-vault-server-b9ede5286d4c.herokuapp.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ClientRegistrationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    ClientRegistrationReducer,
    INITIAL_STATE
  );

  const registerClient = async (clientData: IClientRegistration) => {
    dispatch(registerClientPending());

    try {
      const response = await axiosInstance.post(
        "/api/users/register/mobile",
        clientData
      );
      const responseData = response.data as {
        status: number;
        data: any;
        message?: string;
      };

      if (response.status === 201 || responseData.status === 201) {
        dispatch(
          registerClientSuccess({
            registeredClient: responseData.data,
            message: responseData.message || "Registration successful",
          })
        );
        return;
      }

      const errorMessage = responseData.message || "Registration successful";
      dispatch(registerClientError(errorMessage));
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Registration successful";
      dispatch(registerClientError(errorMessage));
    }
  };

  return (
    <ClientRegistrationStateContext.Provider value={state}>
      <ClientRegistrationActionContext.Provider value={{ registerClient }}>
        {children}
      </ClientRegistrationActionContext.Provider>
    </ClientRegistrationStateContext.Provider>
  );
};

export const useClientRegistrationState = () => {
  const context = useContext(ClientRegistrationStateContext);
  if (!context) {
    throw new Error(
      "useClientRegistrationState must be used within a ClientRegistrationProvider"
    );
  }
  return context;
};

export const useClientRegistrationActions = () => {
  const context = useContext(ClientRegistrationActionContext);
  if (!context) {
    throw new Error(
      "useClientRegistrationActions must be used within a ClientRegistrationProvider"
    );
  }
  return context;
};
