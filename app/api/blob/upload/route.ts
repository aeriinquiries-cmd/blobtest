import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const { base64, mimeType } = await req.json();

    if (!base64) {
      return new Response(
        JSON.stringify({ error: "Missing base64" }),
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    const buffer = Buffer.from(base64, "base64");

    const blob = await put(
      `img-${Date.now()}.jpeg`,
      buffer,
      {
        access: "public",
        contentType: mimeType || "image/jpeg",
      }
    );

    return new Response(
      JSON.stringify({ url: blob.url }),
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

// 🔥 ADD THIS
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// 🔥 ADD THIS (VERY IMPORTANT)
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders(),
  });
}