import React, { useEffect, useState } from "react";
import axios from "../axios-config";
import { Link, useNavigate } from "react-router-dom";
import "./CategoryList.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories/");
        setCategories(response.data);
      } catch (error) {
        setError("Error fetching categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}/`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      setError("Error deleting category. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card mx-auto">
        <div className="card-header text-center">
          <h2>Categories</h2>
        </div>
        <div className="card-body">
          {error && <p className="text-danger">{error}</p>}
          <ul className="list-group">
            {categories.map((category) => (
              <li
                key={category.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <Link
                  to={`/categories/${category.id}`}
                  className="category-link"
                >
                  <strong>{category.name}</strong>
                </Link>
                <button
                  className="btn btn-danger ml-3"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="text-center mt-3">
            <Link to="/categories/new" className="btn btn-primary">
              Add New Category
            </Link>
          </div>
        </div>
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

export default CategoryList;
