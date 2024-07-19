import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/api/recipes/");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <div className="overlay">
          <div className="search-bar">
            <input
              type="text"
              className="form-control"
              placeholder="Search Recipes"
            />
          </div>
          <div className="header-content">
            <h1 className="display-4">Explore Recipes</h1>
            <p className="lead">Manage your recipes with ease.</p>
          </div>
        </div>
      </header>

      <div className="content">
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4 small-card">
              <div className="card-img-container">
                <img
                  src="/images/recipes.jpg"
                  className="card-img-top"
                  alt="Recipes"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Manage Recipes</h5>
                <p className="card-text">
                  Add, edit, and delete your favorite recipes. Organize them in
                  categories and keep track of ingredients.
                </p>
                <Link to="/recipes" className="btn btn-primary">
                  View Recipes
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 small-card">
              <div className="card-img-container">
                <img
                  src="/images/ingredients.jpg"
                  className="card-img-top"
                  alt="Ingredients"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Manage Ingredients</h5>
                <p className="card-text">
                  Keep an inventory of all the ingredients you use in your
                  recipes. Never run out of your essential items.
                </p>
                <Link to="/ingredients" className="btn btn-primary">
                  View Ingredients
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 small-card">
              <div className="card-img-container">
                <img
                  src="/images/categories.jpg"
                  className="card-img-top"
                  alt="Categories"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Manage Categories</h5>
                <p className="card-text">
                  Organize your recipes into categories. Find your favorite
                  recipes faster and more efficiently.
                </p>
                <Link to="/categories" className="btn btn-primary">
                  View Categories
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className="carousel slide small-carousel"
          id="recipeCarousel"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            {recipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={recipe.image || "https://via.placeholder.com/800x400"}
                  className="d-block w-100"
                  alt={recipe.title}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{recipe.title}</h5>
                  <p>{recipe.description}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#recipeCarousel"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#recipeCarousel"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
