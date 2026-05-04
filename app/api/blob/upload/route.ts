import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const { base64, mimeType } = await req.json();

    if (!base64) {
      return NextResponse.json({ error: "Missing base64" }, { status: 400 });
    }

    const cleanBase64 = base64.includes("base64,")
      ? base64.split("base64,")[1]
      : base64;

    const buffer = Buffer.from(cleanBase64, "base64");

    const ext = mimeType?.split("/")[1] || "jpg";
    const filename = `img-${Date.now()}.${ext}`;

    const blob = await put(filename, buffer, {
      access: "public",
      contentType: mimeType || "image/jpeg",
    });

    return NextResponse.json({ url: blob.url });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}