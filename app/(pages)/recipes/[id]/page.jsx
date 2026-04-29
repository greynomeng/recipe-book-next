"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LuArrowLeftFromLine,
  LuSquarePen,
  LuTrash2,
  LuCircle
} from "react-icons/lu";
import PageHeader from "@/app/components/PageHeader";
import { useFetch } from "@/app/hooks/useFetch";
import Modal, { openModal } from "@/app/components/Modal";
import RecipeForm from "@/app/components/RecipeForm";
import { useState } from "react";

export default function RecipeDetail() {
  const params = useParams();
  const id = params.id;

  const { data: recipe, loading, refetch } = useFetch(`/api/recipes/${id}`);
  const [selected, setSelected] = useState(null);

  const router = useRouter();

  const openEdit = (r) => {
    setSelected(r);
    openModal("recipe-modal");
  };

  const openDelete = () => {};

  return (
    <div className="mt-8">
      <PageHeader
        title={recipe?.name}
        subtitle="Details of recipe"
        action={
          <div className="flex justify-between gap-4">
            <button
              className="btn btn-outline gap-1"
              onClick={() => {
                router.back();
              }}
            >
              <LuArrowLeftFromLine />
              Back
            </button>
            <button className="btn btn-success gap-1" onClick={openEdit}>
              <LuSquarePen />
              Edit Recipe
            </button>
            <button className="btn btn-error gap-1" onClick={openDelete}>
              <LuTrash2 />
              Delete Recipe
            </button>
          </div>
        }
      />

      <div className="flex flex-row">
        <div className="card bg-base-100 max-w-md shadow-sm mr-8">
          <figure>
            {recipe && recipe.image && (
              <Image
                src={`/images/${recipe.image}`}
                alt="Recipe Picture"
                width={600}
                height={500}
                loading="eager"
              />
            )}
          </figure>
          <div className="card-body">
            <h2 className="card-title">{recipe?.name}</h2>
            <p>{recipe?.description}</p>
            {/* Prep */}
            <div className="flex flex-row mt-4">
              {recipe?.prepTime && (
                <p>
                  <span className="font-semibold">Prep:</span> {recipe.prepTime}
                </p>
              )}
              {/* Cook */}
              {recipe?.cookTime && (
                <p>
                  <span className="font-semibold">Cook:</span> {recipe.cookTime}
                </p>
              )}
              {/* Serves */}
              {recipe?.servings && (
                <p>
                  <span className="font-semibold">Serves:</span>{" "}
                  {recipe.servings}
                </p>
              )}
            </div>

            {recipe?.cuisine && (
              <p>
                <span className="font-semibold">Cuisine:</span>{" "}
                {recipe?.cuisine}
              </p>
            )}
            <div className="mt-2">
              {recipe?.notes && (
                <div>
                  <h2 className="card-title">Notes</h2>
                  <p>{recipe.notes}</p>
                </div>
              )}
            </div>
            <div className="mt-2">
              {recipe?.source && (
                <div>
                  <h2 className="card-title">Source</h2>
                  <p>{recipe.source}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Ingredients */}
        <div className="basis-1/4">
          <p className="text-2xl font-semibold">Ingredients</p>
          <ul className="list">
            {recipe?.ingredients &&
              recipe.ingredients.map((item, index) => (
                <li
                  className="list-row items-center text-base"
                  key={`${item}-${index}`}
                >
                  <LuCircle /> {item}
                </li>
              ))}
          </ul>
        </div>
        {/* Instructions */}
        <div className="basis-1/2">
          <p className="text-2xl font-semibold">Instructions</p>
          <ul className="list">
            {recipe?.instructions &&
              recipe?.instructions.map((item, index) => (
                <li className="list-row text-base" key={`${item}-${index}`}>
                  {index + 1}. {item}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <Modal id="recipe-modal" title={recipe ? "Edit Recipe" : "Add Recipe"}>
        <RecipeForm
          recipe={recipe}
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
