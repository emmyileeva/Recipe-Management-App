import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { useParams, useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import "./RecipeForm.css";

const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [instructions, setInstructions] = useState([""]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await axios.get("/api/ingredients/");
      setIngredients(response.data);
    };

    const fetchCategories = async () => {
      const response = await axios.get("/api/categories/");
      setCategories(response.data);
    };

    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(`/api/recipes/${id}/`);
          const recipe = response.data;
          setTitle(recipe.title);
          setDescription(recipe.description);
          setSelectedIngredients(
            recipe.ingredients.map((ing) => ({
              value: ing.ingredient.id,
              label: ing.ingredient.name,
              quantity: ing.quantity,
            }))
          );
          setSelectedCategories(
            recipe.categories.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))
          );
          setInstructions(recipe.instructions.split("\n"));
          setImage(recipe.image);
        } catch (error) {
          setError("Error fetching recipe. Please try again later.");
        }
      };

      fetchRecipe();
    }

    fetchIngredients();
    fetchCategories();
  }, [id]);

  const handleInstructionsChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleIngredientChange = (index, value) => {
    const newSelectedIngredients = [...selectedIngredients];
    newSelectedIngredients[index] = {
      ...value,
      quantity: newSelectedIngredients[index].quantity,
    };
    setSelectedIngredients(newSelectedIngredients);
  };

  const handleQuantityChange = (index, value) => {
    const newSelectedIngredients = [...selectedIngredients];
    newSelectedIngredients[index] = {
      ...newSelectedIngredients[index],
      quantity: value,
    };
    setSelectedIngredients(newSelectedIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("instructions", instructions.join("\n"));
    if (image) {
      formData.append("image", image);
    }
    selectedIngredients.forEach((ingredient) => {
      formData.append(
        "ingredients",
        JSON.stringify({
          ingredient: ingredient.label,
          quantity: ingredient.quantity,
        })
      );
    });
    selectedCategories.forEach((category) => {
      formData.append("categories", category.label);
    });

    try {
      let response;
      if (id) {
        response = await axios.put(`/api/recipes/${id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axios.post("/api/recipes/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      navigate("/recipes");
    } catch (error) {
      setError("Error saving recipe. Please try again later.");
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        console.error("Error request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>{id ? "Edit Recipe" : "Add Recipe"}</h2>
        </div>
        <div className="card-body">
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please provide a title.</div>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Please provide a description.
              </div>
            </div>
            <div className="form-group">
              <label>Ingredients:</label>
              {selectedIngredients.map((ingredient, index) => (
                <div key={index} className="ingredient-group">
                  <Select
                    options={ingredients.map((ing) => ({
                      value: ing.id,
                      label: ing.name,
                    }))}
                    value={ingredient}
                    onChange={(value) => handleIngredientChange(index, value)}
                  />
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={() =>
                  setSelectedIngredients([
                    ...selectedIngredients,
                    { value: "", label: "", quantity: "" },
                  ])
                }
              >
                Add Ingredient
              </button>
              <small className="form-text text-muted">
                Don't see what you're looking for?{" "}
                <Link to="/ingredients/new">Add a new ingredient</Link>.
              </small>
            </div>
            <div className="form-group">
              <label>Categories:</label>
              <Select
                isMulti
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                value={selectedCategories}
                onChange={setSelectedCategories}
              />
              <small className="form-text text-muted">
                Don't see what you're looking for?{" "}
                <Link to="/categories/new">Add a new category</Link>.
              </small>
            </div>
            <div className="form-group">
              <label>Instructions:</label>
              {instructions.map((instruction, index) => (
                <div key={index} className="instruction-group">
                  <label>Step {index + 1}</label>
                  <textarea
                    className="form-control"
                    value={instruction}
                    onChange={(e) =>
                      handleInstructionsChange(index, e.target.value)
                    }
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide instruction #{index + 1}.
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={addInstruction}
              >
                Add Instruction
              </button>
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="file"
                className="form-control-file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {id ? "Update Recipe" : "Add Recipe"}
            </button>
            <button
              type="button"
              className="btn btn-secondary mt-3 ml-2"
              onClick={() => navigate("/recipes")}
            >
              Back to Recipes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
