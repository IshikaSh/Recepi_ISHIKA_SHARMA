import React, { useEffect, useState } from 'react';
import { useRecipeContext } from '../RecipeContext';

function ViewRecipes() {
  const { recipes, filterRecipesByCategory } = useRecipeContext(); // Access recipes and filter function from context
  const [categories, setCategories] = useState(['Breakfast', 'Lunch', 'Dinner', 'Dessert']);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch recipes from an external API (for now, we'll simulate it with a static list)
  useEffect(() => {
    // Simulated fetch call
    // In a real app, you would fetch recipes from an external API here
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterRecipesByCategory(category); // Filter the recipes based on category
  };

  return (
    <div>
      <h1>View Recipes</h1>

      <div>
        <label>Filter by Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <h2>Recipes</h2>
        {recipes.length === 0 ? (
          <p>No recipes available</p>
        ) : (
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <h3>{recipe.name}</h3>
                <p>Category: {recipe.category}</p>
                <p>Ingredients: {recipe.ingredients.join(', ')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ViewRecipes;
