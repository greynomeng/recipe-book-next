import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    console.log("file", file);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Error uploading file: ${error.message}` },
      { status: 500 }
    );
  }
}
