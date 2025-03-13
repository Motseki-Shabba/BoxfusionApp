"use client";
import React, { useEffect, useReducer, useState } from 'react';
import { 
  FoodStateContext, 
  FoodActionContext, 
  INITIAL_STATE 
} from '@/app/providers/GetFoodItems/context';
import { FoodReducer } from '@/app/providers/GetFoodItems/reducer';
import { 
  getFoodItemsPending, 
  getFoodItemsSuccess, 
  getFoodItemsError 
} from '@/app/providers/GetFoodItems/actions';
import { fetchFoodItems } from '@/app/providers/GetFoodItems/provider';

const FoodList: React.FC = () => {
  // Set up reducer
  const [state, dispatch] = useReducer(FoodReducer, INITIAL_STATE);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Define the action to get food items
  const getFoodItems = async () => {
    try {
      // Dispatch pending action
      dispatch(getFoodItemsPending());
      
      // Fetch food items
      const response = await fetchFoodItems() as { status: number, data: any, message: string };
      
      // Check for successful response
      if (response.status === 200) {
        dispatch(getFoodItemsSuccess({
          foodItems: response.data,
          message: response.message
        }));
      } else {
        dispatch(getFoodItemsError(response.message || 'Failed to fetch food items'));
      }
    } catch (error: any) {
      dispatch(getFoodItemsError(error.message || 'Unknown error occurred'));
    }
  };
  
  // Fetch food items on component mount
  useEffect(() => {
    getFoodItems();
  }, []);
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = state.foodItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(state.foodItems.length / itemsPerPage);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  
  // Generate visible page numbers
  const getVisiblePageNumbers = () => {
    const delta = 1; // Number of pages to show before and after current page
    const range = [];
    
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    
    // Add first page if not included
    if (range[0] > 1) {
      if (range[0] > 2) {
        range.unshift('...');
      }
      range.unshift(1);
    }
    
    // Add last page if not included
    // if (range[range.length - 1] < totalPages ) {
    //   if (range[range.length - 1] < totalPages - 1) {
    //     range.push('...');
    //   }
    //   range.push(totalPages);
    // }
    
    return range;
  };
  
  return (
    <FoodStateContext.Provider value={state}>
      <FoodActionContext.Provider value={{ getFoodItems }}>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Food Database</h1>
            
            {state.isSuccess && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Show</span>
                <select 
                  value={itemsPerPage} 
                  onChange={handleItemsPerPageChange}
                  className="border rounded-md px-3 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-gray-600">entries</span>
              </div>
            )}
          </div>
          
          {/* Loading state */}
          {state.isPending && (
            <div className="container loading-container flex justify-center items-center h-64">
              <div className="loading-card text-center">
                <h2 className="text-lg font-medium mb-3">Loading food items...</h2>
                <div className="spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          )}
          
          {/* Error state */}
          {state.isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-1">{state.message}</span>
            </div>
          )}
          
          {/* Success state */}
          {state.isSuccess && (
            <>
              <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Serving (g)
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Protein (g)
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Carbs (g)
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fat (g)
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Energy (kcal)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentItems.length > 0 ? (
                        currentItems.map((food) => (
                          <tr key={food._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {food.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                              {food.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {food.servingSize}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {food.protein}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {food.carbs}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {food.fat}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {food.energy}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                            No food items found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Pagination controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0 text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, state.foodItems.length)}
                  </span>{" "}
                  of <span className="font-medium">{state.foodItems.length}</span> results
                </div>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-sm font-medium rounded-md border ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  
                  <div className="hidden md:flex space-x-1">
                    {getVisiblePageNumbers().map((number, index) => (
                      <button
                        key={index}
                        onClick={() => typeof number === "number" && paginate(number)}
                        disabled={number === "..."}
                        className={`px-4 py-2 text-sm font-medium rounded-md border ${
                          number === currentPage
                            ? "bg-blue-500 text-white border-blue-500"
                            : number === "..."
                            ? "bg-white text-gray-700 cursor-default"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  
                  <div className="md:hidden flex items-center space-x-1">
                    <span className="px-3 py-2 text-sm text-gray-700">
                      {currentPage} / {totalPages}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-sm font-medium rounded-md border ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </FoodActionContext.Provider>
    </FoodStateContext.Provider>
  );
};

export default FoodList;