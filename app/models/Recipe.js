import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String },
    notes: { type: String },
    ingredients: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    prepTime: { type: String },
    cookTime: { type: String },
    servings: { type: String },
    cuisine: { type: String },
    tags: { type: [String], default: [] },
    source: { type: String }
  },
  {
    timestamps: true,
    collection: "recipes"
  }
);

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
