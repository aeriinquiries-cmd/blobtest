import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { Buffer } from "buffer";

function cors(body: any, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function OPTIONS() {
  return cors({}, 204);
}

export async function POST(req: Request) {
  try {
    const { base64, mimeType } = await req.json();

    if (!base64) {
      return cors({ error: "Missing base64" }, 400);
    }

    // 🔥 FIX: remove data:image/... prefix
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

    return cors({ url: blob.url });

  } catch (err: any) {
    return cors({ error: err.message }, 500);
  }
}