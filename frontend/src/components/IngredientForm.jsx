import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { useParams, useNavigate } from "react-router-dom";
import "./IngredientForm.css";

const IngredientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchIngredient = async () => {
        try {
          const response = await axios.get(`/api/ingredients/${id}/`);
          setName(response.data.name);
        } catch (error) {
          setError("Error fetching ingredient. Please try again later.");
        }
      };

      fetchIngredient();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name };

    try {
      if (id) {
        await axios.put(`/api/ingredients/${id}/`, data);
      } else {
        await axios.post("/api/ingredients/", data);
      }
      navigate("/ingredients");
    } catch (error) {
      setError("Error saving ingredient. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto">
        <div className="card-header text-center">
          <h2>{id ? "Edit Ingredient" : "Add Ingredient"}</h2>
        </div>
        <div className="card-body">
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please provide a name.</div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-3">
                {id ? "Update Ingredient" : "Add Ingredient"}
              </button>
              <button
                type="button"
                className="btn btn-secondary mt-3 ml-2"
                onClick={() => navigate("/ingredients")}
              >
                Back to Ingredients
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IngredientForm;
