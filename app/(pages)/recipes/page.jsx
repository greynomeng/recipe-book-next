"use client";

import PageHeader from "@/app/components/PageHeader";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useFetch } from "@/app/hooks/useFetch";

export default function RecipesPage() {
  const { data: recipes, loading, refetch } = useFetch("/api/recipes");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const openAdd = () => {};

  return (
    <>
      {/* Header */}
      <PageHeader
        title="Recipes"
        subtitle={`${recipes?.length || 0} payees`}
        action={
          <button className="btn btn-primary gap-1" onClick={openAdd}>
            <LuPlus />
            Add Payee
          </button>
        }
      />
    </>
  );
}
