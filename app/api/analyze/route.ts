import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });
    }

    // 🔥 CALL PUTER AI
    const aiRes = await fetch("https://api.puter.com/v1/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "What do you see?",
        image: imageUrl,
        model: "google/gemini-3.1-flash-image-preview",
      }),
    });

    const data = await aiRes.json();

    return NextResponse.json({ result: data });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}