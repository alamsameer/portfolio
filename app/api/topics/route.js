import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

// Helper to check authorization
function isAuthorized(request) {
  const authHeader = request.headers.get("Authorization");
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return authHeader === adminPassword;
}

export async function GET() {
  try {
    const { rows } = await query("SELECT * FROM public.timeline_topics ORDER BY id ASC;");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Database query failed", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, status } = await request.json();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const { rows } = await query(
      "INSERT INTO public.timeline_topics (title, description, status) VALUES ($1, $2, $3) RETURNING *;",
      [title, description || "", status || "in-progress"]
    );
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create topic", details: error.message },
      { status: 500 }
    );
  }
}
