import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

function isAuthorized(request) {
  const authHeader = request.headers.get("Authorization");
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return authHeader === adminPassword;
}

export async function GET() {
  try {
    const { rows } = await query(
      "SELECT * FROM public.portfolio_projects ORDER BY id ASC;"
    );
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch projects", details: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      year,
      description,
      projectLink,
      githubLink,
      imageSrc,
      videoSrc,
      tags
    } = await request.json();

    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    const { rows } = await query(
      `INSERT INTO public.portfolio_projects 
       (name, year, description, project_link, github_link, image_src, video_src, tags) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *;`,
      [
        name,
        year || "",
        description,
        projectLink || "",
        githubLink || "",
        imageSrc || "",
        videoSrc || "",
        tags || []
      ]
    );

    return NextResponse.json(rows[0]);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create project", details: err.message },
      { status: 500 }
    );
  }
}
