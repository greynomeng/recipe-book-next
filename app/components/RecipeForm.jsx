"use client";

import { useEffect, useState, useRef } from "react";

export default function RecipeForm({ recipe, onSuccess, onCancel }) {
  const isEdit = !!recipe;
  const [form, setForm] = useState({
    name: "",
    image: ""
  });
  console.log("form:", form);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
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

  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="alert alert-error py-2 text-sm">
          <span>{error}</span>
        </div>
      )}
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
            <img
              src={imagePreview}
              alt="Recipe preview"
              className="w-full h-64 object-cover rounded-lg"
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
    </form>
  );
}
