"use client";

import PageHeader from "@/app/components/PageHeader";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useFetch } from "@/app/hooks/useFetch";
import Modal, { openModal } from "@/app/components/Modal";
import RecipeForm from "@/app/components/RecipeForm";
import RecipeCard from "@/app/components/RecipeCard";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import EmptyState from "@/app/components/EmptyState";

export default function RecipesPage() {
  const { data: recipes, loading, refetch } = useFetch("/api/recipes");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const openAdd = () => {
    setSelected(null);
    openModal("recipe-modal");
  };

  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        title="Recipes"
        subtitle={`${recipes?.length || 0} recipes`}
        action={
          <button className="btn btn-primary gap-1" onClick={openAdd}>
            <LuPlus />
            Add Recipe
          </button>
        }
      />

      {/* Recipe cards */}
      {loading ? (
        <LoadingSpinner />
      ) : recipes?.length === 0 ? (
        <EmptyState
          title="No recipes yet"
          description="Add recipes by clicking the Add Recipe button..."
          action={
            <button className="btn btn-primary gap-1" onClick={openAdd}>
              <LuPlus />
              Add Recipe
            </button>
          }
        />
      ) : (
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
            {recipes &&
              recipes.map((recipe) => (
                <RecipeCard key={recipe._id.toString()} recipe={recipe} />
              ))}
          </div>
        </div>
      )}

      <Modal id="recipe-modal" title={"Add Recipe"}>
        <RecipeForm
          recipe={selected}
          onSuccess={() => {
            closeModal("recipe-modal");
            refetch();
          }}
          onCancel={() => closeModal("recipe-modal")}
        />
      </Modal>
    </div>
  );
}
