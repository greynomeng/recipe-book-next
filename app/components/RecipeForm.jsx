"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { LuSave, LuX } from "react-icons/lu";
import { apiCall } from "../hooks/useFetch";

export default function RecipeForm({ recipe, onSuccess, onCancel }) {
  const isEdit = !!recipe;
  const [form, setForm] = useState({
    name: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  useEffect(() => {
    if (recipe) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: recipe.name || ""
        // ...other fields
      });
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

      let response;
      if (isEdit) {
        response = await apiCall(`/api/recipes/${recipe._id}`, "PUT", form);
      } else {
        response = await apiCall("/api/recipes", "POST", form);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="max-h-175 overflow-y-auto pr-2 space-y-4 w-full"
    >
      {error && (
        <div className="alert alert-error py-2 text-sm">
          <span>{error}</span>
        </div>
      )}

      {/* Grid 2 columns */}
      <dev className="grid grid-cols-2 gap-4">
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
                  className="w-full object-cover rounded-lg"
                  width={50}
                  height={50}
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
                className="btn btn-ghost"
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
          <h3>Ingedients</h3>
        </div>
      </dev>
    </form>
  );
}
