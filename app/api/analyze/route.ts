export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return Response.json({ error: "Missing imageUrl" }, { status: 400 });
    }

    // 🔥 CALL PUTER FROM BACKEND (simple proxy)
    const response = await fetch("https://api.puter.com/v2/ai/chat", {
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

    const text = await response.text();

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (e: any) {
    return Response.json(
      { error: e.message },
      { status: 500 }
    );
  }
}