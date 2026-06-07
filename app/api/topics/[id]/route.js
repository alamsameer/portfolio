import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

function isAuthorized(request) {
  const authHeader = request.headers.get("Authorization");
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return authHeader === adminPassword;
}

export async function DELETE(request, { params }) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { rows } = await query(
      "DELETE FROM public.timeline_topics WHERE id = $1 RETURNING *;",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedTopic: rows[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete topic", details: error.message },
      { status: 500 }
    );
  }
}
