import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file to upload" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/images");
    console.log("uploadDir:", uploadDir);
    await fs.mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;

    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    return NextResponse.json(
      { file: fileName, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Error uploading file: ${error.message}` },
      { status: 500 }
    );
  }
}
