import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RecipeProvider } from './RecipeContext'; // Import the RecipeProvider
import Home from './components/Home';
import SearchRecipes from './components/SearchRecipes';
import ViewRecipes from './components/ViewRecipes';
import AddRecipe from './components/AddRecipe';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search-recipes" component={SearchRecipes} />
            <Route path="/view-recipes" component={ViewRecipes} />
            <Route path="/add-recipe" component={AddRecipe} />
          </Switch>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;
