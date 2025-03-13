"use client";
import * as reduxActions from "redux-actions";
import { IClient, IClientStateContext } from "../GetClientsForTrainer/context";

// Action types enum
export enum ClientActionEnums {
  getTrainerClientsPending = "GET_TRAINER_CLIENTS_PENDING",
  getTrainerClientsSuccess = "GET_TRAINER_CLIENTS_SUCCESS",
  getTrainerClientsError = "GET_TRAINER_CLIENTS_ERROR"
}

// Get trainer clients actions
export const getTrainerClientsPending = reduxActions.createAction<IClientStateContext>(
  ClientActionEnums.getTrainerClientsPending,
  () => ({ 
    isPending: true, 
    isSuccess: false, 
    isError: false,
    clients: [] 
  })
);

export const getTrainerClientsSuccess = reduxActions.createAction<
  IClientStateContext,
  { clients: IClient[]; message: string }
>(
  ClientActionEnums.getTrainerClientsSuccess,
  ({ clients, message }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    clients,
    message
  })
);

export const getTrainerClientsError = reduxActions.createAction<
  IClientStateContext,
  string
>(
  ClientActionEnums.getTrainerClientsError,
  (message: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    clients: [],
    message
  })
);