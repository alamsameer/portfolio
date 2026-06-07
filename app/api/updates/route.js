import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

function isAuthorized(request) {
  const authHeader = request.headers.get("Authorization");
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return authHeader === adminPassword;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get("topicId");
    const limitDays = searchParams.get("limitDays");

    let result;
    if (limitDays) {
      const days = parseInt(limitDays) || 7;
      // Fetch updates from the last N days across all topics and general thoughts
      result = await query(
        `SELECT u.*, t.title as topic_title 
         FROM public.timeline_updates u 
         LEFT JOIN public.timeline_topics t ON u.topic_id = t.id 
         WHERE u.update_date >= CURRENT_DATE - ($1 * INTERVAL '1 day')
         ORDER BY u.update_date DESC, u.created_at DESC;`,
        [days]
      );
    } else if (topicId) {
      result = await query(
        `SELECT u.*, t.title as topic_title 
         FROM public.timeline_updates u 
         LEFT JOIN public.timeline_topics t ON u.topic_id = t.id
         WHERE u.topic_id = $1 
         ORDER BY u.day_number ASC, u.created_at ASC;`,
        [topicId]
      );
    } else {
      result = await query(
        `SELECT u.*, t.title as topic_title 
         FROM public.timeline_updates u 
         LEFT JOIN public.timeline_topics t ON u.topic_id = t.id
         ORDER BY u.update_date DESC, u.created_at DESC;`
      );
    }

    return NextResponse.json(result.rows);
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

    const { topicId, dayNumber, title, content, date, tag } = await request.json();
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const selectedTag = tag || "learning";
    const selectedTopicId = topicId ? parseInt(topicId) : null;
    const selectedDayNumber = dayNumber ? parseInt(dayNumber) : null;
    const updateDate = date ? new Date(date) : new Date();

    const { rows } = await query(
      "INSERT INTO public.timeline_updates (topic_id, day_number, title, content, update_date, tag) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      [selectedTopicId, selectedDayNumber, title, content, updateDate, selectedTag]
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create update", details: error.message },
      { status: 500 }
    );
  }
}
