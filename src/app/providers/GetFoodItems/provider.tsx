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

// Interface for food data
export interface IFood {
  _id: string;
  name: string;
  category: string;
  servingSize: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  fiber: number;
  sodium: number;
  potassium: number;
  cholesterol: number;
  energy: number;
  date: string;
}

export const fetchFoodItems = async () => {
  // Get token from sessionStorage
  const token = sessionStorage.getItem('authToken');
  
  if (!token) {
    throw new Error("No authentication token found");
  }
  
  // Set authorization header
  axiosInstance.defaults.headers.common['Authorization'] = token;
  
  try {
    const response = await axiosInstance.get('/api/food');
    return response.data;
  } catch (error: any) {
    console.error("Error fetching food items:", error);
    
    // If unauthorized (401), clear token
    if (error.response?.status === 401) {
      sessionStorage.removeItem('authToken');
    }
    
    throw error;
  }
};