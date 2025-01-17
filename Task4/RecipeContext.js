import React, { createContext, useReducer, useEffect, useContext } from 'react';

// Actions for the reducer
const ADD_RECIPE = 'ADD_RECIPE';
const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';

// Initial state of the recipes
const initialState = {
  recipes: [],
  filteredCategory: '',
};

// Reducer function
const recipeReducer = (state, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        filteredCategory: action.payload,
      };
    default:
      return state;
  }
};

// Create a Context for the Recipe
const RecipeContext = createContext();

// Create a Provider Component to wrap your app and manage state
export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Sync locally added recipes to localStorage
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(state.recipes));
  }, [state.recipes]);

  // Load locally added recipes from localStorage on app initialization
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    dispatch({ type: ADD_RECIPE, payload: savedRecipes });
  }, []);

  // Function to add a recipe
  const addRecipe = (recipe) => {
    dispatch({ type: ADD_RECIPE, payload: recipe });
  };

  // Function to filter recipes by category
  const filterRecipesByCategory = (category) => {
    dispatch({ type: FILTER_BY_CATEGORY, payload: category });
  };

  // Filter recipes based on selected category
  const filteredRecipes = state.filteredCategory
    ? state.recipes.filter(recipe => recipe.category === state.filteredCategory)
    : state.recipes;

  return (
    <RecipeContext.Provider value={{ recipes: filteredRecipes, addRecipe, filterRecipesByCategory }}>
      {children}
    </RecipeContext.Provider>
  );
};

// Custom hook to use RecipeContext
export const useRecipeContext = () => useContext(RecipeContext);
