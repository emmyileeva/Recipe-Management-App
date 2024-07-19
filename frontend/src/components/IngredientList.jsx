import React, { useEffect, useState } from "react";
import axios from "../axios-config";
import { Link, useNavigate } from "react-router-dom";
import "./IngredientList.css";

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get("/api/ingredients/");
        setIngredients(response.data);
      } catch (error) {
        setError("Error fetching ingredients. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/ingredients/${id}/`);
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    } catch (error) {
      setError("Error deleting ingredient. Please try again later.");
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
      <h2 className="mb-4 text-center">Ingredients</h2>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/ingredients/new" className="btn btn-primary">
          Add New Ingredient
        </Link>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <div className="list-group">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <Link
              to={`/ingredients/${ingredient.id}`}
              className="ingredient-link"
            >
              <strong>{ingredient.name}</strong>
            </Link>
            <button
              className="btn btn-danger btn-sm delete-btn"
              onClick={() => handleDelete(ingredient.id)}
            >
              Delete
            </button>
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

export default IngredientList;
