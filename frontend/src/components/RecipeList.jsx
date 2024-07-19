import React, { useEffect, useState } from "react";
import axios from "../axios-config";
import { Link, useNavigate } from "react-router-dom";
import "./RecipeList.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/api/recipes/");
        setRecipes(response.data);
      } catch (error) {
        setError("Error fetching recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/recipes/${id}/`);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      setError("Error deleting recipe. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Recipes</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/recipes/new")}
      >
        Add New Recipe
      </button>
      {error && <p>{error}</p>}
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <div className="card">
              <img
                src={recipe.image || "https://via.placeholder.com/300x200"}
                className="card-img-top"
                alt={recipe.title}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <div className="button-group">
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="btn btn-outline-secondary"
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate(`/recipes/edit/${recipe.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-link back-button"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
