import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });
    }

    const res = await fetch("https://api.puter.com/v2/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "What is in this image?",
        image: imageUrl,
        model: "google/gemini-3.1-flash-image-preview"
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      result: data.output || JSON.stringify(data)
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}