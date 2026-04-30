import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    image: { type: String, trim: true },
    description: { type: String, trim: true },
    notes: { type: String, trim: true },
    ingredients: { type: [String], default: [], trim: true },
    instructions: { type: [String], default: [], trim: true },
    prepTime: { type: String, trim: true },
    cookTime: { type: String, trim: true },
    servings: { type: String, trim: true },
    cuisine: { type: String, trim: true },
    tags: { type: [String], default: [], trim: true },
    source: { type: String, trim: true }
  },
  {
    timestamps: true,
    collection: "recipes"
  }
);

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
