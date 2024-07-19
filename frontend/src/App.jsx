import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import RecipeDetail from "./components/RecipeDetail";
import IngredientList from "./components/IngredientList";
import IngredientForm from "./components/IngredientForm";
import IngredientDetail from "./components/IngredientDetail";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import CategoryDetail from "./components/CategoryDetail";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/new" element={<RecipeForm />} />
          <Route path="/recipes/edit/:id" element={<RecipeForm />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/ingredients" element={<IngredientList />} />
          <Route path="/ingredients/new" element={<IngredientForm />} />
          <Route path="/ingredients/edit/:id" element={<IngredientForm />} />
          <Route path="/ingredients/:id" element={<IngredientDetail />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/new" element={<CategoryForm />} />
          <Route path="/categories/edit/:id" element={<CategoryForm />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
