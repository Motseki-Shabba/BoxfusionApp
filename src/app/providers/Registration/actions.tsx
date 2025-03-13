"use client";
import * as reduxActions from "redux-actions";
import { ITrainer, ITrainerStateContext } from "./context";

// Action types enum
export enum TrainerActionEnums {
  registerTrainerPending = "REGISTER_TRAINER_PENDING",
  registerTrainerSuccess = "REGISTER_TRAINER_SUCCESS",
  registerTrainerError = "REGISTER_TRAINER_ERROR",
}

// Register trainer actions
export const registerTrainerPending = reduxActions.createAction<ITrainerStateContext>(
  TrainerActionEnums.registerTrainerPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const registerTrainerSuccess = reduxActions.createAction<
  ITrainerStateContext,
  { trainer: ITrainer; message: string }
>(
  TrainerActionEnums.registerTrainerSuccess,
  ({ trainer, message }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    trainer,
    message
  })
);

export const registerTrainerError = reduxActions.createAction<
  ITrainerStateContext,
  string
>(
  TrainerActionEnums.registerTrainerError,
  (message: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    message
  })
);