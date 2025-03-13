"use client";
import { useContext, useReducer } from "react";
import axios from "axios";
import { INITIAL_STATE, ITrainer, TrainerActionContext, TrainerStateContext } from "@/app/providers/Registration/context";
import { TrainerReducer } from "../Registration/reducer";
import { 
  registerTrainerPending, 
  registerTrainerSuccess, 
  registerTrainerError 
} from "./actions";

// Create an axios instance directly in this file
const axiosInstance = axios.create({
  baseURL: 'https://body-vault-server-b9ede5286d4c.herokuapp.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const TrainerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(TrainerReducer, INITIAL_STATE);
  
  const registerTrainer = async (trainer: ITrainer) => {
    dispatch(registerTrainerPending());
    const endpoint = "/api/users/register";
    
    // Set default values if not provided
    const trainerData = {
      ...trainer,
      planType: trainer.planType || "base",
      activeState: trainer.activeState !== undefined ? trainer.activeState : true,
      trial: trainer.trial !== undefined ? trainer.trial : false
    };
    
    await axiosInstance.post(endpoint, trainerData)
      .then((response) => {
        const responseData = response.data as { status: number, data: any, message: string };
        if (responseData.status === 200) {
          dispatch(registerTrainerSuccess({
            trainer: (response.data as { data: any }).data,
            message: (response.data as { message: string }).message
          }));
        } else {
          const errorData = response.data as { message: string };
          dispatch(registerTrainerError(errorData.message || "Registration failed"));
        }
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.response?.data?.message || "Registration failed";
        dispatch(registerTrainerError(errorMessage));
      });
  };

  return (
    <TrainerStateContext.Provider value={state}>
      <TrainerActionContext.Provider value={{ registerTrainer }}>
        {children}
      </TrainerActionContext.Provider>
    </TrainerStateContext.Provider>
  );
};

export const useTrainerState = () => {
  const context = useContext(TrainerStateContext);
  if (!context) {
    throw new Error("useTrainerState must be used within a TrainerProvider");
  }
  return context;
};

export const useTrainerActions = () => {
  const context = useContext(TrainerActionContext);
  if (!context) {
    throw new Error("useTrainerActions must be used within a TrainerProvider");
  }
  return context;
};