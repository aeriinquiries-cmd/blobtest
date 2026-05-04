import { NextResponse } from "next/server";

function cors(body: any, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return cors({ error: "Missing imageUrl" }, 400);
    }

    // 🔥 FOR NOW (TEST)
    // later replace with real AI call
    return cors({
      result: `Image received: ${imageUrl}`,
    });

  } catch (err: any) {
    return cors({ error: err.message }, 500);
  }
}