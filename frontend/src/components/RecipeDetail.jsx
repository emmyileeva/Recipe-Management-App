import React, { useEffect, useState } from "react";
import axios from "../axios-config";
import { useParams } from "react-router-dom";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}/`);
        setRecipe(response.data);
      } catch (error) {
        setError("Error fetching recipe. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>No recipe found</p>;
  }

  return (
    <div className="container mt-4">
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul className="list-group mb-3">
        {recipe.ingredients.map((ingredient) => (
          <li className="list-group-item" key={ingredient.id}>
            {ingredient.name}
          </li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="img-fluid mt-3" />
      )}
      <h3>Categories:</h3>
      <ul className="list-group">
        {recipe.categories.map((category) => (
          <li className="list-group-item" key={category.id}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetail;
