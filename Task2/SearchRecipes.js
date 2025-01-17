import React, { useState, useEffect } from 'react';

function SearchRecipes() {
  const [query, setQuery] = useState('');  // For Holding the search query
  const [recipes, setRecipes] = useState([]);  // Stores the recipes fetched from the API
  const [loading, setLoading] = useState(false);  // Manages loading state
  const [error, setError] = useState(null);  // Stores error state

  // Function to handle the search input change
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Function to fetch recipes from TheMealDB API
  const fetchRecipes = async () => {
    if (!query) return; // Avoid fetching if the query is empty

    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals); // Set fetched recipes
      } else {
        setRecipes([]); // If no meals are found
        setError('No recipes found.');
      }
    } catch (err) {
      setError('Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipes when the query changes
  useEffect(() => {
    fetchRecipes();
  }, [query]);  // Trigger the fetch when the query changes

  return (
    <div>
      <h1>Search for Recipes</h1>

      <div>
        <input
          type="text"
          placeholder="Enter recipe name..."
          value={query}
          onChange={handleSearchChange}
        />
        <button onClick={fetchRecipes}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.idMeal}>
                <h3>{recipe.strMeal}</h3>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} width="200" />
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No recipes to display</p>
        )}
      </div>
    </div>
  );
}

export default SearchRecipes;
