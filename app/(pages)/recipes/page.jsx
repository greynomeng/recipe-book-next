"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuSquarePen, LuTrash2, LuPlus } from "react-icons/lu";

import { useFetch, apiCall } from "@/app/hooks/useFetch";

import Modal, { openModal } from "@/app/components/Modal";
import PageHeader from "@/app/components/PageHeader";
import RecipeForm from "@/app/components/RecipeForm";
import DeleteConfirm from "@/app/components/DeleteConfirm";
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

  const openEdit = (r) => {
    setSelected(r);
    openModal("recipe-modal");
  };

  const openDelete = (r) => {
    console.log("openDelete");
    setSelected(r);
    openModal("delete-recipe-modal");
  };

  const handleDelete = async () => {
    await apiCall(`/api/recipes/${selected?._id}`, "DELETE");
    refetch();
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

      {/* Recipes */}
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
                <div
                  key={recipe._id}
                  className={"card bg-base-100 lg:w-96 md:64 shadow-sm"}
                >
                  <Link href={`/recipes/${recipe._id.toString()}`}>
                    <figure className="max-h-60">
                      {recipe.image ? (
                        <Image
                          src={`/images/${recipe.image}`}
                          className="h-full w-full object-cover"
                          alt="Recipe Picture"
                          width={300}
                          height={300}
                          loading="eager"
                        />
                      ) : (
                        <Image
                          src="/default-recipe.png"
                          className="h-full w-full object-cover"
                          alt="Recipe Picture"
                          width={300}
                          height={300}
                          loading="eager"
                        />
                      )}
                    </figure>
                  </Link>

                  <div className="card-body">
                    <Link href={`/recipes/${recipe._id}`}>
                      <h2 className="card-title text-blue-400">
                        {recipe.name}
                      </h2>
                    </Link>
                    <p>{recipe.description}</p>
                  </div>

                  <div className="card-actions flex gap-1 justify-end p-2 opacity-0 hover:opacity-90">
                    <button
                      className="btn btn-ghost btn-xs text-primary"
                      onClick={() => openEdit(recipe)}
                    >
                      <LuSquarePen />
                    </button>
                    <button
                      className="btn btn-ghost btn-xs text-error"
                      onClick={() => openDelete(recipe)}
                    >
                      <LuTrash2 />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <Modal id="recipe-modal" title={selected ? "Edit Recipe" : "Add Recipe"}>
        <RecipeForm
          key={selected?._id}
          recipe={selected}
          onSuccess={() => {
            closeModal("recipe-modal");
            refetch();
          }}
          onCancel={() => closeModal("recipe-modal")}
        />
      </Modal>

      <DeleteConfirm
        id="delete-recipe-modal"
        title="Delete Recipe"
        message={`Delete ${selected?.name} ? This action cannot be undone.`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
