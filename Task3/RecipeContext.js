import React, { createContext, useState, useContext } from 'react';

// Create a Context for the Recipe
const RecipeContext = createContext();

// Create a Provider Component to wrap your app and manage state
export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]); // Store locally added recipes
  const [filteredCategory, setFilteredCategory] = useState(''); // For filtering recipes by category

  // Function to add a recipe to the list
 // const addRecipe = (recipe) => {
   // setRecipes([...recipes, recipe]);
  //};

  // Function to filter recipes by category
  const filterRecipesByCategory = (category) => {
    setFilteredCategory(category);
  };

  // Filter recipes based on the selected category
  const filteredRecipes = filteredCategory
    ? recipes.filter(recipe => recipe.category === filteredCategory)
    : recipes;

  return (
    <RecipeContext.Provider value={{ recipes: filteredRecipes, addRecipe, filterRecipesByCategory }}>
      {children}
    </RecipeContext.Provider>
  );
};

// Create a custom hook to use the RecipeContext
export const useRecipeContext = () => useContext(RecipeContext);
