import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoryForm.css";

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const response = await axios.get(`/api/categories/${id}/`);
          setName(response.data.name);
        } catch (error) {
          setError("Error fetching category. Please try again later.");
        }
      };

      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name };

    try {
      if (id) {
        await axios.put(`/api/categories/${id}/`, data);
      } else {
        await axios.post("/api/categories/", data);
      }
      navigate("/categories");
    } catch (error) {
      setError("Error saving category. Please try again later.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>{id ? "Edit Category" : "Add Category"}</h2>
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
            <button type="submit" className="btn btn-primary">
              {id ? "Update Category" : "Add Category"}
            </button>
            <button
              type="button"
              className="btn btn-secondary mt-3 ml-2"
              onClick={() => navigate("/categories")}
            >
              Back to Categories
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
