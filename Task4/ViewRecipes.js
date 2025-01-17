import React, { useEffect, useState } from 'react';
import { useRecipeContext } from '../RecipeContext';

function ViewRecipes() {
  const { recipes, filterRecipesByCategory } = useRecipeContext(); // Access recipes and filter function from context
  const [categories, setCategories] = useState(['Breakfast', 'Lunch', 'Dinner', 'Dessert']);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Function to handle category change
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
        {recipes.length === 0 ? (
          <p>No recipes available in this category</p>
        ) : (
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <h3>{recipe.name}</h3>
                <p>Category: {recipe.category}</p>
                <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                <p>
                  {recipe.fromAPI ? (
                    <span>API Recipe</span>
                  ) : (
                    <span>Locally Added Recipe</span>
                  )}
                </p>
                <img src={recipe.image} alt={recipe.name} width="200" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ViewRecipes;
