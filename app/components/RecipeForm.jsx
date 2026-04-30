"use client";

import { useEffect, useState } from "react";

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

  const handleSubmit = () => {};

  // console.log("form:", form);

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

      {/* <label className="label font-semibold">Recipe Image</label>
      <input
        type="file"
        accept="image/*"
        value={form.name}
        onChange={(e) => set("image", e.target.value)}
        className="input input-bordered w-full mb-2"
        placeholder="Enter recipe name..."
      /> */}
    </form>
  );
}
