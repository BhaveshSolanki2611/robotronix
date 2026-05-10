import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionResponse, isValidAdminPassword } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!isValidAdminPassword(body?.password)) {
      return NextResponse.json({ error: "Invalid admin password." }, { status: 401 });
    }

    return createAdminSessionResponse(request);
  } catch (error) {
    if (error instanceof Error && error.message.includes("ADMIN_SECRET_KEY")) {
      return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
    }

    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}
