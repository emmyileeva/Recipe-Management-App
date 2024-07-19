import React, { useEffect, useState } from "react";
import axios from "../axios-config";
import { useParams } from "react-router-dom";
import "./CategoryDetail.css";

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/api/categories/${id}/`);
        setCategory(response.data);
      } catch (error) {
        setError("Error fetching category. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!category) {
    return <p>No category found</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Category Details</h2>
        </div>
        <div className="card-body">
          <h3>{category.name}</h3>
          <p>
            <strong>ID:</strong> {category.id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
