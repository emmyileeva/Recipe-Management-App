import React, { useEffect, useState } from "react";
import axios from "../axios-config";
import { useParams } from "react-router-dom";
import "./IngredientDetail.css";

const IngredientDetail = () => {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const response = await axios.get(`/api/ingredients/${id}/`);
        setIngredient(response.data);
      } catch (error) {
        setError("Error fetching ingredient. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIngredient();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!ingredient) {
    return <p>No ingredient found</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Ingredient Detail</h2>
        </div>
        <div className="card-body">
          <h4>{ingredient.name}</h4>
          <p>ID: {ingredient.id}</p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetail;
