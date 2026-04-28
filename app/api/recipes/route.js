import connectDB from "@/app/lib/db";
import Recipe from "@/app/models/Recipe";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const recipes = await Recipe.find({}).sort({ name: 1 }).lean();
    return NextResponse.json({ success: true, data: recipes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const recipe = await Recipe.create(body);

    return NextResponse.json({ success: true, data: recipe }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
