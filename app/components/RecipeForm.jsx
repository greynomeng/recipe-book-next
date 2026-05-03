"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { LuSave, LuX } from "react-icons/lu";
import { apiCall } from "../hooks/useFetch";

export default function RecipeForm({ recipe, onSuccess, onCancel }) {
  const isEdit = !!recipe;
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    ingredients: "",
    instructions: "",
    prepTime: "",
    cookTime: "",
    servings: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [ingredients, setIngredients] = useState([]);

  const fileInputRef = useRef(null);

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  useEffect(() => {
    if (recipe) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: recipe.name || "",
        description: recipe.description || "",
        ingredients: recipe.ingredients?.join("\n") || "",
        instructions: recipe.instructions?.join("\n") || "",
        prepTime: recipe.prepTime || "",
        cookTime: recipe.cookTime || "",
        servings: recipe.servings || ""
      });

      if (recipe?.image) {
        // Prepend storage path
        const imageUrl = `/images/${recipe.image}`;
        setImagePreview(imageUrl);
        // Update form state so the UI knows an image is present
        setForm((prev) => ({ ...prev, image: recipe.image }));
      }
    }
  }, [recipe]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select an image file"
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image must be less than 5MB"
        }));
        return;
      }

      // Save file for uploading later
      setFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        // Only need file name here
        // setFormData((prev) => ({ ...prev, image: base64String }));
        setForm((prev) => ({ ...prev, image: file.name }));
      };
      reader.readAsDataURL(file);
      // if (errors.image) {
      //   setErrors((prev) => ({ ...prev, image: "" }));
      // }
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setFile(null);
    // Clear the input value properly
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const submissionData = {
        ...form,
        ingredients: form.ingredients
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        instructions: form.instructions
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      };

      let response;
      if (isEdit) {
        response = await apiCall(
          `/api/recipes/${recipe._id}`,
          "PUT",
          submissionData
        );
      } else {
        response = await apiCall("/api/recipes", "POST", submissionData);
      }

      if (file) {
        handleImageUpload();
      }
      onSuccess();
    } catch (error) {
      setError({ submit: error.message || "Failed to submit recipe" });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!file) {
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    await apiCall("/api/upload", "POST", imageFormData);
  };

  const ingredientCount = String(form.ingredients || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean).length;

  const instructionCount = String(form.instructions || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean).length;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-h-[80vh] overflow-y-auto p-4 border rounded-lg w-full"
    >
      {error && (
        <div className="alert alert-error py-2 text-sm">
          <span>{error}</span>
        </div>
      )}

      {/* Grid 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div>
          <div className="form-control">
            <label className="label font-semibold">Recipe Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="input input-bordered w-full mb-2"
              placeholder="Enter recipe name..."
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Recipe Image</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="file-input w-full mb-2"
              placeholder="Enter recipe name..."
            />
            {imagePreview && (
              <div className="mt-4 relative">
                <Image
                  src={imagePreview}
                  alt="Recipe preview"
                  className="object-cover rounded-lg"
                  width={420}
                  height={350}
                  loading="eager"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="btn btn-error btn-sm absolute top-2 right-2"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner loading-sm" />
              )}
              <LuSave />
              {isEdit ? "Update" : "Add"} Recipe
            </button>
            {onCancel && (
              <button
                type="button"
                className="btn btn-ghost btn-outline"
                onClick={onCancel}
              >
                <LuX />
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="form-control">
            <label className="label font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Brief description..."
              rows="2"
            />
          </div>

          <div className="flex items-center justify-between mb-1">
            <label className="label font-semibold">Ingredients</label>
            {ingredientCount > 0 && (
              <span className="badge badge-primary">
                {ingredientCount} ingredient{ingredientCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text mb-1">
                Enter one ingredient per line
              </span>
            </label>
            <textarea
              name="ingredients"
              value={form.ingredients}
              onChange={(e) => set("ingredients", e.target.value)}
              className="textarea textarea-bordered w-full mb-4"
              placeholder=""
              rows="5"
            />
          </div>

          <div className="flex items-center justify-between mb-1">
            <label className="label font-semibold">Instructions</label>
            {instructionCount > 0 && (
              <span className="badge badge-primary">
                {instructionCount} step{instructionCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text  mb-1">Enter one step per line</span>
            </label>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={(e) => set("instructions", e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder=""
              rows="5"
            />
          </div>

          {/* 3 cols for prep, cook and serves */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="form-control">
              <label className="label font-semibold">Prep time:</label>
              <input
                type="text"
                value={form.prepTime}
                onChange={(e) => set("prepTime", e.target.value)}
                className="input input-bordered w-full mb-2"
                placeholder="Preparation time..."
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">Cook time:</label>
              <input
                type="text"
                value={form.cookTime}
                onChange={(e) => set("cookTime", e.target.value)}
                className="input input-bordered w-full mb-2"
                placeholder="Enter cook name..."
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">Serves:</label>
              <input
                type="text"
                value={form.servings}
                onChange={(e) => set("servings", e.target.value)}
                className="input input-bordered w-full mb-2"
                placeholder="No. serves..."
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
