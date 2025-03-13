"use client";
import React, { useState, useContext } from "react";
import { FoodActionContext, FoodStateContext, INewFood } from "@/app/providers/FoodItems/context";

// Initial form state
const initialFormState: INewFood = {
  name: "",
  category: "",
  servingSize: 0,
  protein: 0,
  carbs: 0,
  sugar: 0,
  fat: 0,
  fiber: 0,
  sodium: 0,
  potassium: 0,
  cholesterol: 0,
  energy: 0
};

// Food categories
const foodCategories = [
  "Fruits",
  "Vegetables",
  "Grains",
  "Protein Foods",
  "Dairy",
  "Beverages",
  "Snacks",
  "Prepared Meals",
  "Other"
];

export const AddFoodForm = () => {
  const [formData, setFormData] = useState<INewFood>(initialFormState);
  const { addFoodItem } = useContext(FoodActionContext);
  const { isPending, isSuccess, isError, message } = useContext(FoodStateContext);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "name" || name === "category" ? value : Number(value)
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    try {
      await addFoodItem(formData);
      // Reset form after successful submission
      setFormData(initialFormState);
      setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Food Item</h2>
      
      {formSubmitted && isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Food item successfully added!
        </div>
      )}
      
      {formSubmitted && isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {message || "Failed to add food item"}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Food Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div className="col-span-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {foodCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Serving Size */}
          <div>
            <label htmlFor="servingSize" className="block text-sm font-medium text-gray-700 mb-1">
              Serving Size (g)*
            </label>
            <input
              type="number"
              id="servingSize"
              name="servingSize"
              value={formData.servingSize}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
              required
            />
          </div>

          {/* Energy */}
          <div>
            <label htmlFor="energy" className="block text-sm font-medium text-gray-700 mb-1">
              Energy (kcal)*
            </label>
            <input
              type="number"
              id="energy"
              name="energy"
              value={formData.energy}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
              required
            />
          </div>

          {/* Protein */}
          <div>
            <label htmlFor="protein" className="block text-sm font-medium text-gray-700 mb-1">
              Protein (g)
            </label>
            <input
              type="number"
              id="protein"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
            />
          </div>

          {/* Carbs */}
          <div>
            <label htmlFor="carbs" className="block text-sm font-medium text-gray-700 mb-1">
              Carbs (g)
            </label>
            <input
              type="number"
              id="carbs"
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
            />
          </div>

          {/* Sugar */}
          <div>
            <label htmlFor="sugar" className="block text-sm font-medium text-gray-700 mb-1">
              Sugar (g)
            </label>
            <input
              type="number"
              id="sugar"
              name="sugar"
              value={formData.sugar}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
            />
          </div>

          {/* Fat */}
          <div>
            <label htmlFor="fat" className="block text-sm font-medium text-gray-700 mb-1">
              Fat (g)
            </label>
            <input
              type="number"
              id="fat"
              name="fat"
              value={formData.fat}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
            />
          </div>

          {/* Fiber */}
          <div>
            <label htmlFor="fiber" className="block text-sm font-medium text-gray-700 mb-1">
              Fiber (g)
            </label>
            <input
              type="number"
              id="fiber"
              name="fiber"
              value={formData.fiber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
            />
          </div>

          {/* Sodium */}
          <div>
            <label htmlFor="sodium" className="block text-sm font-medium text-gray-700 mb-1">
              Sodium (mg)
            </label>
            <input
              type="number"
              id="sodium"
              name="sodium"
              value={formData.sodium}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
            />
          </div>

          {/* Potassium */}
          <div>
            <label htmlFor="potassium" className="block text-sm font-medium text-gray-700 mb-1">
              Potassium (mg)
            </label>
            <input
              type="number"
              id="potassium"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
            />
          </div>

          {/* Cholesterol */}
          <div>
            <label htmlFor="cholesterol" className="block text-sm font-medium text-gray-700 mb-1">
              Cholesterol (mg)
            </label>
            <input
              type="number"
              id="cholesterol"
              name="cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Food Item"}
          </button>
        </div>
      </form>
    </div>
  );
};