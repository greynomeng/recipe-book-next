import Link from "next/link";
import Image from "next/image";
import { LuSquarePen, LuTrash2 } from "react-icons/lu";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className={"card bg-base-100 lg:w-96 md:64 shadow-sm"}>
        <Link href={`/recipes/${recipe._id.toString()}`}>
          <figure className="max-h-60">
            {recipe.image && (
              <Image
                src={`/images/${recipe.image}`}
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
          <Link href={`/recipes/${recipe._id.toString()}`}>
            <h2 className="card-title text-blue-400">{recipe.name}</h2>
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
    </div>
  );
};

export default RecipeCard;
