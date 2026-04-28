"use client";

import PageHeader from "@/app/components/PageHeader";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useFetch } from "@/app/hooks/useFetch";
import RecipeCard from "@/app/components/RecipeCard";

export default function RecipesPage() {
  const { data: recipes, loading, refetch } = useFetch("/api/recipes");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const openAdd = () => {};

  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        title="Recipes"
        subtitle={`${recipes?.length || 0} payees`}
        action={
          <button className="btn btn-primary gap-1" onClick={openAdd}>
            <LuPlus />
            Add Recipe
          </button>
        }
      />

      {/* Recipe cards */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
          {recipes &&
            recipes.map((recipe) => (
              <RecipeCard key={recipe._id.toString()} recipe={recipe} />
            ))}
        </div>
      </div>
    </div>
  );
}
