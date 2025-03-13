"use client";
import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://body-vault-server-b9ede5286d4c.herokuapp.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interface for client data
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

export const fetchTrainerClients = async (trainerId: string) => {
  // Get token from sessionStorage
  const token = sessionStorage.getItem('authToken');
  
  if (!token) {
    throw new Error("No authentication token found");
  }
  
  // Set authorization header
  axiosInstance.defaults.headers.common['Authorization'] = token;
  
  try {
    const response = await axiosInstance.get(`/api/client/trainer/${trainerId}/clients`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching clients:", error);
    
    // If unauthorized (401), clear token
    if (error.response?.status === 401) {
      sessionStorage.removeItem('authToken');
    }
    
    throw error;
  }
};

export const getCurrentUser = async () => {
  // Get token from sessionStorage
  const token = sessionStorage.getItem('authToken');
  
  if (!token) {
    throw new Error("No authentication token found");
  }
  
  // Set authorization header
  axiosInstance.defaults.headers.common['Authorization'] = token;
  
  try {
    const response = await axiosInstance.get('/api/user/current');
    return response.data;
  } catch (error: any) {
    console.error("Error fetching current user:", error);
    
    // If unauthorized (401), clear token
    if (error.response?.status === 401) {
      sessionStorage.removeItem('authToken');
    }
    
    throw error;
  }
};