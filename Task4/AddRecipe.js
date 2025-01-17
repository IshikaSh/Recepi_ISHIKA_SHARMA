import React, { useState } from 'react';
import { useRecipeContext } from '../RecipeContext';

function AddRecipe() {
  const { addRecipe } = useRecipeContext();
  const [recipeName, setRecipeName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      name: recipeName,
      category,
      ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
      image: '', // Image can be empty or default
      fromAPI: false, // Flag indicating it's a locally added recipe
    };
    addRecipe(newRecipe); // Add recipe via context
    setRecipeName('');
    setCategory('');
    setIngredients('');
  };

  return (
    <div>
      <h1>Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Name:</label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients (comma-separated):</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;
