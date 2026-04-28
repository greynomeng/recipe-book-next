"use client";

import { useParams } from "next/navigation";
import { LuArrowLeftFromLine, LuSquarePen, LuTrash2 } from "react-icons/lu";
import PageHeader from "@/app/components/PageHeader";
import { useFetch } from "@/app/hooks/useFetch";

export default function RecipeDetail() {
  const params = useParams();
  const id = params.id;

  const { data: recipe, loading, refetch } = useFetch(`/api/recipes/${id}`);

  const openEdit = () => {};

  return (
    <div className="mt-8">
      <PageHeader
        title={recipe?.name}
        subtitle="Details of recipe"
        action={
          <div className="flex justify-between gap-4">
            <button className="btn btn-outline gap-1" onClick={openEdit}>
              <LuArrowLeftFromLine />
              Back
            </button>
            <button className="btn btn-success gap-1" onClick={openEdit}>
              <LuSquarePen />
              Edit Recipe
            </button>
            <button className="btn btn-error gap-1" onClick={openEdit}>
              <LuTrash2 />
              Delete Recipe
            </button>
          </div>
        }
      />
    </div>
  );
}
