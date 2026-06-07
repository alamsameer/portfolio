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
    await query("DELETE FROM public.portfolio_projects WHERE id = $1;", [id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete project", details: err.message },
      { status: 500 }
    );
  }
}
