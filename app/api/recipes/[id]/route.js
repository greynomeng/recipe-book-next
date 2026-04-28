import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Recipe from "@/app/models/Recipe";

export async function GET(request, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return NextResponse.json(
        { success: false, error: "Recipe not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: recipe }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Error fetching recipe: ${error}`
      },
      { status: 400 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, body);

    if (!updatedRecipe) {
      return NextResponse.json(
        { success: false, error: "Recipe not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedRecipe },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Error updating recipe: ${error}`
      },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Recipe ID misssing" },
        { status: 404 }
      );
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return NextResponse.json(
        { success: false, error: "Recipe not found" },
        { status: 404 }
      );
    }

    // 1. Delete image file if it exists
    if (recipe.image) {
      const imagePath = path.join(process.cwd(), "public/images", recipe.image);

      try {
        await fs.unlink(imagePath);
      } catch (err) {
        // File might not exist — log but don't fail
        if (err.code !== "ENOENT") {
          console.error("Image delete failed:", err);
        }
      }
    }

    // 2. Delete recipe document
    await Recipe.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Failed to delete recipe: ${error}` },
      { status: 500 }
    );
  }
}
